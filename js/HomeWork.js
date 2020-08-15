'use strict';

//let isNumber = function (n) {
// return !isNaN(parseFloat(n)) && isFinite(n)
//}
let money;

let isNumber = function (num) {
   return !isNaN(parseFloat(num)) && isFinite(num);
};

let start = function () {
   do {
      money = prompt('Ваш месячный доход?');
   } while (!isNumber(money));
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
   statusIncome: '',

   asking: function () {
      let addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
      appData.addExpensens = addExpensens.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for (let i = 0; i < 2; i++) {
         let mount,
            requiredExpenses = [];
         requiredExpenses[i] = prompt('Введите обязательную статью расходов:');
         do {
            mount = +prompt(`Во сколько обойдется ${requiredExpenses[i]}:`);
         } while (!isNumber(mount));
         appData.expenses[requiredExpenses[i]] = mount;
      }
   },

   getExpensesMonth: function () {
      for (let key in appData.expenses) {
         appData.expensesMonth += appData.expenses[key];
      }
   },

   getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
   },

   getTargetMonth: function () {
      if ((appData.mission / appData.budgetMonth) >= 0) {
         appData.period = `Цель будет достигнута за ${Math.ceil(appData.mission / appData.budgetMonth)} месяцев(а)`;
      } else {
         appData.period = 'Цель не будет достигнута!';
      }
   },


   getStatusIncome: function () {
      if (appData.budgetDay > 1200) {
         appData.statusIncome = 'У вас высокий уровень дохода!';
      } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
         appData.statusIncome = 'У вас средний уровень дохода';
      } else if (appData.budgetDay >= 1 && appData.budgetDay <= 600) {
         appData.statusIncome = 'К сожалению у вас уровень дохода ниже среднего';
      } else if (appData.budgetDay < 0) {
         appData.statusIncome = 'Что то пошло не так';
      }
   }
};

// Вызов функций 
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

//Выводим0 в консоль 
console.log(`Расходы за месяц составляют: ${appData.expensesMonth}`);
console.log(appData.period);
console.log(appData.statusIncome);

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
   console.log(`Свойство: ${key}, Значение: ${appData[key]}`);
}