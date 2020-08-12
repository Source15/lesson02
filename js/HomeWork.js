'use strict';

let money = +prompt('Ваш месячный доход?', 50000),
   income = 'freelance',
   addExpenses = prompt('Перечислите расходы через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 1000000,
   period = 12;
let showTypeof = function (item) {
   console.log(typeof item);
};

showTypeof(typeof money);
showTypeof(typeof income);
showTypeof(typeof deposit);

let expenses1 = prompt('Введите обязательную статью расходов?', 'Кварплата'),
   amount1 = +prompt('Во сколько это обойдется?', '4000'),
   expenses2 = prompt('Введите обязательную статью расходов?', 'Интернет'),
   amount2 = +prompt('Во сколько это обойдется?', '1000');



console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function () {
   return amount1 + amount2;
};
console.log('Расходы за месяц:' + getExpensesMonth());

let getAccumulatedMonth = function () {
   return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
   return mission / accumulatedMonth
};

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день :' + budgetDay);

console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяца');


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