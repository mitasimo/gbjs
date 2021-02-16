"use strict"

////////////////////////////////////////////////////////////////////
// task 1

function showChessBoard(placeHolder){

    let chessBoard = document.createElement("table");
    
    // columns header
   showColumnHeader(chessBoard);

    // create board
    for(let i = 8; i > 0; i--){
        // add new row
        let row = document.createElement("tr");
        chessBoard.appendChild(row);
        
        // add row header at left side
        showRowHeader(row, i);

        let isOddRow = (i % 2) > 0;
        
        // add cells to row
        for(let j = 1; j < 9; j++){
            let isOddColumn = (j % 2) > 0;
            let cell = document.createElement("td");
            cell.classList.add("cell");
            if(isOddRow == isOddColumn)
                cell.style.backgroundColor = "#000";
            row.appendChild(cell);
        }

        // add row header at right side
        showRowHeader(row, i);
   }

    showColumnHeader(chessBoard);

    // add chess board to DOM
    placeHolder.appendChild(chessBoard);
}

function showColumnHeader(parentElem){
    
    // create row for header
    let headerRowElem = document.createElement("tr");
    parentElem.appendChild(headerRowElem);
    
    // first cell over row header
    let emptyCellElem = document.createElement("th");
    emptyCellElem.classList.add("cell");
    headerRowElem.appendChild(emptyCellElem);
    //
    let columns = ['A','B','C','D','E','F','G','H']; 
    for(let i of columns){
        let headerCellElem = document.createElement("th");
        headerCellElem.classList.add("cell");
        headerCellElem.textContent = i;
        headerRowElem.appendChild(headerCellElem);
    }
}

function showRowHeader(parentRowElem, lineNum){
    let cell = document.createElement("td");
    cell.classList.add("cell");
    cell.classList.add("rowheader");
    cell.textContent = String(lineNum);
    parentRowElem.appendChild(cell);
}

////////////////////////////////////////////////////////////////////
// task 2 and 3

////////////////////////////////////////////////////////////////////
// common classes for catalog and basket

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
    }

    catalogPlaceHolder.appendChild(catalogElem);
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
                break;
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

function fillBasket(){
    basket.addItem(catalog.findProduct("0001"), 15);
    basket.addItem(catalog.findProduct("0002"), 10);
    basket.addItem(catalog.findProduct("0003"), 5);
}

function showBasket(basketElem){

    let basketInfo = "Корзина пуста";
    let basketTotal = basket.countPrice();
    if(basketTotal.qty>0){
        basketInfo = `В корзине ${basketTotal.qty} товаров на сумму ${basketTotal.price} рублей`;
    }

    basketElem.innerText = basketInfo;
}

//////////////////////////////////////////
// initialize

var catalog = new Catalog();
fillCatalog();

var basket = new Basket();
fillBasket();
