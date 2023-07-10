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

export function getAverageWater(userData) {  
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

export function getWeeklyWater(userData) {
  if (userData.length > 7) {
    userData = userData.slice(-7);
  }

  return userData.reduce((week, day) => {
    week[day.date] = day.numOunces;
    return week;
  }, {})
}