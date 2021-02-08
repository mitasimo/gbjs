"use strict"

// run all tasks

function tasks(){
	console.log("task 1 ==========");
	task1();
	console.log("task 2, 3 =======");
	task2_3();
	console.log("task 4 ==========");
	task4();
	console.log("task 5 ==========");
	task5();
}

// task 1

function task1(){
	let r = [];
	// init array
	for(let i=2; i<=100; i++){
		r[i] = true;
	}
	// define numbers is not a prime
	for(let i=2; i<=100; i++){
		if(i){
			// current i is a prime number
			for(let j=i*i; j<=100; j+=i){
				r[j] = false;
			}
		}
	}
	// print prime numbers
	for(let i=2; i<=100; i++){
		if(r[i]) console.log(" " + i);
	}
}

// task 2, 3

function task2_3(){
	let basket = [];

	basket.push({product:"Smartphone", price:12000});
	basket.push({product:"Notebook", price:120000});
	basket.push({product:"Tablet", price:35000});
	basket.push({product:"SSD", price:2860});
	basket.push({product:"Monitor", price:15400});

	let basketPrice = countBasketPrice(basket);
	console.log("Basket price = " + basketPrice);
}

function countBasketPrice(basket){
	// let basketPrice = 0;
	// for(let i=0; i<basket.length; i++){
	// 	basketPrice += basket[i].price;
	// }
	// return basketPrice;
	return basket.reduce(function(acc, elem){
		return acc + elem.price;
	}, 0);
}

// task 4

function task4(){
	for(let i=0; i<10; console.log(i++)){}
}

// task 5

function task5() {
	for(let i = 0; i<20; i++){
		let l = "";
		for(let j=0;j<=i;j++){
			l += "*";
		}
		console.log(l);
	}
}
