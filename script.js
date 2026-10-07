// === ФУНКЦИИ ДЛЯ АВТОМАТИЧЕСКОГО ПОДСЧЁТА ОЧКОВ ===

function calculateScore(achievements) {
    let score = 0;

    const projectsCount = achievements.projects ? achievements.projects.length : 0;
    score += projectsCount * 100;

    const festivalsCount = achievements.festivals ? achievements.festivals.length : 0;
    score += festivalsCount * 50;

    if (achievements.wins && achievements.wins.length > 0) {
        achievements.wins.forEach(win => {
            switch (win.place) {
                case 1: score += 50; break;
                case 2: score += 30; break;
                case 3: score += 20; break;
            }
        });
    }

    if (achievements.bonus) {
        score += achievements.bonus;
    }

    return score;
}

function getRacerClass(score) {
    if (score >= 9000) return "Royal";
    if (score >= 5000) return "Ruler";
    if (score >= 3000) return "Rover";
    if (score >= 1000) return "Rusher";
    if (score >= 800) return "Raider";
    if (score >= 600) return "Rider";
    if (score >= 450) return "Runner";
    return "Rookie";
}

function updateRacerScores() {
    racersData.forEach(racer => {
        racer.score = calculateScore(racer.achievements);
        racer.class = getRacerClass(racer.score);
    });
}

// ============================================================
// ПОРТФОЛИО: миссии, которые заводишь вручную
// ============================================================

const missionData = [
    { id: 32, name: "Миссия 32", link: "https://youtu.be/x7qO3zcMh2Y", image: "lobby" },
    { id: 31, name: "Миссия 31", link: "https://youtu.be/WVO--liuNb0", image: "acai" },
    { id: 30, name: "Миссия 30", link: "https://youtu.be/lThYVe_TIag", image: "wet" },
    { id: 29, name: "Миссия 29", link: "https://youtu.be/-BQ-FOM4jFE", image: "chat" },
    { id: 28, name: "Миссия 28", link: "https://youtu.be/uEwhlGxXHOU", image: "bad2" },
    { id: 27, name: "Миссия 27", link: "https://youtu.be/tYnYY4FtVDs", image: "rush" },
    { id: 26, name: "Миссия 26", link: "https://youtu.be/Cc39vf6tpfY", image: "bad_ateez" },
    { id: 25, name: "Миссия 25", link: "https://youtu.be/k_9apuCaMVw", image: "hitem" },
    { id: 24, name: "Миссия 24", link: "https://youtu.be/pCDSQeh3Wbs", image: "okay" },
    { id: 23, name: "Миссия 23", link: "https://youtu.be/xeHsGngi98Y?si=SH2XSQdZnaJdJ19E", image: "adf" },
    { id: 22, name: "Миссия 22", link: "https://youtu.be/jjtmxb_5wmg", image: "boompala" },
    { id: 21, name: "Миссия 21", link: "https://youtu.be/SP97yMwEnBc", image: "bad" },
    { id: 20, name: "Миссия 20", link: "https://youtu.be/DXMT24Xst8c?si=88ElTD-ypwF4hCWk", image: "redred" },
    { id: 19, name: "Миссия 19", link: "https://youtu.be/ioF31qa4miw", image: "drift" },
    { id: 18, name: "Миссия 18", link: "https://youtu.be/Hhrery2tIGQ?si=SxE6N9N3lJChQWb3", image: "pinky_up" },
    { id: 17, name: "Миссия 17", link: "https://youtu.be/ci8WH8tiQhg?si=78S7M2mxW3n31KIc", image: "r2r" },
    { id: 16, name: "Миссия 16", link: "https://youtu.be/h9pVcf1CuAI", image: "one_bite" },
    { id: 15, name: "Миссия 15", link: "https://youtu.be/iYpHd_194cM", image: "adrenaline" },
    { id: 14, name: "Миссия 14", link: "https://youtu.be/ljl2hqR2YXM?si=koUeMEHWN5_Zqq4S", image: "saucin" },
    { id: 13, name: "Миссия 13", link: "https://youtu.be/B9z7TTMgKfI", image: "party" },
    { id: 12, name: "Миссия 12", link: "https://youtu.be/NAh2QCLjmK4", image: "do_it" },
    { id: 11, name: "Миссия 11", link: "https://youtu.be/LczT3pJCzO0", image: "tunnel" },
    { id: 10, name: "Миссия 10", link: "https://youtu.be/I2ho_pNATI4?si=R3fa_A-2CWasiftk", image: "superpower" },
    { id: 9, name: "Миссия 9", link: "https://youtu.be/bFcbi4upihU", image: "dwiw" },
    { id: 8, name: "Миссия 8", link: "https://youtu.be/iyH_gSL0ZmY", image: "shaboom" },
    { id: 7, name: "Миссия 7", link: "https://youtu.be/MoJ37LUAKuQ", image: "gotcha" },
    { id: 6, name: "Миссия 6", link: "https://youtu.be/yupP4AlwH24", image: "ceremony" },
    { id: 5, name: "Миссия 5", link: "https://youtu.be/THk-GkZjFu8", image: "wicked_love" },
    { id: 4, name: "Миссия 4", link: "https://youtu.be/JGf2F87fSI0", image: "1_only" },
    { id: 3, name: "Миссия 3", link: "https://youtu.be/NTPZLUXcZp4", image: "iyf" },
    { id: 2, name: "Миссия 2", link: "https://youtu.be/cbtjGX4vRV", image: "pretty_boy" },
    { id: 1, name: "Миссия 1", link: "https://youtu.be/E9h64fDEa6s?si=M7hAkz1SLBH0o3S2", image: "mantra" }
];

// ============================================================
// КАТАЛОГ: миссии из missions.json (добавляются через бота)
// ============================================================

let catalogData = [];
let catalogLoaded = false;
let catalogLoadPromise = null;

async function loadCatalog(forceReload = false) {
    if (catalogLoaded && !forceReload) {
        return catalogData;
    }
    if (catalogLoadPromise && !forceReload) {
        return catalogLoadPromise;
    }

    catalogLoadPromise = (async () => {
        try {
            const resp = await fetch('missions.json?t=' + Date.now(), { cache: 'no-store' });
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            const data = await resp.json();
            catalogData = Array.isArray(data.missions) ? data.missions : [];
            catalogLoaded = true;
            return catalogData;
        } catch (e) {
            console.error('Не удалось загрузить missions.json:', e);
            catalogData = [];
            catalogLoaded = true;
            return catalogData;
        }
    })();

    return catalogLoadPromise;
}

// ============================================================
// ДАННЫЕ РЭЙСЕРОВ
// ============================================================

const racersData = [
    {
        id: "2507.7",
        name: "Kento",
        class: "",
        score: 0,
        photo: "kento",
        achievements: {
            projects: ["P1Harmony - Pretty Boy", "Ateez - In Your Fantasy", "XLOV - 1&Only",
                "Yena - Wicked Love", "Stray Kids - Ceremony", "All(h)ours - Gotcha", "Ateez - Shaboom",
                "Monsta X - Do What I Want", "Xikers - Superpower", "Stray Kids - Do It", "Kid Phenomenon - Party Over There",
                "Lngshot - Saucin'", "Ateez - Adrenaline", "Nexz - One Bite", "All(h)ours - Ready 2 Rumble", "One Or Eight - Tokyo Drift",
                "Cortis - RedRed", "The Jet Boy Bangerz - Gear5 + B.A.D", "Le Sserafim - Boompala", "Xikers - OKay", "Ateez - BAD", "&Team - Rush",
                "Ateez - BAD (Wedding Ver)", "Girlset - Chat", "J.Y.Park - Wet", "Cortis - Acai", "Tobii - Hotel Lobby"],
            festivals: ["Venom Fest (27.04.25)", "CoverLand (27.04.25)", "ANM Dance Festival (29.06.25)",
                "DEEPFEST SUMMER 2025 (29.06.25)", "1Y (17.08.25) - Boys", "1Y (17.08.25) - Solo/Duo With Team", "lll кубок Москвы (30.08.25)",
                "ANM Dance Festival (14.09.25)", "CoverLand (14.12.25)", "DEEPFEST WINTER 2025 (21.12.25)", "K-DOM Champ (11.01.26)",
                "ANM Dance Festival (8.02.26)", "Coolapalooza (22.03.26)", "Venom Fest (19.04.26)", "1Y (3.05.26)", "ADF (16.05.26)", "DEEPFEST SUMMER 2026 (21.06.26)",
                "ANM Dance Festival (28.06.26)", "K-POP COVER BATTLE (11.07.26)", "CHOOM BATTLE (18.07.26)", "VK ADF (18.07.26)", "1Y (30.08.26) - Solo/Duo with team",
                "1Y (30.08.26) - Who's next"],
            wins: [
                { place: 1, festival: "Venom Fest (27.04.25)" },
                { place: 1, festival: "1Y (17.08.25) - Boys" },
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 1, festival: "K-POP COVER BATTLE (11.07.26)" },
                { place: 1, festival: "CHOOM BATTLE (18.07.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
                { place: 2, festival: "DEEPFEST SUMMER 2026 (21.06.26)" },
                { place: 2, festival: "VK ADF (18.07.26)" },
                { place: 3, festival: "ANM Dance Festival (14.09.25)" },
                { place: 3, festival: "DEEPFEST WINTER 2025 (21.12.25)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ],
            bonus: 500
        }
    },
    {
        id: "0103.5",
        name: "Corey",
        class: "",
        score: 0,
        photo: "corey",
        achievements: {
            projects: ["P1Harmony - Pretty Boy", "Ateez - In Your Fantasy", "XLOV - 1&Only",
                "Yena - Wicked Love", "Stray Kids - Ceremony", "All(h)ours - Gotcha", "Ateez - Shaboom",
                "Monsta X - Do What I Want", "Xikers - Superpower", "Itzy - Tunnel Vision", "Stray Kids - Do It", "Kid Phenomenon - Party Over There",
                "Lngshot - Saucin'", "Ateez - Adrenaline", "Nexz - One Bite", "All(h)ours - Ready 2 Rumble", "One Or Eight - Tokyo Drift",
                "Katseye - Pinky Up", "Cortis - RedRed", "The Jet Boy Bangerz - Gear5 + B.A.D", "Le Sserafim - Boompala", "Xikers - OKay", "Meovv - Hit 'Em",
                "Ateez - BAD", "&Team - Rush", "Ateez - BAD (Wedding Ver)", "Girlset - Chat", "J.Y.Park - Wet", "Cortis - Acai", "Tobii - Hotel Lobby"],
            festivals: ["Venom Fest (27.04.25)", "CoverLand (27.04.25)", "ANM Dance Festival (29.06.25)",
                "DEEPFEST SUMMER 2025 (29.06.25)", "1Y (17.08.25) - Boys", "1Y (17.08.25) - Solo/Duo With Team", "lll кубок Москвы (30.08.25)",
                "ANM Dance Festival (14.09.25)", "CoverLand (14.12.25)", "DEEPFEST WINTER 2025 (21.12.25)", "K-DOM Champ (11.01.26)",
                "ANM Dance Festival (8.02.26)", "Coolapalooza (22.03.26)", "Venom Fest (19.04.26)", "1Y (3.05.26)", "ADF (16.05.26)", "DEEPFEST SUMMER 2026 (21.06.26)",
                "ANM Dance Festival (28.06.26)", "K-POP COVER BATTLE (11.07.26)", "CHOOM BATTLE (18.07.26)", "VK ADF (18.07.26)", "1Y (30.08.26) - Solo/Duo with team",
                "1Y (30.08.26) - Who's next"],
            wins: [
                { place: 1, festival: "Venom Fest (27.04.25)" },
                { place: 1, festival: "1Y (17.08.25) - Boys" },
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 1, festival: "K-POP COVER BATTLE (11.07.26)" },
                { place: 1, festival: "CHOOM BATTLE (18.07.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
                { place: 2, festival: "DEEPFEST SUMMER 2026 (21.06.26)" },
                { place: 2, festival: "VK ADF (18.07.26)" },
                { place: 3, festival: "ANM Dance Festival (14.09.25)" },
                { place: 3, festival: "DEEPFEST WINTER 2025 (21.12.25)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ],
            bonus: 150
        }
    },
    {
        id: "0404.4",
        name: "Budilya",
        class: "",
        score: 0,
        photo: "budilya",
        achievements: {
            projects: ["Ateez - In Your Fantasy", "Ateez - Shaboom", "Xikers - Superpower", "Lngshot - Saucin'", "Nexz - One Bite",
                "Ateez - Adrenaline", "One Or Eight - Tokyo Drift", "Katseye - Pinky Up", "Cortis - RedRed", "The Jet Boy Bangerz - Gear5 + B.A.D",
                "Le Sserafim - Boompala", "Xikers - OKay", "Ateez - BAD", "&Team - Rush", "Ateez - BAD (Wedding Ver)", "Cortis - Acai"
            ],
            festivals: ["1Y (17.08.25) - Boys", "CoverLand (14.12.25)", "K-DOM Champ (11.01.26)", "ANM Dance Festival (8.02.26)",
                "Venom Fest (19.04.26)", "1Y (3.05.26)", "ADF (16.05.26)", "DEEPFEST SUMMER 2026 (21.06.26)", "ANM Dance Festival (28.06.26)",
                "K-POP COVER BATTLE (11.07.26)", "CHOOM BATTLE (18.07.26)", "VK ADF (18.07.26)"],
            wins: [
                { place: 1, festival: "1Y (17.08.25) - Boys" },
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 1, festival: "K-POP COVER BATTLE (11.07.26)" },
                { place: 1, festival: "CHOOM BATTLE (18.07.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
                { place: 2, festival: "DEEPFEST SUMMER 2026 (21.06.26)" },
                { place: 2, festival: "VK ADF (18.07.26)" }
            ]
        }
    },
    {
        id: "1312.3",
        name: "Sai",
        class: "",
        score: 0,
        photo: "sai",
        achievements: {
            projects: ["XLOV - 1&Only", "Kid Phenomenon - Party Over There", "Lngshot - Saucin'", "Ateez - Adrenaline", "One Or Eight - Tokyo Drift",
                "The Jet Boy Bangerz - Gear5 + B.A.D", "Ateez - BAD", "Ateez - BAD (Wedding Ver)", "Girlset - Chat"],
            festivals: ["DEEPFEST WINTER 2025 (21.12.25)", "K-DOM Champ (11.01.26)", "Venom Fest (19.04.26)", "1Y (3.05.26)", "ADF (16.05.26)",
                "VK ADF (18.07.26)"],
            wins: [
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 3, festival: "DEEPFEST WINTER 2025 (21.12.25)" },
                { place: 2, festival: "VK ADF (18.07.26)" }
            ]
        }
    },
    {
        id: "2710.3",
        name: "Ana",
        class: "",
        score: 0,
        photo: "ana",
        achievements: {
            projects: ["Stray Kids - Ceremony", "Stray Kids - Do It", "Nexz - One Bite", "All(h)ours - Ready 2 Rumble", "Katseye - Pinky Up",
                "Cortis - RedRed", "The Jet Boy Bangerz - Gear5 + B.A.D", "Le Sserafim - Boompala", "Xikers - OKay", "Ateez - BAD", "&Team - Rush",
                "Ateez - BAD (Wedding Ver)", "Girlset - Chat", "Cortis - Acai", "Tobii - Hotel Lobby"],
            festivals: ["ANM Dance Festival (8.02.26)", "Coolapalooza (22.03.26)", "ADF (16.05.26)", "DEEPFEST SUMMER 2026 (21.06.26)", "ANM Dance Festival (28.06.26)",
                "K-POP COVER BATTLE (11.07.26)", "CHOOM BATTLE (18.07.26)", "VK ADF (18.07.26)", "1Y (30.08.26) - Who's next"],
            wins: [
                { place: 1, festival: "K-POP COVER BATTLE (11.07.26)" },
                { place: 1, festival: "CHOOM BATTLE (18.07.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
                { place: 2, festival: "DEEPFEST SUMMER 2026 (21.06.26)" },
                { place: 2, festival: "VK ADF (18.07.26)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ]
        }
    },
    {
        id: "2401.2",
        name: "Vanyaslay",
        class: "",
        score: 0,
        photo: "vanyaslay",
        achievements: {
            projects: ["All(h)ours - Gotcha", "All(h)ours - Ready 2 Rumble", "One Or Eight - Tokyo Drift", "Le Sserafim - Boompala", "Xikers - OKay", "&Team - Rush"],
            festivals: ["lll кубок Москвы (30.08.25)", "ANM Dance Festival (14.09.25)", "Coolapalooza (22.03.26)",
                "Venom Fest (19.04.26)", "1Y (3.05.26)", "DEEPFEST SUMMER 2026 (21.06.26)", "ANM Dance Festival (28.06.26)",
                "K-POP COVER BATTLE (11.07.26)", "CHOOM BATTLE (18.07.26)"],
            wins: [
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 1, festival: "K-POP COVER BATTLE (11.07.26)" },
                { place: 1, festival: "CHOOM BATTLE (18.07.26)" },
                { place: 2, festival: "DEEPFEST SUMMER 2026 (21.06.26)" },
                { place: 3, festival: "ANM Dance Festival (14.09.25)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ]
        }
    },
    {
        id: "1012.3",
        name: "Tokbok",
        class: "",
        score: 0,
        photo: "tokbok",
        achievements: {
            projects: ["One Or Eight - Tokyo Drift", "&Team - Rush"],
            festivals: ["1Y (3.05.26)", "K-POP COVER BATTLE (11.07.26)"],
            wins: [
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 1, festival: "K-POP COVER BATTLE (11.07.26)" }
            ]
        }
    }
];

updateRacerScores();

// === РОУТИНГ ===

async function loadContent(page, params = {}) {
    const contentDiv = document.getElementById('content');

    switch (page) {
        case 'home':
            contentDiv.innerHTML = generateHomePage();
            break;

        case 'about':
            contentDiv.innerHTML = generateAboutPage();
            break;

        case 'ranking':
            contentDiv.innerHTML = generateRankingPage();
            break;

        case 'catalog':
            contentDiv.innerHTML = generateLoading();
            await loadCatalog();
            contentDiv.innerHTML = generateCatalogPage();
            break;

        case 'apply':
            contentDiv.innerHTML = generateLoading();
            await loadCatalog();
            contentDiv.innerHTML = generateApplyPage(params.project || '');
            break;

        default:
            contentDiv.innerHTML = generateHomePage();
    }
}

function generateLoading() {
    return `
        <div style="text-align:center;padding:80px 20px;color:#0f0;font-family:'ZenDotsKir',sans-serif">
            <i class="fas fa-spinner fa-spin" style="font-size:2rem"></i>
            <p style="margin-top:20px;letter-spacing:2px">ЗАГРУЗКА...</p>
        </div>
    `;
}

// === ГЛАВНАЯ ===

function generateHomePage() {
    return `
        <div class="home-page">
            <div class="welcome-text">
                Добро пожаловать, пользователь!
                <br>Вас приветствует система RC:RC.</br>
                Ниже Вы можете перейти в интересующий Вас раздел.
            </div>
            <div class="buttons-container">
                <button class="menu-btn" onclick="loadContent('about')">
                    <i class="fas fa-info-circle"></i> О системе
                </button>
                <button class="menu-btn" onclick="loadContent('ranking')">
                    <i class="fas fa-users"></i> рэйсеры
                </button>
                <button class="menu-btn" onclick="loadContent('catalog')">
                    <i class="fas fa-folder-open"></i> каталог проектов
                </button>
            </div>
            <div class="social-buttons-container">
                <a href="https://youtube.com/@racerccrew?si=8FXf_KD2fMxJbWgP" target="_blank" class="social-btn" rel="noopener noreferrer">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="https://t.me/racerc_crew" target="_blank" class="social-btn" rel="noopener noreferrer">
                    <i class="fab fa-telegram"></i>
                </a>
                <a href="https://www.tiktok.com/@racerc_crew?_t=ZS-8ycnyIdBAIh&_r=1" target="_blank" class="social-btn" rel="noopener noreferrer">
                    <i class="fab fa-tiktok"></i>
                </a>
                <a href="https://t.me/wellandcats/4098" target="_blank" class="social-btn" rel="noopener noreferrer">
                    <i class="fas fa-lightbulb"></i>
                </a>
            </div>
        </div>
    `;
}

// === О СИСТЕМЕ ===

function generateAboutPage() {
    let missionsHTML = '';

    missionData.forEach(mission => {
        missionsHTML += `
            <div class="mission-card">
                <div class="mission-img">
                    <img src="${mission.image}.jpeg" alt="${mission.name}" onerror="this.src='${mission.image}.png'; this.onerror=function(){this.style.display='none'; this.parentElement.innerHTML='<span style=\\'color:#666;font-size:3rem\\'>📷</span>'}">
                </div>
                <a href="${mission.link}" target="_blank" class="mission-link">
                    Посмотреть запись миссии
                </a>
            </div>
        `;
    });

    return `
        <div class="about-page">
            <div class="back-btn-container">
                <button class="back-btn" onclick="loadContent('home')">
                    <i class="fas fa-arrow-left"></i> Назад
                </button>
            </div>
            <h1 class="page-title">О системе</h1>
            <div class="system-info">
                <ul class="system-list">
                    <li class="system-list-main">Система rc:rc — это цифровой интеллект и проводник по мультивселенной, помогающий рэйсерам в процессе их путешествия по альтернативным реальностям.</li>
                    <li>Доступ к миссиям осуществляется по персональным ID-картам, которые определяют ранг пользователя.</li>
                    <li>Работа строится вокруг каталога готовых практик или режима "автор", позволяющего создавать собственные миры.</li>
                    <li>Рэйсеры могут действовать в одиночку или в кооперативе.</li>
                    <li>Основная задача — синхронизация с выбранной реальностью и успешное прохождение испытания, результаты которого автоматически монтируются в видеоотчет и публикуются в разделе "портфолио".</li>
                    <li>Активность пользователя влияет на его ранг.</li>
                </ul>
            </div>
            <h2 class="page-title" style="margin-top: 40px; margin-bottom: 25px;">Портфолио рэйсеров</h2>
            <div class="missions-grid">
                ${missionsHTML}
            </div>
        </div>
    `;
}

// === РЭЙСЕРЫ ===

function getDisplayName(racerId) {
    if (racerId === "2401.2") {
        return "Vanya<br>slay";
    }
    const racer = racersData.find(r => r.id === racerId);
    if (!racer) return "";
    return racer.name;
}

function generateRankingPage() {
    const sortedRacers = [...racersData]
        .filter(racer => racer.score >= 350)
        .sort((a, b) => b.score - a.score);

    const topTwoRacers = sortedRacers.slice(0, 2);
    const otherRacers = sortedRacers.slice(2);

    const cardHTML = (racer) => `
        <div class="id-card" onclick="openRacerAchievements('${racer.id}')">
            <div class="card-logo">racer card</div>
            <div class="racer-photo-container">
                <div class="racer-photo">
                    <img src="${racer.photo}.png" alt="${racer.name}" ${['corey', 'minka', 'tveva', 'vanyaslay', 'tokbok'].includes(racer.photo) ? 'class="zoomed"' : ''}>
                </div>
            </div>
            <div class="racer-info">
                <div class="info-item">
                    <span class="info-label">name:</span>
                    <span class="info-value">${racer.name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">id:</span>
                    <span class="info-value">${racer.id}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">class:</span>
                    <span class="info-value class-value">${racer.class}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">score:</span>
                    <span class="info-value">${racer.score}</span>
                </div>
            </div>
            <div class="racer-signature">${racer.name.split(' ')[0]}</div>

            <div class="neon-stripe"></div>
        </div>
    `;

    const topTwoHTML = topTwoRacers.map(cardHTML).join('');
    const otherHTML = otherRacers.map(cardHTML).join('');

    return `
        <div class="ranking-page">
            <div class="back-btn-container">
                <button class="back-btn" onclick="loadContent('home')">
                    <i class="fas fa-arrow-left"></i> Назад
                </button>
            </div>
            <h2 class="page-title">менторы</h2>
            <div class="racers-container">
                ${topTwoHTML}
            </div>
            <h2 class="page-title">рэйсеры</h2>
            <div class="racers-container">
                ${otherHTML}
            </div>
            <div class="modal-overlay" id="racerAchievementsModal" onclick="closeRacerAchievements(event)">
                <div class="modal-content achievements-modal-content">
                    <button class="modal-close" onclick="closeRacerAchievements()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div id="racerAchievementsContent"></div>
                </div>
            </div>
        </div>
    `;
}

// === МОДАЛКА ДОСТИЖЕНИЙ ===

function openRacerAchievements(racerId) {
    const racer = racersData.find(r => r.id === racerId);
    if (!racer) return;

    const achievements = racer.achievements;

    let projectsHTML = '';
    if (achievements.projects && achievements.projects.length > 0) {
        projectsHTML = achievements.projects.map(p => `<li class="achievement-item">${p}</li>`).join('');
    } else {
        projectsHTML = '<li class="achievement-item empty">Нет участий в проектах</li>';
    }

    let festivalsHTML = '';
    if (achievements.festivals && achievements.festivals.length > 0) {
        festivalsHTML = achievements.festivals.map(f => `<li class="achievement-item">${f}</li>`).join('');
    } else {
        festivalsHTML = '<li class="achievement-item empty">Нет участий на фестивалях</li>';
    }

    let winsHTML = '';
    if (achievements.wins && achievements.wins.length > 0) {
        winsHTML = achievements.wins.map(w => {
            const placeText = w.place === 1 ? '1 место' : w.place === 2 ? '2 место' : '3 место';
            return `<li class="achievement-item win-item">
                <span class="win-place">${placeText}</span>
                <span class="win-festival">${w.festival}</span>
            </li>`;
        }).join('');
    } else {
        winsHTML = '<li class="achievement-item empty">Пока нет побед</li>';
    }

    const contentHTML = `
        <div class="achievements-header">
            <div class="achievements-photo"><img src="${racer.photo}.png" alt="${racer.name}"${['corey', 'minka', 'tveva', 'vanyaslay', 'tokbok'].includes(racer.photo) ? ' class="zoomed"' : ''}></div>
            <div class="achievements-info">
                <h2 class="achievements-name">${getDisplayName(racer.id)}</h2>
                <p class="achievements-id">ID: ${racer.id}</p>
                <p class="achievements-class">${racer.class}</p>
            </div>
        </div>

        <div class="achievements-sections">
            <div class="achievement-section">
                <h3 class="section-title">
                    <i class="fas fa-rocket"></i>
                    Проекты с записью (${achievements.projects ? achievements.projects.length : 0})
                </h3>
                <ul class="achievement-list">
                    ${projectsHTML}
                </ul>
            </div>

            <div class="achievement-section">
                <h3 class="section-title">
                    <i class="fas fa-music"></i>
                    Фесты (${achievements.festivals ? achievements.festivals.length : 0})
                </h3>
                <ul class="achievement-list">
                    ${festivalsHTML}
                </ul>
            </div>

            <div class="achievement-section">
                <h3 class="section-title">
                    <i class="fas fa-trophy"></i>
                    Победы (${achievements.wins ? achievements.wins.length : 0})
                </h3>
                <ul class="achievement-list wins-list">
                    ${winsHTML}
                </ul>
            </div>
        </div>
    `;

    document.getElementById('racerAchievementsContent').innerHTML = contentHTML;

    const modal = document.getElementById('racerAchievementsModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }
}

function closeRacerAchievements(event) {
    if (!event || event.target === event.currentTarget || event.target.closest('.modal-close')) {
        const modal = document.getElementById('racerAchievementsModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }
    }
}

// === КАТАЛОГ ===

function generateCatalogPage() {
    if (!catalogData || catalogData.length === 0) {
        return `
            <div class="catalog-page">
                <div class="back-btn-container">
                    <button class="back-btn" onclick="loadContent('home')">
                        <i class="fas fa-arrow-left"></i> Назад
                    </button>
                </div>
                <h1 class="page-title">Каталог проектов</h1>
                <div class="catalog-empty">
                    <i class="fas fa-folder-open"></i>
                    <p>Каталог пока пуст</p>
                    <p class="catalog-empty-sub">Следи за обновлениями — проекты появятся здесь после публикации</p>
                </div>
            </div>
        `;
    }

    const sorted = [...catalogData].sort((a, b) => b.id - a.id);

    const cardsHTML = sorted.map(mission => {
        const displayArtist = mission.artist || '';
        const displayTitle = mission.title || mission.name || `Миссия ${mission.id}`;
        const fullName = displayArtist ? `${displayArtist} - ${displayTitle}` : displayTitle;
        const safeName = fullName.replace(/'/g, "\\'");

        return `
            <div class="catalog-card">
                <div class="catalog-img">
                    <img src="${mission.image}.jpeg" alt="${fullName}"
                         onerror="this.src='${mission.image}.png'; this.onerror=function(){this.style.display='none'; this.parentElement.innerHTML='<span style=\\'color:#666;font-size:3rem\\'>📷</span>'}">
                    <div class="catalog-badge">ID ${mission.id}</div>
                </div>
                <div class="catalog-body">
                    <h3 class="catalog-title">${fullName}</h3>
                    <div class="catalog-actions">
                        <a href="${mission.link}" target="_blank" rel="noopener noreferrer" class="catalog-btn catalog-btn-watch">
                            <i class="fas fa-play"></i> Смотреть
                        </a>
                        <button class="catalog-btn catalog-btn-apply"
                                onclick="loadContent('apply', { project: '${safeName}' })">
                            <i class="fas fa-paper-plane"></i> Откликнуться
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="catalog-page">
            <div class="back-btn-container">
                <button class="back-btn" onclick="loadContent('home')">
                    <i class="fas fa-arrow-left"></i> Назад
                </button>
            </div>
            <h1 class="page-title">Каталог проектов</h1>
            <div class="catalog-info">
                Выбери проект и нажми «Откликнуться» — форма заявки откроется
                с уже выбранным проектом.
            </div>
            <div class="catalog-grid">
                ${cardsHTML}
            </div>
        </div>
    `;
}

// === СТРАНИЦА ЗАЯВКИ ===

function generateApplyPage(preselectedProject = '') {
    const allProjects = [...catalogData].sort((a, b) => b.id - a.id);

    const projectsOptions = allProjects.map(p => {
        const displayArtist = p.artist || '';
        const displayTitle = p.title || p.name || `Миссия ${p.id}`;
        const fullName = displayArtist ? `${displayArtist} - ${displayTitle}` : displayTitle;
        const selected = (String(fullName) === String(preselectedProject)) ? ' selected' : '';
        return `<option value="${escapeHtml(fullName)}"${selected}>${escapeHtml(fullName)}</option>`;
    }).join('');

    return `
        <div class="apply-page">
            <div class="back-btn-container">
                <button class="back-btn" onclick="loadContent('catalog')">
                    <i class="fas fa-arrow-left"></i> К каталогу
                </button>
            </div>
            <h1 class="page-title">Заявка на участие в проекте</h1>

            <div class="apply-info">
                Заполни форму — заявка уйдёт напрямую менторам.
                Когда придет время реализации проекта - мы свяжемся с тобой в Telegram.
            </div>

            <form id="applyForm" class="apply-form" onsubmit="submitApplication(event)">
                <div class="form-group">
                    <label for="applyName">Имя / Ник <span class="required">*</span></label>
                    <input type="text" id="applyName" name="name"
                           placeholder="Например: Kento" required maxlength="50">
                </div>

                <div class="form-group">
                    <label for="applyTelegram">Telegram для связи <span class="required">*</span></label>
                    <input type="text" id="applyTelegram" name="telegram"
                           placeholder="@username" required maxlength="50">
                </div>

                <div class="form-group">
                    <label for="applyProject">На какой проект откликаешься? <span class="required">*</span></label>
                    <select id="applyProject" name="project" required>
                        <option value="">— Выбери проект —</option>
                        ${projectsOptions}
                        <option value="Другое">Другое (напишу в комментарии)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="applyVideos">Ссылки на видео <span class="required">*</span></label>
                    <textarea id="applyVideos" name="videos" rows="4"
                              placeholder="Вставь ссылки на свои видео с проектами (каждая с новой строки)&#10;Например:&#10;https://youtu.be/xxxx&#10;https://youtu.be/yyyy"
                              required maxlength="1000"></textarea>
                </div>

                <div class="form-status" id="applyStatus"></div>

                <button type="submit" class="submit-btn" id="applySubmitBtn">
                    <i class="fas fa-paper-plane"></i> Отправить заявку
                </button>
            </form>
        </div>
    `;
}

// === ОТПРАВКА ЗАЯВКИ ===

const APPLY_COOLDOWN_MS = 60 * 1000;
const APPLY_STORAGE_KEY = 'rcrc_last_apply';

function canSubmitApplication() {
    try {
        const last = parseInt(localStorage.getItem(APPLY_STORAGE_KEY) || '0', 10);
        const now = Date.now();
        if (now - last < APPLY_COOLDOWN_MS) {
            const left = Math.ceil((APPLY_COOLDOWN_MS - (now - last)) / 1000);
            return { ok: false, secondsLeft: left };
        }
        return { ok: true };
    } catch (e) {
        return { ok: true };
    }
}

function markApplicationSent() {
    try {
        localStorage.setItem(APPLY_STORAGE_KEY, String(Date.now()));
    } catch (e) { /* ignore */ }
}

async function submitApplication(event) {
    event.preventDefault();

    const form = event.target;
    const statusEl = document.getElementById('applyStatus');
    const submitBtn = document.getElementById('applySubmitBtn');

    const rl = canSubmitApplication();
    if (!rl.ok) {
        statusEl.textContent = `Подожди ${rl.secondsLeft} сек. перед следующей заявкой.`;
        statusEl.className = 'form-status error show';
        return;
    }

    const name = form.name.value.trim();
    const telegram = form.telegram.value.trim();
    const project = form.project.value;
    const videos = form.videos.value.trim();

    if (!name || !telegram || !project || !videos) {
        statusEl.textContent = 'Заполни обязательные поля.';
        statusEl.className = 'form-status error show';

        if (!name) { form.name.classList.add('shake'); setTimeout(() => form.name.classList.remove('shake'), 600); }
        if (!telegram) { form.telegram.classList.add('shake'); setTimeout(() => form.telegram.classList.remove('shake'), 600); }
        if (!project) { form.project.classList.add('shake'); setTimeout(() => form.project.classList.remove('shake'), 600); }
        if (!videos) { form.videos.classList.add('shake'); setTimeout(() => form.videos.classList.remove('shake'), 600); }
        return;
    }

    if (name.length > 50 || telegram.length > 50 || videos.length > 1000) {
        statusEl.textContent = 'Слишком длинный текст в одном из полей.';
        statusEl.className = 'form-status error show';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `
        <span class="btn-loader">
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
            <span class="loader-dot"></span>
        </span>
        <span>Отправка</span>
    `;

    form.classList.add('form-sending');
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxRWcIQpNZ_wPYqwvSEms82FH--Xv8OwH1XTNpwutNzbgR0bwyP0AFfpgsMXcuN-_RYpQ/exec';

    try {
        await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                name: name,
                telegram: telegram,
                project: project,
                videos: videos,
                time: new Date().toISOString()
            })
        });

        submitBtn.innerHTML = `
            <span class="btn-check"><i class="fas fa-check"></i></span>
            <span>Готово</span>
        `;
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');

        form.classList.remove('form-sending');

        statusEl.innerHTML = `
            <span class="status-icon"><i class="fas fa-check-circle"></i></span>
            <span>Заявка отправлена! Мы свяжемся с тобой в Telegram.</span>
        `;
        statusEl.className = 'form-status success show';

        markApplicationSent();
        form.reset();

        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить заявку';
        }, 4000);

        setTimeout(() => {
            if (document.getElementById('applyForm')) {
                loadContent('catalog');
            }
        }, 8000);

    } catch (err) {
        console.error('Apply error:', err);
        form.classList.remove('form-sending');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading', 'success');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить заявку';

        statusEl.innerHTML = `
            <span class="status-icon"><i class="fas fa-exclamation-circle"></i></span>
            <span>Не удалось отправить. Попробуй позже или напиши нам в Telegram.</span>
        `;
        statusEl.className = 'form-status error show';
    }
}

// === УТИЛИТЫ ===

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// === ЭФФЕКТЫ ФОНА ===

function createIntenseMatrix() {
    const matrixContainer = document.getElementById('matrixContainer');
    if (!matrixContainer) return;

    const digits = ['0', '1', '101', '010', '110', '001', '100', '011'];

    for (let i = 0; i < 50; i++) {
        const digit = document.createElement('div');
        digit.className = 'matrix-digit';
        digit.textContent = digits[Math.floor(Math.random() * digits.length)];

        digit.style.left = `${Math.random() * 100}%`;
        digit.style.top = `${Math.random() * 100}%`;

        const duration = 8 + Math.random() * 15;
        const delay = Math.random() * 5;
        digit.style.animationDuration = `${duration}s`;
        digit.style.animationDelay = `${delay}s`;

        const size = 1.5 + Math.random() * 1.5;
        digit.style.fontSize = `${size}rem`;

        matrixContainer.appendChild(digit);
    }

    setInterval(() => {
        const digits = matrixContainer.querySelectorAll('.matrix-digit');
        digits.forEach(digit => {
            digit.style.left = `${Math.random() * 100}%`;
            digit.style.top = `${Math.random() * 100}%`;
        });
    }, 30000);
}

function addRandomSkew() {
    const cards = document.querySelectorAll('.id-card');

    if (window.innerWidth <= 480) {
        cards.forEach(card => {
            card.style.transform = 'none';
        });
        return;
    }

    cards.forEach(card => {
        const rotateY = (Math.random() * 10 - 5);
        const rotateX = (Math.random() * 6 - 3);
        const rotateZ = (Math.random() * 4 - 2);

        card.style.transform = `perspective(500px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
    });
}

// === ИНИЦИАЛИЗАЦИЯ ===

document.addEventListener('DOMContentLoaded', function () {
    loadContent('home');
    createIntenseMatrix();

    const tracks = document.querySelectorAll('.tire-track');
    tracks.forEach(track => {
        track.style.animation = `track-move ${20 + Math.random() * 20}s linear infinite`;
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes track-move {
            0% { opacity: 0.1; transform: translateX(0) rotate(20deg); }
            50% { opacity: 0.4; }
            100% { opacity: 0.1; transform: translateX(100px) rotate(20deg); }
        }

        @keyframes neon-pulse {
            0% { opacity: 0.3; }
            50% { opacity: 0.8; }
            100% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        const neonElements = document.querySelectorAll('.neon-stripe, .class-value, .logo-glow');
        neonElements.forEach(el => {
            el.style.animation = 'neon-pulse 2s infinite alternate';
        });
    }, 1000);

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                setTimeout(addRandomSkew, 100);
            }
        });
    });

    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        observer.observe(contentDiv, { childList: true });
    }
});

window.addEventListener('resize', function () {
    addRandomSkew();
});

updateRacerScores();
