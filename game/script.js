const cardValues = ['^', '*', '&', '%', '$', '#', '@', '!'];
let cards = [];
let openedCards = [];
let timer;
let timeLimit = 60;

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = value;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    const gameContainer = document.querySelector('.memory-game');
    gameContainer.innerHTML = '';

    // Create pairs of cards
    cards = [...cardValues, ...cardValues];
    shuffleArray(cards);

    // Generate cards and append to the container
    cards.forEach(value => {
        const card = createCard(value);
        gameContainer.appendChild(card);
    });

    openedCards = [];
    startTimer();
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    let timeLeft = timeLimit;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleGameEnd(false);
        }
    }, 1000);
}
function flipCard(card) {
    if (openedCards.length < 2 && !card.classList.contains('open')) {
        card.classList.add('open');
        openedCards.push(card);

        if (openedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (openedCards[0].textContent === openedCards[1].textContent) {
        openedCards.forEach(card => card.classList.add('matched'));
    } else {
        openedCards.forEach(card => card.classList.remove('open'));
    }

    openedCards = [];

    if (document.querySelectorAll('.matched').length === cards.length) {
        setTimeout(() => {
            alert('Congratulations! You have won the game!');
            initGame();
        }, 500);
    }
    if (document.querySelectorAll('.matched').length === cards.length) {
        clearInterval(timer);
        setTimeout(() => {
            handleGameEnd(true);
        }, 500);
    }
}

function handleGameEnd(win) {
    if (win) {
        alert('Congratulations! You have won the game!');
    } else {
        alert('Time is up! Game over.');
    }
    initGame();
}


// Initialize the game when the page loads
 window.onload = initGame;
