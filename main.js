"use strict"

function showChessBoard(chessBoard){

    // create columns header

    let columnsHeader = document.createElement("tr");
    chessBoard.appendChild(columnsHeader);
    // first cell over row header
    let emptyCell = document.createElement("th");
    emptyCell.setAttribute("class", "cell")
    columnsHeader.appendChild(emptyCell);
    //
    let columns = ['A','B','C','D','E','F','G','H']; 
    for(let i of columns){
        let columnHeader = document.createElement("th");
        columnHeader.setAttribute("class", "cell")
        columnHeader.innerHTML = i;
        columnsHeader.appendChild(columnHeader);
    }

    // create board
    for(let i = 1; i < 9; i++){
        // add new row
        let row = document.createElement("tr");
        chessBoard.appendChild(row);
        // add row header
        let rowHeader = document.createElement("td");
        rowHeader.setAttribute("class", "cell rowheader")
        rowHeader.innerHTML = String(i);
        row.appendChild(rowHeader);
        
        // add cells to row
        for(let j = 1; j < 9; j++){
            let cell = document.createElement("td");
            cell.setAttribute("class", "cell")
            row.appendChild(cell);
        }
    }
}

class Product {
    constructor(code, name, price) {
        this.code = code;
        this.name = name;
        this.price = price;
    }
    equal(product){
        return this.code === product.code;
    }
}

class Catalog {
    constructor(){
        this.items = new Array();
    }
    add(product){
        if(!find(product.code)) this.items.push(product);
    }
    find(productCode){
        for(let item of this.items){
            if(item.code == productCode) return item;
        }
        return null;
    }
}

function fullCatalog(){
    catalog.add(new Product("0001", "Smartphone", 21500));
    catalog.add(new Product("0002", "Notebook", 82000));
    catalog.add(new Product("0003", "Tablet", 35000));
}

function showCatalog(catalogElem){
    // add items to catalog
    for(let item of catalog.items){
        let prodRowElem = document.createElement("tr");
        catalogElem.appendChild(prodRowElem);

        let prodCodeElem = document.createElement("td");
        prodCodeElem.innerText = item.code;
        prodRowElem.appendChild(prodCodeElem);

        let prodNameElem = document.createElement("td");
        prodNameElem.innerText = item.name;
        prodRowElem.appendChild(prodNameElem);

        let prodPriceElem = document.createElement("td");
        prodPriceElem.innerText = item.price;
        prodRowElem.appendChild(prodPriceElem);
    }
}

class Basket {
    constructor() {
        this.items = new Array();
    }
    addItem(productCode, qty) {
        for (let item of this.items) {
            if (item.productCode == productCode) {
                item.addQty(qty);
                break;
            }
        };
        this.items.push(new BasketItem(productCode, qty));
    }
    countPrice() {
        return this.items.reduce(function (total, item) {
            let prod = catalog.find(item.productCode);
            total.qty += item.qty;
            total.price += prod.price * item.qty;
            return total; 
        }, {price: 0, qty: 0});
    }
}

class BasketItem{
    constructor(productCode, qty){
        this.productCode = productCode;
        this.qty = qty;
    }
    addQty(qty){
        this.qty += qty;
    }
}

function fullBasket(){
    basket.addItem("0001", 15);
    basket.addItem("0002", 10);
    basket.addItem("0003", 5);
}

function showBasket(basketElem){

    let basketInfo = "Корзина пуста";
    let basketTotal = basket.countPrice();
    if(basketTotal.qty>0){
        basketInfo = "В корзине " + basketTotal.qty + " товаров на сумму " + basketTotal.price + " рублей";
    }

    basketElem.innerText = basketInfo;
}


// initialize

var catalog = new Catalog();
fullCatalog();

var basket = new Basket();
fullBasket();
