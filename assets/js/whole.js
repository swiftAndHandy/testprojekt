let basketToggle = false;
let myBasket = [
    {
        'dishNames': [],
        'dishPrices': [],
        'dishAmounts': []
    }
];
const basket = myBasket[0];

window.onload = function () {
    // Code hier ausführen
    init();
};

function init() {
    includeHTML();
    starRating();
    generateRestaurantOfferHtml();
    fetchLocalStorage();
}

function fetchLocalStorage() {
    let localStorageExists = JSON.parse(localStorage.getItem('dishNames'));
    if (localStorageExists) {
        basket.dishNames = JSON.parse(localStorage.getItem('dishNames'));
        basket.dishPrices = JSON.parse(localStorage.getItem('dishPrices'));
        basket.dishAmounts = JSON.parse(localStorage.getItem('dishAmounts'));
        // basketFilled(true);
    }
}

function saveAtLocalStorage() {
    localStorage.setItem('dishNames', JSON.stringify(basket['dishNames']));
    localStorage.setItem('dishPrices', JSON.stringify(basket['dishPrices']));
    localStorage.setItem('dishAmounts', JSON.stringify(basket['dishAmounts']));
}

// function fetchFromLocalStorage() {

// }

function renderBasket() {
    let basketContent = document.getElementById('basket-content');
    basketContent.innerHTML = '';
    if (basket['dishAmounts'].length < 1) {
        showEmptyBasket(basketContent);
    } else {
        showBasketItems(basketContent);
    }
}

function showEmptyBasket(basketContent) {
    basketContent.innerHTML = `
    <img src="./assets/icons/basket.svg" alt="">
    <h2>Fülle deinen Warenkorb</h2>
    `;
}

function showBasketItems(basketContent) {
    for (let i = 0; i < basket['dishAmounts'].length; i++) {
        basketContentHtml(basketContent, i);
    }
}

function basketFilled() {
    let basketContent = document.getElementById('basket-content');
        basketContent.innerHTML = emptyBasketHtml();
}

function toggleBasket() {
    basketToggle = !basketToggle;
    let basketClass = document.getElementById('basket').classList;
    if (basketToggle) {
        basketClass.add('basket--mobile');
        document.body.classList.add('scrolling--forbidden');
    } else {
        basketClass.remove('basket--mobile');
        document.body.classList.remove('scrolling--forbidden');
    }
}

function fetchDish(categoryId, dishId) {
    return categorys[categoryId]['dishes'][dishId];
}

function getBasketIndex(categoryId, dishId) {
    let dish = fetchDish(categoryId, dishId);
    return basket.dishNames.indexOf(dish['name']);
}

function addDish(categoryId, dishId) {
    const index = getBasketIndex(categoryId, dishId);
    evaluateIndex(index, categoryId, dishId);
}

function evaluateIndex(index, categoryId, dishId) {
    if (index == -1) {
        addInitial(categoryId, dishId);
    } else {
        increaseAmount(index);
    }
}

function addInitial(categoryId, dishId) {
    let dish = fetchDish(categoryId, dishId);
    basket.dishNames.push(dish['name']);
    basket.dishPrices.push(dish['price']);
    basket.dishAmounts.push(1);
    updateBasket();
}

function increaseAmount(index) {
    ++basket['dishAmounts'][index];
    updateBasket();
}

function updateBasket() {
    renderBasket();
    saveAtLocalStorage();
}

function decreaseAmount(index) {
    if (basket['dishAmounts'][index] > 1) {
        --basket['dishAmounts'][index];
    } else {
        clearAmount(index);
        if (!basket.dishNames.length) {
            basketFilled(false);
        }
    }
    updateBasket();
}

function clearAmount(index) {
    basket['dishNames'].splice(index, 1)
    basket['dishPrices'].splice(index, 1)
    basket['dishAmounts'].splice(index, 1)
}

