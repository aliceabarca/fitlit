import './css/styles.css';
import { showUserData, showUserStepsVsAvg, showCurrentDayWaterIntake } from './domUpdates';
import { getRandomUser, getUserStepGoal, getAllAvgSteps, getUserHydrationData } from './model';
import userData from './data/users';
import hydrationData from './data/hydration';

const store = {
  userData: userData.users,
  hydrationData: hydrationData.hydrationData,
  user: getRandomUser(userData.users),
};

window.onload = () => {
  const userSteps = store.user.dailyStepGoal;
  const avg = getAllAvgSteps(store.userData);
  const userHydrationData = getUserHydrationData(store.hydrationData, store.user.id)
  showCurrentDayWaterIntake(userHydrationData, '2023/03/31')
  showUserData(store.user);
  showUserStepsVsAvg(userSteps, avg);
};
