"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    "2024-07-18T21:31:17.178Z",
    "2024-08-23T07:42:02.383Z",
    "2024-09-28T09:15:04.904Z",
    "2024-09-01T10:17:24.185Z",
    "2024-11-08T14:11:59.604Z",
    "2025-01-05T17:01:17.194Z",
    "2025-01-08T23:36:17.929Z",
    "2025-01-09T10:51:36.790Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "es-PE",
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
  currency: "USD",
  locale: "ru-RU",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");



// const year = date.getFullYear();
// const month = `${date.getMonth() + 1}`.padStart(2, 0);
// const day = `${date.getDate()}`.padStart(2, 0);
// const hours = `${date.getHours()}`.padStart(2, 0);
// const minutes = `${date.getMinutes()}`.padStart(2, 0);













// formatMovementDate
// calcDaysPassed
// dayPassed





// Вывод на страницу всех приходов и уходов


function formatMovementDate(date) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round((date1 - date2) / (1000 * 60 * 60 * 24));
  }
  const dayPassed = calcDaysPassed(new Date(), date);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  const hours = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);

  if (dayPassed === 0) return `сегодня в ${hours}:${minutes}`;
  if (dayPassed === 1) return `вчера в ${hours}:${minutes}`;
  if (dayPassed >= 2 && dayPassed <= 4) return `прошло ${dayPassed} дня`;
  if (dayPassed >= 5 && dayPassed < 7) return `прошло ${dayPassed} дней`;

  return `${day}.${month}.${year} - ${hours}:${minutes}`;
}


const local = navigator.language;

const options = {
  style: "currency",
  currency: "RUB",
}


function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (value, i) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const typeMessage = value > 0 ? "приход" : "снятие";
    const plus = value > 0 ? "+" : "";

    // Изменения сделаные в 109 уроке

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1}. - ${typeMessage}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${plus}${Intl.NumberFormat(local, options).format(value)}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

// Создание логина из ФИО в объекте
function createLogIn(accs) {
  accs.forEach(function (acc) {
    acc.logIn = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (val) {
        return val[0];
      })
      .join("");
  });
}
createLogIn(accounts);

// Подсчет и вывод на страницу общего баланса
function calcPrintBalance(acc) {
  acc.balance = acc.movements.reduce(function (acc, val) {
    return acc + val;
  });

  labelBalance.textContent = `${Intl.NumberFormat(local, options).format(acc.balance)}`;
}

// Сумма и вывод на страницу прихода и ухода в footer
function calcDisplaySum(movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${Intl.NumberFormat(local, options).format(incomes)}`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Intl.NumberFormat(local, options).format(Math.abs(out))}`;

  labelSumInterest.textContent = `${Intl.NumberFormat(local, options).format(incomes - out)}`;
}

//Обновление интерфейса сайта
function updateUi(acc) {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySum(acc.movements);
}

// Таймер сессии

// startLogOut

function startLogOut() {
  let time = 300;
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${seconds}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
    }

    time--;
  }

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

let timer;

//Кнопка входа в аккаунт
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();


  // Установка даты текущего баланса

  function tick() {
    const local = navigator.language;

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }

    labelDate.textContent = Intl.DateTimeFormat(local, options).format(new Date())
  }

  tick();

  const timeBalance = setInterval(tick, 1000);


  currentAccount = accounts.find(function (acc) {
    return acc.logIn === inputLoginUsername.value;
  });

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;

    inputLoginPin.value = inputLoginUsername.value = "";
    
    updateUi(currentAccount);

    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOut();
  }
});

//Перевод денег на другой аккаунт
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const reciveAcc = accounts.find(function (acc) {
    return acc.logIn === inputTransferTo.value;
  });
  const amount = Number(inputTransferAmount.value);
  console.log(amount, reciveAcc);
  if (
    reciveAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciveAcc.logIn !== currentAccount.logIn
  ) {

    currentAccount.movementsDates.push(new Date().toISOString());
    reciveAcc.movementsDates.push(new Date().toISOString());
    currentAccount.movements.push(-amount);
    reciveAcc.movements.push(amount);
    updateUi(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = "";

    clearInterval(timer);
    timer = startLogOut();

  }


});

//Удаление аккаунта
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.logIn &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.logIn === currentAccount.logIn;
    });

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

  }
  inputCloseUsername.value = inputClosePin.value = "";
});

//Внесение денег на счет
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    currentAccount.movementsDates.push(new Date().toISOString());
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
    
    clearInterval(timer);
    timer = startLogOut();

    
  }
  inputLoanAmount.value = "";





});

// Общий баланс длинно
// const accMov = accounts.map(function (acc) {
//   return acc.movements;
// });
// const allMov = accMov.flat();

// const allBalance = allMov.reduce(function (acc, mov) {
//   return acc + mov;
// }, 0);
// console.log(allBalance);

// Общий баланс коротко
const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

//Сортировка по приходам и уходам
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//Изменение значка валюты
labelBalance.addEventListener("click", function () {
  Array.from(document.querySelectorAll(".movements__value"), function (val, i) {
    return (val.innerText = val.textContent.replace("₽", "RUB"));
  });
});


// 110 урок


// 111 урок

// const local = navigator.language;

// const options = {
//   year: "numeric",
//   month: "short",
//   day: "numeric",
//   weekday: "long",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
//   timeZoneName: "long",
//   hour12: false,
// }

// const ru = Intl.DateTimeFormat(local, options).format(new Date());
// console.log(ru);

// 112 урок


// const num = 1250277388;

// const local = navigator.language;
// const options = {
//   style: "currency",
//   currency: "RUB",
// }

// const ru = Intl.NumberFormat(local, options).format(num);
// console.log(ru);


// 113 урок

// setTimeout(function () {
//   console.log("Hello");
  
// }, 2000);

// // setInterval(function () {
// //   console.log("Hi");
  
// // }, 1500);


// const timer1 = setTimeout(function (world1, name) {
//   console.log(world1, name);
  
// }, 2000, "Hello", "Anna");


// const timer2 = setInterval(function () {
//   console.log("Hi");
  
// }, 5000);

// if (true) {
//   clearTimeout(timer1);
//   clearInterval(timer2);
// }







const getElemByAll = document.getElementsByTagName("li");