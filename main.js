"use strict"

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


function testBasket(){

    // create products
    let smartphone = createProduct(1, "Smartphone", 25000);
    let notebook = createProduct(2, "Notebook", 87500);
    let computer = createProduct(3, "Computer", 176500);

    // create basket
    let basket = createBasket();
    // add products to basket
    basket.addProduct(smartphone, 5);
    basket.addProduct(smartphone, 15);
    basket.addProduct(notebook, 2);
    basket.addProduct(notebook, 5);
    basket.addProduct(computer, 2);
    basket.addProduct(computer, 5);

    // count and print basket price
    console.log("Total basket price = " + basket.countPrice());
}

function createBasket(){
    return {
        // busket items
        items: new Array(),
        
        addProduct: function(newProduct, addQty){
            for(let item of this.items){
                if(item.product.code == newProduct.code){
                    item.qty += addQty;
                }
            };
            this.items.push({product: newProduct, qty: addQty});
        },

        countPrice: function(){
            return this.items.reduce(function(total, item){
                return total + item.product.price * item.qty;
            }, 0);
        }
    };
}

function createProduct(prodCode, prodName, prodPrice){
    return {code: prodCode, name: prodName, price: prodPrice};
}