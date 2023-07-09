import { expect } from 'chai';

import sampleData from '../src/data/sampleData'

import { getUserData } from '../src/userRepository';

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
    const id = 1;

    const water = getAverageWater(hydrationData, id)

    expect(water).to.be.a('number');
    expect(water).to.equal(33);
  })
})