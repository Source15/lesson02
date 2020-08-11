'use strict';

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



//Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money



money = +prompt('Ваш месячный доход?');

//Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses
addExpenses = ',';

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);

//Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булево значение true/false)
console.log(confirm('Есть ли у вас депозит в банке?'));
//Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
//“Введите обязательную статью расходов?” (например expenses1, expenses2)
//“Во сколько это обойдется?” (например amount1, amount2)
//в итоге 4 вопроса и 4 разные переменных

let expenses1 = prompt('Введите обязательную статью расходов?', 'Кварплата');

let amount1 = +prompt('Во сколько это обойдется?', '4000');

let expenses2 = prompt('Введите обязательную статью расходов?', 'Интернет');

let amount2 = +prompt('Во сколько это обойдется?', '1000');




//Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth и вывести результат в консоль
let budgetMonth = (money - (amount1 + amount2));
console.log(budgetMonth);




//Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону (методы объекта Math в помощь)
let resultExpression = Math.round(mission / budgetMonth);

console.log(resultExpression);
//Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 

let day = 30;
budgetDay = Math.floor(budgetMonth / day);
console.log(budgetDay);

// Написать конструкцию условий (расчеты приведены в рублях)

+
prompt('Какой у вас уровень дохода?');
if (Number(budgetDay) > 1200) {
   alert('У вас высокий уровеннь дохода!');
} else if (Number(budgetDay) > 600 && Number(budgetDay) <= 1200) {
   alert('У вас средний уровень дохода!');
} else if (Number(budgetDay) >= 1 && Number(budgetDay) <= 600) {
   alert('К сожалению у вас уровень дохода ниже среднего');
} else if (Number(budgetDay) <= 0) {
   alert('Что то пошло не так!');
}