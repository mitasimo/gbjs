"use strict"
// task 1 =====================================================================
function task1() {
    let a = 1
        , b = 1
        , c, d;
    c = ++a; // перед присвоение "c" "a" уже равно 2 
    alert("task 1. c = " + c); // 2
    d = b++; // сначала значение b будет присвоено d, потом b станет 2
    alert("task 1. d = " + d); // 1
    c = (2 + ++a); // сначала a увеличится на 1 (станет 3)
    alert("task 1. c = " + c); // 5
    d = (2 + b++); // сначала d будет присвоено значение, a потом b увеличится на 1
    alert("task 1. d = " + d); // 4
    alert("task 1. a = " + a); // 3
    alert("task 1. b = " + b); // 3
}
// task 2 =====================================================================
function task2() {
    let a = 2;
    let x = 1 + (a *= 2);
    alert("task2. x = " + x);
    // код выше можно заменить на
    // var a = 2;     // a = 2
    // a *= 2         // a = 4
    // var x = 1 + x; // x = 5
    //    
}
// task 3 =====================================================================
function task3() {
    let a = 10
        , b = -12
        , c = 0;
    if (a >= 0 && b >= 0) {
        c = a - b;
    }
    else if (a < 0 && b < 0) {
        c = a * b;
    }
    else {
        c = a + b;
    }
    alert("task3. a = " + a + " b = " + b + " c = " + c);
}
// task 4 =====================================================================
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function task4() {
    let res = "";
    let isFirst = true;
    let maxLimit = 15;
    let minLimit = getRandomInt(0, maxLimit);
    switch (minLimit) {
    case 0:
        res += ", " + 0;
    case 1:
        res += ", " + 1;
    case 2:
        res += ", " + 2;
    case 3:
        res += ", " + 3;
    case 4:
        res += ", " + 4;
    case 5:
        res += ", " + 5;
    case 6:
        res += ", " + 6;
    case 7:
        res += ", " + 7;
    case 8:
        res += ", " + 8;
    case 9:
        res += ", " + 9;
    case 10:
        res += ", " + 10;
    case 11:
        res += ", " + 11;
    case 12:
        res += ", " + 12;
    case 13:
        res += ", " + 13;
    case 14:
        res += ", " + 14;
    case 15:
        res += ", " + 15;
    }
    alert("task 4. [" + minLimit + ":" + maxLimit + "] = [" + res + "]");
}
// task 5 =====================================================================
function plus(arg1, arg2) {
    return arg1 + arg2;
}

function minus(arg1, arg2) {
    return arg1 - arg2;
}

function multiply(arg1, arg2) {
    return arg1 * arg2;
}

function divide(arg1, arg2) {
    return arg1 / arg2;
}

function task5() {
    alert("Task5. plus(13, 2) = " + plus(13, 2));
    alert("Task5. minus(13, 2) = " + minus(13, 2));
    alert("Task5. multiply(13, 2) = " + multiply(13, 2));
    alert("Task5. divide(13, 2) = " + divide(13, 2));
}
// task 6 =====================================================================
function mathOperation(arg1, arg2, operation) {
    let res;
    switch (operation) {
    case "plus":
        res = plus(arg1, arg2);
        break;
    case "minus":
        res = minus(arg1, arg2);
        break;
    case "multiply":
        res = multiply(arg1, arg2);
        break;
    case "divide":
        res = divide(arg1, arg2);
        break;
    default:
        res = 0;
    }
    return res;
}

function task6() {
    alert("Task6. 5 + 7 = " + mathOperation(5, 7, "plus"));
    alert("Task6. 5 - 7 = " + mathOperation(5, 7, "minus"));
    alert("Task6. 5 * 7 = " + mathOperation(5, 7, "multiply"));
    alert("Task6. 5.0 / 7.0 = " + mathOperation(5.0, 7.0, "divide"));
}
// task 7  =====================================================================
function task7() {
    if (null == 0) {
        // Null равен Null и Undefined.
        alert("Task7. It can't be! Null is equal to Null and Undefined.")
    }
    else {
        // 0 - это обычное число, которое не может быть равно Null
        alert("Task7. Null is not equal to 0.")
    }
}
// task 8 =====================================================================
// recursive function power
function power(val, pow) {
    if (pow == 0) return 1;
    if (pow == 1) return val;
    return val * power(val, pow - 1);
}

function task8() {
    alert("Task8. 3**5 = " + power(3, 5));
}