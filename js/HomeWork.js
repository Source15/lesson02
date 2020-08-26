'use strict';

let calculate = document.getElementById('start'), //Кнопка "Рассчитать"
   reset = document.getElementById('cancel'), //Кнопка "Сбросить"
   plusButtons = document.getElementsByTagName('button'),
   incomeAdd = document.getElementsByTagName('button')[0], //Кнопка + "Доп. доход"
   expensesAdd = document.getElementsByTagName('button')[1], //Кнопка + "Обязательные расходы"
   depositCheckmark = document.querySelector('#deposit-check'), //Чек-бокс Депозит
   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   budgetMonthValue = document.getElementsByClassName('budget_month-value')[0], //Доход за месяц
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0], //Дневной бюджет
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0], //Расход за месяц
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0], //Возможные доходы
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0], //Возможные расходы
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //Накопления за период
   targetMonthValue = document.getElementsByClassName('target_month-value')[0], //Срок достижения цели
   salaryAmount = document.querySelector('.salary-amount'), //Сумма месячного дохода
   incomeItems = document.querySelectorAll('.income-items'), //Блок доп. доход
   incomeTitle = document.querySelector('.income-items').querySelector('.income-title'), //Имя доп. дохода
   incomeAmount = document.querySelector('.income-amount'), //Сумма доп. дохода
   expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'), //Имя обязательного расхода
   expensesItems = document.querySelectorAll('.expenses-items'), //Сумма обязательного расхода
   additionalExpensesItem = document.querySelector('.additional_expenses-item'), //Возможные расходы
   targetAmount = document.querySelector('.target-amount'), //Цель (сумма)
   periodSelect = document.querySelector('.period-select'), // Период расчета
   periodAmount = document.querySelector('.period-amount'), //значение периода расчета
   placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'), //Все поля суммы
   placeholderName = document.querySelectorAll('[placeholder="Наименование"]'), //Все поля наименований
   inputFields = document.querySelectorAll('input[type="text"]'),
   btnPlus = document.querySelectorAll('.btn_plus');



const isNumber = (num) => {
   return !isNaN(parseFloat(num)) && isFinite(num);
};

const checkName = function () {
   placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
   placeholderName.forEach(item => {
      let regExp = /[^A-Za-z0-9]/;
      item.addEventListener('input', function () {
         if (!regExp.test(item.value)) {
            item.value = '';
            item.placeholder = 'Введите корректное значение!';
         }
      });
   });
};

const checkNumber = function () {
   placeholderSum = document.querySelectorAll('[placeholder="Сумма"]')
   placeholderSum.forEach(item => {
      item.addEventListener('input', function () {
         if (!isNumber(item.value)) {
            item.value = '';
            item.placeholder = 'Введите корректное значение!';
         }
      });
   });
};


const AppData = function () {
   this.budget = 0;
   this.income = {};
   this.addIncome = [];
   this.expenses = {};
   this.addExpensens = [];
   this.deposit = false;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.incomeMonth = 0;
   this.expensesMonth = 0;
   this.statusIncome = '';
   this.percentDeposit = 0;
   this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
   if (!isNumber(salaryAmount.value)) {
      alert('Поле "Месячный доход" должно быть заполнено!');
      return;
   }

   calculate.style.display = 'none';
   inputFields = document.querySelectorAll('input[type="text"]');
   inputFields.forEach(item => {
      item.setAttribute('disabled', 'disabled');
   });

   btnPlus.forEach(item => {
      item.setAttribute('disabled', 'disabled');
   });

   reset.style.display = 'block';

   this.budget = +salaryAmount.value;

   this.getIncome();
   this.getIncomeMonth();
   this.getExpenses();
   this.getExpensesMonth();
   this.getBudget();
   this.getAddExpenses();
   this.getAddIncome();
   this.showResult();
};

AppData.prototype.showResult = function () {
   budgetMonthValue.value = this.budgetMonth;
   budgetDayValue.value = this.budgetDay.toFixed(2);
   expensesMonthValue.value = this.expensesMonth;
   additionalExpensesValue.value = this.addExpensens.join(', ');
   additionalIncomeValue.value = this.addIncome.join(', ');
   targetMonthValue.value = Math.ceil(this.getTargetMonth());
   incomePeriodValue.value = this.calcPeriod();
   periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod();
   });
};

AppData.prototype.addExpensensBlock = function () {
   let cloneExpensesBlock = expensesItems[0].cloneNode(true);
   cloneExpensesBlock.childNodes.forEach(item => {
      item.value = '';
   });
   expensesItems[0].parentNode.insertBefore(cloneExpensesBlock, expensesAdd);
   expensesItems = document.querySelectorAll('.expenses-items');
   checkName();
   checkNumber();
   if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
   }
};

AppData.prototype.addIncomeBlock = function () {
   let cloneIncomeBlock = incomeItems[0].cloneNode(true);
   cloneIncomeBlock.childNodes.forEach(item => {
      item.value = '';
   });
   incomeItems[0].parentNode.insertBefore(cloneIncomeBlock, incomeAdd);
   incomeItems = document.querySelectorAll('.income-items');
   checkName();
   checkNumber();
   if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
   }
};

AppData.prototype.getExpenses = function () {
   expensesItems.forEach(item => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
         this.expenses[itemExpenses] = cashExpenses;
      }
   });
};

AppData.prototype.getIncome = function () {
   incomeItems.forEach(item => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
         this.income[itemIncome] = cashIncome;
      }
   });
};


AppData.prototype.getAddExpenses = function () {
   let addExpensens = additionalExpensesItem.value.split(',');
   addExpensens.forEach(item => {
      item = item.trim();
      if (item !== '') {
         this.addExpensens.push(item);
      }
   });
};

AppData.prototype.getAddIncome = function () {
   additionalIncomeItem.forEach(item => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
         this.addIncome.push(itemValue);
      }
   });
};

AppData.prototype.getExpensesMonth = function () {
   for (let key in this.expenses) {
      this.expensesMonth += parseFloat(this.expenses[key]);
   }
};
AppData.prototype.getIncomeMonth = function () {
   for (let key in this.income) {
      this.incomeMonth += parseFloat(this.income[key]);
   }
};
AppData.prototype.getBudget = function () {
   this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
   this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function () {
   return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
   if (this.budgetDay > 1200) {
      this.statusIncome = 'У вас высокий уровень дохода!';
   } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
      this.statusIncome = 'У вас средний уровень дохода';
   } else if (this.budgetDay >= 1 && this.budgetDay <= 600) {
      this.statusIncome = 'К сожалению у вас уровень дохода ниже среднего';
   } else if (this.budgetDay < 0) {
      this.statusIncome = 'Что то пошло не так';
   }
};

AppData.prototype.getDeposit = function () {
   if (this.deposit) {
      do {
         this.percentDeposit = prompt('Введите годовой процент:');
      } while (!isNumber(this.percentDeposit));
      do {
         this.moneyDeposit = prompt('Какая сумма заложена:');
      } while (!isNumber(this.moneyDeposit));
   }
};

AppData.prototype.calcPeriod = function () {
   return this.budgetMonth * periodSelect.value;
};

AppData.prototype.resetAll = function () {
   calculate.style.display = 'block';
   reset.style.display = 'none';

   inputFields = document.querySelectorAll('input[type="text"]');
   inputFields.forEach(item => {
      item.removeAttribute('disabled');
      item.value = '';
   });

   btnPlus.forEach(item => {
      if (item.style.display === 'none') {
         item.style.display = 'inline-block';
      }
      item.removeAttribute('disabled');
   });

   incomeItems.forEach((item, i) => {
      while (i > 0) {
         item.remove();
         i--;
      }
   });

   expensesItems.forEach((item, i) => {
      while (i > 0) {
         item.remove();
         i--;
      }
   });

   this.budget = 0;
   this.income = {};
   this.addIncome = [];
   this.expenses = {};
   this.addExpensens = [];
   this.deposit = false;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.incomeMonth = 0;
   this.expensesMonth = 0;
   this.statusIncome = '';
   this.percentDeposit = 0;
   this.moneyDeposit = 0;
};

AppData.prototype.changePeriodAmount = function () {
   periodAmount.textContent = periodSelect.value;
};

AppData.prototype.eventsListeners = function () {
   const start = this.start.bind(this);
   const resetAll = this.resetAll.bind(this);
   calculate.addEventListener('click', start);
   reset.addEventListener('click', resetAll);
   expensesAdd.addEventListener('click', this.addExpensensBlock);
   incomeAdd.addEventListener('click', this.addIncomeBlock);
   periodSelect.addEventListener('input', this.changePeriodAmount);
};

const appData = new AppData();
// Вызов функций
checkName();
checkNumber();
appData.eventsListeners();