
import { getDailyWater, getWeeklyWater } from "./model";
const userInfo = document.querySelector('.data-box');
const userStepsEl = document.querySelector('.user-steps .steps');
const avgStepsEl = document.querySelector('.avg-steps .steps');
const waterIntake = document.querySelector('.water-intake')
const usersName = document.querySelector('h2');
const weeklyWaterIntake = document.querySelector('.weekly-water-box');
const glassBox = document.querySelector('.glass-box')


export function displayUsersName(user) {
  const firstName = user.name.split(' ')[0]
  usersName.innerText = `Hello, ${firstName}!`;
}

export function showUserData(user) {
  const userInfo = {
    name: document.querySelector('.name'),
    address: document.querySelector('.address'),
    email: document.querySelector('.email'),
  };

  userInfo.name.innerText = `Name: ${user.name}`;
  userInfo.address.innerText = `Address: ${user.address}`;
  userInfo.email.innerText = `Email: ${user.email}`;
}

export function showUserStepsVsAvg(userSteps, avg) {
  userStepsEl.innerText = userSteps;
  avgStepsEl.innerText = avg;
}

export function showCurrentDayWaterIntake(currentIntake) {
  showWaterGlasses(currentIntake)
  waterIntake.innerText = `Today : ${currentIntake} ounces`
}

function showWaterGlasses(ounces){
  const amount = Math.floor(ounces / 10)

  if (amount > 9) {
    amount = 9;
  }

  let html = '';

  for (let i = 0; i < amount; i++) {
    html += `<img class="water" src="./images/glass-of-water.png"/>`;
  }

  glassBox.innerHTML = `${html}`
}

export function showWeeklyWaterIntake(userHydrationData) {
  const weeklyWater = getWeeklyWater(userHydrationData);
  const days = Object.keys(weeklyWater);
  days.forEach(day => {
    weeklyWaterIntake.innerHTML += `<article class="week-day" >
                                    <p class="date" >${day.slice(5)}</p>
                                    <p class="weekly-ounces">${weeklyWater[day]}</p>
                                    </article>`
  }) 
}