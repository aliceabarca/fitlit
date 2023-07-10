//NOTE: Your DOM manipulation will occur in this file

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

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.


// export const exampleFunction1 = (person) => {
//   console.log(`oh hi there ${person}`)
// }

// const exampleFunction2 = (person) => {
//   console.log(`bye now ${person}`)
// }


// export {
//   displayUsersName,
// }