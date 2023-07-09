export function getUserData(users, id) {
  return users.find(user => user.id === id);
}

export function getAllAvgSteps(users) {
  return (
    users.reduce((acc, user) => (acc += user.dailyStepGoal), 0) / users.length
  );
}

export function getRandomIndex(array) {
  return Math.round(Math.random(array.length));
}
