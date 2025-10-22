const ctx = document.getElementById("earningChart").getContext("2d");

// Create a blue gradient for the line
const gradient = ctx.createLinearGradient(0, 0, 600, 0);
gradient.addColorStop(0, "#1E2382");
gradient.addColorStop(1, "#00A9C1");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = [140, 135, 180, 155, 160, 210, null, null, null, null, null, null];
const projected = [
  null,
  null,
  null,
  null,
  null,
  210,
  200,
  215,
  225,
  235,
  240,
  250,
];

const earningChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        label: "Earnings",
        data: data,
        borderColor: gradient,
        borderWidth: 3,
        fill: false,
        pointBackgroundColor: function (context) {
          return context.dataIndex === 5 ? "#4CAF50" : "#00A9C1";
        },
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: function (context) {
          return context.dataIndex === 5 ? 8 : 5;
        },
        tension: 0.4,
      },
      {
        label: "Projected",
        data: projected,
        borderColor: gradient,
        borderWidth: 3,
        borderDash: [6, 6],
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        usePointStyle: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#333",
        borderColor: "rgba(0,0,0,0.05)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
        yAlign: "bottom",
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => {
            if (context.label === "June") {
              return "User: 346  –  +20%";
            } else {
              return `User: ${context.parsed.y}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#888", font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f0f0f0" },
        ticks: { color: "#888", stepSize: 50, font: { size: 12 } },
      },
    },
  },
});

const pieChartCtx = document.getElementById("myPieChart").getContext("2d");

new Chart(pieChartCtx, {
  type: "pie",
  data: {
    labels: [
      "Mathematics $200 (25%)",
      "Chemistry $240 (35%)",
      "Physics $240 (30%)",
      "Exam Prep $40 (10%)",
      "English $40 (5%)",
    ],
    datasets: [
      {
        data: [200, 240, 240, 40, 40],
        backgroundColor: [
          "#cce5ff", // Math
          "#001f54", // Chemistry
          "#3399ff", // Physics
          "#66cc66", // Exam
          "#cccccc", // English
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // <-- important
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: { size: 16 }, // make legend text bigger
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.parsed;
            let total = context.chart._metasets[0].total;
            let percentage = ((value / total) * 100).toFixed(0);
            return `$${value} Earned (${percentage}%)`;
          },
        },
      },
    },
  },
});

