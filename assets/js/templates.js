async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    renderBasket();
}

function basketContentHtml(basketContent, index) {
    basketContent.innerHTML += `
    <div class="basket__dish-card" id="dish-card-id${index}">
    <table class="basket__dish-table">
        <tr>
            <td class="basket__dish-table__amount">${basket['dishAmounts'][index]}</td>
            <td colspan="2" class="basket__dish-table__item">${basket['dishNames'][index]}</td>
             <td class="basket__dish-table__price">${Number(basket['dishPrices'][index]).toFixed(2)} €</td>
        </tr>
        <tr>
            <td></td>
            <td colspan="2" class="basket__item-total">Gesamtpreis:</td>
            <td>${Number(basket['dishPrices'][index] * basket['dishAmounts'][index]).toFixed(2)} €</td>
        </tr>
        <tr class="basket__dish-table__order-section">
            <td class="basket__dish-calc">
                <img src="./assets/icons/minus.svg" class="basket__dish--change-amount" onclick="decreaseAmount(${index})">
            </td>
            <td>${basket['dishAmounts'][index]}</td>
            <td class="basket__dish-calc">
                <img src="./assets/icons/plus.svg" class="basket__dish--change-amount" onclick="increaseAmount(${index})">
            </td>
            <td><button class="basket__dish--delete" onclick="deleteItem(${index})">Löschen</button></td>
        </tr>
    </table>
    </div>`;
}

function totalCostsHtml(subtotal, deliveryCosts, total) {
    return `
    <div class="basket__total">
        <span>Warenpreis: </span>
        <span>${Number(subtotal).toFixed(2)} €</span>
    </div>
    <div class=basket__total>
        <span>Lieferkosten:</span>
        <span>${Number(deliveryCosts).toFixed(2)} €</span>
    </div>
    <div class="basket__total">
        <span>Gesamtpreis:</span>
        <span>${Number(total).toFixed(2)} €</span>
    </div>
    <div class="submit">
        <button onclick="order()">Jetzt kostenpflichtig bestellen</button>
    </div>
    `;
}


function starRating() {
    let starCounter = 4;
    drawStars();
    colorStars(starCounter);
    reviewAmount(113);
}

function drawStars() {
    for (let i = 0; i < 5; i++) {
        document.getElementById('restaurant-stars').innerHTML += /*HTML*/ `
            <img src="./assets/icons/star.svg" alt="" id="star-id-${i}" class="">
            `;
    }
}

function colorStars(starRating) {
    for (i = 0; i < starRating; i++) {
        document.getElementById('star-id-' + i).classList.add('restaurant__overview__stars--colored');
    }
}

function reviewAmount(number) {
    return document.getElementById('restaurant-stars').innerHTML += `<span class="restaurant__overview__counter">(${number} Bewertungen)</span>`
}

function generateRestaurantOfferHtml() {
    generateCategorysHtml()
    generateDishesInfoHtml()
}

function generateCategorysHtml() {
    document.getElementById('category-container').innerHTML = '';

    for (let i = 0; i < categorys.length; i++) {
        document.getElementById('category-container').innerHTML += `
        <section class="dishes__category-box" id="dishes-category-box-id${i}">`;
        document.getElementById('dishes-category-box-id' + i).innerHTML += generatePreviewImage(categorys[i]['image'], categorys[i]['alt']);
        document.getElementById('dishes-category-box-id' + i).innerHTML += `<h2 id="category-headline-id${i}">${categorys[i]['name']}</h2>
        </section>
    `;
    }
}

function generatePreviewImage(image, alt) {
    if (image, alt) {
        return `<img src="./assets/img/${image}" alt="${alt}" class="dishes__category-box--preview"></img>`;
    } else {
        return ``;
    }
}

function generateDishesInfoHtml() {
    for (let i = 0; i < categorys.length; i++) {
        let dishesBox = document.getElementById('dishes-category-box-id' + i);

        for (let dishId = 0; dishId < categorys[i].dishes.length; dishId++) {
            dishesBox.innerHTML += generateDishesOrderHtML(i, dishId);

            let descriptionTarget = document.getElementById('dishes-info-card-category' + i + '-item' + dishId);
            descriptionTarget.innerHTML += generateDishDescription(i, dishId);
        }
    }
}

function generateDishesOrderHtML(categoryId, dishId) {
    return `
    <div class="dishes__info-card" id="dishes-info-card-category${categoryId}-item${dishId}">
        <div class="dishes__info-card__order" id="dishes-info-card-order-category${categoryId}-item${dishId}">
            <h3 class="dishes__info-card__headline">${categorys[categoryId].dishes[dishId].name}</h3>
            <button class="dishes__info-card__plus-button" onclick="addDish(${categoryId}, ${dishId})">+</button>
        </div>
    </div>
        `;
}

function generateDishDescription(categoryId, dishId) {
    return `
        <p class="dishes__info-card__description">${categorys[categoryId].dishes[dishId].description}</p>
        <span class="dishes__info-card__price-tag"><b>${categorys[categoryId].dishes[dishId].price} €</b></span>
    `
}

function emptyBasketHtml() {
    return `
    <img src="./assets/icons/basket.svg" alt="">
    <h2>Fülle deinen Warenkorb</h2>
    `;
}