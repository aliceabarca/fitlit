import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import { getUserData, getAllAvgSteps, getRandomUser, getAverageWater, getDailyWater, getWeeklyWater, getUserHydrationData } from '../src/model';

describe('user data functions', () => {
  let userData, average, user;

  beforeEach('init data', () => {
    userData = getUserData(sampleData.users, 1);
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

  it('should return the average of all step goals', () => {
    expect(average).to.equal(6000);
  });

  it('should return a random user object from the array', () => {
    expect(sampleData.users).to.deep.include(user);
  })
});

describe('hydrationData', () => {
  let hydrationData;

  beforeEach('init hydrationData', () => {
   hydrationData = sampleData.hydration;
   
  })

  it('should return a number of average all time water intake', () => {
    const userData = getUserHydrationData(hydrationData, 1)
    const water = getAverageWater(userData);

    expect(water).to.be.a('number');
    expect(water).to.equal(45);
  })

  it('should return 0 if no user data is found', () => {
    const userData = getUserHydrationData(hydrationData, 4)
    const water = getAverageWater(userData);

    expect(water).to.equal(0);
  })

  it('should return a number for the amount of ounces a user has consumed on a specific day', () => {
    const water = getDailyWater(hydrationData, 1, '2023/03/26');

    expect(water).to.be.a('number');
    expect(water).to.equal(21);
  })

  it('should return a 0 if no user data is found for that date', () => {
    const water = getDailyWater(hydrationData, 1, '2023/04/28');

    expect(water).to.equal(0);
  })

  it('should return a object with ounces of water for the last 7 days of data', () => {
    const userData = getUserHydrationData(hydrationData, 1)
    const water = getWeeklyWater(userData);

    expect(water).to.be.an('object');
    expect(water).to.deep.equal(
      {
        '2023/03/31': 86,
        '2023/03/30': 20,
        '2023/03/29': 96,
        '2023/03/28': 38,
        '2023/03/27': 22,
        '2023/03/26': 21,
        '2023/03/24': 50,
      });
  })

  it('should have keys in order from least to most recent', () => {
    const userData = getUserHydrationData(hydrationData, 1)
    const water = getWeeklyWater(userData);

    const waterDates = Object.keys(water);

    expect(waterDates).to.deep.equal([
      '2023/03/31',
      '2023/03/30',
      '2023/03/29',
      '2023/03/28',
      '2023/03/27',
      '2023/03/26',
      '2023/03/24',
    ])
  })

  it('should return an object holding all possible elements if there are less than 7', () => {
    const userData = getUserHydrationData(hydrationData, 2)
    const water = getWeeklyWater(userData);

    expect(water).to.deep.equal({ '2023/03/26': 88, '2023/03/24': 35 })
  })

  it('should return an empty object id no user data exists', () => {
    const userData = getUserHydrationData(hydrationData, 3)
    const water = getWeeklyWater(userData);

    expect(water).to.deep.equal({});
  })
})