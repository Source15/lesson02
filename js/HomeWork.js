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
   percentDeposit: 0,
   moneyDeposit: 0,
   statusIncome: '',

   asking: function () {
      if (confirm('Есть ли у вас доп. источники дохода?')) {
         let itemIncome, cashIncome;
         do {
            itemIncome = prompt('Введите дополннительный источник дохода:');
         } while (isNumber(itemIncome));
         do {
            cashIncome = prompt(`Сколько вы зарабатываете в месяц на ${itemIncome}?`);
         } while (!isNumber(cashIncome));
         appData.income[itemIncome] = cashIncome;
      }




      let addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
      appData.addExpensens = addExpensens.toLowerCase().split(',');
      appData.addExpensens = appData.addExpensens.map((item) => {
         item = item.trim();
         item = item[0].toUpperCase() + item.slice(1);
         return item;
      });
      appData.addExpensens = appData.addExpensens.join(', ');

      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      appData.getDeposit();



      for (let i = 0; i < 2; i++) {
         let mount, 1
         requiredExpenses = [];
         do {
            requiredExpenses[i] = prompt('Введите обязательную статью расходов:');
         } while (isNumber(requiredExpenses[i]));

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
   },
   getDeposit: function () {
      if (appData.deposit) {
         do {
            appData.percentDeposit = prompt('Введите годовой процент:');
         } while (!isNumber(appData.percentDeposit));
         do {
            appData.moneyDeposit = prompt('Какая сумма заложена:');
         } while (!isNumber(appData.moneyDeposit));
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
console.log('Возможные расходы: ' + appData.addExpensens);


console.log('Наша программа включает в себя данные:');
for (let key in appData) {
   console.log(`Свойство: ${key}, Значение: ${appData[key]}`);
}