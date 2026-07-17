(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const KEYS = ['witer_projects', 'witer_messages', 'witer_texts', 'witer_settings'];

  function hashStr(value) { let hash = 0; for (let i = 0; i < value.length; i++) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0; return `h_${Math.abs(hash).toString(36)}`; }
  function getData(key, fallback) { try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } }
  function setData(key, value, track = true) { localStorage.setItem(key, JSON.stringify(value)); if (track && key !== 'witer_last_updated') localStorage.setItem('witer_last_updated', JSON.stringify(new Date().toISOString())); }
  function esc(value = '') { const div = document.createElement('div'); div.textContent = String(value); return div.innerHTML; }

  const projectPresets = {
    beauty: {
      brief: 'Концепт цифрової платформи для мережі з п’яти beauty-просторів у Києві. Завдання — поєднати fashion-подачу, зрозумілу структуру послуг і швидкий онлайн-запис.',
      briefEn: 'A digital platform concept for a network of five beauty spaces in Kyiv, combining fashion-led art direction with a clear service structure and quick online booking.',
      features: ['Каталог чотирьох beauty-напрямів і signature-блок', 'П’ять локацій із графіком та переходами до карт', 'Динамічні вільні слоти для вибраної дати й салону', 'Валідація, захист від подвійного запису та номер підтвердження'],
      featuresEn: ['Four service directions and a signature colour story', 'Five locations with hours and map links', 'Dynamic available slots by date and location', 'Validation, duplicate-booking protection and confirmation IDs'],
      tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Native HTTP API', 'JSON storage', 'Crypto booking ID'],
      role: 'Art direction · UX/UI · Development', year: '2026'
    },
    tattoo: {
      brief: 'Концепт сайту незалежної contemporary tattoo studio у Берліні. Акцент — на роботах майстрів, виборі власної візуальної мови та детальному брифі перед консультацією.',
      briefEn: 'A website concept for an independent contemporary tattoo studio in Berlin, focused on artist work, visual language and a detailed pre-consultation brief.',
      features: ['Editorial-галерея робіт без важких фільтрів', 'Напрями, профілі resident artists, процес і FAQ', 'Бриф зі стилем, майстром, розміщенням, розміром і датою', 'Перевірка слотів, серверна валідація та унікальний booking ID'],
      featuresEn: ['Editorial work gallery without heavy filtering', 'Styles, resident artists, process and FAQ', 'Brief covering style, artist, placement, size and date', 'Slot availability, server validation and unique booking IDs'],
      tech: ['Semantic HTML5', 'Responsive CSS', 'Vanilla JavaScript', 'Node.js 18+', 'Availability API', 'JSON storage', 'Form validation'],
      role: 'Strategy · UX/UI · Development', year: '2026'
    },
    forma17: {
      brief: 'Авторський концепт цифрового портфоліо для вигаданої незалежної креативної студії FORMA/17. Проєкт створено без реального клієнта чи комерційного брифу, щоб дослідити, як монохромна айдентика, редакційна композиція та motion можуть сформувати переконливий образ студії.',
      briefEn: 'A self-initiated digital portfolio concept for the fictional independent creative studio FORMA/17. Created without a real client or commercial brief, the project explores how monochrome identity, editorial composition and motion can build a convincing studio presence.',
      features: ['Радикальна чорно-біла система без акцентних кольорів', 'Модульна editorial-композиція з різними ритмами та масштабами типографіки', 'Повноекранні фото й відео як частина візуального наративу', 'Плавні появи, marquee-рух і мікровзаємодії, адаптовані для різних екранів'],
      featuresEn: ['A strict black-and-white system without accent colours', 'A modular editorial composition with varied typographic rhythm and scale', 'Full-screen photography and video used as part of the visual narrative', 'Smooth reveals, marquee motion and responsive micro-interactions'],
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Responsive CSS', 'HTML5 Video', 'GitHub Pages'],
      role: 'Concept · Art direction · UX/UI · Development · Motion', year: '2026'
    }
  };
  const getProjectPreset = project => {
    const signature = `${project.id || ''} ${project.name || ''} ${project.nameEn || ''} ${project.link || ''}`;
    if (/tattoo/i.test(signature)) return projectPresets.tattoo;
    if (/forma\s*\/?17/i.test(signature)) return projectPresets.forma17;
    if (/beauty|salon/i.test(signature)) return projectPresets.beauty;
    return { brief: project.desc || '', briefEn: project.descEn || project.desc || '', features: [], featuresEn: [], tech: String(project.stack || '').split(/[,·]/).map(item => item.trim()).filter(Boolean), role: project.stack || 'Design · Development', year: '2026' };
  };
  const withProjectDetails = project => {
    const preset = getProjectPreset(project);
    return {
      ...project,
      brief: project.brief || preset.brief,
      briefEn: project.briefEn || preset.briefEn,
      features: Array.isArray(project.features) && project.features.length ? project.features : preset.features,
      featuresEn: Array.isArray(project.featuresEn) && project.featuresEn.length ? project.featuresEn : preset.featuresEn,
      tech: Array.isArray(project.tech) && project.tech.length ? project.tech : preset.tech,
      role: project.role || preset.role,
      year: project.year || preset.year
    };
  };
  const defaultProjects = [
    withProjectDetails({ id: 'salon_beauty', name: 'Beauty Space / Concept', nameEn: 'Beauty Space / Concept', desc: 'Концепт преміального сайту для beauty-простору.', descEn: 'Premium beauty space website concept.', stack: 'Art direction, UX/UI, Development', link: 'https://vitthegrandfather.github.io/salon/', image: 'images/projects/beauty-y2k-v2.webp' }),
    withProjectDetails({ id: 'salon_tattoo', name: 'Tattoo Studio / Concept', nameEn: 'Tattoo Studio / Concept', desc: 'Концепт сайту сучасної тату-студії.', descEn: 'Contemporary tattoo studio website concept.', stack: 'Strategy, UX/UI, Development', link: 'https://vitthegrandfather.github.io/tattoosalondemo/', image: 'images/projects/tattoo-y2k-v2.webp' })
  ];
  if (!getData('witer_seeded_projects', false)) {
    if (!getData('witer_projects', []).length) setData('witer_projects', defaultProjects);
    setData('witer_seeded_projects', true, false);
  }
  if (!getData('witer_concept_names_migrated', false)) {
    const conceptMap = Object.fromEntries(defaultProjects.map(project => [project.id, project]));
    const migrated = getData('witer_projects', []).map(project => conceptMap[project.id] ? { ...conceptMap[project.id], ...project } : project);
    setData('witer_projects', migrated);
    setData('witer_concept_names_migrated', true, false);
  }
  const projectsBeforeDetailsMigration = getData('witer_projects', []);
  const projectsWithDetails = projectsBeforeDetailsMigration.map(withProjectDetails);
  if (JSON.stringify(projectsWithDetails) !== JSON.stringify(projectsBeforeDetailsMigration)) setData('witer_projects', projectsWithDetails);
  if (!getData('witer_y2k_covers_migrated', false)) {
    const coverMap = { salon_beauty: 'images/projects/beauty-y2k-v2.webp', salon_tattoo: 'images/projects/tattoo-y2k-v2.webp' };
    const legacyCover = /(?:^|\/)(?:your-salon|tattoo-salon)\.jpg$/i;
    const migrated = getData('witer_projects', []).map(project => coverMap[project.id] && legacyCover.test(project.image || '') ? { ...project, image: coverMap[project.id] } : project);
    setData('witer_projects', migrated);
    setData('witer_y2k_covers_migrated', true, false);
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
  const projectTextFields = ['projName','projNameEn','projDesc','projDescEn','projBrief','projBriefEn','projFeatures','projFeaturesEn','projTech','projStack','projLink','projRole','projYear','projEditId'];
  const splitProjectLines = value => value.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
  const splitProjectTech = value => value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
  function resetProjectForm() { editingProjectId = null; $('#projectFormTitle').textContent = 'Новий проєкт'; projectTextFields.forEach(id => $(`#${id}`).value = ''); $('#projYear').value = String(new Date().getFullYear()); $('#projImage').value = ''; $('#projImagePreview').src = ''; $('#projImagePreview').classList.remove('has-image'); }
  function openProjectForm() { $('#projectForm').hidden = false; document.body.style.overflow = 'hidden'; setTimeout(() => $('#projName').focus(), 50); }
  function closeProjectForm() { $('#projectForm').hidden = true; document.body.style.overflow = ''; }
  $('#addProject').addEventListener('click', () => { resetProjectForm(); openProjectForm(); }); $('#cancelProject').addEventListener('click', closeProjectForm);
  $('#projectForm').addEventListener('click', event => { if (event.target === $('#projectForm')) closeProjectForm(); });
  $('#projImage').addEventListener('change', async event => { const file = event.target.files[0]; if (!file) return; if (file.size > 8 * 1024 * 1024) return showToast('Зображення завелике. Максимум 8 MB.', true); const preview = $('#projImagePreview'); preview.src = await optimizeImage(file); preview.classList.add('has-image'); });
  async function optimizeImage(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onerror = reject; reader.onload = () => { const image = new Image(); image.onerror = reject; image.onload = () => { const max = 1400, scale = Math.min(1, max / image.width); const canvas = document.createElement('canvas'); canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale); canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height); resolve(canvas.toDataURL('image/jpeg', .82)); }; image.src = reader.result; }; reader.readAsDataURL(file); }); }
  $('#saveProject').addEventListener('click', () => {
    const name = $('#projName').value.trim(); if (!name) return showToast('Додайте назву проєкту.', true);
    let projects = getData('witer_projects', []); const existing = projects.find(project => project.id === editingProjectId);
    const project = { id: editingProjectId || `project_${Date.now()}`, name, nameEn: $('#projNameEn').value.trim(), desc: $('#projDesc').value.trim(), descEn: $('#projDescEn').value.trim(), brief: $('#projBrief').value.trim(), briefEn: $('#projBriefEn').value.trim(), features: splitProjectLines($('#projFeatures').value), featuresEn: splitProjectLines($('#projFeaturesEn').value), tech: splitProjectTech($('#projTech').value), stack: $('#projStack').value.trim(), link: $('#projLink').value.trim(), role: $('#projRole').value.trim(), year: $('#projYear').value.trim(), image: $('#projImagePreview').classList.contains('has-image') ? $('#projImagePreview').src : (existing?.image || '') };
    projects = editingProjectId ? projects.map(item => item.id === editingProjectId ? project : item) : [...projects, project]; setData('witer_projects', projects); closeProjectForm(); loadProjects(); loadDashboard(); showToast(editingProjectId ? 'Проєкт оновлено.' : 'Проєкт додано.');
  });
  function editProject(id) { const project = withProjectDetails(getData('witer_projects', []).find(item => item.id === id) || {}); if (!project.id) return; editingProjectId = id; $('#projectFormTitle').textContent = 'Редагувати проєкт'; $('#projName').value = project.name || ''; $('#projNameEn').value = project.nameEn || ''; $('#projDesc').value = project.desc || ''; $('#projDescEn').value = project.descEn || ''; $('#projBrief').value = project.brief || ''; $('#projBriefEn').value = project.briefEn || ''; $('#projFeatures').value = (project.features || []).join('\n'); $('#projFeaturesEn').value = (project.featuresEn || []).join('\n'); $('#projTech').value = (project.tech || []).join('\n'); $('#projStack').value = project.stack || ''; $('#projLink').value = project.link || ''; $('#projRole').value = project.role || ''; $('#projYear').value = project.year || ''; $('#projEditId').value = id; const preview = $('#projImagePreview'); preview.src = project.image || ''; preview.classList.toggle('has-image', Boolean(project.image)); openProjectForm(); }
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
