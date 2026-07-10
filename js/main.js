const CONTACTS = {
    email: 'studiowiter@outlook.com',
    linkedin: 'https://www.linkedin.com/in/vitalii-chursanov/',
    instagram: 'https://www.instagram.com/vitthegrandfather'
};

// Translations
const translations = {
    uk: {
        nav_project: 'Проєкт',
        nav_about: 'Про мене',
        nav_process: 'Процес',
        nav_projects: 'Роботи',
        nav_services: 'Послуги',
        nav_faq: 'FAQ',
        nav_tech: 'Технології',
        nav_contact: 'Контакти',
        project_greeting: 'Ласкаво просимо до',
        project_subtitle: 'Digital Studio',
        project_description: 'Створюємо сучасні веб-рішення, які допомагають бізнесу рости в цифровому світі. Чистий код, продуманий дизайн, реальні результати.',
        project_btn: 'Послуги',
        project_btn_contact: "Зв'язатися",
        scroll_text: 'Прокрутіть',
        stat_online: 'Працюємо',
        stat_stages: 'Етапи роботи',
        stat_stages_suffix: '',
        stat_support: 'Безкоштовна підтримка',
        stat_support_suffix: ' міс.',
        stat_responsive: 'Адаптивність',
        about_title: 'Про мене',
        about_p1: 'Привіт! Я <strong>Віталій</strong>, засновник WITER.',
        about_p2: 'Живу в Києві. Постійно навчаюсь та розвиваюсь у веб-розробці. Чистий код, елегантний дизайн та інноваційні рішення — це те, що я ціную у своїй роботі.',
        about_p3: 'Моя місія — допомогти бізнесу рости в цифровому світі через якісні веб-рішення.',
        process_title: 'Як я працюю',
        process_1_title: 'Бриф',
        process_1_desc: 'Аналізую ваші потреби, цілі та аудиторію. Визначаю стратегію та структуру проєкту.',
        process_2_title: 'Візуалізація',
        process_2_desc: 'Створюю референси та концепцію дизайну на основі ваших побажань. Затверджуємо напрямок перед початком розробки.',
        process_3_title: 'Розробка',
        process_3_desc: 'Верстаю та програмую сайт. Чистий код, швидке завантаження, адаптивність.',
        process_4_title: 'Запуск',
        process_4_desc: 'Налаштовую хостинг, домен та аналітику. Сайт готовий до роботи!',
        projects_title: 'Роботи',
        faq_title: 'Часті запитання',
        faq_1_q: 'Скільки коштує розробка сайту?',
        faq_1_a: 'Вартість залежить від складності проєкту. Зверніться до мене — зроблю безкоштовну оцінку після брифу.',
        faq_2_q: 'Скільки часу займає розробка сайту?',
        faq_2_a: 'Лендінг — 3-5 днів, корпоративний сайт — 1-2 тижні. Залежить від обсягу та швидкості узгоджень.',
        faq_3_q: 'Скільки коштує Telegram бот?',
        faq_3_a: 'Вартість залежить від функціоналу. Зверніться — оціню безкоштовно після опису завдання.',
        faq_4_q: 'Скільки займає розробка бота?',
        faq_4_a: 'Простий — 2-5 днів, складний з інтеграціями — 1-2 тижні. Терміни обговорюємо індивідуально.',
        faq_5_q: 'Як проходить оплата?',
        faq_5_a: '50% передоплата, 50% після завершення. Приймаю переказ, картку або крипту.',
        faq_6_q: 'Що потрібно для початку?',
        faq_6_a: 'Опишіть ідею або задачу. Я допоможу з ТЗ, зроблю оцінку. Далі — передоплата і старт.',
        faq_7_q: 'Які матеріали потрібні?',
        faq_7_a: 'Тексти, фото, логотип, список послуг, ціни. Якщо чогось немає — допоможу або використаємо заглушки.',
        faq_8_q: 'Чи можна внести правки?',
        faq_8_a: 'Так. Дрібні правки (тексти, кольори) — входять. Суттєві зміни — обговорюємо окремо.',
        faq_9_q: 'Як відбувається зв\'язок?',
        faq_9_a: 'Через Telegram або email. Надсилаю скріншоти готових етапів, ви коментуєте, ми правимо.',
        faq_10_q: 'Що може Telegram бот?',
        faq_10_a: 'Замовлення, оплата, розсилки, CRM, Google Таблиці, міні-апи — майже все, що можна автоматизувати.',
        faq_11_q: 'Чи працюєте з готовим дизайном?',
        faq_11_a: 'Так. Верстаю з Figma або PSD. Якщо немає — пропоную свою концепцію.',
        faq_12_q: 'Що входить у SEO-оптимізацію?',
        faq_12_a: 'Мета-теги, заголовки, alt-теги, швидке завантаження, адаптивність, чисті URL — база для Google.',
        faq_13_q: 'Чи можна розширити функціонал?',
        faq_13_a: 'Так. Код чистий та масштабований. Додаємо нові фічі, сторінки, інтеграції без проблем.',
        faq_14_q: 'Чи надаєте підтримку?',
        faq_14_a: '1 місяць безкоштовно: баги, правки, консультації. Далі — індивідуально або за фактом.',
        faq_15_q: 'Чи є гарантія?',
        faq_15_a: 'Так. Місяць безкоштовної підтримки. Якщо щось не так — виправляю безкоштовно.',
        order_btn: 'Замовити',
        modal_title: 'Замовити послугу',
        svc_website_title: 'Корпоративний сайт',
        svc_website_desc: 'Багатосторінковий сайт з навігацією, системою керування контентом та повним функціоналом для вашого бізнесу. Ідеально для компаній, сервісів, агенцій.',
        svc_website_f1: '4-6 сторінок з навігацією',
        svc_website_f2: 'Адаптивний дизайн',
        svc_website_f3: 'Система керування контентом',
        svc_website_f4: 'Форми зворотнього зв\'язку',
        svc_website_f5: 'Інтеграція з Google Analytics',
        svc_website_f6: 'SEO-оптимізація всіх сторінок',
        svc_website_f7: 'Підтримка 1 місяць безкоштовно',
        svc_landing_title: 'Лендінг',
        svc_landing_desc: 'Односторінковий сайт, який ефективно представляє ваш бізнес та конвертує відвідувачів у клієнтів. Ідеально для візиток, портфоліо, презентації послуг.',
        svc_landing_f1: 'Адаптивний дизайн під всі пристрої',
        svc_landing_f2: 'Анімації та ефекти при скролі',
        svc_landing_f3: 'Базова SEO-оптимізація',
        svc_landing_f4: 'Форма зворотнього зв\'язку',
        svc_landing_f5: 'Інтеграція з аналітикою',
        svc_landing_f6: 'Підтримка 1 місяць безкоштовно',
        svc_bot_title: 'Telegram бот',
        svc_bot_desc: 'Функціональний бот для автоматизації бізнес-процесів, прийому замовлень, підтримки клієнтів або особистого використання.',
        svc_bot_f1: 'Команди, кнопки та меню',
        svc_bot_f2: 'Збереження даних у базу',
        svc_bot_f3: 'Інтеграція з Google Таблицями',
        svc_bot_f4: 'Оплата всередині бота',
        svc_bot_f5: 'Розсилки та сповіщення',
        svc_bot_f6: 'Підтримка 1 місяць безкоштовно',
        svc_api_title: 'Інтеграція API',
        svc_api_desc: 'З\'єднання вашого сайту або додатку із зовнішніми сервісами: платіжні системи, CRM, пошта, доставка, аналітика.',
        svc_api_f1: 'Інтеграція з будь-яким API',
        svc_api_f2: 'Автоматизація процесів',
        svc_api_f3: 'Синхронізація даних між сервісами',
        svc_api_f4: 'Обробка помилок',
        svc_api_f5: 'Документація',
        api_label_site: 'Сайт',
        api_label_api: 'API',
        api_label_service: 'Сервіс',
        svc_hosting_title: 'Налаштування хостингу',
        svc_hosting_desc: 'Повний цикл запуску: від реєстрації домену до робочого сайту з HTTPS та поштою.',
        svc_hosting_f1: 'Реєстрація та підключення домену',
        svc_hosting_f2: 'Налаштування хостингу',
        svc_hosting_f3: 'Встановлення SSL-сертифікату',
        svc_hosting_f4: 'Налаштування поштових скриньок',
        svc_hosting_f5: 'Деплой сайту на сервер',
        svc_support_title: 'Підтримка сайту',
        svc_support_desc: 'Постійний нагляд за вашим сайтом: оновлення, виправлення, бекапи, консультації. Ви звертаєтесь — я вирішую.',
        svc_support_f1: 'Оновлення контенту та текстів',
        svc_support_f2: 'Виправлення багів та помилок',
        svc_support_f3: 'Регулярні бекапи',
        svc_support_f4: 'Моніторинг безпеки',
        svc_support_f5: 'Технічні консультації',
        svc_support_f6: 'Оплата за фактом або пакетом',
        modal_title: 'Замовити послугу',
        reviews_title: 'Відгуки',
        reviews_empty: "Відгуки з'являться після перших замовлень. Слідкуйте за оновленнями!",
        contact_title: 'Контакти',
        contact_text: 'Маєте проєкт чи пропозицію? Напишіть мені!',
        form_name: "Ваше ім'я",
        form_name_label: "Ім'я",
        form_email: 'Ваш email',
        form_email_label: 'Email',
        form_message: 'Ваше повідомлення',
        form_message_label: 'Повідомлення',
        form_submit: 'Надіслати',
        footer_rights: 'Всі права захищені.',
        tech_title: 'Технології',
        tech_subtitle: 'Інструменти, з якими я працюю',
    },
    en: {
        nav_project: 'Project',
        nav_about: 'About',
        nav_process: 'Process',
        nav_projects: 'Works',
        nav_services: 'Services',
        nav_faq: 'FAQ',
        nav_tech: 'Tech',
        nav_contact: 'Contact',
        project_greeting: 'Welcome to',
        project_subtitle: 'Digital Studio',
        project_description: 'We create modern web solutions that help businesses grow in the digital world. Clean code, thoughtful design, real results.',
        project_btn: 'Services',
        project_btn_contact: 'Contact Me',
        scroll_text: 'Scroll',
        stat_online: 'Available',
        stat_stages: 'Work Stages',
        stat_stages_suffix: '',
        stat_support: 'Free Support',
        stat_support_suffix: ' mo.',
        stat_responsive: 'Responsive Design',
        about_title: 'About Me',
        about_p1: "Hi! I'm <strong>Vitalii</strong>, founder of WITER.",
        about_p2: "Based in Kyiv. Constantly learning and growing in web development. Clean code, elegant design, and innovative solutions are what I value in my work.",
        about_p3: 'My mission is to help businesses grow in the digital world through quality web solutions.',
        process_title: 'How I Work',
        process_1_title: 'Brief',
        process_1_desc: 'I analyze your needs, goals, and audience. Define the strategy and project structure.',
        process_2_title: 'Visualization',
        process_2_desc: 'I create references and a design concept based on your preferences. We approve the direction before development begins.',
        process_3_title: 'Development',
        process_3_desc: 'I build and code the website. Clean code, fast loading, responsive design.',
        process_4_title: 'Launch',
        process_4_desc: 'I set up hosting, domain, and analytics. The website is ready to work!',
        projects_title: 'Works',
        faq_title: 'FAQ',
        faq_1_q: 'How much does website development cost?',
        faq_1_a: 'The cost depends on project complexity. Contact me — I provide a free estimate after the brief.',
        faq_2_q: 'How long does website development take?',
        faq_2_a: 'Landing page — 3-5 days, corporate website — 1-2 weeks. Depends on scope and approval speed.',
        faq_3_q: 'How much does a Telegram bot cost?',
        faq_3_a: 'The cost depends on functionality. Contact me — I provide a free estimate after describing the task.',
        faq_4_q: 'How long does bot development take?',
        faq_4_a: 'Simple — 2-5 days, complex with integrations — 1-2 weeks. Timeline discussed individually.',
        faq_5_q: 'How does payment work?',
        faq_5_a: '50% prepayment, 50% upon completion. I accept bank transfer, card, or crypto.',
        faq_6_q: 'What do you need to get started?',
        faq_6_a: 'Describe your idea or task. I\'ll help with the brief, provide an estimate. Then — prepayment and we start.',
        faq_7_q: 'What materials do you need?',
        faq_7_a: 'Texts, photos, logo, list of services, prices. If something is missing — I\'ll help or use placeholders.',
        faq_8_q: 'Can I make changes during development?',
        faq_8_a: 'Yes. Minor changes (texts, colors) are included. Structural changes — discussed separately.',
        faq_9_q: 'How do we communicate?',
        faq_9_a: 'Via Telegram or email. I send screenshots of completed stages, you comment, we make changes.',
        faq_10_q: 'What can a Telegram bot do?',
        faq_10_a: 'Orders, payments, mass messaging, CRM, Google Sheets, mini-apps — almost anything that can be automated.',
        faq_11_q: 'Do you work with ready-made designs?',
        faq_11_a: 'Yes. I code from Figma or PSD. If you don\'t have one — I offer my own concept.',
        faq_12_q: 'What\'s included in SEO?',
        faq_12_a: 'Meta tags, headings, alt tags, fast loading, responsive design, clean URLs — the foundation for Google.',
        faq_13_q: 'Can I expand functionality later?',
        faq_13_a: 'Yes. Clean, scalable code. We add new features, pages, integrations without problems.',
        faq_14_q: 'Do you provide support?',
        faq_14_a: '1 month free: bugs, edits, consultations. After that — individually or on request.',
        faq_15_q: 'Is there a warranty?',
        faq_15_a: 'Yes. One month of free support. If something is wrong — I fix it for free.',
        order_btn: 'Order',
        modal_title: 'Order a Service',
        svc_website_title: 'Corporate Website',
        svc_website_desc: 'Multi-page website with navigation, content management system, and full functionality for your business. Perfect for companies, services, and agencies.',
        svc_website_f1: '4-6 pages with navigation',
        svc_website_f2: 'Responsive design',
        svc_website_f3: 'Content management system',
        svc_website_f4: 'Contact forms',
        svc_website_f5: 'Google Analytics integration',
        svc_website_f6: 'SEO optimization for all pages',
        svc_website_f7: '1 month free support',
        svc_landing_title: 'Landing Page',
        svc_landing_desc: 'Single-page website that effectively presents your business and converts visitors into customers. Perfect for business cards, portfolios, and service presentations.',
        svc_landing_f1: 'Responsive design for all devices',
        svc_landing_f2: 'Animations and scroll effects',
        svc_landing_f3: 'Basic SEO optimization',
        svc_landing_f4: 'Contact form',
        svc_landing_f5: 'Analytics integration',
        svc_landing_f6: '1 month free support',
        svc_bot_title: 'Telegram Bot',
        svc_bot_desc: 'Functional bot for automating business processes, accepting orders, customer support, or personal use.',
        svc_bot_f1: 'Commands, buttons, and menus',
        svc_bot_f2: 'Data storage to database',
        svc_bot_f3: 'Google Sheets integration',
        svc_bot_f4: 'In-bot payments',
        svc_bot_f5: 'Mass messaging and notifications',
        svc_bot_f6: '1 month free support',
        svc_api_title: 'API Integration',
        svc_api_desc: 'Connecting your website or app with external services: payment systems, CRM, email, delivery, analytics.',
        svc_api_f1: 'Integration with any API',
        svc_api_f2: 'Process automation',
        svc_api_f3: 'Data synchronization between services',
        svc_api_f4: 'Error handling',
        svc_api_f5: 'Documentation',
        api_label_site: 'Website',
        api_label_api: 'API',
        api_label_service: 'Service',
        svc_hosting_title: 'Hosting Setup',
        svc_hosting_desc: 'Full launch cycle: from domain registration to a working website with HTTPS and email.',
        svc_hosting_f1: 'Domain registration and connection',
        svc_hosting_f2: 'Hosting setup',
        svc_hosting_f3: 'SSL certificate installation',
        svc_hosting_f4: 'Email mailbox setup',
        svc_hosting_f5: 'Website deployment to server',
        svc_support_title: 'Website Support',
        svc_support_desc: 'Ongoing monitoring of your website: updates, fixes, backups, consultations. You reach out — I solve.',
        svc_support_f1: 'Content and text updates',
        svc_support_f2: 'Bug and error fixes',
        svc_support_f3: 'Regular backups',
        svc_support_f4: 'Security monitoring',
        svc_support_f5: 'Technical consultations',
        svc_support_f6: 'Pay per request or package',
        modal_title: 'Order a Service',
        reviews_title: 'Reviews',
        reviews_empty: 'Reviews will appear after the first orders. Stay tuned!',
        contact_title: 'Contact',
        contact_text: 'Have a project or proposal? Send me a message!',
        form_name: 'Your Name',
        form_name_label: 'Name',
        form_email: 'Your Email',
        form_email_label: 'Email',
        form_message: 'Your Message',
        form_message_label: 'Message',
        form_submit: 'Send Message',
        footer_rights: 'All rights reserved.',
        tech_title: 'Technologies',
        tech_subtitle: 'Tools I work with'
    }
};

let currentLang = localStorage.getItem('lang') || 'uk';

function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-suffix]').forEach(el => {
        const key = el.getAttribute('data-i18n-suffix');
        if (translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    loadCustomTexts();
    loadSiteProjects();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => translatePage(btn.dataset.lang));
});

translatePage(currentLang);

// Init EmailJS
try { emailjs.init('A7LAjoCMlfBRyssBZ'); } catch (e) { console.warn('EmailJS not loaded'); }

// Load custom texts from admin
function loadCustomTexts() {
    try {
        const texts = JSON.parse(localStorage.getItem('witer_texts')) || {};
        const isEn = currentLang === 'en';

        if (isEn ? texts.hero_brand_en : texts.hero_brand) {
            const el = document.querySelector('.hero__brand');
            if (el) el.textContent = isEn ? texts.hero_brand_en : texts.hero_brand;
        }
        if (isEn ? texts.hero_subtitle_en : texts.hero_subtitle) {
            const el = document.querySelector('.hero__subtitle');
            if (el) el.textContent = isEn ? texts.hero_subtitle_en : texts.hero_subtitle;
        }
        if (isEn ? texts.hero_desc_en : texts.hero_desc) {
            const el = document.querySelector('.hero__description');
            if (el) el.textContent = isEn ? texts.hero_desc_en : texts.hero_desc;
        }
        if (isEn ? texts.about_1_en : texts.about_1) {
            const el = document.querySelector('[data-i18n="about_p1"]');
            if (el) el.innerHTML = isEn ? texts.about_1_en : texts.about_1;
        }
        if (isEn ? texts.about_2_en : texts.about_2) {
            const el = document.querySelector('[data-i18n="about_p2"]');
            if (el) el.innerHTML = isEn ? texts.about_2_en : texts.about_2;
        }
        if (isEn ? texts.about_3_en : texts.about_3) {
            const el = document.querySelector('[data-i18n="about_p3"]');
            if (el) el.innerHTML = isEn ? texts.about_3_en : texts.about_3;
        }
    } catch {}
}
loadCustomTexts();

// Load projects from admin
function loadSiteProjects() {
    const projects = JSON.parse(localStorage.getItem('witer_projects')) || [];
    const section = document.getElementById('projects');
    const grid = document.getElementById('projectsGrid');
    const navLink = document.querySelector('.nav__link[href="#projects"]');

    if (projects.length === 0) {
        if (section) section.style.display = 'none';
        if (navLink) navLink.parentElement.style.display = 'none';
        return;
    }

    if (section) section.style.display = '';
    if (navLink) navLink.parentElement.style.display = '';
    if (!grid) return;

    const isEn = currentLang === 'en';

    grid.innerHTML = projects.map(p => {
        const name = isEn ? (p.nameEn || p.name) : p.name;
        const desc = isEn ? (p.descEn || p.desc) : p.desc;
        const tags = p.stack ? p.stack.split(',').map(s => `<span class="project-card__tag">${s.trim()}</span>`).join('') : '';
        const img = p.image ? `<img class="project-card__img" src="${p.image}" alt="${esc(name)}" loading="lazy">` : '';
        const link = p.link ? `<a class="project-card__link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">→ ${isEn ? 'View' : 'Переглянути'}</a>` : '';

        return `<div class="project-card glass">
            ${img}
            <div class="project-card__info">
                <h3 class="project-card__name">${esc(name)}</h3>
                <p class="project-card__desc">${esc(desc)}</p>
                <div class="project-card__stack">${tags}</div>
                ${link}
            </div>
        </div>`;
    }).join('');
}

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

loadSiteProjects();

// Mobile Menu
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Mobile dropdown toggle
document.querySelectorAll('.nav__dropdown > .nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            link.parentElement.classList.toggle('open');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Scroll effects
const scrollTopBtn = document.getElementById('scrollTop');
const scrollIndicator = document.querySelector('.hero__scroll');

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    scrollTopBtn.classList.toggle('visible', y > 500);
    if (scrollIndicator) {
        scrollIndicator.classList.toggle('hidden', y > 50);
    }
    const shift = y > 500;
    document.querySelector('.chat-btn')?.classList.toggle('shifted', shift);
    document.querySelector('.email-fab-wrap')?.classList.toggle('shifted', shift);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${id}"]`);
        if (!link) return;

        const isLast = section === sections[sections.length - 1];
        const atBottom = scrollY + windowH >= docH - 10;

        if (isLast && atBottom) {
            link.classList.add('active');
        } else {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});
// Фолбек: якщо load не спрацював через CDN
setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
}, 4000);

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('witer_theme') || 'dark';
if (savedTheme === 'light') document.body.classList.add('light');

function updateLogos() {
    const isLight = document.body.classList.contains('light');
    const logoSrc = isLight ? 'logo-light.png' : 'logo-dark.png';
    document.getElementById('preloaderLogo')?.setAttribute('src', logoSrc);
    document.getElementById('navLogo')?.setAttribute('src', logoSrc);
    document.getElementById('footerLogo')?.setAttribute('src', logoSrc);
}
updateLogos();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('witer_theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateLogos();
});

// Order Modal
const orderModal = document.getElementById('orderModal');
const modalService = document.getElementById('modalService');

document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.closest('.service__info');
        const title = section ? section.querySelector('.service__title') : null;
        const service = title ? title.textContent : btn.dataset.service;
        modalService.textContent = service;
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelector('.modal__close').addEventListener('click', () => {
    orderModal.classList.remove('active');
    document.body.style.overflow = '';
});

document.querySelector('.modal__overlay').addEventListener('click', () => {
    orderModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Order Form
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get('website')) return;

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const service = modalService.textContent;

    if (!name.trim() || !email.trim() || !message.trim()) {
        showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Заповніть всі поля' : 'Fill in all fields', true);
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Введіть коректний email' : 'Enter valid email', true);
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'uk' ? 'Надсилається...' : 'Sending...';
    btn.disabled = true;

    if (typeof emailjs === 'undefined' || !emailjs.send) {
        showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Поштовий сервіс недоступний. Напишіть напряму.' : 'Email service unavailable. Contact directly.', true);
        btn.textContent = originalText;
        btn.disabled = false;
        return;
    }

    emailjs.send('service_d7tqqgk', 'template_28d99r7', {
        from_name: name,
        from_email: email,
        message: `[${service}] ${message}`
    })
    .then(() => {
        try {
            const messages = JSON.parse(localStorage.getItem('witer_messages')) || [];
            messages.push({ name, email, message: `[${service}] ${message}`, date: new Date().toLocaleDateString('uk-UA') });
            localStorage.setItem('witer_messages', JSON.stringify(messages));
        } catch {}
        showToast(currentLang === 'uk' ? 'Дякую!' : 'Thank you!', currentLang === 'uk' ? `${name}, заявку надіслано!` : `${name}, order sent!`);
        form.reset();
        orderModal.classList.remove('active');
        document.body.style.overflow = '';
        btn.textContent = originalText;
        btn.disabled = false;
    })
    .catch(() => {
        showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Помилка. Спробуйте ще раз.' : 'Error. Try again.', true);
        btn.textContent = originalText;
        btn.disabled = false;
    });
});

// Toast notification
function showToast(title, text, isError = false) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastText = document.getElementById('toastText');

    toastTitle.textContent = title;
    toastText.textContent = text;
    toast.classList.toggle('toast--error', isError);
    toast.classList.add('show');

    const hide = () => toast.classList.remove('show');
    document.getElementById('toastClose').onclick = hide;
    setTimeout(hide, 4000);
}

// Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get('website')) return;

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.remove());

    let hasError = false;

    function showError(field, msg) {
        const group = field.closest('.form-group');
        group.classList.add('error');
        const err = document.createElement('span');
        err.className = 'form-error';
        err.textContent = msg;
        group.appendChild(err);
        hasError = true;
    }

    if (!name.trim()) {
        showError(form.querySelector('#name'), currentLang === 'uk' ? "Введіть ім'я" : 'Enter your name');
    }

    if (!email.trim()) {
        showError(form.querySelector('#email'), currentLang === 'uk' ? 'Введіть email' : 'Enter your email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(form.querySelector('#email'), currentLang === 'uk' ? 'Введіть коректний email' : 'Enter a valid email');
    }

    if (!message.trim()) {
        showError(form.querySelector('#message'), currentLang === 'uk' ? 'Введіть повідомлення' : 'Enter your message');
    }

    if (hasError) return;

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'uk' ? 'Надсилається...' : 'Sending...';
    btn.disabled = true;

    const SERVICE_ID = 'service_d7tqqgk';
    const TEMPLATE_ID = 'template_28d99r7';

    if (typeof emailjs === 'undefined' || !emailjs.send) {
        showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Поштовий сервіс недоступний. Напишіть напряму.' : 'Email service unavailable. Contact directly.', true);
        btn.textContent = originalText;
        btn.disabled = false;
        return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => {
        // Save to localStorage for admin panel
        try {
            const messages = JSON.parse(localStorage.getItem('witer_messages')) || [];
            messages.push({
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleDateString('uk-UA')
            });
            localStorage.setItem('witer_messages', JSON.stringify(messages));
        } catch {}

        showToast(
            currentLang === 'uk' ? 'Дякую!' : 'Thank you!',
            currentLang === 'uk'
                ? `${name}, ваше повідомлення надіслано. Я зв'яжуся з вами найближчим часом.`
                : `${name}, your message has been sent. I'll get back to you soon.`
        );
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    })
    .catch((err) => {
        console.error('EmailJS error:', err);
        showToast(
            currentLang === 'uk' ? 'Помилка' : 'Error',
            currentLang === 'uk'
                ? 'Сталася помилка. Спробуйте ще раз або напишіть мені напряму.'
                : 'Something went wrong. Please try again or contact me directly.',
            true
        );
        btn.textContent = originalText;
        btn.disabled = false;
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Carousel
const carousel = document.querySelector('.about__carousel');
if (carousel) {
    const slides = carousel.querySelectorAll('.carousel__slide');
    const dots = carousel.querySelectorAll('.carousel__dot');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    let current = 0;
    let startX = 0;
    let isDragging = false;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
    });

    // Swipe support
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goTo(current + 1);
            else goTo(current - 1);
        }
    }, { passive: true });

    // Mouse drag support
    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();
    });

    carousel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goTo(current + 1);
            else goTo(current - 1);
        }
    });

    carousel.addEventListener('mouseleave', () => { isDragging = false; });

    let autoPlay = setInterval(() => goTo(current + 1), 4000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => goTo(current + 1), 4000);
    });
}

// ==================== GSAP + ScrollTrigger ====================
try {
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
gsap.registerPlugin(ScrollTrigger);

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-card__number');

statNumbers.forEach(num => {
    const target = parseInt(num.getAttribute('data-target'));
    if (isNaN(target)) return;

    ScrollTrigger.create({
        trigger: num,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(num, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    });
});

// Fade in sections
gsap.utils.toArray('.section__title').forEach(el => {
    gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

// Stagger cards
gsap.utils.toArray('.stat-card, .process-card').forEach((card, i) => {
    gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i % 4 * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

// About content
gsap.from('.about__content', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.about__content',
        start: 'top 85%',
        toggleActions: 'play none none none'
    }
});

// FAQ items
gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.from(item, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

// Contact content
gsap.from('.contact__content', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.contact__content',
        start: 'top 85%',
        toggleActions: 'play none none none'
    }
});

// Tech cards
gsap.utils.toArray('.tech-card').forEach((card, i) => {
    gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: i % 4 * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

// Service sections
gsap.utils.toArray('.service__content').forEach(content => {
    gsap.from(content, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

// Перезапуск ScrollTrigger після ініціалізації
setTimeout(() => ScrollTrigger.refresh(), 100);

// Scroll top button animation
const scrollTopBtnEl = document.getElementById('scrollTop');
if (scrollTopBtnEl) {
    scrollTopBtnEl.addEventListener('mouseenter', () => {
        gsap.to(scrollTopBtnEl, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
    });
    scrollTopBtnEl.addEventListener('mouseleave', () => {
        gsap.to(scrollTopBtnEl, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
}
} // end GSAP check
} catch (e) { console.warn('GSAP error:', e); }

// ==================== EMAIL FULLSCREEN FORM ====================
const emailFab = document.getElementById('emailFab');
const emailDropdown = document.getElementById('emailDropdown');
const emailDropdownClose = document.getElementById('emailDropdownClose');

if (emailFab && emailDropdown) {
    emailFab.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        emailDropdown.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeEmailDropdown() {
        emailDropdown.classList.remove('active');
        document.body.style.overflow = '';
    }

    emailDropdownClose.addEventListener('click', closeEmailDropdown);

    emailDropdown.addEventListener('click', (e) => {
        if (e.target === emailDropdown) closeEmailDropdown();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emailDropdown.classList.contains('active')) {
            closeEmailDropdown();
        }
    });

    // Dropdown form submit
    document.getElementById('emailDropdownForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;

        // Honeypot check
        if (form.querySelector('input[name="website"]')?.value) return;

        const name = form.querySelector('#edName').value.trim();
        const email = form.querySelector('#edEmail').value.trim();
        const message = form.querySelector('#edMessage').value.trim();

        if (!name || !email || !message) {
            showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Заповніть всі поля' : 'Fill in all fields', true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Введіть коректний email' : 'Enter valid email', true);
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = currentLang === 'uk' ? 'Надсилається...' : 'Sending...';
        btn.disabled = true;

        if (typeof emailjs === 'undefined' || !emailjs.send) {
            showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Поштовий сервіс недоступний. Напишіть напряму.' : 'Email service unavailable. Contact directly.', true);
            btn.textContent = orig;
            btn.disabled = false;
            return;
        }

        emailjs.send('service_d7tqqgk', 'template_28d99r7', {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(() => {
            try {
                const msgs = JSON.parse(localStorage.getItem('witer_messages')) || [];
                msgs.push({ name, email, message, date: new Date().toLocaleDateString('uk-UA') });
                localStorage.setItem('witer_messages', JSON.stringify(msgs));
            } catch {}
            showToast(
                currentLang === 'uk' ? 'Дякую!' : 'Thank you!',
                currentLang === 'uk' ? `${name}, повідомлення надіслано!` : `${name}, message sent!`
            );
            form.reset();
            closeEmailDropdown();
            btn.textContent = orig;
            btn.disabled = false;
        })
        .catch(() => {
            showToast(currentLang === 'uk' ? 'Помилка' : 'Error', currentLang === 'uk' ? 'Спробуйте ще раз' : 'Try again', true);
            btn.textContent = orig;
            btn.disabled = false;
        });
    });
}

// ==================== TECH MODAL ====================
(function initTechModal() {
    const techData = {
        html5: {
            title: 'HTML5',
            uk: { desc: 'Мова розмітки контенту для створення структури веб-сторінок. Це основа будь-якого сайту — без неї не існує жодної веб-сторінки.', uses: ['Семантична розмітка сторінок', 'Форми та валідація введення', 'Вбудоване відео та аудіо', 'Canvas для графіки', 'Семантичні теги (header, nav, section)'] },
            en: { desc: 'A markup language for creating web page structure. It is the foundation of every website — no web page exists without it.', uses: ['Semantic page markup', 'Forms and input validation', 'Embedded video and audio', 'Canvas for graphics', 'Semantic tags (header, nav, section)'] }
        },
        css3: {
            title: 'CSS3',
            uk: { desc: 'Мова стилів, яка відповідає за зовнішній вигляд сайту: кольори, шрифти, анімації, адаптивність під різні пристрої.', uses: ['Адаптивний дизайн (responsive)', 'Flexbox та CSS Grid', 'Анімації та переходи', 'Glassmorphism та сучасні ефекти', 'CSS-змінні (custom properties)'] },
            en: { desc: 'A styling language responsible for the website appearance: colors, fonts, animations, responsiveness across devices.', uses: ['Responsive design', 'Flexbox and CSS Grid', 'Animations and transitions', 'Glassmorphism and modern effects', 'CSS custom properties'] }
        },
        js: {
            title: 'JavaScript',
            uk: { desc: 'Мова програмування, яка робить сайт інтерактивним: кнопки, форми, анімації, завантаження даних, робота з API.', uses: ['DOM-манипуляції та анімації', 'Робота з API (fetch, axios)', 'Обробка подій та форм', 'LocalStorage та кешування', 'GSAP та ScrollTrigger'] },
            en: { desc: 'A programming language that makes websites interactive: buttons, forms, animations, data loading, API interaction.', uses: ['DOM manipulation and animations', 'API interaction (fetch, axios)', 'Event and form handling', 'LocalStorage and caching', 'GSAP and ScrollTrigger'] }
        },
        react: {
            title: 'React',
            uk: { desc: 'Бібліотека для створення складних користувацьких інтерфейсів. Дозволяє будувати швидкі та масштабовані веб-додатки.', uses: ['Компонентна архітектура', 'Virtual DOM для швидкості', 'Роутинг між сторінками', 'Керування станом (State)', 'Інтеграція з API та бекендом'] },
            en: { desc: 'A library for building complex user interfaces. Enables building fast and scalable web applications.', uses: ['Component architecture', 'Virtual DOM for speed', 'Page routing', 'State management', 'API and backend integration'] }
        },
        node: {
            title: 'Node.js',
            uk: { desc: 'Середовище виконання JavaScript на сервері. Дозволяє створювати бекенд, API, бази даних та серверну логіку.', uses: ['REST API та GraphQL', 'Автентифікація користувачів', 'Робота з базами даних', 'Обробка файлів та зображень', 'WebSocket для реального часу'] },
            en: { desc: 'A JavaScript runtime environment on the server. Enables building backends, APIs, databases, and server logic.', uses: ['REST API and GraphQL', 'User authentication', 'Database operations', 'File and image processing', 'WebSocket for real-time'] }
        },
        telegram: {
            title: 'Telegram Bot API',
            uk: { desc: 'API для створення ботів у Telegram. Автоматизація бізнес-процесів, прийом замовлень, підтримка клієнтів 24/7.', uses: ['Команди та inline-кнопки', 'Оплата всередині бота', 'Інтеграція з базами даних', 'Розсилки та сповіщення', 'Mini Apps (веб-додатки в Telegram)'] },
            en: { desc: 'API for creating Telegram bots. Business process automation, order processing, 24/7 customer support.', uses: ['Commands and inline buttons', 'In-bot payments', 'Database integration', 'Mass messaging and notifications', 'Mini Apps (web apps in Telegram)'] }
        },
        git: {
            title: 'Git',
            uk: { desc: 'Система контролю версій коду. Дозволяє відстежувати зміни, працювати в команді та повертатися до попередніх версій проекту.', uses: ['Контроль версій коду', 'Гілки для паралельної роботи', 'GitHub / GitLab для зберігання', 'Code review та Pull Requests', 'Автоматичний деплой (CI/CD)'] },
            en: { desc: 'A code version control system. Enables tracking changes, working in teams, and reverting to previous project versions.', uses: ['Code version control', 'Branches for parallel work', 'GitHub / GitLab for storage', 'Code review and Pull Requests', 'Automated deployment (CI/CD)'] }
        },
        mongo: {
            title: 'MongoDB',
            uk: { desc: 'NoSQL база даних для зберігання інформації: користувачі, товари, замовлення, повідомлення. Гнучка та швидка.', uses: ['Зберігання даних користувачів', 'Каталоги товарів та послуг', 'Історія замовлень', 'Налаштування та конфігурації', 'Інтеграція з Node.js'] },
            en: { desc: 'A NoSQL database for storing information: users, products, orders, messages. Flexible and fast.', uses: ['User data storage', 'Product and service catalogs', 'Order history', 'Settings and configurations', 'Node.js integration'] }
        }
    };

    const modal = document.getElementById('techModal');
    const modalIcon = document.getElementById('techModalIcon');
    const modalTitle = document.getElementById('techModalTitle');
    const modalDesc = document.getElementById('techModalDesc');
    const modalList = document.getElementById('techModalList');

    document.querySelectorAll('.tech-card[data-tech]').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.dataset.tech;
            const data = techData[key];
            if (!data) return;

            modalIcon.innerHTML = card.querySelector('.tech-card__icon').innerHTML;
            modalTitle.textContent = data.title;
            const lang = data[currentLang] || data.uk;
            modalDesc.textContent = lang.desc;
            modalList.innerHTML = lang.uses.map(u => `<li>${u}</li>`).join('');

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeTechModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modal.querySelector('.tech-modal__close').addEventListener('click', closeTechModal);
    modal.querySelector('.tech-modal__overlay').addEventListener('click', closeTechModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeTechModal();
    });
})();
