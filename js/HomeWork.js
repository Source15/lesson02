'use strict';

//let isNumber = function (n) {
// return !isNaN(parseFloat(n)) && isFinite(n)
//}
let money,
   start = function () {
      do {
         money = prompt('Ваш месячный доход?', 50000);
      }
      while (isNaN(parseFloat(money)));
   };

start();



let appData = {
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   mission: 50000,
   period: 3,
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   expenses1: 0,
   expenses2: 0,
   asking: function () {
      let addExpenses = prompt('Перечислите расходы через запятую');
      appData.addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
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

            sum += +question;
         }
         return sum;
      };
      let expensesMount = appData.getExpensesMonth();

      console.log('Расходы за месяц:' + expensesMount);

      let getAccumulatedMonth = function () {
         return money - expensesMount;
      };

      let accumulatedMonth = appData.getAccumulatedMonth();

      let getTargetMonth = function () {
         return appData.mission / appData.accumulatedMonth;
      };

      let budgetDay = accumulatedMonth / 30;
      console.log('Бюджет на день :' + budgetDay);


      if (getTargetMonth() > 0) {
         console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
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
         }
      };
      console.log(appData.getStatusIncome());
   }
};