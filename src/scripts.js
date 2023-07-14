import { displayUsersName, showWeeklyWaterIntake } from './domUpdates';
import './images/glass-of-water.png';

import './css/styles.css';
import {
  showUserData,
  showUserStepsVsAvg,
  showCurrentDayWaterIntake,
} from './domUpdates';
import {
  getRandomUser,
  getAllAvgSteps,
  getDailyWater,
  getUserData,
  getCurrentWaterDate,
} from './model';
import { getApiData } from './apiCalls';

function initializeStore() {
  const store = {
    users: 'https://fitlit-api.herokuapp.com/api/v1/users',
    sleep: 'https://fitlit-api.herokuapp.com/api/v1/sleep',
    hydration: 'https://fitlit-api.herokuapp.com/api/v1/hydration',
    activity: 'https://fitlit-api.herokuapp.com/api/v1/activity',
  };

  return {
    getAPIKey(endpoint) {
      return store[endpoint];
    },

    getKey(key) {
      return store[key];
    },

    setKey(key, value) {
      store[key] = value;
    },
  };
}

let store;

window.onload = () => {
  store = initializeStore();
  initializeApp();
};

function initializeApp() {
  Promise.all([
    getApiData(store.getAPIKey('users'), 'users'),
    getApiData(store.getAPIKey('sleep'), 'sleepData'),
    getApiData(store.getAPIKey('hydration'), 'hydrationData'),
    getApiData(store.getAPIKey('activity'), 'activityData'),
  ])
    .then((values) => {
      const [users, sleepData, hydrationData, activityData] = values;
      store.setKey('userData', users);
      store.setKey('sleepData', sleepData);
      store.setKey('hydrationData', hydrationData);
      store.setKey('activityData', activityData);
    })
    .then(processUserData);
}

function processUserData() {
  const userData = store.getKey('userData');
  store.setKey('user', getRandomUser(userData));
  const userSteps = store.getKey('user').dailyStepGoal;
  const avg = getAllAvgSteps(userData);
  const userHydrationData = getUserData(
    'hydrationData',
    store.getKey('hydrationData'),
    store.getKey('user').id
  );
  showCurrentDayWaterIntake(getDailyWater(userHydrationData, '2023/03/31'));
  showUserData(store.getKey('user'));
  showUserStepsVsAvg(userSteps, avg);
  displayUsersName(store.getKey('user'));
  showWeeklyWaterIntake(userHydrationData);
}
