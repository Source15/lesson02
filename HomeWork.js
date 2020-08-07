let money = 15000;
let income = 'freelance';
let addExpenses = 'такси,связь,интернет';
let deposit = true;
let mission = 1000000;
let period = 12;

//Вводим значения типа данных
console.log(typeof money);
console.log(typeof freelance);
console.log(typeof deposit);
//длина строки
let str = 'addExpenses';
console.log(str.length);
//конкотинируем строку
console.log('Период равен ' + period + ' месяцев' + ' Цель заработать ' + mission + ' рублей');
//приводим строку к нижнему регистру
console.log(addExpenses.toLowerCase());
//выводим в массив
console.log(addExpenses.split(','));
//построить доход за месяц
let budgetDay = 1000;
console.log(budgetDay / 30);