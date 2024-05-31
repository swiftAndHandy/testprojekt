let basketToggle = false;
let myBasket = [
    {
        'dishNames': [],
        'dishPrices': [],
        'dishAmounts': []
    }
];
const basket = myBasket[0];

function init() {
    includeHTML();
    starRating();
    generateRestaurantOfferHtml();
    fetchLocalStorage();
}

function order() {
    basket['dishNames'] = [];
    basket['dishPrices'] = [];
    basket['dishAmounts'] = [];
    updateBasket();
    document.getElementById('order-confirm-box').classList.add('order-confirm--show');
}

function fetchLocalStorage() {
    let localStorageExists = JSON.parse(localStorage.getItem('dishNames'));
    if (localStorageExists) {
        basket.dishNames = JSON.parse(localStorage.getItem('dishNames'));
        basket.dishPrices = JSON.parse(localStorage.getItem('dishPrices'));
        basket.dishAmounts = JSON.parse(localStorage.getItem('dishAmounts'));
    }
}

function saveAtLocalStorage() {
    localStorage.setItem('dishNames', JSON.stringify(basket['dishNames']));
    localStorage.setItem('dishPrices', JSON.stringify(basket['dishPrices']));
    localStorage.setItem('dishAmounts', JSON.stringify(basket['dishAmounts']));
}

function renderBasket() {
    let basketContent = document.getElementById('basket-content');
    basketContent.innerHTML = '';
    if (basket['dishAmounts'].length < 1) {
        showEmptyBasket(basketContent);
        document.getElementById('basket-bottom').classList.add('d-none');
    } else {
        showBasketItems(basketContent);
        document.getElementById('basket-bottom').classList.remove('d-none');
        showBasketBottom();
    }
}

function showBasketBottom() {
    let output = document.getElementById('basket-bottom');
    let subtotal = calculateCosts();
    let deliveryCosts = 1.49;
    let total = Number(+subtotal + +deliveryCosts);
    output.innerHTML = totalCostsHtml(subtotal, deliveryCosts, total);
}

function calculateCosts() {
    let costs = 0;
    for (let i = 0; i < basket.dishAmounts.length; i++) {
        costs += basket['dishPrices'][i] * basket['dishAmounts'][i]
    }
    return costs;
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

function basketIsEmpty() {
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
        updateBasket();
    } else {
        deleteItem(index);
    }
}

function deleteItem(index) {
    clearAmount(index);
        if (!basket.dishNames.length) {
            basketIsEmpty(false);
        }
        updateBasket();
}

function clearAmount(index) {
    basket['dishNames'].splice(index, 1)
    basket['dishPrices'].splice(index, 1)
    basket['dishAmounts'].splice(index, 1)
}
