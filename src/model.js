export function getUserData(dataType, users, id) {
  if (dataType === "hydrationData" || dataType === "sleepData") {
    return users.filter((data) => data.userID === id);
  } else {
    return users.find((data) => data.id === id);
  }
}

function getRandomID(array) {
  return Math.floor(Math.random() * array.length) + 1;
}

export function getRandomUser(users) {
  return getUserData("users", users, getRandomID(users));
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

export function getCurrentWaterDate(userData) {
  return userData[userData.length - 1].date;
}

export function getDailyWater(userHydrationData, date) {
  const userData = userHydrationData.find((data) => data.date === date);

  if (!userData) {
    return 0;
  }

  return userData.numOunces;
}

export function getWeeklyWater(userData) {
  userData = userData.slice(-7, -1);

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

  return parseFloat(avg.toFixed(1));
}

export function getAllAvgSleepQuality(userData) {
  const avg =
    userData.reduce((acc, user) => (acc += user.sleepQuality), 0) /
    userData.length;
  return parseFloat(avg.toFixed(1));
}

export function getDailySleep(sleepData, data) {
  const userData = sleepData.find((date) => data === date.date);

  return userData.hoursSlept;
}

export function getSleepQuality(sleepData, date) {
  const userData = sleepData.find((data) => data.date === date);
  return userData.sleepQuality;
}

export function getWeeklySleep(userData, date) {
  const startCount = userData.findIndex((entry) => entry.date === date) 
    const weeklyData = userData.slice(startCount, startCount + 7).reverse();

    return weeklyData.reduce((acc, day) => {
      acc[day.date] = day.hoursSlept 
      return acc 
    }, {});
  }
