// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { displayUsersName, showWeeklyWaterIntake } from './domUpdates';

// An example of how you tell webpack to use a CSS file
import './css/styles.css';
import {
  showUserData,
  showUserStepsVsAvg,
  showCurrentDayWaterIntake,
} from './domUpdates';
import { getRandomUser, getAllAvgSteps, getUserHydrationData } from './model';
import { getApiData } from './apiCalls';

const store = {
  apiKeys: {
    users: 'https://fitlit-api.herokuapp.com/api/v1/users',
    sleep: 'https://fitlit-api.herokuapp.com/api/v1/sleep',
    hydration: 'https://fitlit-api.herokuapp.com/api/v1/hydration',
    activity: 'https://fitlit-api.herokuapp.com/api/v1/activity',
  },
};

window.onload = () => {
  const users = getApiData(store.apiKeys.users).then(data => {
    store.userData = data.users;
    return data;
  });
  const sleep = getApiData(store.apiKeys.sleep).then(data => {
    store.sleepData = data.sleepData;
    return data;
  });
  const hydration = getApiData(store.apiKeys.hydration).then(data => {
    store.hydrationData = data.hydrationData;
    return data;
  });
  const activity = getApiData(store.apiKeys.activity).then(data => {
    store.activityData = data.activityData;
    return data;
  });

  Promise.all([users, sleep, hydration, activity]).then(values => {
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
  });
};
