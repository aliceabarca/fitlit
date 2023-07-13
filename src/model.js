export function getUserData(dataType, users, id) {
  switch (dataType) {
    case 'hydrationData':
      return data.filter(data => data.userID === id);
    case 'sleepData':
      return data.filter(data => data.userID === id);
    default:
      return data.find(data => data.id === id);
  }
}

function getRandomID(array) {
  return Math.floor(Math.random() * array.length) + 1;
}

export function getRandomUser(users) {
  return getUserData('users', users, getRandomID(users));
}

export function getAllAvgSteps(users) {
  return (
    users.reduce((acc, user) => (acc += user.dailyStepGoal), 0) / users.length
  );
}

export function getUserStepGoal(user) {
  return user.dailyStepGoal;
}

export function getAverageWater(userData) {
  if (!userData.length) {
    return 0;
  }

  return Math.round(
    userData.reduce((sum, date) => sum + date.numOunces, 0) / userData.length
  );
}

export function getDailyWater(userHydrationData, date) {
  const userData = userHydrationData.find((data) => data.date === date);

  if (!userData) {
    return 0;
  }

  return userData.numOunces;
}

export function getWeeklyWater(userData) {
  if (userData.length > 7) {
    userData = userData.slice(-7);
  }

  userData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return userData.reduce((week, day) => {
    week[day.date] = day.numOunces;
    return week;
  }, {});
}

export function getAvgSleepPerDay(userData) {
  const avg =
  userData.reduce((acc, userData) => (acc += userData.hoursSlept), 0) /
  userData.length;
  
  if (!userData.length) {
    return 0;
  }

  return avg;
}

export function getAllAvgSleep(userData) {
  return (
    userData.reduce((acc, user) => (acc += user.sleepQuality), 0) /
    userData.length
  );
}
