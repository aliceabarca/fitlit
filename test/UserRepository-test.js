import { expect } from 'chai';

import sampleData from '../src/data/sampleData'

import { getUserData, getAverageWater } from '../src/model';

describe('usersData', () => {
  let userData;

  beforeEach('init userData', () => {
    userData = getUserData(sampleData.users, 1);
  });

  it('should return an object of user data', () => {
    expect(userData).to.deep.equal({
      id: 1,
      name: 'Trystan Gorczany',
      address: '9484 Lucas Flat, West Kittymouth WA 67504',
      email: 'Taurean_Pollich31@gmail.com',
      strideLength: 4,
      dailyStepGoal: 7000,
      friends: [5, 43, 46, 11],
    });
  });
});

describe('hydrationData', () => {
  let hydrationData;

  beforeEach('init hydrationData', () => {
   hydrationData = sampleData.hydration;
  })

  it('should return a number of average all time water intake', () => {
    const water = getAverageWater(hydrationData, 1);

    expect(water).to.be.a('number');
    expect(water).to.equal(33);
  })

  it('should return 0 if no user data is found', () => {
    const water = getAverageWater(hydrationData, 4);

    expect(water).to.equal(0);
  })

  it('should return a number for the amount of ounces a user has consumed on a specific day', () => {
    const water = getDailyWater(hydrationData, 1, '2023/03/26');

    expect(water).to.be.a('number');
    expect(water).to.equal(21);
  })

  it('should return a 0 if no user data is found for that date', () => {
    const water = getDailyWater(hydrationData, 1, '2023/03/28');

    expect(water).to.equal(0);
  })
})