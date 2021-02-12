"use strict"

// Task 1

function testNumber2Object(){
    console.log(number2Object(3));
    console.log(number2Object(25));
    console.log(number2Object(456));
    console.log(number2Object(1005));
}

function number2Object(num){

    let intNum = Math.trunc(num);
    if(intNum > 999){
        console.log("Number greater than 999");
        return {};
    }

    let hundreds = Math.trunc(intNum / 100);
    intNum -= hundreds * 100;

    let tens = Math.trunc(intNum / 10);
    let units = intNum - tens * 10;

    return {"сотни" : hundreds, "десятки" : tens , "единицы" : units};
}

// Task 2

function testBasket(){

    // create catalog
    let smartphone = new Product(1, "Smartphone", 25000);
    let notebook = new Product(2, "Notebook", 87500);
    let computer = new Product(3, "Computer", 176500);

    // create basket
    let basket = new Basket();
    // add products to basket
    basket.addItem(smartphone, 5);
    basket.addItem(smartphone, 15);
    basket.addItem(notebook, 2);
    basket.addItem(notebook, 5);
    basket.addItem(computer, 2);
    basket.addItem(computer, 5);

    // count and print basket price
    console.log("Total basket price = " + basket.countPrice());
}

class Basket {
    constructor() {
        this.items = new Array();
    }
    addItem(product, qty) {
        for (let item of this.items) {
            if (item.product.equal(product)) {
                item.addQty(qty);
                break;
            }
        };
        this.items.push(new BasketItem(product, qty));
    }
    countPrice() {
        return this.items.reduce(function (total, item) {
            return total + item.product.price * item.qty;
        }, 0);
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
