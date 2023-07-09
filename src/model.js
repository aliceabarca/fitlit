export function getUserData(users, id) {
  return users.find(user => user.id === id);
}

export function getAverageWater(hydrationData, id) {
  const userData = hydrationData.filter(data => data.userID === id); 
  
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