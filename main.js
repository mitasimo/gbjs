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

function showCatalog(catalogPlaceHolder){
    
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
        buttonElem.value = item.code;
        buttonElem.addEventListener("click", addProductToBasket);
        prodButtonElem.appendChild(buttonElem);
    }

    catalogPlaceHolder.appendChild(catalogElem);
}

function addProductToBasket(event){
    let prod = catalog.findProduct(event.originalTarget.value);
    basket.addItem(prod, 1);
    showBasket(document.querySelector("#basket"));
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
    haveProduct(product){
        return this.product.isEqual(product);
    }
}

function showBasket(basketElem){
    
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

    let totalQty = 0;
    let totalPrice = 0;

    for(let curLine of basket.items){
        let basketRowElem = document.createElement("tr");

        let cellProdElem = document.createElement("td");
        cellProdElem.textContent = curLine.product.name;
        basketRowElem.appendChild(cellProdElem);

        let cellQtyElem = document.createElement("td");
        cellQtyElem.textContent = curLine.qty;
        basketRowElem.appendChild(cellQtyElem);

        let cellPriceElem = document.createElement("td");
        cellPriceElem.textContent = curLine.product.price;
        basketRowElem.appendChild(cellPriceElem);

        let cellTotalElem = document.createElement("td");
        cellTotalElem.textContent = curLine.product.price * curLine.qty;
        basketRowElem.appendChild(cellTotalElem);

        basketTableElem.appendChild(basketRowElem);

        totalQty += curLine.qty;
        totalPrice += curLine.product.price * curLine.qty;
    }
    
    let totalElem = document.createElement("p");
    
    if(totalQty == 0){
        totalElem.textContent = "Корзина пуста";
    } else {
        totalElem.textContent = `В корзине ${totalQty} товаров на сумму ${totalPrice} рублей`;
    }

    //basketElem.textContent = "";
    //while (basketElem.lastElementChild) {
    //    basketElem.removeChild(basketElem.lastElementChild);
    //}
    basketElem.replaceChildren(basketTableElem, totalElem);
    //basketElem.appendChild(basketTableElem);
    //basketElem.appendChild(totalElem);
}

//////////////////////////////////////////
// initialize

var catalog = new Catalog();
fillCatalog();

var basket = new Basket();

