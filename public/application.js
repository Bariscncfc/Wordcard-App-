const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const englishWordEl = document.getElementById('english');
const turkishWordEl = document.getElementById('turkish');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const intro = document.getElementById('intro');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();


function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}


function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if( index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>
        ${data.english}
        </p>
    </div>
    <div class="inner-card-back">
        <p>${data.turkish}</p>
    </div>
</div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}
// Number of cards
function updateCurrentText () {
    currentEl.innerText = `${currentActiveCard+1}/${cardsEl.length}`;
}

// Get cards from localstorage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ?  [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event Listeners

//Next Button

document.getElementById('next').addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if(currentActiveCard > cardsEl.length -1) {
        currentActiveCard = cardsEl.length -1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Prev Button

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard <0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Show add Container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add Container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card

addCardBtn.addEventListener('click', () => {
    const english = englishWordEl.value;
    const  turkish = turkishWordEl.value;

    if(english.trim() && turkish.trim()) {
        const newCard = { english, turkish}

        createCard(newCard);


        englishWordEl.value='';
        turkishWordEl.value='';

        addContainer.classList.remove('show');
        

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// Clear card btn

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});