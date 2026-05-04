// === ФУНКЦИИ ДЛЯ АВТОМАТИЧЕСКОГО ПОДСЧЁТА ОЧКОВ ===

/**
 * Подсчитывает очки рэйсера на основе достижений
 * @param {Object} achievements - объект с проектами, фестивалями и победами
 * @returns {number} общее количество очков
 */
function calculateScore(achievements) {
    let score = 0;

    // Очки за проекты: 100 баллов за каждый
    const projectsCount = achievements.projects ? achievements.projects.length : 0;
    score += projectsCount * 100;

    // Очки за фестивали: 50 баллов за участие
    const festivalsCount = achievements.festivals ? achievements.festivals.length : 0;
    score += festivalsCount * 50;

    // Очки за победы
    if (achievements.wins && achievements.wins.length > 0) {
        achievements.wins.forEach(win => {
            switch (win.place) {
                case 1:
                    score += 50; // 1 место
                    break;
                case 2:
                    score += 30; // 2 место
                    break;
                case 3:
                    score += 20;  // 3 место
                    break;
            }
        });
    }

    // Бонусные очки
    if (achievements.bonus) {
        score += achievements.bonus;
    }

    return score;
}

/**
 * Определяет класс рэйсера на основе количества очков
 * @param {number} score - количество очков рэйсера
 * @returns {string} класс рэйсера
 */
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

/**
 * Обновляет очки и класс для всех рэйсеров в массиве racersData
 */
function updateRacerScores() {
    racersData.forEach(racer => {
        racer.score = calculateScore(racer.achievements);
        racer.class = getRacerClass(racer.score);
    });
}

// Данные для сайта
const missionData = [
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
                "Lngshot - Saucin'", "Ateez - Adrenaline", "Nexz - One Bite", "All(h)ours - Ready 2 Rumble", "One Or Eight - Tokyo Drift"],
            festivals: ["Venom Fest (27.04.25)", "CoverLand (27.04.25)", "ANM Dance Festival (29.06.25)",
                "DEEPFEST SUMMER 2025 (29.06.25)", "1Y (17.08.25) - Boys", "1Y (17.08.25) - Solo/Duo With Team", "lll кубок Москвы (30.08.25)",
                "ANM Dance Festival (14.09.25)", "CoverLand (14.12.25)", "DEEPFEST WINTER 2025 (21.12.25)", "K-DOM Champ (11.01.26)",
                "ANM Dance Festival (8.02.26)", "Coolapalooza (22.03.26)", "Venom Fest (19.04.26)", "1Y (3.05.26)"],
            wins: [
                { place: 1, festival: "Venom Fest (27.04.25)" },
                { place: 1, festival: "1Y (17.08.25) - Boys" },
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
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
        class: "", // Будет автоматически рассчитано
        score: 0, // Будет автоматически рассчитано
        photo: "corey",
        achievements: {
            projects: ["P1Harmony - Pretty Boy", "Ateez - In Your Fantasy", "XLOV - 1&Only",
                "Yena - Wicked Love", "Stray Kids - Ceremony", "All(h)ours - Gotcha", "Ateez - Shaboom",
                "Monsta X - Do What I Want", "Xikers - Superpower", "Itzy - Tunnel Vision", "Stray Kids - Do It", "Kid Phenomenon - Party Over There",
                "Lngshot - Saucin'", "Ateez - Adrenaline", "Nexz - One Bite", "All(h)ours - Ready 2 Rumble", "One Or Eight - Tokyo Drift",
                      "Katseye - Pinky Up"],
            festivals: ["Venom Fest (27.04.25)", "CoverLand (27.04.25)", "ANM Dance Festival (29.06.25)",
                "DEEPFEST SUMMER 2025 (29.06.25)", "1Y (17.08.25) - Boys", "1Y (17.08.25) - Solo/Duo With Team", "lll кубок Москвы (30.08.25)",
                "ANM Dance Festival (14.09.25)", "CoverLand (14.12.25)", "DEEPFEST WINTER 2025 (21.12.25)", "K-DOM Champ (11.01.26)",
                "ANM Dance Festival (8.02.26)", "Coolapalooza (22.03.26)", "Venom Fest (19.04.26)", "1Y (3.05.26)"],
            wins: [
                { place: 1, festival: "Venom Fest (27.04.25)" },
                { place: 1, festival: "1Y (17.08.25) - Boys" },
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
                { place: 3, festival: "ANM Dance Festival (14.09.25)" },
                { place: 3, festival: "DEEPFEST WINTER 2025 (21.12.25)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ],
            bonus: 100
        }
    },
    {
        id: "0404.4",
        name: "Budilya",
        class: "", // Будет автоматически рассчитано
        score: 0, // Будет автоматически рассчитано
        photo: "budilya",
        achievements: {
            projects: ["Ateez - In Your Fantasy", "Ateez - Shaboom", "Xikers - Superpower", "Lngshot - Saucin'", "Nexz - One Bite",
                "Ateez - Adrenaline", "One Or Eight - Tokyo Drift", "Katseye - Pinky Up"
            ],
            festivals: ["1Y (17.08.25) - Boys", "CoverLand (14.12.25)", "K-DOM Champ (11.01.26)", "ANM Dance Festival (8.02.26)", 
                        "Venom Fest (19.04.26)", "1Y (3.05.26)"],
            wins: [
                { place: 1, festival: "1Y (17.08.25) - Boys" },
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 2, festival: "ANM Dance Festival (8.02.26)" }
            ]
        }
    },
    {
        id: "1312.3",
        name: "Sai",
        class: "", // Будет автоматически рассчитано
        score: 0, // Будет автоматически рассчитано
        photo: "sai",
        achievements: {
            projects: ["XLOV - 1&Only", "Kid Phenomenon - Party Over There", "Lngshot - Saucin'", "Ateez - Adrenaline", "One Or Eight - Tokyo Drift"],
            festivals: ["DEEPFEST WINTER 2025 (21.12.25)", "K-DOM Champ (11.01.26)", "Venom Fest (19.04.26)", "1Y (3.05.26)"],
            wins: [
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 3, festival: "DEEPFEST WINTER 2025 (21.12.25)" }
            ]
        }
    },
    {
        id: "2710.3",
        name: "Ana",
        class: "", // Будет автоматически рассчитано
        score: 0, // Будет автоматически рассчитано
        photo: "ana",
        achievements: {
            projects: ["Stray Kids - Ceremony", "Stray Kids - Do It", "Nexz - One Bite", "All(h)ours - Ready 2 Rumble", "Katseye - Pinky Up"],
            festivals: ["ANM Dance Festival (8.02.26)", "Coolapalooza (22.03.26)"],
            wins: [
                { place: 2, festival: "ANM Dance Festival (8.02.26)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ]
        }
    },
    {
        id: "2401.2",
        name: "Vanyaslay",
        class: "", // Будет автоматически рассчитано
        score: 0, // Будет автоматически рассчитано
        photo: "vanyaslay",
        achievements: {
            projects: ["All(h)ours - Gotcha", "All(h)ours - Ready 2 Rumble", "One Or Eight - Tokyo Drift"],
            festivals: ["lll кубок Москвы (30.08.25)", "ANM Dance Festival (14.09.25)", "Coolapalooza (22.03.26)", 
                        "Venom Fest (19.04.26)", "1Y (3.05.26)"],
            wins: [
                { place: 1, festival: "1Y (3.05.26)" },
                { place: 3, festival: "ANM Dance Festival (14.09.25)" },
                { place: 3, festival: "Coolapalooza (22.03.26)" }
            ]
        }
    }
];

// Автоматический подсчёт очков для всех рэйсеров
updateRacerScores();

// Функция для загрузки контента на страницу
function loadContent(page) {
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
        default:
            contentDiv.innerHTML = generateHomePage();
    }
}

// Генерация главной страницы
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

// Генерация страницы "О системе"
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

// Генерация страницы ранга

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
                    <img src="${racer.photo}.png" alt="${racer.name}" ${['corey', 'minka', 'tveva', 'vanyaslay'].includes(racer.photo) ? 'class="zoomed"' : ''}>
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
            <!-- Modal remains the same -->
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

// Открыть модальное окно достижений рэйсера
function openRacerAchievements(racerId) {
    const racer = racersData.find(r => r.id === racerId);
    if (!racer) return;

    const achievements = racer.achievements;

    // Генерируем список проектов
    let projectsHTML = '';
    if (achievements.projects && achievements.projects.length > 0) {
        projectsHTML = achievements.projects.map(p => `<li class="achievement-item">${p}</li>`).join('');
    } else {
        projectsHTML = '<li class="achievement-item empty">Нет участий в проектах</li>';
    }

    // Генерируем список фестивалей
    let festivalsHTML = '';
    if (achievements.festivals && achievements.festivals.length > 0) {
        festivalsHTML = achievements.festivals.map(f => `<li class="achievement-item">${f}</li>`).join('');
    } else {
        festivalsHTML = '<li class="achievement-item empty">Нет участий на фестивалях</li>';
    }

    // Генерируем список побед
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
            <div class="achievements-photo"><img src="${racer.photo}.png" alt="${racer.name}"${['corey', 'minka', 'tveva', 'vanyaslay'].includes(racer.photo) ? ' class="zoomed"' : ''}></div>
            <div class="achievements-info">
                <h2 class="achievements-name">${getDisplayName(racer.id, false)}</h2>

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

// Закрыть модальное окно достижений рэйсера
function closeRacerAchievements(event) {
    // Закрыть при клике на оверлей или на кнопку закрытия
    if (!event || event.target === event.currentTarget || event.target.closest('.modal-close')) {
        const modal = document.getElementById('racerAchievementsModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }
    }
}

// Открыть модальное окно "Как это работает"
function openHowItWorksModal() {
    const modal = document.getElementById('howItWorksModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }
}

// Закрыть модальное окно "Как это работает"
function closeHowItWorksModal(event) {
    // Закрыть при клике на оверлей или на кнопку закрытия
    if (!event || event.target === event.currentTarget || event.target.closest('.modal-close')) {
        const modal = document.getElementById('howItWorksModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }
    }
}

// Создание интенсивной матрицы на фоне
function createIntenseMatrix() {
    const matrixContainer = document.getElementById('matrixContainer');
    const digits = ['0', '1', '101', '010', '110', '001', '100', '011'];

    // Создаем много цифр для интенсивного эффекта матрицы
    for (let i = 0; i < 50; i++) {
        const digit = document.createElement('div');
        digit.className = 'matrix-digit';
        digit.textContent = digits[Math.floor(Math.random() * digits.length)];

        // Случайные позиции
        digit.style.left = `${Math.random() * 100}%`;
        digit.style.top = `${Math.random() * 100}%`;

        // Случайная скорость анимации
        const duration = 8 + Math.random() * 15;
        const delay = Math.random() * 5;
        digit.style.animationDuration = `${duration}s`;
        digit.style.animationDelay = `${delay}s`;

        // Случайный размер для большего разнообразия
        const size = 1.5 + Math.random() * 1.5;
        digit.style.fontSize = `${size}rem`;

        matrixContainer.appendChild(digit);
    }

    // Обновляем матрицу каждые 30 секунд для свежести
    setInterval(() => {
        const digits = matrixContainer.querySelectorAll('.matrix-digit');
        digits.forEach(digit => {
            digit.style.left = `${Math.random() * 100}%`;
            digit.style.top = `${Math.random() * 100}%`;
        });
    }, 30000);
}

// Добавление случайной кривизны карточкам при загрузке
function addRandomSkew() {
    const cards = document.querySelectorAll('.id-card');

    // Проверяем, что экран достаточно широкий для 3D-эффекта
    if (window.innerWidth <= 480) {
        // На мобильных устройствах убираем кривизну
        cards.forEach(card => {
            card.style.transform = 'none';
        });
        return;
    }

    cards.forEach(card => {
        // Случайная кривизна для каждой карточки
        const rotateY = (Math.random() * 10 - 5); // от -5 до 5 градусов
        const rotateX = (Math.random() * 6 - 3); // от -3 до 3 градусов
        const rotateZ = (Math.random() * 4 - 2); // от -2 до 2 градусов

        card.style.transform = `perspective(500px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
    });
}

// Инициализация сайта при загрузке
document.addEventListener('DOMContentLoaded', function () {
    // Загружаем главную страницу по умолчанию
    loadContent('home');

    // Создаем интенсивную матрицу
    createIntenseMatrix();

    // Добавляем эффект для следов колес
    const tracks = document.querySelectorAll('.tire-track');
    tracks.forEach(track => {
        track.style.animation = `track-move ${20 + Math.random() * 20}s linear infinite`;
    });

    // Добавляем стиль для анимации следов
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

    // Добавляем пульсацию неоновым элементам
    setTimeout(() => {
        const neonElements = document.querySelectorAll('.neon-stripe, .class-value, .logo-glow');
        neonElements.forEach(el => {
            el.style.animation = 'neon-pulse 2s infinite alternate';
        });
    }, 1000);

    // При изменении контента добавляем кривизну карточкам
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                // Даем время на рендеринг новых карточек
                setTimeout(addRandomSkew, 100);
            }
        });
    });

    const contentDiv = document.getElementById('content');
    observer.observe(contentDiv, { childList: true });
});

// Обработка изменения размера окна для мобильных устройств
window.addEventListener('resize', function () {
    addRandomSkew();
});
updateRacerScores();
