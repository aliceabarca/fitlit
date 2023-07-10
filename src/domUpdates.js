import users from "./data/users";
import { getUserData, getDailyWater } from "./model";

const userInfo = document.querySelector('.data-box');
const userStepsEl = document.querySelector('.user-steps .steps');
const avgStepsEl = document.querySelector('.avg-steps .steps');
const waterIntake = document.querySelector('.water-intake')

const usersName = document.querySelector('h2');

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

export function showCurrentDayWaterIntake(userHydrationData, date) {
  waterIntake.innerText = `${getDailyWater(userHydrationData, date)}`
}
