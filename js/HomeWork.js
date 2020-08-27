'use strict';

const calculate = document.getElementById('start'), //Кнопка "Рассчитать"
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
   incomeTitle = document.querySelector('.income-items').querySelector('.income-title'), //Имя доп. дохода
   incomeAmount = document.querySelector('.income-amount'), //Сумма доп. дохода
   expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'), //Имя обязательного расхода
   additionalExpensesItem = document.querySelector('.additional_expenses-item'), //Возможные расходы
   targetAmount = document.querySelector('.target-amount'), //Цель (сумма)
   periodSelect = document.querySelector('.period-select'), // Период расчета
   periodAmount = document.querySelector('.period-amount'), //значение периода расчета
   btnPlus = document.querySelectorAll('.btn_plus');



let placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'),
   placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
   inputFields = document.querySelectorAll('input[type="text"]'),
   incomeItems = document.querySelectorAll('.income-items'),
   expensesItems = document.querySelectorAll('.expenses-items');


const isNumber = (num) => {
   return !isNaN(parseFloat(num)) && isFinite(num);
};

const checkName = () => {
   placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
   placeholderName.forEach(item => {
      let regExp = /[^\d\s]/;
      item.addEventListener('input', () => {
         if (!regExp.test(item.value)) {
            item.value = '';
            item.placeholder = 'Введите корректное значение!';
         }
      });
   });
};

const checkNumber = () => {
   placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
   placeholderSum.forEach(item => {
      item.addEventListener('input', () => {
         if (!isNumber(item.value)) {
            item.value = '';
            item.placeholder = 'Введите корректное значение!';
         }
      });
   });
};


class AppData {
   constructor() {
      this.budget = 0;
      this.income = {};
      this.addIncome = [];
      this.expenses = {};
      this.addExpensens = [];
      this.deposit = false;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.incomeMonth = 0;
      this.statusIncome = '';
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
   }

   start() {
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

      this.getExpInc();
      this.getIncomeMonth();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
   }

   showResult() {
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
   }
   addBlocks(blockArr, btn) {
      let cloneBlock = blockArr[0].cloneNode(true);
      const startClassName = cloneBlock.className.split('-')[0];
      cloneBlock.childNodes.forEach(item => {
         item.value = '';
      });
      blockArr[0].parentNode.insertBefore(cloneBlock, btn);
      blockArr = document.querySelectorAll(`.${startClassName}-items`);
      checkInputName();
      checkInputNumber();
      if (blockArr.length === 3) {
         btn.style.display = 'none';
      }
   }
   getExpInc() {
      const count = item => {
         const startClassName = item.className.split('-')[0];
         const itemTitle = item.querySelector(`.${startClassName}-title`).value;
         const itemAmount = item.querySelector(`.${startClassName}-amount`).value;
         if (itemTitle !== '' && itemAmount !== '') {
            this[startClassName][itemTitle] = itemAmount;
         }
      };
      incomeItems = document.querySelectorAll('.income-items');
      expensesItems = document.querySelectorAll('.expenses-items');

      incomeItems.forEach(count);
      expensesItems.forEach(count);
   }


   getAddExpenses() {
      let newAddExpensens = additionalExpensesItem.value.split(',');
      newAddExpensens.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpensens.push(item);
         }
      });
   }

   getAddIncome() {
      additionalIncomeItem.forEach(item => {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
   }

   getIncomeMonth() {
      for (let key in this.income) {
         this.incomeMonth += parseFloat(this.income[key]);
      }
   }

   getExpensesMonth() {
      for (let key in this.expenses) {
         this.expensesMonth += parseFloat(this.expenses[key]);
      }
   }
   getBudget() {
      this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
      this.budgetDay = this.budgetMonth / 30;
   }

   getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
   }

   getStatusIncome() {
      if (this.budgetDay > 1200) {
         this.statusIncome = 'У вас высокий уровень дохода!';
      } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
         this.statusIncome = 'У вас средний уровень дохода';
      } else if (this.budgetDay >= 1 && this.budgetDay <= 600) {
         this.statusIncome = 'К сожалению у вас уровень дохода ниже среднего';
      } else if (this.budgetDay < 0) {
         this.statusIncome = 'Что то пошло не так';
      }
   }

   getDeposit() {
      if (this.deposit) {
         do {
            this.percentDeposit = prompt('Введите годовой процент:');
         } while (!isNumber(this.percentDeposit));
         do {
            this.moneyDeposit = prompt('Какая сумма заложена:');
         } while (!isNumber(this.moneyDeposit));
      }
   }

   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }

   resetAll() {
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
      incomeItems = document.querySelectorAll('.income-items');
      expensesItems = document.querySelectorAll('.expenses-items');
      const removeItems = (item, i) => {
         while (i > 0) {
            item.remove();
            i--;
         }
      };
      incomeItems.forEach(removeItems);
      expensesItems.forEach(removeItems);

      this.budget = 0;
      this.income = {};
      this.addIncome = [];
      this.expenses = {};
      this.addExpensens = [];
      this.deposit = false;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.incomeMonth = 0;
      this.statusIncome = '';
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
   }

   changePeriodAmount() {
      periodAmount.textContent = periodSelect.value;
   }

   eventsListeners() {
      const start = this.start.bind(this);
      const resetAll = this.resetAll.bind(this);
      calculate.addEventListener('click', start);
      reset.addEventListener('click', resetAll);
      expensesAdd.addEventListener('click', () => {
         this.addBlocks(expensesItems, expensesAdd);
      });
      incomeAdd.addEventListener('click', () => {
         this.addBlocks(incomeItems, incomeAdd);
      });
      periodSelect.addEventListener('input', this.changePeriodAmount);
   }
}
const appData = new AppData();
// Вызов функций
checkName();
checkNumber();
appData.eventsListeners();