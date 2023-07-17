import Chart from "chart.js/auto";

export function WeeklyStepsVsGoal(weekData, goal) {
  new Chart(document.getElementById("weekly-steps-bar-chart"), {
    type: "bar",
    data: {
      labels: weekData.map((row) => row.date),
      datasets: [
        {
          label: "Actual Steps",
          data: weekData.map((row) => row.numSteps),
        },
        {
          label: "Step Goal",
          data: weekData.map((row) => goal),
        },
      ],
    },
  });
}

export function stepProgressBar(stepData, goal) {
  let goalRemainder = 0;

  if (goal - stepData > 0) {
    goalRemainder = goal - stepData;
  }

  new Chart(document.getElementById("steps-progress-bar"), {
    type: "doughnut",
    data: {
      labels: ["Steps", "Remaining"],
      datasets: [
        {
          data: [stepData, goalRemainder],
          backgroundColor: ["rgb(255,0,152)", "rgb(181,219,253)"],
          color: "rgb(255,0,152)",
          cutout: "70%",
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#e9c4e0",
          },
        },
      },
    },
  });
}
