import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import {
  getUserData,
  getRandomUser,
  getAllAvgSteps,
  getUserStepGoal,
  getAverageWater,
  getDailyWater,
  getWeeklyWater,
  getAvgSleepPerDay,
  getAllAvgSleep,
  getDailySleep,
  getSleepQuality,
  getActivityDataByDate,
  calculateDistanceTraveled,
} from '../src/model';

describe('user data functions', () => {
  let userData, average, user, stepGoal;

  beforeEach('init data', () => {
    userData = getUserData('users', sampleData.users, 1);
    stepGoal = getUserStepGoal(userData);
    average = getAllAvgSteps(sampleData.users);
    user = getRandomUser(sampleData.users);
  });

  it('should return an object of user data', () => {
    expect(userData).to.deep.equal({
      id: 1,
      name: 'Trystan Gorczany',
      address: '9484 Lucas Flat, West Kittymouth WA 67504',
      email: 'Taurean_Pollich31@gmail.com',
      strideLength: 4,
      dailyStepGoal: 6000,
      friends: [5, 43, 46, 11],
    });
  });

  it("should return a user's step goal", () => {
    expect(stepGoal).to.equal(6000);
  });

  it('should return the average of all step goals', () => {
    expect(average).to.equal(6000);
  });

  it('should return a random user object from the array', () => {
    expect(sampleData.users).to.deep.include(user);
  });
});

describe('hydrationData', () => {
  let hydrationData;

  beforeEach('init hydrationData', () => {
    hydrationData = sampleData.hydration;
  });

  it('should return a number of average all time water intake', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getAverageWater(userData);

    expect(water).to.be.a('number');
    expect(water).to.equal(45);
  });

  it('should return 0 if no user data is found', () => {
    const userData = getUserData('hydrationData', hydrationData, 4);
    const water = getAverageWater(userData);

    expect(water).to.equal(0);
  });

  it('should return a number for the amount of ounces a user has consumed on a specific day', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getDailyWater(userData, '2023/03/26');

    expect(water).to.be.a('number');
    expect(water).to.equal(21);
  });

  it('should return a 0 if no user data is found for that date', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getDailyWater(userData, '2023/04/28');

    expect(water).to.equal(0);
  });

  it('should return a object with ounces of water for the last 6 days of data', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getWeeklyWater(userData);

    expect(water).to.be.an('object');
    expect(water).to.deep.equal({
      '2023/03/30': 20,
      '2023/03/29': 96,
      '2023/03/28': 38,
      '2023/03/27': 22,
      '2023/03/26': 21,
      '2023/03/24': 50,
    });
  });

  it('should have keys in order from least to most recent', () => {
    const userData = getUserData('hydrationData', hydrationData, 1);
    const water = getWeeklyWater(userData);

    const waterDates = Object.keys(water);
    expect(waterDates).to.deep.equal([
      '2023/03/30',
      '2023/03/29',
      '2023/03/28',
      '2023/03/27',
      '2023/03/26',
      '2023/03/24',
    ]);
  });

  it('should return an object holding all possible elements after the current date if there are less than 7', () => {
    const userData = getUserData('hydrationData', hydrationData, 2);
    const water = getWeeklyWater(userData);

    expect(water).to.deep.equal({ '2023/03/24': 35 });
  });

  it('should return an empty object is only 1 data point exists', () => {
    const userData = getUserData('hydrationData', hydrationData, 3);
    const water = getWeeklyWater(userData);

    expect(water).to.deep.equal({});
  });

  it('should return an empty object if no user data exists', () => {
    const userData = getUserData('hydrationData', hydrationData, 3);
    const water = getWeeklyWater(userData);

    expect(water).to.deep.equal({});
  });
});

describe('sleepData', () => {
  let sleep;

  beforeEach('init sleepData', () => {
    sleep = sampleData.sleepData;
  });

  it('should return a users average sleep per day', () => {
    const userData = getUserData('sleepData', sleep, 1);
    const sleeper = getAvgSleepPerDay(userData);

    expect(sleeper).to.equal(9.6);
  });

  it('should return 0 if no user data is found', () => {
    const userData = getUserData('sleepData', sleep, 3);
    const sleeper = getAvgSleepPerDay(userData);

    expect(sleeper).to.equal(0);
  });

  it('should return the average of all time sleep quality', () => {
    const userData = getAllAvgSleep(sleep, 1);

    expect(userData).to.equal(3.9);
  });

  it('should return how many hours a user slept for a specific day', () => {
    const userData = getUserData('sleepData', sleep, 2);
    const sleeps = getDailySleep(userData, '2023/03/25');

    expect(sleeps).to.equal(8.4);
  });

  it('should return a users sleep quality for a specific day', () => {
    const userData = getUserData('sleepData', sleep, 2);
    const sleeps = getSleepQuality(userData, '2023/03/25');

    expect(sleeps).to.equal(3.5);
  });

  describe('activityData', () => {
    let userData, activityData;

    beforeEach('init data', () => {
      userData = getUserData('userData', sampleData.users, 1);
      activityData = getActivityDataByDate(sampleData.activity, 1, '2023/03/25');
      
    })
    
    it("should return a user's activity data by date", () => {
      expect(activityData).to.deep.equal({
        userID: 1,
        date: '2023/03/25',
        numSteps: 14264,
        minutesActive: 111,
        flightsOfStairs: 1,
      });
    });
    
    it('should calculate distance traveled', () => {
      const distanceTraveled = calculateDistanceTraveled(userData, '2023/03/25', sampleData.activity);
      expect(distanceTraveled).to.equal(10.81)
    })
  });
});
