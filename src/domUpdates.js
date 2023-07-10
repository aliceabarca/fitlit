const userInfo = document.querySelector('.data-box');
const userStepsEl = document.querySelector('.user-steps .steps');
const avgStepsEl = document.querySelector('.avg-steps .steps');

import users from "./data/users";
import { getUserData } from "./model";

// ---- querySelectors
let usersName = document.querySelector('h2');

// ---- eventListeners 
window.addEventListener('load', displayUsersName());

// ---- functions
export function displayUsersName() {
  const user = getUserData(users.users, 1)
  console.log(user)
  usersName.innerText = `Hello, ${user.name}!`;
}

export function showUserData(user) {
  const userInfo = {
    name: document.querySelector('.name'),
    address: document.querySelector('.address'),
    email: document.querySelector('.email'),
  }

  userInfo.name.innerText = `Name: ${user.name}`;
  userInfo.address.innerText = `Address: ${user.address}`;
  userInfo.email.innerText = `Email: ${user.email}`;
}

export function showUserStepsVsAvg(userSteps, avg) {
  userStepsEl.innerText = userSteps;
  avgStepsEl.innerText = avg;
}
