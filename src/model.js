/* User Data */

export function getUserData(dataType, users, id) {
  if (
    dataType === 'hydrationData' ||
    dataType === 'sleepData' ||
    dataType === 'activityData'
  )  {
    return users.filter(data => data.userID === id);
  } else {
    return users.find((data) => data.id === id);
  }
}

function getRandomID(array) {
  return Math.floor(Math.random() * array.length) + 1;
}

export function getRandomUser(users) {
  return getUserData('users', users, getRandomID(users));
}

export function getCurrentDate(userData) {
  return userData[userData.length - 1].date;
}

export function getAllTimeAverage(key, userData) {
  if (!userData.length) {
    return 0;
  }

  const avg = userData.reduce((sum, date) => sum + date[key], 0) / userData.length;

  if(key === 'numOunces' || key === 'dailyStepGoal') {
    return Math.round(avg);
  } else {
    return parseFloat(avg.toFixed(1));
  }
}

export function getTodays(key, userData, date) {
  userData = userData.find((data) => data.date === date);

  if (!userData) {
    return 0;
  }

  return userData[key];
}

/* Step Data */

export function getUserStepGoal(user) {
  return user.dailyStepGoal;
}

/* Water Data */

export function getWeeklyWater(userData) {
  userData = userData.slice(-7, -1);

  userData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return userData.reduce((week, day) => {
    week[day.date] = day.numOunces;
    return week;
  }, {});
}

/* Sleep Data */

export function getWeeklySleep(userData, date) {
  let weeklyData;

  const endCount = userData.findIndex((entry) => entry.date === date);
  if (endCount - 7 < 0) {
   weeklyData = userData.slice(0, endCount);
  } else {
    weeklyData = userData.slice(endCount - 7, endCount);
  }

  weeklyData.reverse();

  return weeklyData.reduce((acc, day) => {
    acc[day.date] = day.hoursSlept;
    return acc;
  }, {});
}

export function getWeeklySleepQuality(userData) {
  userData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return userData.reduce((week, day) => {
    week[day.date] = day.hoursSlept;
    return week;
  }, {});
}
  /* Activity Data */

export function getActivityDataByDate(activityData, id, date) {
  return getUserData('activityData', activityData, id).find(
    (data) => data.date === date,
  );
}

export function getMinutesActive(activityData) {
  return activityData.minutesActive;
}

export function compareStepsWithGoal(userData, activityData) {
  if (userData.dailyStepGoal <= activityData.numSteps) {
    return true;
  }

  return false;
}

// Accepts a single user's data as userData param
// Accepts all activity data
export function calculateDistanceTraveled(userData, date, activityData) {
  const mile = 5280;
  activityData = getActivityDataByDate(activityData, userData.id, date);
  const distance = (userData.strideLength * activityData.numSteps) / mile;
  return parseFloat(distance.toFixed(2));
}