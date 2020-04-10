const box = document.querySelector(".box");
const player = document.querySelector(".player");
const target = document.querySelector(".target");
const start = document.querySelector(".start");
const damage = document.querySelector(".damage");
const win = document.querySelector(".win");
const tryAgainBtn = document.querySelector(".tryAgainBtn");
let gameRunning = false;
let intervalId = null;
let damageTaken = 0;
win.style.visibility = "hidden";
function movePlayer() {
  let targetPos = 0;
  let hit = 0;
  document.addEventListener("keydown", move);
  function move(e) {
    if (e.code === "KeyW" && gameRunning === true) {
      if (e.repeat) {
        return;
      }
      player.classList.add("is-jumping");
      hit += 1;
      if (hit % 3 === 0) {
        targetPos -= 262;
        target.style.backgroundPosition = `-0px ${targetPos}px`;
      }
      if (hit === 18) {
        win.style.visibility = "visible";
        box.classList.add("stop");
        box.classList.add("fade-out");
        stop();
        disableBtn();
        player.style.bottom = "60%";
      }
      setTimeout(function () {
        player.classList.remove("is-jumping");
      }, 400);
    }
  }
}
let x = 750;
function slideMob() {
  box.style.transform = `translateX(${x}px)`;
  if (x < -200) {
    x = 800;
  }
  if (checkBoops(player.getBoundingClientRect(), box.getBoundingClientRect())) {
    damageTaken += 1;
    damage.innerText = `damage: ${damageTaken}`;
  }
  if (damageTaken === 50) {
    tryAgainBtn.style.visibility = "visible";
    disabledTry(false);
    gameRunning = false;
    box.classList.add("stop");
    disableBtn(true);
    stop();
  }
}
let stop = function stop() {
  if (box.classList.contains("stop")) {
    clearInterval(intervalId);
  }
};
function tryAgain() {
  box.classList.remove("stop");
  gameRunning = false;
  damageTaken = 0;
  damage.innerText = `damage: ${damageTaken}`;
  hit = 0;
  x = 0;
  disabledTry(true);
  box.style.transform = `translateX(750px)`;
  timer();
}
tryAgainBtn.addEventListener("click", tryAgain);
start.addEventListener("click", timer);
function timer() {
  if (!gameRunning) {
    start.style.display = "none";
    gameRunning = true;
    intervalId = setInterval(() => {
      x -= randomNumber(5, 30);
      slideMob();
    }, 20);
  }
}
disabledTry(true);
function checkBoops(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }
  return false;
}
function disableBtn(z) {
  start.disabled = z;
}
function disabledTry(y) {
  tryAgainBtn.disabled = y;
}
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
movePlayer();
