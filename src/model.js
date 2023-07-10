export function getUserData(users, id) {
  return users.find(user => user.id === id);
}

export function getAllAvgSteps(users) {
  return (
    users.reduce((acc, user) => (acc += user.dailyStepGoal), 0) / users.length
  );
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export function getRandomUser(users) {
  return users[getRandomIndex(users)];
}

export function getAverageWater(hydrationData, id) {
  const userData = hydrationData.filter(data => data.userID === id); 
  
  if (!userData.length) {
   return 0;
  }

  return Math.round(userData.reduce((sum, date) => sum + date.numOunces, 0) / userData.length);
}

export function getDailyWater(hydrationData, id, date) {
  const userData = hydrationData.find(data => data.userID === id && data.date === date);

  if (!userData) {
    return 0;
  }

  return userData.numOunces
}

export function getUserHydrationData(hydrationData, id) {
  return hydrationData.filter(data => data.userID === id);
}

export function getWeeklyWater(userData, id) {
  

  const week = {};

  // if (userData.length === 0) {
  //   return week;
  // } else if (userData.length < 7) {
  //   for (var i = -1; (userData.length + i) >= 0; i--) {
  //     week[userData[userData.length + i].date] = userData[userData.length + i].numOunces;
  //   }
  // } else {
  //   for (var i = -1; i > -8 ; i--) {
  //     week[userData[userData.length + i].date] = userData[userData.length + i].numOunces;
  //    }
  // } 

  

  return week;
}