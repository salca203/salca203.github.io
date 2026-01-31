const timeBox = document.getElementById("time");

function updateTime() {
  const now = new Date();
  timeBox.textContent = now.toLocaleString();
}

setInterval(updateTime, 1000);
updateTime();

const darkBtn = document.getElementById("darkToggle");
const body = document.body;

if (localStorage.getItem("dark") === "on") {
  body.classList.add("dark");
}

darkBtn.onclick = () => {
  body.classList.toggle("dark");
  localStorage.setItem("dark", body.classList.contains("dark") ? "on" : "off");
};

let clicks = localStorage.getItem("clicks") || 0;
const clickCount = document.getElementById("clickCount");
clickCount.textContent = clicks;

document.getElementById("clickBtn").onclick = () => {
  clicks++;
  clickCount.textContent = clicks;
  localStorage.setItem("clicks", clicks);
};

let score = 0;

document.getElementById("gameBtn").onclick = () => {
  score++;
  document.getElementById("gameScore").textContent = score;
};

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  document.getElementById("formInfo").textContent =
    "Nachricht vorbereitet. Für echte Mails nutze später Formspree oder EmailJS.";

});
