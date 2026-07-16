const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const domain = 'https://witerstudio.online';
const updated = '2026-07-13';

const services = [
  {
    slug: 'web-design-development',
    uk: { title: 'Вебдизайн і розробка сайтів', meta: 'Преміальний вебдизайн і розробка адаптивних сайтів від WITER: UX/UI, артдирекшн, чистий код, SEO та аналітика для амбітних брендів.', intro: 'Створюємо виразні сайти, у яких стратегія, дизайн і технологія працюють як одна система.', label: 'Сайти та вебпродукти', cards: [['01 / DIRECTION','Стратегія та UX','Цілі, аудиторія, структура і прототип до першого пікселя.'],['02 / DESIGN','Виразний дизайн','Візуальна система з характером бренду, а не шаблонна оболонка.'],['03 / BUILD','Надійна розробка','Адаптивність, анімації, SEO, аналітика та оптимізація швидкості.']], detailTitle: 'Від першої ідеї до впевненого запуску.', detail: 'Лендінги, портфоліо та корпоративні сайти проєктуються навколо конкретної бізнес-мети. Ви отримуєте зрозумілий процес, узгоджену систему компонентів і продукт, який легко підтримувати після релізу.' },
    en: { title: 'Web Design & Development', meta: 'Premium web design and responsive website development by WITER: UX/UI, art direction, clean code, SEO and analytics for ambitious brands worldwide.', intro: 'We create distinctive websites where strategy, design and technology work as one coherent system.', label: 'Websites & digital products', cards: [['01 / DIRECTION','Strategy and UX','Goals, audience, structure and a clear prototype before visual production.'],['02 / DESIGN','Distinctive design','A visual system shaped around the brand instead of a generic template.'],['03 / BUILD','Reliable development','Responsive code, motion, SEO, analytics and performance optimization.']], detailTitle: 'From first idea to confident launch.', detail: 'Landing pages, portfolios and corporate websites are designed around a clear business goal. You receive a transparent process, a consistent component system and a product that remains maintainable after launch.' }
  },
  {
    slug: 'telegram-bot-development',
    uk: { title: 'Розробка Telegram-ботів', meta: 'Розробка Telegram-ботів і Mini Apps для замовлень, підтримки, оплат, сповіщень та автоматизації бізнес-процесів.', intro: 'Перетворюємо Telegram на зручний робочий інструмент для клієнтів, команди та щоденних операцій.', label: 'Telegram bots & Mini Apps', cards: [['01 / LOGIC','Бізнес-логіка','Сценарії замовлень, підтримки, записів і внутрішніх процесів.'],['02 / CONNECTIONS','Оплати та інтеграції','CRM, платіжні системи, API, сповіщення та синхронізація даних.'],['03 / CONTROL','Зручне керування','Адмін-інструменти, аналітика та зрозумілий контроль контенту.']], detailTitle: 'Менше ручної роботи. Більше контролю.', detail: 'Бот проєктується навколо реального сценарію, а не набору команд. Продумуємо діалоги, стани, помилки та інтеграції, щоб користувач швидко отримував результат, а команда економила час.' },
    en: { title: 'Telegram Bot Development', meta: 'Telegram bot and Mini App development for orders, customer support, payments, notifications and business process automation.', intro: 'We turn Telegram into a focused digital tool for customers, teams and everyday operations.', label: 'Telegram bots & Mini Apps', cards: [['01 / LOGIC','Business logic','Flows for orders, support, bookings and internal operations.'],['02 / CONNECTIONS','Payments and integrations','CRM, payment providers, APIs, notifications and data synchronization.'],['03 / CONTROL','Simple management','Admin tools, analytics and clear control over content and requests.']], detailTitle: 'Less manual work. More control.', detail: 'Every bot is designed around a real user journey rather than a list of commands. We shape conversations, states, errors and integrations so customers reach the outcome quickly and your team saves time.' }
  },
  {
    slug: 'api-integrations-automation',
    uk: { title: 'API-інтеграції та автоматизація', meta: 'API-інтеграції, CRM, синхронізація даних і автоматизація бізнес-процесів від WITER. З’єднуємо сервіси в надійні сценарії.', intro: 'З’єднуємо сервіси, дані та команди в надійні процеси без зайвої ручної роботи.', label: 'API & business automation', cards: [['01 / AUDIT','Аудит процесу','Знаходимо повторювані дії, розриви даних і точки втрати часу.'],['02 / INTEGRATE','Інтеграція систем','API, CRM, платежі, таблиці, повідомлення та внутрішні сервіси.'],['03 / RELIABILITY','Надійність','Логи, обробка помилок, безпечні доступи та контроль виконання.']], detailTitle: 'Один зрозумілий потік замість хаосу сервісів.', detail: 'Автоматизація має бути прозорою для команди. Тому ми документуємо логіку, передбачаємо помилки та будуємо сценарії, які можна підтримувати й розширювати разом із бізнесом.' },
    en: { title: 'API Integrations & Business Automation', meta: 'API integrations, CRM connections, data synchronization and business process automation by WITER. Reliable workflows built around your team.', intro: 'We connect services, data and teams into reliable workflows with less repetitive work.', label: 'API & business automation', cards: [['01 / AUDIT','Process audit','We identify repetitive work, disconnected data and costly friction points.'],['02 / INTEGRATE','System integration','APIs, CRM, payments, spreadsheets, notifications and internal tools.'],['03 / RELIABILITY','Operational reliability','Logs, error handling, secure access and clear execution monitoring.']], detailTitle: 'One clear flow instead of disconnected tools.', detail: 'Automation should remain understandable to the people who use it. We document the logic, plan for failure states and build workflows that can grow together with the business.' }
  },
  {
    slug: 'website-launch-support',
    uk: { title: 'Запуск і підтримка сайтів', meta: 'Професійний запуск і підтримка сайтів: домен, хостинг, аналітика, технічне SEO, оптимізація швидкості та супровід після релізу.', intro: 'Доводимо продукт до стабільного запуску й залишаємося поруч після релізу.', label: 'Launch & ongoing support', cards: [['01 / LAUNCH','Технічний запуск','Домен, хостинг, SSL, форми, аналітика та перевірка ключових сценаріїв.'],['02 / PERFORMANCE','Швидкість і SEO','Core Web Vitals, метадані, sitemap, індексація та оптимізація ресурсів.'],['03 / SUPPORT','Підтримка','Оновлення, резервні копії, моніторинг і розвиток продукту після релізу.']], detailTitle: 'Запуск без технічного шуму.', detail: 'Беремо на себе фінальні перевірки, конфігурацію та базову аналітику. Після релізу допомагаємо з оновленнями, продуктивністю й новими можливостями, щоб сайт залишався актуальним.' },
    en: { title: 'Website Launch & Ongoing Support', meta: 'Professional website launch and support: domains, hosting, analytics, technical SEO, performance optimization and post-launch maintenance.', intro: 'We bring digital products to a stable launch and stay available after release.', label: 'Launch & ongoing support', cards: [['01 / LAUNCH','Technical launch','Domain, hosting, SSL, forms, analytics and final user-flow checks.'],['02 / PERFORMANCE','Performance and SEO','Core Web Vitals, metadata, sitemap, indexing and asset optimization.'],['03 / SUPPORT','Ongoing support','Updates, backups, monitoring and continued product development.']], detailTitle: 'A confident launch without technical noise.', detail: 'We handle final checks, configuration and essential analytics. After release, we support updates, performance and new capabilities so the website continues to stay useful and relevant.' }
  }
];

const cases = [
  {
    slug: 'beauty-space-concept', image: '/images/projects/your-salon.jpg', demo: 'https://vitthegrandfather.github.io/salon/', repo: 'https://github.com/vitthegrandfather/salon',
    uk: { title: 'Beauty Space — концепт преміального сайту', meta: 'Кейс WITER: концепт преміального сайту для beauty-простору. Артдирекшн, UX/UI, адаптивна верстка та виразна взаємодія.', intro: 'Цифровий образ beauty-простору, побудований навколо атмосфери, довіри та простого шляху до запису.', label: 'Beauty / concept', detailTitle: 'Преміальність без візуального шуму.', detail: 'Завданням було сформувати цілісний образ сучасного beauty-простору та зробити послуги зрозумілими з першого екрана. Рішення поєднує редакційну типографіку, виразну композицію й адаптивний сценарій взаємодії.', cards: [['ROLE','Art direction · UX/UI'],['BUILD','HTML · CSS · JavaScript'],['FOCUS','Responsive experience · Motion']] },
    en: { title: 'Beauty Space — Premium Website Concept', meta: 'WITER case study: a premium beauty space website concept combining art direction, UX/UI, responsive development and expressive interaction.', intro: 'A digital identity for a beauty space shaped around atmosphere, trust and a simple path to booking.', label: 'Beauty / concept', detailTitle: 'Premium without visual noise.', detail: 'The goal was to create a coherent image for a contemporary beauty space and make its services immediately understandable. The concept combines editorial typography, expressive composition and a responsive interaction flow.', cards: [['ROLE','Art direction · UX/UI'],['BUILD','HTML · CSS · JavaScript'],['FOCUS','Responsive experience · Motion']] }
  },
  {
    slug: 'tattoo-studio-concept', image: '/images/projects/tattoo-salon.jpg', demo: 'https://vitthegrandfather.github.io/tattoosalondemo/', repo: 'https://github.com/vitthegrandfather/tattoosalondemo',
    uk: { title: 'Tattoo Studio — концепт сайту', meta: 'Кейс WITER: концепт сайту сучасної тату-студії. Стратегія, UX/UI, артдирекшн, адаптивна розробка та атмосферні анімації.', intro: 'Сміливий digital-простір, що передає характер студії й допомагає людині впевнено обрати майстра.', label: 'Tattoo / concept', detailTitle: 'Характер, довіра та зрозумілий вибір.', detail: 'Концепт будує знайомство зі студією через роботи, майстрів і прозорий процес. Контрастна типографіка, темна палітра та стриманий motion створюють характер, не відволікаючи від портфоліо.', cards: [['ROLE','Strategy · UX/UI'],['BUILD','HTML · CSS · JavaScript'],['FOCUS','Portfolio · Artists · Process']] },
    en: { title: 'Tattoo Studio — Website Concept', meta: 'WITER case study: a contemporary tattoo studio website concept with strategy, UX/UI, art direction, responsive development and atmospheric motion.', intro: 'A bold digital space that communicates the studio character and helps people choose an artist with confidence.', label: 'Tattoo / concept', detailTitle: 'Character, trust and a clear choice.', detail: 'The concept introduces the studio through work, artists and a transparent process. Contrast typography, a dark palette and restrained motion create a strong identity without distracting from the portfolio.', cards: [['ROLE','Strategy · UX/UI'],['BUILD','HTML · CSS · JavaScript'],['FOCUS','Portfolio · Artists · Process']] }
  }
];

function escapeJson(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
function pagePath(lang, kind, slug) { return `${lang === 'en' ? '/en' : ''}/${kind}/${slug}/`; }
function filePath(lang, kind, slug) { return path.join(root, ...(lang === 'en' ? ['en'] : []), kind, slug, 'index.html'); }
function languageLinks(kind, slug) {
  const uk = `${domain}${pagePath('uk', kind, slug)}`;
  const en = `${domain}${pagePath('en', kind, slug)}`;
  return `<link rel="alternate" hreflang="uk" href="${uk}"><link rel="alternate" hreflang="en" href="${en}"><link rel="alternate" hreflang="x-default" href="${uk}">`;
}
function shell({ lang, kind, slug, content, type, image = '/og-image-witer-2026.png', extraSchema = {} }) {
  const isEn = lang === 'en';
  const home = isEn ? '/en/' : '/';
  const canonical = `${domain}${pagePath(lang, kind, slug)}`;
  const counterpart = `${domain}${pagePath(isEn ? 'uk' : 'en', kind, slug)}`;
  const { demo: _demo, ...structuredExtra } = extraSchema;
  const schema = { '@context':'https://schema.org', '@graph': [
    { '@type': type, name: content.title, description: content.meta, url: canonical, inLanguage: lang, image: `${domain}${image}`, provider: { '@type':'ProfessionalService', name:'WITER Digital Studio', url:`${domain}/` }, ...structuredExtra },
    { '@type':'BreadcrumbList', itemListElement:[
      { '@type':'ListItem', position:1, name:'WITER', item:`${domain}${home}` },
      { '@type':'ListItem', position:2, name: kind === 'services' ? (isEn?'Services':'Послуги') : (isEn?'Work':'Роботи'), item:canonical }
    ] }
  ]};
  return `<!DOCTYPE html>
<html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#050505"><meta name="robots" content="index, follow, max-image-preview:large"><meta name="description" content="${content.meta}"><title>${content.title} | WITER</title><link rel="canonical" href="${canonical}">${languageLinks(kind,slug)}<meta property="og:type" content="${type === 'Service' ? 'website' : 'article'}"><meta property="og:title" content="${content.title} | WITER"><meta property="og:description" content="${content.meta}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${domain}${image}"><meta property="og:image:type" content="${image.endsWith('.png') ? 'image/png' : 'image/jpeg'}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale" content="${isEn?'en_US':'uk_UA'}"><meta property="og:locale:alternate" content="${isEn?'uk_UA':'en_US'}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${content.title} | WITER"><meta name="twitter:description" content="${content.meta}"><meta name="twitter:image" content="${domain}${image}"><link rel="icon" href="/witer-favicon-v2.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/witer-icon-192.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geologica:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/css/seo-page.css?v=504"><script type="application/ld+json">${escapeJson(schema)}</script></head>
<body class="${kind}-page"><div class="page-progress" aria-hidden="true"><i></i></div><div class="noise" aria-hidden="true"></div><header class="header"><a class="brand" href="${home}" aria-label="WITER — home"><b>W</b>ITER</a><nav aria-label="${isEn?'Main navigation':'Головна навігація'}"><a href="${home}#work">${isEn?'Work':'Роботи'}</a><a href="${home}#services">${isEn?'Services':'Послуги'}</a><a href="${home}#about">${isEn?'About':'Про мене'}</a></nav><div class="header__side"><a class="lang" href="${counterpart}">${isEn?'UA · <strong>EN</strong>':'<strong>UA</strong> · EN'}</a><a class="header__cta" href="${home}#contact">${isEn?'Start a project ↗':'Обговорити проєкт ↗'}</a></div></header>${renderBody(lang,kind,content,image,extraSchema)}<footer class="footer"><span>© 2026 WITER DIGITAL STUDIO</span><a href="mailto:studiowiter@outlook.com">STUDIOWITER@OUTLOOK.COM</a><span>KYIV · UA</span></footer><script defer src="/js/seo-page.js?v=20260713-9"></script></body></html>`;
}

const serviceMedia = {
  'web-design-development': { image:'/images/services/web-design.webp', credit:'BAYU SYAITS / UNSPLASH' },
  'telegram-bot-development': { image:'/images/services/telegram.webp', credit:'DETAIL .CO / UNSPLASH' },
  'api-integrations-automation': { image:'/images/services/automation.webp', credit:'JAKUB ŻERDZICKI / UNSPLASH' },
  'website-launch-support': { image:'/images/services/launch-support.webp', credit:'JAKUB ŻERDZICKI / UNSPLASH' }
};

const serviceStories = {
  'web-design-development': {
    uk: {
      statementLabel: 'DESIGN THAT PERFORMS',
      statement: 'Сайт має не просто привертати увагу. Він має пояснювати цінність, вести до дії та залишатися швидким на кожному екрані.',
      processLabel: 'ВІД СТРАТЕГІЇ ДО ІНТЕРФЕЙСУ',
      processTitle: 'Спочатку сенс.<br>Потім форма.',
      process: [['01','Контекст','Вивчаємо бізнес, аудиторію, конкурентів і дію, до якої має привести сайт.'],['02','Архітектура','Будуємо структуру, сценарії та прототип без декоративного шуму.'],['03','Артдирекшн','Формуємо типографіку, ритм, колір і motion-систему з характером бренду.'],['04','Розробка','Перетворюємо дизайн на швидкий адаптивний продукт і готуємо його до запуску.']]
    },
    en: {
      statementLabel: 'DESIGN THAT PERFORMS',
      statement: 'A website should do more than attract attention. It should explain value, guide action and remain fast on every screen.',
      processLabel: 'FROM STRATEGY TO INTERFACE',
      processTitle: 'Meaning first.<br>Form follows.',
      process: [['01','Context','We study the business, audience, competition and the action the website needs to drive.'],['02','Architecture','We shape the structure, journeys and prototype without decorative noise.'],['03','Art direction','Typography, rhythm, colour and motion become one distinctive brand system.'],['04','Development','The design becomes a fast, responsive product prepared for a confident launch.']]
    }
  },
  'telegram-bot-development': {
    uk: {
      statementLabel: 'CONVERSATIONS INTO ACTIONS',
      statement: 'Кожен діалог має вести до результату: заявки, оплати, запису або відповіді — без зайвих команд і ручної роботи.',
      processLabel: 'СЦЕНАРІЙ ДІАЛОГУ',
      processTitle: 'Логіка, що звучить<br>по-людськи.',
      process: [['01','Карта розмови','Фіксуємо цілі користувача, ключові маршрути та нестандартні стани діалогу.'],['02','Прототип','Проєктуємо повідомлення, кнопки та екрани Mini App як один послідовний досвід.'],['03','Інтеграції','Підключаємо оплати, CRM, API, бази даних і потрібні сповіщення.'],['04','Тест і запуск','Перевіряємо реальні сценарії, помилки та передаємо зручне керування адміністратору.']]
    },
    en: {
      statementLabel: 'CONVERSATIONS INTO ACTIONS',
      statement: 'Every conversation should lead to an outcome: a lead, payment, booking or answer — without unnecessary commands or manual work.',
      processLabel: 'CONVERSATION DESIGN',
      processTitle: 'Logic that feels<br>human.',
      process: [['01','Conversation map','We define user goals, key journeys and edge states before writing a line of logic.'],['02','Prototype','Messages, buttons and Mini App screens become one coherent experience.'],['03','Integrations','Payments, CRM, APIs, databases and notifications connect behind the dialogue.'],['04','Test and launch','We test real scenarios, handle errors and give the administrator clear control.']]
    }
  },
  'api-integrations-automation': {
    uk: {
      statementLabel: 'CONNECTED BY DESIGN',
      statement: 'Сервіси перестають бути окремими островами, коли дані рухаються правильно, помилки видно одразу, а команда контролює весь потік.',
      processLabel: 'СПОЧАТКУ ПРОЦЕС',
      processTitle: 'Автоматизуємо<br>лише те, що має сенс.',
      process: [['01','Аудит потоку','Знаходимо ручні операції, повтори, затримки та місця, де губляться дані.'],['02','Карта даних','Визначаємо джерела, правила, доступи й очікуваний результат кожного зв’язку.'],['03','Побудова','Реалізуємо інтеграції, черги, перевірки та безпечну обробку помилок.'],['04','Спостереження','Додаємо логи, сповіщення й документацію, щоб система залишалася контрольованою.']]
    },
    en: {
      statementLabel: 'CONNECTED BY DESIGN',
      statement: 'Tools stop being separate islands when data moves correctly, errors are visible immediately and the team controls the entire flow.',
      processLabel: 'PROCESS BEFORE AUTOMATION',
      processTitle: 'Automate only<br>what makes sense.',
      process: [['01','Flow audit','We find manual operations, repetition, delays and the points where data gets lost.'],['02','Data map','Sources, rules, permissions and the expected result of every connection are defined.'],['03','Build','We implement integrations, queues, validation and safe error handling.'],['04','Observability','Logs, alerts and documentation keep the system transparent and controllable.']]
    }
  },
  'website-launch-support': {
    uk: {
      statementLabel: 'BUILT TO STAY FAST',
      statement: 'Реліз — не фінал. Продукт має залишатися швидким, вимірюваним і готовим до змін після першого дня.',
      processLabel: 'ГОТОВНІСТЬ ДО РЕЛІЗУ',
      processTitle: 'Перевіряємо.<br>Запускаємо. Підтримуємо.',
      process: [['01','Підготовка','Фіксуємо критичні сценарії, аналітику, SEO-вимоги та план безпечного релізу.'],['02','Перевірка','Тестуємо пристрої, швидкість, доступність, форми, метадані та інтеграції.'],['03','Реліз','Контролюємо домен, збірку, перенаправлення й аналітику під час публікації.'],['04','Супровід','Стежимо за показниками, усуваємо проблеми й плануємо наступні покращення.']]
    },
    en: {
      statementLabel: 'BUILT TO STAY FAST',
      statement: 'Launch is not the finish line. A product should remain fast, measurable and ready to evolve after day one.',
      processLabel: 'RELEASE READINESS',
      processTitle: 'Verify.<br>Launch. Support.',
      process: [['01','Preparation','We define critical journeys, analytics, SEO requirements and a safe release plan.'],['02','Verification','Devices, performance, accessibility, forms, metadata and integrations are tested.'],['03','Release','Domain, build, redirects and analytics are monitored while the product goes live.'],['04','Support','We watch real metrics, resolve issues and shape the next improvements.']]
    }
  }
};

function serviceInterface(slug, isEn, large = false) {
  const size = large ? ' service-interface--large' : '';
  if (slug === 'telegram-bot-development') return `<div class="service-interface service-interface--chat${size}"><div class="ui-bar"><span>WITER BOT</span><i>ONLINE</i></div><div class="chat-line chat-line--in">${isEn?'Hi! What would you like to create?':'Вітаю! Що бажаєте створити?'}</div><div class="chat-line chat-line--out">Telegram Mini App</div><div class="chat-options"><b>Website</b><b>Bot</b><b>API</b></div><div class="chat-status"><i></i>${isEn?'Lead captured · CRM updated':'Запит отримано · CRM оновлено'}</div></div>`;
  if (slug === 'api-integrations-automation') return `<div class="service-interface service-interface--flow${size}"><div class="flow-node flow-node--a"><small>01 / INPUT</small><strong>New lead</strong></div><div class="flow-path"><i></i><i></i><i></i></div><div class="flow-node flow-node--b"><small>02 / ROUTE</small><strong>WITER API</strong></div><div class="flow-path"><i></i><i></i><i></i></div><div class="flow-node flow-node--c"><small>03 / RESULT</small><strong>CRM + Alert</strong></div></div>`;
  if (slug === 'website-launch-support') return `<div class="service-interface service-interface--deploy${size}"><div class="ui-bar"><span>DEPLOY / PRODUCTION</span><i>LIVE</i></div><div class="deploy-score"><strong>98</strong><span>PERFORMANCE</span></div><ul><li><i></i>Build completed</li><li><i></i>SEO checks passed</li><li><i></i>Analytics connected</li></ul><div class="deploy-graph"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;
  return `<div class="service-interface service-interface--browser${size}"><div class="browser-top"><i></i><i></i><i></i><span>witerstudio.online</span></div><div class="browser-canvas"><small>DIGITAL PRODUCT / 01</small><strong>${isEn?'Ideas<br>in motion.':'Ідеї<br>в русі.'}</strong><div><i></i><i></i><i></i></div></div></div>`;
}

function renderBody(lang, kind, c, image, extra) {
  const isEn = lang === 'en';
  const cards = c.cards.map(([num,title,text])=>`<article class="card"><span>${num}</span><h3>${title}</h3>${text ? `<p>${text}</p>` : ''}</article>`).join('');
  if (kind === 'work') return `<main><section class="hero"><div><div class="eyebrow">SELECTED CONCEPT / 2026</div><h1>${c.title.split(' — ').join('<span>')}</span></h1></div><div class="hero__bottom"><p>${c.intro}</p><a class="round-link" href="${extra.demo}" target="_blank" rel="noopener">${isEn?'View live<br>concept ↗':'Дивитися<br>концепт ↗'}</a></div></section><section class="section section--light"><div class="section__head"><h2>${c.detailTitle}</h2><p>${c.detail}</p></div><div class="case-media"><img src="${image}" alt="${c.title}" width="1600" height="1000"></div><div class="case-meta">${cards}</div></section><section class="cta"><h2>${isEn?'Have an idea?':'Є ідея?'}</h2><a href="${isEn?'/en/':'/'}#contact">${isEn?'Start a<br>project ↗':'Обговорити<br>проєкт ↗'}</a></section></main>`;
  const splitAt = Math.max(1, Math.floor(c.title.split(' ').length * .55));
  const titleWords = c.title.split(' ');
  const displayTitle = `${titleWords.slice(0,splitAt).join(' ')}<span>${titleWords.slice(splitAt).join(' ')}</span>`;
  const story = serviceStories[c.slug][lang];
  const processHtml = story.process.map(([num,title,text])=>`<article class="service-step reveal"><span>${num}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('');
  const faq = isEn
    ? [[`What is included in ${c.title.toLowerCase()}?`,c.detail],['How is the work organized?','The project moves through discovery, direction, production and launch. You see progress at every stage and always know what decision comes next.'],['Can the solution grow after launch?','Yes. The architecture, documentation and component approach are designed so the product can be maintained, measured and extended without rebuilding everything from scratch.']]
    : [[`Що входить у послугу «${c.title}»?`,c.detail],['Як організована робота?','Проєкт проходить етапи дослідження, формування напряму, реалізації та запуску. Ви бачите прогрес і завжди розумієте, яке рішення буде наступним.'],['Чи можна розвивати рішення після запуску?','Так. Архітектура, документація та компонентний підхід дозволяють підтримувати, вимірювати й розширювати продукт без повної переробки.']];
  const faqHtml = faq.map(([question,answer],index)=>`<details class="faq-item reveal"><summary><span>0${index+1}</span><strong>${question}</strong><i>+</i></summary><div class="faq-answer"><p>${answer}</p></div></details>`).join('');
  const related = services.filter(item=>item.slug!==c.slug).slice(0,3).map((item,index)=>`<a class="related-card reveal" href="${isEn?'/en':''}/services/${item.slug}/"><span>0${index+1}</span><strong>${item[lang].title}</strong><i>↗</i></a>`).join('');
  const capabilityCards = c.cards.map(([num,title,text],index)=>`<article class="capability-card reveal"><div><span>${num}</span><i>0${index+1}</i></div><h3>${title}</h3><p>${text}</p></article>`).join('');
  const keywords = c.cards.map(card=>`<span>${card[1]}</span><i>✦</i>`).join('');
  const media = serviceMedia[c.slug];
  const marqueeGroup = `<div class="service-marquee__group">${keywords}</div>`;
  const demoTitle = isEn ? 'See the system,<br>not just the promise.' : 'Покажемо систему,<br>а не лише обіцянку.';
  const demoCopy = isEn ? 'Every solution is mapped as a real interaction: screens, states, connections and measurable outcomes.' : 'Кожне рішення візуалізуємо як реальну взаємодію: екрани, стани, зв’язки та вимірювані результати.';
  return `<main class="service-main service-main--${c.slug}"><section class="service-hero"><div class="service-hero__wind" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="service-hero__top"><div class="eyebrow">WITER / ${c.label}</div><span class="service-number">${c.index} / 04</span></div><div class="service-hero__stage"><div class="service-hero__copy"><h1>${displayTitle}</h1><p>${c.intro}</p><div class="service-hero__actions"><a class="service-primary" href="#approach"><span>${isEn?'Explore the service':'Дивитися детальніше'}</span><i>↘</i></a><span>${isEn?'Available for selected projects':'Відкритий до нових проєктів'}</span></div></div><figure class="service-hero__media" data-parallax><img src="${media.image}" alt="${isEn?'Visual context for ': 'Візуальний контекст послуги '}${c.title}" width="1400" height="1050" fetchpriority="high"><div class="service-hero__media-shade"></div>${serviceInterface(c.slug,isEn)}<figcaption><span>${c.index} / WITER VISUAL SYSTEM</span><small>${media.credit}</small></figcaption></figure></div><div class="service-proof"><span>${isEn?'Strategy-led':'Стратегічний підхід'}</span><span>${isEn?'Senior involvement':'Особиста участь'}</span><span>${isEn?'Launch-ready':'Готовність до запуску'}</span></div></section><div class="service-marquee" aria-hidden="true"><div class="service-marquee__track">${marqueeGroup}${marqueeGroup}${marqueeGroup}${marqueeGroup}</div></div><section class="service-overview" id="approach"><div class="service-overview__intro reveal"><div class="eyebrow">${isEn?'WHAT YOU GET':'ЩО ВИ ОТРИМУЄТЕ'}</div><h2>${c.detailTitle}</h2><p>${c.detail}</p></div><div class="capability-grid">${capabilityCards}</div></section><section class="service-demo"><div class="service-demo__copy reveal"><span class="eyebrow">${isEn?'IN PRACTICE':'ЯК ЦЕ ПРАЦЮЄ'}</span><h2>${demoTitle}</h2><p>${demoCopy}</p></div><div class="service-demo__stage reveal" data-parallax>${serviceInterface(c.slug,isEn,true)}<div class="demo-grid" aria-hidden="true"></div><span class="demo-coordinate">50.4501° N / WITER SYSTEM</span></div></section><section class="service-statement"><span class="eyebrow">WITER / ${story.statementLabel}</span><p class="reveal">${story.statement}</p><div class="statement-orbit" aria-hidden="true"><i></i><b>${c.index}</b></div></section><section class="service-process"><div class="service-process__head reveal"><span class="eyebrow">${story.processLabel}</span><h2>${story.processTitle}</h2></div><div class="service-steps">${processHtml}</div></section><section class="service-faq"><div class="service-faq__head reveal"><span class="eyebrow">FAQ / ${c.index}</span><h2>${isEn?'Before we start.':'Перед початком.'}</h2></div><div class="faq-list">${faqHtml}</div></section><section class="related-services"><div class="related-services__head reveal"><span class="eyebrow">${isEn?'RELATED SERVICES':'ІНШІ ПОСЛУГИ'}</span><h2>${isEn?'Explore more capabilities.':'Більше можливостей.'}</h2></div><div class="related-grid">${related}</div></section><section class="cta service-cta"><div><span class="eyebrow">${isEn?'AVAILABLE FOR SELECTED PROJECTS':'ВІДКРИТИЙ ДО НОВИХ ПРОЄКТІВ'}</span><h2>${isEn?'Let’s make it<br>matter.':'Зробімо це<br>важливим.'}</h2></div><a href="${isEn?'/en/':'/'}#contact">${isEn?'Start a<br>project ↗':'Обговорити<br>проєкт ↗'}</a></section></main>`;
}

function write(file, content) { fs.mkdirSync(path.dirname(file), { recursive:true }); fs.writeFileSync(file, content); }
for (const [index,item] of services.entries()) for (const lang of ['uk','en']) write(filePath(lang,'services',item.slug), shell({lang,kind:'services',slug:item.slug,content:{...item[lang],slug:item.slug,index:String(index+1).padStart(2,'0')},type:'Service'}));
for (const item of cases) for (const lang of ['uk','en']) write(filePath(lang,'work',item.slug), shell({lang,kind:'work',slug:item.slug,content:item[lang],type:'CreativeWork',image:item.image,extraSchema:{demo:item.demo,sameAs:[item.demo,item.repo]}}));

function translateHome() {
  let html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  html = html.replace('<html lang="uk">','<html lang="en">')
    .replace(/<meta name="description" content="[^"]+">/, '<meta name="description" content="WITER is an independent digital studio in Kyiv creating premium websites, digital products, Telegram bots and business automation. We combine distinctive design, thoughtful UX and reliable development for ambitious brands worldwide.">')
    .replace(/<meta property="og:title" content="[^"]+">/, '<meta property="og:title" content="WITER — Web Design &amp; Development Studio">')
    .replace(/<meta property="og:description" content="[^"]+">/, '<meta property="og:description" content="WITER is an independent digital studio in Kyiv creating premium websites, digital products, Telegram bots and business automation for ambitious brands worldwide.">')
    .replace('<meta property="og:url" content="https://witerstudio.online/">','<meta property="og:url" content="https://witerstudio.online/en/">')
    .replace('<meta property="og:locale" content="uk_UA">','<meta property="og:locale" content="en_US">')
    .replace('<meta property="og:locale:alternate" content="en_US">','<meta property="og:locale:alternate" content="uk_UA">')
    .replace(/<meta name="twitter:title" content="[^"]+">/, '<meta name="twitter:title" content="WITER — Web Design &amp; Development Studio">')
    .replace(/<meta name="twitter:description" content="[^"]+">/, '<meta name="twitter:description" content="Premium websites, digital products, Telegram bots and business automation by WITER Digital Studio.">')
    .replace('<link rel="canonical" href="https://witerstudio.online/">','<link rel="canonical" href="https://witerstudio.online/en/">')
    .replace(/<title>[^<]+<\/title>/,'<title>WITER — Web Design &amp; Development Studio</title>')
    .replace(/"description": "WITER — незалежна[^\n]+/, '"description": "WITER is an independent digital studio in Kyiv creating premium websites, digital products, Telegram bots and business automation for ambitious brands worldwide.",')
    .replace(/href="css\//g,'href="/css/').replace(/src="js\//g,'src="/js/').replace(/src="images\//g,'src="/images/').replace('href="site.webmanifest"','href="/site.webmanifest"')
    .replace(/href="\/work\//g,'href="/en/work/').replace(/href="\/services\//g,'href="/en/services/');
  const localized = /<([a-z][\w-]*)([^>]*data-uk="[^"]*"[^>]*data-en="([^"]*)"[^>]*)>([\s\S]*?)<\/\1>/gi;
  for (let i=0;i<3;i++) html = html.replace(localized, (_m,tag,attrs,en)=>`<${tag}${attrs}>${en}</${tag}>`);
  html = html.replace(/placeholder="[^"]*"([^>]*data-placeholder-uk="[^"]*"[^>]*data-placeholder-en="([^"]*)")/g, 'placeholder="$2"$1')
    .replace('aria-label="Головна навігація"','aria-label="Main navigation"')
    .replace('aria-label="Відкрити меню"','aria-label="Open menu"')
    .replace('aria-label="Закрити кейс"','aria-label="Close case"')
    .replace('aria-label="WITER — на початок сторінки"','aria-label="WITER — back to top"')
    .replace('aria-label="Дивитися роботи"','aria-label="View selected work"')
    .replace(/alt="Концепт сайту преміального beauty-простору"/g,'alt="Premium beauty space website concept"')
    .replace(/alt="Концепт сайту сучасної тату-студії"/g,'alt="Contemporary tattoo studio website concept"')
    .replace('alt="Віталій, засновник WITER"','alt="Vitalii, founder of WITER"')
    .replace('value="Новий проєкт"','value="New project"')
    .replace('placeholder="Ім\'я"','placeholder="Your name"')
    .replace('placeholder="Цілі, строки, побажання..."','placeholder="Goals, timing, preferences..."');
  write(path.join(root,'en','index.html'),html);
}
translateHome();

const urls = [`${domain}/`,`${domain}/en/`];
for (const item of [...services.map(x=>['services',x]),...cases.map(x=>['work',x])]) for (const lang of ['uk','en']) urls.push(`${domain}${pagePath(lang,item[0],item[1].slug)}`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`;
write(path.join(root,'sitemap.xml'),sitemap);
console.log(`Generated ${2 + services.length*2 + cases.length*2} localized pages and sitemap.`);
