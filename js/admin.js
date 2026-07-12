(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const KEYS = ['witer_projects', 'witer_messages', 'witer_texts', 'witer_settings'];

  function hashStr(value) { let hash = 0; for (let i = 0; i < value.length; i++) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0; return `h_${Math.abs(hash).toString(36)}`; }
  function getData(key, fallback) { try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } }
  function setData(key, value, track = true) { localStorage.setItem(key, JSON.stringify(value)); if (track && key !== 'witer_last_updated') localStorage.setItem('witer_last_updated', JSON.stringify(new Date().toISOString())); }
  function esc(value = '') { const div = document.createElement('div'); div.textContent = String(value); return div.innerHTML; }

  const defaultProjects = [
    { id: 'salon_beauty', name: 'Beauty Space / Concept', nameEn: 'Beauty Space / Concept', desc: 'Концепт преміального сайту для beauty-простору.', descEn: 'Premium beauty space website concept.', stack: 'Art direction, UX/UI, Development', link: 'https://vitthegrandfather.github.io/salon/', image: 'images/projects/your-salon.jpg' },
    { id: 'salon_tattoo', name: 'Tattoo Studio / Concept', nameEn: 'Tattoo Studio / Concept', desc: 'Концепт сайту сучасної тату-студії.', descEn: 'Contemporary tattoo studio website concept.', stack: 'Strategy, UX/UI, Development', link: 'https://vitthegrandfather.github.io/tattoosalondemo/', image: 'images/projects/tattoo-salon.jpg' }
  ];
  if (!getData('witer_seeded_projects', false)) {
    if (!getData('witer_projects', []).length) setData('witer_projects', defaultProjects);
    setData('witer_seeded_projects', true, false);
  }
  if (!getData('witer_concept_names_migrated', false)) {
    const conceptMap = Object.fromEntries(defaultProjects.map(project => [project.id, project]));
    const migrated = getData('witer_projects', []).map(project => conceptMap[project.id] ? { ...project, ...conceptMap[project.id] } : project);
    setData('witer_projects', migrated);
    setData('witer_concept_names_migrated', true, false);
  }
  if (!getData('witer_messages', null)) setData('witer_messages', []);
  if (!getData('witer_texts', null)) setData('witer_texts', {});
  if (!getData('witer_settings', null)) setData('witer_settings', { email: 'studiowiter@outlook.com' });

  const loginScreen = $('#loginScreen');
  const setupScreen = $('#setupScreen');
  const dashboard = $('#dashboard');
  let loginAttempts = getData('witer_login_attempts', { count: 0, ts: 0 });
  if (Date.now() - loginAttempts.ts > 300000) loginAttempts = { count: 0, ts: 0 };

  function showDashboard() {
    loginScreen.hidden = true; setupScreen.hidden = true; dashboard.hidden = false;
    loadDashboard(); updateDate();
  }
  function initAuth() {
    const hasPassword = Boolean(getData('witer_password', ''));
    if (sessionStorage.getItem('witer_logged_in') === 'true' && hasPassword) return showDashboard();
    loginScreen.hidden = !hasPassword;
    setupScreen.hidden = hasPassword;
    dashboard.hidden = true;
  }
  $('#loginForm').addEventListener('submit', event => {
    event.preventDefault();
    if (loginAttempts.count >= 5 && Date.now() - loginAttempts.ts < 300000) return showToast('Забагато спроб. Спробуйте через 5 хвилин.', true);
    const password = $('#loginPassword').value;
    if (hashStr(password) === getData('witer_password', '')) {
      sessionStorage.setItem('witer_logged_in', 'true');
      loginAttempts = { count: 0, ts: 0 }; setData('witer_login_attempts', loginAttempts, false);
      showDashboard();
    } else {
      loginAttempts = { count: loginAttempts.count + 1, ts: Date.now() }; setData('witer_login_attempts', loginAttempts, false);
      showToast('Пароль не підходить.', true);
    }
  });
  $('#setupForm').addEventListener('submit', event => {
    event.preventDefault(); const password = $('#setupPassword').value;
    if (password.length < 6) return showToast('Пароль має містити щонайменше 6 символів.', true);
    setData('witer_password', hashStr(password)); sessionStorage.setItem('witer_logged_in', 'true'); showDashboard(); showToast('Доступ створено. Ласкаво просимо!');
  });
  $$('.password-toggle').forEach(button => button.addEventListener('click', () => {
    const input = $('input', button.parentElement); const visible = input.type === 'text'; input.type = visible ? 'password' : 'text'; button.textContent = visible ? 'Показати' : 'Сховати';
  }));
  $('#logoutBtn').addEventListener('click', () => { sessionStorage.removeItem('witer_logged_in'); location.reload(); });

  const tabMeta = { overview: ['Огляд', 'CONTROL ROOM / 01'], texts: ['Тексти', 'CONTENT / 02'], projects: ['Проєкти', 'PORTFOLIO / 03'], messages: ['Повідомлення', 'INBOX / 04'], settings: ['Налаштування', 'SYSTEM / 05'] };
  function goToTab(name) {
    $$('.sidebar__link[data-tab]').forEach(link => link.classList.toggle('active', link.dataset.tab === name));
    $$('.tab').forEach(tab => tab.classList.toggle('active', tab.id === `tab-${name}`));
    $('#pageTitle').textContent = tabMeta[name][0]; $('#pageEyebrow').textContent = tabMeta[name][1];
    closeSidebar(); window.scrollTo({ top: 0, behavior: 'smooth' });
    if (name === 'messages') loadAllMessages();
  }
  $$('.sidebar__link[data-tab]').forEach(link => link.addEventListener('click', () => goToTab(link.dataset.tab)));
  $$('[data-go]').forEach(button => button.addEventListener('click', () => goToTab(button.dataset.go)));
  const sidebar = $('#sidebar'), backdrop = $('#sidebarBackdrop');
  function closeSidebar() { sidebar.classList.remove('open'); backdrop.classList.remove('open'); }
  $('#menuBtn').addEventListener('click', () => { sidebar.classList.add('open'); backdrop.classList.add('open'); });
  $('.sidebar-close').addEventListener('click', closeSidebar); backdrop.addEventListener('click', closeSidebar);

  function updateDate() { $('#currentDate').textContent = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date()); }
  function loadDashboard() {
    const projects = getData('witer_projects', []), messages = getData('witer_messages', []);
    $('#statVisits').textContent = getData('witer_visits', 0); $('#statMessages').textContent = messages.length; $('#statProjects').textContent = projects.length;
    $('#navProjects').textContent = projects.length; $('#navMessages').textContent = messages.length; $('#unreadLabel').textContent = messages.length === 1 ? 'нове повідомлення' : 'нових повідомлень';
    const recent = $('#recentMessages');
    recent.innerHTML = messages.length ? messages.slice(-3).reverse().map(messageTemplate).join('') : '<div class="empty">Нових повідомлень поки немає</div>';
    loadTexts(); loadProjects(); loadAllMessages(); loadSettings();
  }

  const textIds = ['hero_brand','hero_brand_en','hero_subtitle','hero_subtitle_en','hero_desc','hero_desc_en','about_1','about_1_en','about_2','about_2_en','about_3','about_3_en'];
  const textDefaults = { hero_brand: 'WITER', hero_brand_en: 'WITER', hero_subtitle: 'Digital Studio', hero_subtitle_en: 'Digital Studio', hero_desc: 'Створюю виразні цифрові продукти, що перетворюють увагу на дію.', hero_desc_en: 'I create expressive digital products that turn attention into action.', about_1: 'Я Віталій — дизайнер і розробник із Києва, засновник WITER.', about_1_en: "I'm Vitalii — a designer and developer from Kyiv, founder of WITER.", about_2: 'Особисто веду проєкт від першої розмови до запуску.', about_2_en: 'I personally lead every project from the first conversation to launch.', about_3: 'Ціную ясність, сильну візуальну ідею та надійний код.', about_3_en: 'I value clarity, a strong visual idea and reliable code.' };
  function loadTexts() { const texts = getData('witer_texts', {}); textIds.forEach(id => { $(`#text_${id}`).value = texts[id] ?? textDefaults[id] ?? ''; }); }
  $('#saveTexts').addEventListener('click', () => { const texts = {}; textIds.forEach(id => texts[id] = $(`#text_${id}`).value.trim()); setData('witer_texts', texts); updateLastUpdated(); showToast('Тексти збережено.'); });

  let editingProjectId = null;
  function loadProjects() {
    const projects = getData('witer_projects', []), list = $('#projectsList');
    $('#navProjects').textContent = projects.length; $('#statProjects').textContent = projects.length;
    list.innerHTML = projects.length ? projects.map(project => `<article class="project-card"><div class="project-card__image">${project.image ? `<img src="${esc(project.image)}" alt="">` : ''}<span>${esc(project.stack || 'DIGITAL PROJECT')}</span></div><div class="project-card__body"><div class="project-card__head"><h3>${esc(project.name)}</h3><div class="project-card__actions"><button class="icon-btn" type="button" data-edit-project="${esc(project.id)}" aria-label="Редагувати">✎</button><button class="icon-btn danger" type="button" data-delete-project="${esc(project.id)}" aria-label="Видалити">×</button></div></div><p>${esc(project.desc)}</p><div class="project-card__stack">${project.link ? `<a href="${esc(project.link)}" target="_blank" rel="noopener">VIEW CONCEPT ↗</a>` : 'NO PUBLIC LINK'}</div></div></article>`).join('') : '<div class="empty">Проєктів поки немає</div>';
    $$('[data-edit-project]', list).forEach(button => button.addEventListener('click', () => editProject(button.dataset.editProject)));
    $$('[data-delete-project]', list).forEach(button => button.addEventListener('click', () => deleteProject(button.dataset.deleteProject)));
  }
  function resetProjectForm() { editingProjectId = null; $('#projectFormTitle').textContent = 'Новий проєкт'; ['projName','projNameEn','projDesc','projDescEn','projStack','projLink','projEditId'].forEach(id => $(`#${id}`).value = ''); $('#projImage').value = ''; $('#projImagePreview').src = ''; $('#projImagePreview').classList.remove('has-image'); }
  function openProjectForm() { $('#projectForm').hidden = false; document.body.style.overflow = 'hidden'; setTimeout(() => $('#projName').focus(), 50); }
  function closeProjectForm() { $('#projectForm').hidden = true; document.body.style.overflow = ''; }
  $('#addProject').addEventListener('click', () => { resetProjectForm(); openProjectForm(); }); $('#cancelProject').addEventListener('click', closeProjectForm);
  $('#projectForm').addEventListener('click', event => { if (event.target === $('#projectForm')) closeProjectForm(); });
  $('#projImage').addEventListener('change', async event => { const file = event.target.files[0]; if (!file) return; if (file.size > 8 * 1024 * 1024) return showToast('Зображення завелике. Максимум 8 MB.', true); const preview = $('#projImagePreview'); preview.src = await optimizeImage(file); preview.classList.add('has-image'); });
  async function optimizeImage(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onerror = reject; reader.onload = () => { const image = new Image(); image.onerror = reject; image.onload = () => { const max = 1400, scale = Math.min(1, max / image.width); const canvas = document.createElement('canvas'); canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale); canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height); resolve(canvas.toDataURL('image/jpeg', .82)); }; image.src = reader.result; }; reader.readAsDataURL(file); }); }
  $('#saveProject').addEventListener('click', () => {
    const name = $('#projName').value.trim(); if (!name) return showToast('Додайте назву проєкту.', true);
    let projects = getData('witer_projects', []); const existing = projects.find(project => project.id === editingProjectId);
    const project = { id: editingProjectId || `project_${Date.now()}`, name, nameEn: $('#projNameEn').value.trim(), desc: $('#projDesc').value.trim(), descEn: $('#projDescEn').value.trim(), stack: $('#projStack').value.trim(), link: $('#projLink').value.trim(), image: $('#projImagePreview').classList.contains('has-image') ? $('#projImagePreview').src : (existing?.image || '') };
    projects = editingProjectId ? projects.map(item => item.id === editingProjectId ? project : item) : [...projects, project]; setData('witer_projects', projects); closeProjectForm(); loadProjects(); loadDashboard(); showToast(editingProjectId ? 'Проєкт оновлено.' : 'Проєкт додано.');
  });
  function editProject(id) { const project = getData('witer_projects', []).find(item => item.id === id); if (!project) return; editingProjectId = id; $('#projectFormTitle').textContent = 'Редагувати проєкт'; $('#projName').value = project.name || ''; $('#projNameEn').value = project.nameEn || ''; $('#projDesc').value = project.desc || ''; $('#projDescEn').value = project.descEn || ''; $('#projStack').value = project.stack || ''; $('#projLink').value = project.link || ''; $('#projEditId').value = id; const preview = $('#projImagePreview'); preview.src = project.image || ''; preview.classList.toggle('has-image', Boolean(project.image)); openProjectForm(); }
  function deleteProject(id) { if (!confirm('Видалити цей проєкт?')) return; setData('witer_projects', getData('witer_projects', []).filter(item => item.id !== id)); loadDashboard(); showToast('Проєкт видалено.'); }

  function messageTemplate(message, index = '') { const name = esc(message.name || 'Без імені'); const initials = name.split(/\s+/).slice(0,2).map(part => part[0]).join('').toUpperCase(); return `<article class="message-card"><span class="message-card__avatar">${initials || 'W'}</span><div><p class="message-card__name">${name}</p><p class="message-card__email">${esc(message.email || '')}</p><p class="message-card__text">${esc(message.message || '')}</p></div><div class="message-card__side"><span class="message-card__date">${esc(message.date || '')}</span>${index !== '' ? `<button class="message-card__delete" type="button" data-delete-message="${index}" aria-label="Видалити">×</button>` : ''}</div></article>`; }
  function loadAllMessages(query = '') { const messages = getData('witer_messages', []); const filtered = messages.map((message, index) => ({ message, index })).filter(({ message }) => `${message.name} ${message.email} ${message.message}`.toLowerCase().includes(query.toLowerCase())); $('#messageCount').textContent = `${filtered.length} повідомлень`; $('#navMessages').textContent = messages.length; $('#allMessages').innerHTML = filtered.length ? filtered.reverse().map(({ message, index }) => messageTemplate(message, index)).join('') : '<div class="empty">Нічого не знайдено</div>'; $$('[data-delete-message]').forEach(button => button.addEventListener('click', () => { const items = getData('witer_messages', []); items.splice(Number(button.dataset.deleteMessage), 1); setData('witer_messages', items); loadDashboard(); showToast('Повідомлення видалено.'); })); }
  $('#messageSearch').addEventListener('input', event => loadAllMessages(event.target.value.trim()));
  $('#clearMessages').addEventListener('click', () => { if (!getData('witer_messages', []).length) return showToast('Список уже порожній.'); if (confirm('Очистити всі повідомлення без можливості відновлення?')) { setData('witer_messages', []); loadDashboard(); showToast('Повідомлення очищено.'); } });

  function loadSettings() { $('#settingsEmail').value = getData('witer_settings', {}).email || ''; updateLastUpdated(); }
  function updateLastUpdated() { const value = getData('witer_last_updated', null); $('#lastUpdated').textContent = value ? new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'; }
  $('#saveSettings').addEventListener('click', () => { const password = $('#newPassword').value; if (password && password.length < 6) return showToast('Новий пароль має містити мінімум 6 символів.', true); if (password) { setData('witer_password', hashStr(password)); $('#newPassword').value = ''; } setData('witer_settings', { ...getData('witer_settings', {}), email: $('#settingsEmail').value.trim() }); updateLastUpdated(); showToast('Налаштування збережено.'); });
  function exportData() { const payload = { version: 1, exportedAt: new Date().toISOString() }; KEYS.forEach(key => payload[key] = getData(key, key.endsWith('s') ? [] : {})); const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `witer-backup-${new Date().toISOString().slice(0,10)}.json`; anchor.click(); URL.revokeObjectURL(url); showToast('Резервну копію завантажено.'); }
  $('#exportData').addEventListener('click', exportData); $('#backupQuick').addEventListener('click', exportData);
  $('#importData').addEventListener('change', async event => { const file = event.target.files[0]; if (!file) return; try { const payload = JSON.parse(await file.text()); if (!payload.version) throw new Error(); if (!confirm('Замінити поточні локальні дані даними з backup?')) return; KEYS.forEach(key => { if (payload[key] !== undefined) setData(key, payload[key]); }); loadDashboard(); showToast('Дані успішно відновлено.'); } catch { showToast('Не вдалося прочитати цей backup-файл.', true); } finally { event.target.value = ''; } });

  const toast = $('#toast'); let toastTimer;
  function showToast(text, error = false) { clearTimeout(toastTimer); toast.textContent = text; toast.classList.toggle('error', error); toast.classList.add('show'); toastTimer = setTimeout(() => toast.classList.remove('show'), 3200); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeSidebar(); if (!$('#projectForm').hidden) closeProjectForm(); } });
  initAuth();
})();
