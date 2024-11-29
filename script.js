// Section Header animation
const sectionHeaders = document.querySelectorAll(".section-header");

sectionHeaders.forEach((header) => {
  // Add animation class on hover
  header.addEventListener("mouseover", (e) => {
    e.currentTarget.classList.remove("alternate");
    e.currentTarget.classList.add("animate");
  });

  // Add alternate animation class after hover ends
  header.addEventListener("mouseout", (e) => {
    e.currentTarget.classList.remove("animate");
    e.currentTarget.classList.add("alternate");
  });
});

// Return to the top button
const goUp = document.getElementById("go-up");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 500) {
    goUp.style.cssText = "visibility: visible; opacity: 1;";
  } else {
    goUp.style.cssText = "visibility: hidden; opacity: 0;";
  }
});

goUp.addEventListener("click", () =>
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  })
);

const ourSkills = document.getElementById("our-skills");
const progs = document.querySelectorAll("#our-skills .prog span");

const statistics = document.getElementById("statistics");
const stats = document.querySelectorAll("#statistics .box .num");
let started = false;

window.addEventListener("scroll", () => {
  // Count Up to a number - Call
  if (window.scrollY >= statistics.offsetTop) {
    if (!started) stats.forEach((stat) => startCount(stat));
    started = true;
  }
  // Fill Progress
  progs.forEach((prog) => {
    if (window.scrollY >= ourSkills.offsetTop - 200) {
      prog.style.width = prog.dataset.progress;
    } else prog.style.width = 0;
  });
});

// Count Up to a number - Function
function startCount(element) {
  const statValue = parseInt(element.dataset.stats, 10);
  const duration = 2000;
  const increment = Math.ceil(statValue / (duration / 16.67));

  let current = 0;

  let count = setInterval(() => {
    current += increment;
    if (current >= statValue) {
      current = statValue;
      clearInterval(count);
    }
    element.textContent = current;
  }, 16.67);
}

// Count Down Timer
const countDate = new Date("Dec 31, 2025 23:59:59").getTime();

function updateCountdown() {
  let dateNow = new Date().getTime();
  let dateDiff = countDate - dateNow;
  
  if (dateDiff <= 0) {
    clearInterval(counterDown);
    return;
  }

  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector("#events .content .days").textContent =
    days < 10 ? `0${days}` : days;
  document.querySelector("#events .content .hours").textContent =
    hours < 10 ? `0${hours}` : hours;
  document.querySelector("#events .content .minutes").textContent =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector("#events .content .seconds").textContent =
    seconds < 10 ? `0${seconds}` : seconds;
}

// Initial call before interval starts
updateCountdown();

let counterDown = setInterval(updateCountdown, 1000);