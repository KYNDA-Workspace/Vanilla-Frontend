const sessions = [
  {
    name: "Kemi Okafor",
    role: "Science Tutor",
    subject: "Mathematics",
    date: "Sat, Dec 28",
    time: "16:00",
    duration: "60min",
    status: "Online",
    img: "/images/profileimage.png",
  },
  {
    name: "Kemi Okafor",
    role: "Science Tutor",
    subject: "Mathematics",
    date: "Sat, Dec 28",
    time: "16:00",
    duration: "60min",
    status: "Offline",
    img: "/images/profileimage.png",
  },
  {
    name: "Kemi Okafor",
    role: "Science Tutor",
    subject: "Mathematics",
    date: "Sat, Dec 28",
    time: "16:00",
    duration: "60min",
    status: "Offline",
    img: "/images/profileimage.png",
  },
  {
    name: "Kemi Okafor",
    role: "Science Tutor",
    subject: "Mathematics",
    date: "Sat, Dec 28",
    time: "16:00",
    duration: "60min",
    status: "Online",
    img: "/images/profileimage.png",
  },
];

const container = document.querySelector(".sessions");
const sessionCount = document.querySelector(".session-count");

sessionCount.textContent = `${sessions.length} sessions`;

sessions.forEach((session) => {
  const card = document.createElement("div");
  card.className = "session-card";

  card.innerHTML = `
    <div class="session-info">
        <div class="session-details">
            <div class="session-info-details">
                <img class="session-img" src="${session.img}" alt="${session.name}" />
                <div class="session-name-role">
                    <p><strong>${session.name}</strong></p>
                    <p>${session.role}</p>
                </div>
            </div>
            <div class="session-meta">
                <p>📘 ${session.subject}</p>  
                <p>📅 ${session.date}</p>  
                <p>⏰ ${session.time}(${session.duration}) </p>
            </div>
        </div>
    </div>
    <div class="actions">
        <span class="status">${session.status}</span>
        <div class="action-buttons">
        <button class="join-btn">Join Section</button>
        <button class="reschedule-btn">Reschedule</button>
        </div>
    </div>
`;

  container.appendChild(card);

  const statusValue = card.querySelector(".status");

  // update styling based on status
  if (session.status.toLowerCase() === "online") {
    statusValue.classList.add("status-on");
  } else {
    statusValue.classList.add("status-off");
  }
});


