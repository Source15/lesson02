'use strict';

//let isNumber = function (n) {
// return !isNaN(parseFloat(n)) && isFinite(n)
//}



let money,
   income = 'freelance',
   addExpenses = prompt('Перечислите расходы через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 1000000,
   period = 12;


let start = function () {
   do {
      money = prompt('Ваш месячный доход?', 50000);
   }
   while (isNaN(parseFloat(money)));
};

start();

let showTypeof = function (item) {
   console.log(typeof item);
};

showTypeof(typeof money);
showTypeof(typeof income);
showTypeof(typeof deposit);

let expenses1,
   expenses2;

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function () {
   let sum = 0,
      question;

   for (let i = 0; i < 2; i++) {
      if (i === 0) {
         expenses1 = prompt('Введите обязательную статью расходов?');
      } else {
         expenses2 = prompt('Введите обязательную статью расходов?');
      }
      do {
         question = prompt('Во сколько это обойдется?');
      }
      while (isNaN(question) || question === '' || question === null);
   }
   sum += +question;
};

let expensesMount = getExpensesMonth();

console.log('Расходы за месяц:' + expensesMount);

let getAccumulatedMonth = function () {
   return money - expensesMount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
   return mission / accumulatedMonth
};

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день :' + budgetDay);


if (getTargetMonth() > 0) {
   console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяца');
} else {
   console.log('Цель не будет достигнута!');
}


let getStatusIncome = function () {
   if (budgetDay > 1200) {
      return ('У вас высокий уровеннь дохода!');
   } else if (budgetDay > 600 && budgetDay <= 1200) {
      return ('У вас средний уровень дохода!');
   } else if (budgetDay >= 1 && budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
   } else if (budgetDay <= 0) {
      return ('Что то пошло не так!');
   };
};

console.log(getStatusIncome());