const levelsData = [
    {
        id: 'birds',
        title: 'Пение птиц',
        cover: 'image/covers/Birds.png',
        sfxDir: 'sfx/Birds',
        sounds: ['Aist.mp3', 'Albatros.mp3', 'Baklan.mp3', 'Berkut.mp3', 'Burevestniki.mp3', 'CHibis.mp3', 'Chizh.mp3', 'Serebristye_chaiki.mp3']
    },
    {
        id: 'instruments',
        title: 'Музыкальные инструменты',
        cover: 'image/covers/MusicalInstruments.png',
        sfxDir: 'sfx/MusicalInstruments',
        sounds: ['andean-flute-theme-low_fybeqsnu1.mp3', 'cdb297d118feab7.mp3', 'dre_niy-egipet-z_uki-dre_ney-arfy.mp3', 'drunk-gopnik-russian-domra-type-loop.mp3', 'e2e96f49fdf64d1.mp3', 'psychedelic-double-bass-ambience_f1j6bre_.mp3', 'veselye-gusi.mp3', 'violin-trill_mk15cun_.mp3']
    },
    {
        id: 'industrial',
        title: 'Индустриальные звуки',
        cover: 'image/covers/Industrial.png',
        sfxDir: 'sfx/Industrial',
        sounds: ['295360182851ef4.mp3', '35bc40fbc3e232c.mp3', '78533694f7eb814.mp3', '86fbc186f5353e8.mp3', '93a4ca6f1041e75.mp3', 'b523a415ec112bb.mp3', 'bc0e1442d93a89f.mp3', 'd3192cf3c125651.mp3']
    },
    {
        id: 'office',
        title: 'Орг. техника',
        cover: 'image/covers/OfficeEquipment.png',
        sfxDir: 'sfx/OfficeEquipment',
        sounds: ['fax-machine-connect-tone-long_fkp9n2no.mp3', 'fax-machine-operate_f10kn2nu.mp3', 'fax-printing-message_mj6nesvu.mp3', 'sound-effects-library-epson-stylus-computer-printer-working.mp3', 'zvuk-faks.mp3', 'zvuk-printera-matrichnyy-printer.mp3', 'zvuk-printera.mp3', 'zvuk-printeratanec-printera.mp3']
    },
    {
        id: 'horn',
        title: 'Автомобильные гудки',
        cover: 'image/covers/Horn.png',
        sfxDir: 'sfx/Horn',
        sounds: ['00210.mp3', '04267.mp3', '04269.mp3', '04271.mp3', '08551.mp3', '08553.mp3', '10231.mp3', 'b0dedd1433038be.mp3']
    },
    {
        id: 'loudspeaker',
        title: 'Звуки перед объявлениями',
        cover: 'image/covers/Loudspeaker.png',
        sfxDir: 'sfx/Loudspeaker',
        sounds: ['005defdd558efbc.mp3', '18b6c8a3b6375db.mp3', '4080f703dd6d4d1.mp3', '7209991294adc99.mp3', '91ab110429bd500.mp3', 'ac28b09ea972d6c.mp3', 'dd3987ac8379932.mp3', 'informator-na-_okzale.mp3']
    },
    {
        id: 'piano',
        title: 'Ноты на пианино',
        cover: 'image/covers/Piano.png',
        sfxDir: 'sfx/Piano',
        sounds: ['ending-sound-effect.mp3', 'fa.mp3', 'lja.mp3', 'mi.mp3', 'noty-do.mp3', 're.mp3', 'si.mp3', 'sol.mp3']
    },
    {
        id: 'splash',
        title: 'Всплески воды',
        cover: 'image/covers/Splash.png',
        sfxDir: 'sfx/Splash',
        sounds: ['bystrye-shagi-po-luzham.mp3', 'puddle-small-splashes_z1m5br4_.mp3', 'puddle-splash-2_mkyi9gvd.mp3', 'small-puddle-plushes_mkdqeseo.mp3', 'z_uki_-shagi-i-beg-beg-po-glubokim-luzham.mp3', 'zvuk-luzhi.mp3', 'zvuk-shagov-po-luzham.mp3', 'zvuk-shagov-po-vode.mp3']
    },
    {
        id: 'whistle',
        title: 'Свистки в спортивных матчах',
        cover: 'image/covers/Whistle.png',
        sfxDir: 'sfx/Whistle',
        sounds: ['4c1bda618d3b3f6.mp3', 'denis-nikonov-zvuk-svistka-chme3-3274.mp3', 'dr_-sound-effects-police-whistle-two-sharp-blows.mp3', 'sound-ideas-wolf-whistle.mp3', 'whistle_blow_weak_broken_mostly_breath_noise_002_50085.mp3', 'whistle_haaa.mp3', 'zakon_002.mp3', 'zvuki-svistok.mp3']
    },
    {
        id: 'engine',
        title: 'Звуки двигателей',
        cover: 'image/covers/Engine.png',
        sfxDir: 'sfx/Engine',
        sounds: ['00292.mp3', '07221.mp3', '11a70f994753862.mp3', '5bf8bb0557e4baf.mp3', 'bmw-zvuk-motora-s-turbinami-v8.mp3', 'cbb115cd9d4f69a.mp3', 'gelendvagen-zvuk-motora.mp3', 'porshe-cayenne-zvuk-motora.mp3']
    }
];

let gameState = {
    currentLevelIndex: -1,
    moves: 0,
    matches: 0,
    selectedCards: [],
    levelStars: {}, // levelId: stars
    isProcessing: false,
    currentAudio: null
};

let ysdk;

// Initialize Yandex SDK
YaGames.init().then(_sdk => {
    ysdk = _sdk;
});

function showFullscreenAd(callback) {
    if (ysdk) {
        ysdk.adv.showFullscreenAdv({
            callbacks: {
                onClose: function(wasShown) {
                    if (callback) callback();
                },
                onError: function(error) {
                    if (callback) callback();
                }
            }
        });
    } else {
        if (callback) callback();
    }
}

function showRewardedVideo(callback) {
    if (ysdk) {
        ysdk.adv.showRewardedVideo({
            callbacks: {
                onOpen: () => {
                    console.log('Video ad open.');
                },
                onRewarded: () => {
                    if (callback) callback();
                },
                onClose: () => {
                    console.log('Video ad closed.');
                },
                onError: (e) => {
                    console.log('Error while open video ad:', e);
                }
            }
        });
    } else {
        // For development/testing
        if (callback) callback();
    }
}

function useHint() {
    if (gameState.isProcessing) return;

    showRewardedVideo(() => {
        const unmatched = Array.from(document.querySelectorAll('.card:not(.matched)'));
        if (unmatched.length < 2) return;

        // Find a pair
        const soundMap = {};
        for (let card of unmatched) {
            const s = card.dataset.sound;
            if (soundMap[s]) {
                // Found a pair!
                const card1 = soundMap[s];
                const card2 = card;

                gameState.isProcessing = true;
                card1.classList.add('selected');
                card2.classList.add('selected');

                setTimeout(() => {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    card1.classList.remove('selected');
                    card2.classList.remove('selected');
                    gameState.matches++;
                    gameState.isProcessing = false;

                    if (gameState.matches === 8) {
                        endLevel();
                    }
                }, 1000);
                return;
            }
            soundMap[s] = card;
        }
    });
}

// Initialize level stars from localStorage if available
try {
    const savedStars = localStorage.getItem('memo-sounds-stars');
    if (savedStars) {
        gameState.levelStars = JSON.parse(savedStars);
    }
} catch (e) {
    console.error('Could not load stars from localStorage', e);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');

    if (screenId === 'menu-screen') {
        renderLevelList();
    } else if (screenId === 'results-screen') {
        renderFinalStats();
    }
}

function renderLevelList() {
    const list = document.getElementById('level-list');
    list.innerHTML = '';
    levelsData.forEach((level, index) => {
        const card = document.createElement('div');
        card.className = 'level-card';
        const stars = gameState.levelStars[level.id] || 0;
        card.innerHTML = `
            <img src="${level.cover}" alt="${level.title}">
            <div>${level.title}</div>
            <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
        `;
        card.onclick = () => startLevel(index);
        list.appendChild(card);
    });
}

function renderFinalStats() {
    const stats = document.getElementById('final-stats');
    stats.innerHTML = '';
    levelsData.forEach(level => {
        const stars = gameState.levelStars[level.id] || 0;
        const row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `
            <span>${level.title}</span>
            <span class="stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</span>
        `;
        row.style.cursor = 'pointer';
        row.onclick = () => startLevel(levelsData.indexOf(level));
        stats.appendChild(row);
    });
}

function startLevel(index) {
    gameState.currentLevelIndex = index;
    gameState.moves = 0;
    gameState.matches = 0;
    gameState.selectedCards = [];
    gameState.isProcessing = false;
    stopCurrentAudio();

    const level = levelsData[index];
    document.getElementById('level-title').textContent = level.title;
    document.getElementById('move-count').textContent = `Ходы: 0`;

    // Unique style per level
    document.body.className = `level-theme-${level.id}`;

    const cards = [];
    level.sounds.forEach(sound => {
        // Create pairs
        cards.push({ sound, id: Math.random() });
        cards.push({ sound, id: Math.random() });
    });

    shuffle(cards);
    renderGrid(cards);
    showScreen('game-screen');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderGrid(cards) {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    const level = levelsData[gameState.currentLevelIndex];

    cards.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.sound = cardData.sound;
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = level.cover;
        card.appendChild(img);

        card.onclick = () => handleCardClick(card);
        container.appendChild(card);
    });
}

function handleCardClick(card) {
    if (gameState.isProcessing || card.classList.contains('selected') || card.classList.contains('matched')) {
        return;
    }

    const soundName = card.dataset.sound;
    const level = levelsData[gameState.currentLevelIndex];
    const soundPath = `${level.sfxDir}/${soundName}`;

    // Interrupt previous sound
    stopCurrentAudio();

    // Play new sound
    gameState.currentAudio = new Audio(soundPath);
    gameState.currentAudio.play().catch(e => console.error('Audio play failed', e));

    // Selection logic
    card.classList.add('selected');
    gameState.selectedCards.push(card);

    if (gameState.selectedCards.length === 2) {
        gameState.moves++;
        document.getElementById('move-count').textContent = `Ходы: ${gameState.moves}`;
        checkMatch();
    }
}

function checkMatch() {
    gameState.isProcessing = true;
    const [card1, card2] = gameState.selectedCards;

    if (card1.dataset.sound === card2.dataset.sound) {
        // Match
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            stopCurrentAudio(); // Stop sound after cards disappear
            gameState.matches++;
            gameState.selectedCards = [];
            gameState.isProcessing = false;

            if (gameState.matches === 8) {
                endLevel();
            }
        }, 500);
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            gameState.selectedCards = [];
            gameState.isProcessing = false;
        }, 1000);
    }
}

function endLevel() {
    const moves = gameState.moves;
    let stars = 1;
    if (moves <= 12) stars = 5;
    else if (moves <= 16) stars = 4;
    else if (moves <= 20) stars = 3;
    else if (moves <= 25) stars = 2;

    const currentLevel = levelsData[gameState.currentLevelIndex];
    if (!gameState.levelStars[currentLevel.id] || stars > gameState.levelStars[currentLevel.id]) {
        gameState.levelStars[currentLevel.id] = stars;
        localStorage.setItem('memo-sounds-stars', JSON.stringify(gameState.levelStars));
    }

    // Show modal
    const modal = document.getElementById('level-end-modal');
    const starContainer = document.getElementById('star-rating');
    starContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = i <= stars ? 'star active' : 'star';
        star.textContent = '★';
        starContainer.appendChild(star);
    }

    modal.classList.remove('hidden');
}

function stopCurrentAudio() {
    if (gameState.currentAudio) {
        gameState.currentAudio.pause();
        gameState.currentAudio.currentTime = 0;
        gameState.currentAudio = null;
    }
}

// Initial screen
window.onload = () => {
    showScreen('menu-screen');

    document.getElementById('back-to-menu').onclick = () => showScreen('menu-screen');
    document.getElementById('back-to-start').onclick = () => showScreen('menu-screen');
    document.getElementById('hint-button').onclick = useHint;

    document.getElementById('replay-button').onclick = () => {
        showFullscreenAd(() => {
            document.getElementById('level-end-modal').classList.add('hidden');
            startLevel(gameState.currentLevelIndex);
        });
    };

    document.getElementById('next-button').onclick = () => {
        showFullscreenAd(() => {
            document.getElementById('level-end-modal').classList.add('hidden');
            if (gameState.currentLevelIndex < levelsData.length - 1) {
                startLevel(gameState.currentLevelIndex + 1);
            } else {
                showScreen('results-screen');
            }
        });
    };
};
