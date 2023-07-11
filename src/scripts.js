// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { displayUsersName, showWeeklyWaterIntake } from './domUpdates';

// An example of how you tell webpack to use a CSS file
import './css/styles.css';
import { showUserData, showUserStepsVsAvg, showCurrentDayWaterIntake } from './domUpdates';
import { getRandomUser, getUserStepGoal, getAllAvgSteps, getUserHydrationData, getUserDataFromAPI, getApiData} from './model';
import userData from './data/users';
import hydrationData from './data/hydration';

export const store = {
  userData: [],
  hydrationData: hydrationData.hydrationData,
  user: getRandomUser(userData.users),
};

window.onload = () => {
  Promise.all([
    getApiData('https://fitlit-api.herokuapp.com/api/v1/users'),
    getApiData('https://fitlit-api.herokuapp.com/api/v1/sleep'),
    getApiData('https://fitlit-api.herokuapp.com/api/v1/hydration'),
    getApiData('https://fitlit-api.herokuapp.com/api/v1/activity'),
  ])
    .then( prom => {
      console.log(prom)
      store.userData = prom[0];
      store.hydrationData = prom[1]
    })
    .then( notProm => {
      console.log(store.userData)
      const userSteps = store.user.dailyStepGoal;
      const avg = getAllAvgSteps(store.userData);
      const userHydrationData = getUserHydrationData(store.hydrationData, store.user.id)
      showCurrentDayWaterIntake(userHydrationData, '2023/03/31');
      showUserData(store.user);
      showUserStepsVsAvg(userSteps, avg);
      displayUsersName(store.user);
      showWeeklyWaterIntake(userHydrationData);
    })
};