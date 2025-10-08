const transactions = [
  {
    student: "Bel Abel",
    date: "07/10/2025",
    section: 8,
    subject: "Mathematics",
    duration: "1:30mins",
    sessionFee: 3000,
    status: "Completed",
  },
  {
    student: "John Doe",
    date: "08/10/2025",
    section: 9,
    subject: "Physics",
    duration: "1hr",
    sessionFee: 5000,
    status: "Processing",
  },
  {
    student: "Mary Sam",
    date: "09/10/2025",
    section: 7,
    subject: "Chemistry",
    duration: "2hrs",
    sessionFee: 2000,
    status: "Completed",
  },
  {
    student: "Mary Sam",
    date: "09/10/2025",
    section: 7,
    subject: "Chemistry",
    duration: "2hrs",
    sessionFee: 2000,
    status: "Processing",
  },
  {
    student: "Mary Sam",
    date: "09/10/2025",
    section: 7,
    subject: "Chemistry",
    duration: "2hrs",
    sessionFee: 2000,
    status: "Completed",
  },
  {
    student: "Mary Sam",
    date: "09/10/2025",
    section: 7,
    subject: "Chemistry",
    duration: "2hrs",
    sessionFee: 2000,
    status: "Completed",
  },
  {
    student: "Mary Sam",
    date: "09/10/2025",
    section: 7,
    subject: "Chemistry",
    duration: "2hrs",
    sessionFee: 2000,
    status: "Processing",
  },
];

const tbody = document.querySelector(".transactions-body");
tbody.innerHTML = "";

transactions.forEach((t) => {
  const commission = t.sessionFee * 0.15;
  const netEarnings = t.sessionFee - commission;

  const isCompleted = t.status === "Completed";

  const row = `
    <tr>
      <td>
        <input 
          type="checkbox" 
          class="rowCheck"
          ${isCompleted ? "checked" : ""}
          disabled
        />
      </td>
      <td>${t.student}</td>
      <td>${t.date}</td>
      <td>${t.section}</td>
      <td>${t.subject}</td>
      <td>${t.duration}</td>
      <td>₦${t.sessionFee.toLocaleString()}</td>
      <td style="color: red;">-₦${commission.toLocaleString()}</td>
      <td style="color: green;">₦${netEarnings.toLocaleString()}</td>
      <td>
        <span class="t-status ${isCompleted ? "completed" : "processing"}">
          ${t.status}
        </span>
      </td>
    </tr>
  `;

  tbody.innerHTML += row;
});

const goalAmount = 150000;

async function fetchBalance() {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        json: () => Promise.resolve({ availableAmount: 110000 }),
      });
    }, 1000);
  });

  const data = await response.json();
  animateAmount(data.availableAmount);
  animateProgress(data.availableAmount);
}

function animateAmount(targetAmount) {
  const amountDisplay = document.getElementById("amountDisplay");
  let start = 0;
  const duration = 1000;
  const startTime = performance.now();

  function updateAmount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * targetAmount);
    amountDisplay.textContent = "₦" + currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateAmount);
    }
  }

  requestAnimationFrame(updateAmount);
}

function animateProgress(availableAmount) {
  const progressBar = document.getElementById("progressBar");
  const percentage = (availableAmount / goalAmount) * 100;
  progressBar.style.width = percentage + "%";
}

fetchBalance();
