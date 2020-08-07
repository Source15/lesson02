let myVar;

myVar = 10;
console.log(typeof myVar);
myVar = 'Hello world';
console.log(typeof myVar);
myVar = true;
console.log(typeof myVar);
myVar = null;
console.log(typeof myVar);
myVar = undefined;
console.log(typeof myVar);
myVar = Symbol();
console.log(typeof myVar);

myVar = {};


let mySymbol1 = Symbol('hello');
let mySymbol2 = Symbol('hello');
console.log(mySymbol1 == mySymbol2);
//let myArr = [];
//let regExp = /w+/g;
//let func = function () {};
//let error = Error('error message');
//let date = new Date();
//console.log(typeof myArr);