import { displayUsersName, showWeeklyWaterIntake } from './domUpdates';

import './css/styles.css';
import {
  showUserData,
  showUserStepsVsAvg,
  showCurrentDayWaterIntake,
} from './domUpdates';
import { getRandomUser, getAllAvgSteps, getUserHydrationData, getUserSleepData} from './model';
import { getApiData } from './apiCalls';

const store = {
  apiKeys: {
    users: 'https://fitlit-api.herokuapp.com/api/v1/users',
    sleep: 'https://fitlit-api.herokuapp.com/api/v1/sleep',
    hydration: 'https://fitlit-api.herokuapp.com/api/v1/hydration',
    activity: 'https://fitlit-api.herokuapp.com/api/v1/activity',
  },
};

window.onload = initializeApp;

function initializeApp() {
  Promise.all([
    getApiData(store.apiKeys.users, 'users'),
    getApiData(store.apiKeys.sleep, 'sleepData'),
    getApiData(store.apiKeys.hydration, 'hydrationData'),
    getApiData(store.apiKeys.activity, 'activityData'),
  ])
    .then(values => {
      const [users, sleepData, hydrationData, activityData] = values;
      store.userData = users;
      store.sleepData = sleepData;
      store.hydrationData = hydrationData;
      store.activityData = activityData;
    })
    .then(processUserData);
}

function processUserData() {
  store.user = getRandomUser(store.userData);
  const userSteps = store.user.dailyStepGoal;
  const avg = getAllAvgSteps(store.userData);
  const userHydrationData = getUserHydrationData(
    store.hydrationData,
    store.user.id,
  );
  showCurrentDayWaterIntake(userHydrationData, '2023/03/31');
  showUserData(store.user);
  showUserStepsVsAvg(userSteps, avg);
  displayUsersName(store.user);
  showWeeklyWaterIntake(userHydrationData);
}
