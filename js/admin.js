// ==================== INIT ====================

// Simple hash for password storage (not cryptographic, but prevents plain-text in localStorage)
function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return 'h_' + Math.abs(h).toString(36);
}

function getData(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Init storage
if (!getData('witer_projects', null)) {
    setData('witer_projects', []);
}
if (!getData('witer_messages', null)) {
    setData('witer_messages', []);
}
if (!getData('witer_texts', null)) {
    setData('witer_texts', {});
}
if (!getData('witer_settings', null)) {
    setData('witer_settings', { email: '' });
}

// ==================== LOGIN ====================
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const setupScreen = document.getElementById('setupScreen');

// First-time setup: no password set yet → show setup form
if (!localStorage.getItem('witer_password')) {
    if (setupScreen) {
        loginScreen.style.display = 'none';
        setupScreen.style.display = 'flex';

        document.getElementById('setupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('setupPassword').value.trim();
            if (!pass || pass.length < 4) {
                showToast('Пароль має бути мінімум 4 символи', true);
                return;
            }
            setData('witer_password', hashStr(pass));
            setupScreen.style.display = 'none';
            loginScreen.style.display = 'flex';
            showToast('Пароль встановлено. Увійдіть.');
        });
    }
}

// Rate limit: max 5 attempts per 5 minutes
let loginAttempts = getData('witer_login_attempts', { count: 0, ts: 0 });
if (Date.now() - loginAttempts.ts > 300000) loginAttempts = { count: 0, ts: 0 };

// Check if already logged in
if (sessionStorage.getItem('witer_logged_in') === 'true') {
    loginScreen.style.display = 'none';
    if (setupScreen) setupScreen.style.display = 'none';
    dashboard.style.display = 'flex';
    loadDashboard();
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (loginAttempts.count >= 5) {
        showToast('Забагато спроб. Зачекайте 5 хвилин.', true);
        return;
    }
    const password = document.getElementById('loginPassword').value;
    const stored = getData('witer_password', '');

    if (stored && hashStr(password) === stored) {
        sessionStorage.setItem('witer_logged_in', 'true');
        loginScreen.style.display = 'none';
        dashboard.style.display = 'flex';
        loginAttempts = { count: 0, ts: 0 };
        setData('witer_login_attempts', loginAttempts);
        loadDashboard();
    } else {
        loginAttempts.count++;
        loginAttempts.ts = Date.now();
        setData('witer_login_attempts', loginAttempts);
        showToast('Невірний пароль', true);
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('witer_logged_in');
    location.reload();
});

// ==================== TABS ====================
document.querySelectorAll('.sidebar__link[data-tab]').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        link.classList.add('active');
        document.getElementById('tab-' + link.dataset.tab).classList.add('active');
    });
});

// ==================== DASHBOARD ====================
function loadDashboard() {
    // Stats
    document.getElementById('statVisits').textContent = getData('witer_visits', 0);
    const messages = getData('witer_messages', []);
    document.getElementById('statMessages').textContent = messages.length;
    document.getElementById('statProjects').textContent = getData('witer_projects', []).length;

    // Recent messages
    const recentDiv = document.getElementById('recentMessages');
    if (messages.length === 0) {
        recentDiv.innerHTML = '<p class="empty">Поки немає повідомлень</p>';
    } else {
        recentDiv.innerHTML = messages.slice(-3).reverse().map(m => `
            <div class="message-card" style="background:none;border:none;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <div class="message-card__info">
                    <p class="message-card__name">${esc(m.name)}</p>
                    <p class="message-card__text">${esc(m.message)}</p>
                </div>
                <span class="message-card__date">${m.date || ''}</span>
            </div>
        `).join('');
    }

    loadTexts();
    loadProjects();
    loadAllMessages();
    loadSettings();
}

// ==================== TEXTS ====================
function loadTexts() {
    const texts = getData('witer_texts', {});
    document.getElementById('text_hero_brand').value = texts.hero_brand || '';
    document.getElementById('text_hero_subtitle').value = texts.hero_subtitle || '';
    document.getElementById('text_hero_desc').value = texts.hero_desc || '';
    document.getElementById('text_about_1').value = texts.about_1 || '';
    document.getElementById('text_about_2').value = texts.about_2 || '';
    document.getElementById('text_about_3').value = texts.about_3 || '';
}

document.getElementById('saveTexts').addEventListener('click', () => {
    const texts = {
        hero_brand: document.getElementById('text_hero_brand').value,
        hero_subtitle: document.getElementById('text_hero_subtitle').value,
        hero_desc: document.getElementById('text_hero_desc').value,
        about_1: document.getElementById('text_about_1').value,
        about_2: document.getElementById('text_about_2').value,
        about_3: document.getElementById('text_about_3').value,
    };
    setData('witer_texts', texts);
    showToast('Тексти збережено');
});

// ==================== PROJECTS ====================
let editingProjectId = null;

function loadProjects() {
    const projects = getData('witer_projects', []);
    const list = document.getElementById('projectsList');

    if (projects.length === 0) {
        list.innerHTML = '<p class="empty">Проєктів поки немає</p>';
        return;
    }

    list.innerHTML = projects.map(p => `
        <div class="project-item">
            <div class="project-item__info">
                <p class="project-item__name">${esc(p.name)}</p>
                <p class="project-item__desc">${esc(p.desc)}</p>
            </div>
            <div class="project-item__actions">
                <button class="btn btn--outline btn--small" onclick="editProject('${p.id}')">Редагувати</button>
                <button class="btn btn--danger btn--small" onclick="deleteProject('${p.id}')">Видалити</button>
            </div>
        </div>
    `).join('');

    document.getElementById('statProjects').textContent = projects.length;
}

document.getElementById('addProject').addEventListener('click', () => {
    editingProjectId = null;
    document.getElementById('projectFormTitle').textContent = 'Новий проєкт';
    document.getElementById('projName').value = '';
    document.getElementById('projDesc').value = '';
    document.getElementById('projStack').value = '';
    document.getElementById('projLink').value = '';
    document.getElementById('projEditId').value = '';
    document.getElementById('projectForm').style.display = 'block';
});

document.getElementById('cancelProject').addEventListener('click', () => {
    document.getElementById('projectForm').style.display = 'none';
});

document.getElementById('saveProject').addEventListener('click', () => {
    const name = document.getElementById('projName').value.trim();
    const desc = document.getElementById('projDesc').value.trim();
    const stack = document.getElementById('projStack').value.trim();
    const link = document.getElementById('projLink').value.trim();

    if (!name) { showToast('Введіть назву проєкту', true); return; }

    let projects = getData('witer_projects', []);

    if (editingProjectId) {
        projects = projects.map(p => p.id === editingProjectId ? { ...p, name, desc, stack, link } : p);
    } else {
        projects.push({ id: 'proj_' + Date.now(), name, desc, stack, link });
    }

    setData('witer_projects', projects);
    const wasEditing = !!editingProjectId;
    editingProjectId = null;
    document.getElementById('projectForm').style.display = 'none';
    loadProjects();
    showToast(wasEditing ? 'Проєкт оновлено' : 'Проєкт додано');
});

window.editProject = function(id) {
    const projects = getData('witer_projects', []);
    const p = projects.find(x => x.id === id);
    if (!p) return;

    editingProjectId = id;
    document.getElementById('projectFormTitle').textContent = 'Редагувати проєкт';
    document.getElementById('projName').value = p.name;
    document.getElementById('projDesc').value = p.desc;
    document.getElementById('projStack').value = p.stack;
    document.getElementById('projLink').value = p.link || '';
    document.getElementById('projectForm').style.display = 'block';
};

window.deleteProject = function(id) {
    if (!confirm('Видалити проєкт?')) return;
    let projects = getData('witer_projects', []);
    projects = projects.filter(p => p.id !== id);
    setData('witer_projects', projects);
    loadProjects();
    showToast('Проєкт видалено');
};

// ==================== MESSAGES ====================
function loadAllMessages() {
    const messages = getData('witer_messages', []);
    const div = document.getElementById('allMessages');

    if (messages.length === 0) {
        div.innerHTML = '<p class="empty">Повідомлень поки немає</p>';
        return;
    }

    div.innerHTML = messages.slice().reverse().map((m, i) => `
        <div class="message-card glass">
            <div class="message-card__info">
                <p class="message-card__name">${esc(m.name)}</p>
                <p class="message-card__email">${esc(m.email)}</p>
                <p class="message-card__text">${esc(m.message)}</p>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
                <span class="message-card__date">${m.date || ''}</span>
                <button class="message-card__delete" onclick="deleteMessage(${messages.length - 1 - i})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>
    `).join('');
}

window.deleteMessage = function(index) {
    let messages = getData('witer_messages', []);
    messages.splice(index, 1);
    setData('witer_messages', messages);
    loadAllMessages();
    loadDashboard();
    showToast('Повідомлення видалено');
};

document.getElementById('clearMessages').addEventListener('click', () => {
    if (!confirm('Очистити всі повідомлення?')) return;
    setData('witer_messages', []);
    loadAllMessages();
    loadDashboard();
    showToast('Всі повідомлення очищено');
});

// ==================== SETTINGS ====================
function loadSettings() {
    const settings = getData('witer_settings', {});
    document.getElementById('settingsEmail').value = settings.email || '';
}

document.getElementById('saveSettings').addEventListener('click', () => {
    const newPass = document.getElementById('newPassword').value.trim();
    const email = document.getElementById('settingsEmail').value.trim();

    if (newPass) {
        setData('witer_password', hashStr(newPass));
        document.getElementById('newPassword').value = '';
    }

    const settings = getData('witer_settings', {});
    settings.email = email;
    setData('witer_settings', settings);

    showToast('Налаштування збережено');
});

// ==================== TOAST ====================
function showToast(text, isError = false) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    toast.style.borderColor = isError ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)';
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== UTILS ====================
function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
