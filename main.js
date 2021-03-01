"use strict"

////////////////////////////////////////////////////////////////////
// Product

class Product {
    constructor(code, name, price) {
        this.code = code;
        this.name = name;
        this.price = price;
    }
    isEqual(product){
        return (this.code === product.code);
    }
}

//////////////////////////////////////////
// Catalog

class Catalog {
    constructor(){
        this.items = new Array();
    }
    addProduct(product){
        if(!this.findProduct(product.code)) this.items.push(product);
    }
    findProduct(productCode){
        for(let item of this.items){
            if(item.code == productCode) return item;
        }
        return null;
    }
}

function fillCatalog(){
    catalog.addProduct(new Product("0001", "Smartphone", 21500));
    catalog.addProduct(new Product("0002", "Notebook", 82000));
    catalog.addProduct(new Product("0003", "Tablet", 35000));
}

function drawCatalog(){

    let catalogPlaceHolder = document.querySelector("#catalog");
    
    let catalogElem = document.createElement("table");

    let headerRowElem = document.createElement("tr");
    catalogElem.appendChild(headerRowElem);

    let codeColumnElem = document.createElement("th");
    codeColumnElem.textContent = "Код";
    headerRowElem.appendChild(codeColumnElem);
    
    let nameColumnElem = document.createElement("th");
    nameColumnElem.textContent = "Наименование";
    headerRowElem.appendChild(nameColumnElem);
    
    let priceColumnElem = document.createElement("th");
    priceColumnElem.textContent = "Цена";
    headerRowElem.appendChild(priceColumnElem);
    
    // Empty header for button column
    let buttonColumnElem = document.createElement("th");
    //priceColumnElem.textContent = "Цена";
    headerRowElem.appendChild(buttonColumnElem);
    
    // add items to catalog
    for(let item of catalog.items){
        let prodRowElem = document.createElement("tr");
        catalogElem.appendChild(prodRowElem);

        let prodCodeElem = document.createElement("td");
        prodCodeElem.textContent = item.code;
        prodRowElem.appendChild(prodCodeElem);

        let prodNameElem = document.createElement("td");
        prodNameElem.textContent = item.name;
        prodRowElem.appendChild(prodNameElem);

        let prodPriceElem = document.createElement("td");
        prodPriceElem.textContent = item.price;
        prodRowElem.appendChild(prodPriceElem);

        // cell for button
        let prodButtonElem = document.createElement("td");
        prodRowElem.appendChild(prodButtonElem);
        // button
        let buttonElem = document.createElement("button");
        buttonElem.textContent = "В корзину";
        buttonElem.addEventListener("click", makeProductAdder(item.code));
        prodButtonElem.appendChild(buttonElem);
    }

    catalogPlaceHolder.appendChild(catalogElem);
}

function makeProductAdder(code){
    return function(){
        addProductToBasket(code);
    }
}

function addProductToBasket(code){
    let prod = catalog.findProduct(code);
    basket.addItem(prod, 1);
    drawBasket(document.querySelector("#basket"));
    drawBasketInfo();
}

function switchToBasket(){
    console.log("switchToBasket");
    
    document.querySelector("#main-tab").classList.add("hidden");
    document.querySelector("#basket-tab").classList.remove("hidden");
}

//////////////////////////////////////////
// Basket

class Basket {
    constructor() {
        this.items = new Array();
    }
    addItem(product, qty) {
        for (let item of this.items) {
            if (item.haveProduct(product)) {
                item.addQty(qty);
                return;
            }
        };
        this.items.push(new BasketItem(product, qty));
    }
    removeItem(product, qty) {
        for (let item of this.items) {
            if (item.haveProduct(product)) {
                item.removeQty(qty);
                return;
            }
        };
    }
    countPrice() {
        return this.items.reduce(function (total, item) {
            total.qty += item.qty;
            total.price += item.product.price * item.qty;
            return total; 
        }, {price: 0, qty: 0});
    }
}

class BasketItem{
    constructor(product, qty){
        this.product = product;
        this.qty = qty;
    }
    addQty(qty){
        this.qty += qty;
    }
    removeQty(qty){
        if(this.qty - qty >= 0){
            this.qty -= qty;
        }
        else{
            this.qty = 0;
        }
    }
    haveProduct(product){
        return this.product.isEqual(product);
    }
}

function drawBasket(){

    let basketPlaceHolderElem = document.querySelector("#basket");
    
    //
    let basketTableElem = document.createElement("table");
    
    // table header
    let headerElem = document.createElement("tr");
    basketTableElem.appendChild(headerElem);

    let colProdElem = document.createElement("th");
    colProdElem.textContent = "Товар";
    headerElem.appendChild(colProdElem);
    
    let colQtyElem = document.createElement("th");
    colQtyElem.textContent = "Количество";
    headerElem.appendChild(colQtyElem);
    
    let colPriceElem = document.createElement("th");
    colPriceElem.textContent = "Цена";
    headerElem.appendChild(colPriceElem);
    
    let colTotalElem = document.createElement("th");
    colTotalElem.textContent = "Сумма";
    headerElem.appendChild(colTotalElem);

    let colBtnElem = document.createElement("th");
    colBtnElem.setAttribute("colspan", "2")
    headerElem.appendChild(colBtnElem);

    for(let item of basket.items){
        let basketRowElem = document.createElement("tr");

        let cellProdElem = document.createElement("td");
        cellProdElem.textContent = item.product.name;
        basketRowElem.appendChild(cellProdElem);

        let cellQtyElem = document.createElement("td");
        cellQtyElem.textContent = item.qty;
        basketRowElem.appendChild(cellQtyElem);

        let cellPriceElem = document.createElement("td");
        cellPriceElem.textContent = item.product.price;
        basketRowElem.appendChild(cellPriceElem);

        let cellTotalElem = document.createElement("td");
        cellTotalElem.textContent = item.product.price * item.qty;
        basketRowElem.appendChild(cellTotalElem);

        let buttonIncQtyElem = document.createElement("button");
        buttonIncQtyElem.textContent = "Доб.";
        buttonIncQtyElem.addEventListener("click", makeIncQty(item.product.code));
        let cellIncQtyElem = document.createElement("td");
        cellIncQtyElem.appendChild(buttonIncQtyElem);
        basketRowElem.appendChild(cellIncQtyElem);
       
        let buttonDecQtyElem = document.createElement("button");
        buttonDecQtyElem.textContent = "Уб.";
        buttonDecQtyElem.addEventListener("click", makeDecQty(item.product.code));
        let cellDecQtyElem = document.createElement("td");
        cellDecQtyElem.appendChild(buttonDecQtyElem);
        basketRowElem.appendChild(cellDecQtyElem);

        // add row to table
        basketTableElem.appendChild(basketRowElem);
    }
    
    basketPlaceHolderElem.replaceChildren(basketTableElem);
}

function makeIncQty(code){
    return function(){
        incQty(code);
    }
}

function incQty(code){
    let prod = catalog.findProduct(code);
    basket.addItem(prod, 1);
    drawBasket(document.querySelector("#basket"));
}

function makeDecQty(code){
    return function(){
        decQty(code);
    }
}

function decQty(code){
    let prod = catalog.findProduct(code);
    basket.removeItem(prod, 1);
    drawBasket(document.querySelector("#basket"));
}


function drawBasketInfo(){
    
    let basketInfoElem = document.querySelector("#basket_info");

    let headerElem = document.createElement("h2");
    headerElem.textContent = "Корзина";

    let contentElem = document.createElement("p");
    let total = basket.countPrice();
    if(total.qty == 0){
        contentElem.textContent = "Корзина пуста";
    } else {
        contentElem.textContent = `В корзине ${total.qty} товаров на сумму ${total.price} рублей`;
    }

    basketInfoElem.replaceChildren(headerElem, contentElem);
}

var curBasketTab = 0;
function basketTabNext(){
    if(curBasketTab < 2) {
        curBasketTab++;
    }
    else{
        curBasketTab = 0;
    }

    let basketElem = document.querySelector("#basket-out");
    let addressElem = document.querySelector("#address");
    let commentElem = document.querySelector("#comment");
    
    switch(curBasketTab){
        case 0:
            basketElem.classList.remove("hidden");
            addressElem.classList.add("hidden");
            commentElem.classList.add("hidden");
            break;
        case 1:
            basketElem.classList.add("hidden");
            addressElem.classList.remove("hidden");
            commentElem.classList.add("hidden");
            break;
        case 2:
            basketElem.classList.add("hidden");
            addressElem.classList.add("hidden");
            commentElem.classList.remove("hidden");
            break;
    }
}

//////////////////////////////////////////
// initialize

var catalog = new Catalog();
fillCatalog();

var basket = new Basket();

