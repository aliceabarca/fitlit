import { expect } from 'chai';

import sampleData from '../src/data/sampleData';

import { getUserData, getAllAvgSteps, getRandomIndex } from '../src/model';

describe('user data', () => {
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
      dailyStepGoal: 6000,
      friends: [5, 43, 46, 11],
    });
  });
});

describe('user data', () => {
  let average, randomIdx;

  beforeEach('init data', () => {
    average = getAllAvgSteps(sampleData.users);
    randomIdx = getRandomIndex(sampleData.users);
  });

  it('should return the average of all step goals', () => {
    expect(average).to.equal(6000);
  });

  
});
