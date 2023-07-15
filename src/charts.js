import Chart from 'chart.js/auto';

export function WeeklyStepsVsGoal(weekData, goal) {
  console.log(weekData);
  new Chart(document.getElementById('weekly-steps-bar-chart'), {
    type: 'bar',
    data: {
      labels: weekData.map(row => row.date),
      datasets: [
        {
          label: 'Actual Steps',
          data: weekData.map(row => row.numSteps),
        },
        {
          label: 'Step Goal',
          data: weekData.map(row => goal),
        },
      ],
    },
  });
}
