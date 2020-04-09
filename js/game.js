const box = document.querySelector(".box");
const player = document.querySelector(".player");
const target = document.querySelector(".target");
const start = document.querySelector(".start");

function movePlayer() {
  let targetPos = 0;
  let hit = 0;
  document.addEventListener("keydown", move);
  function move(e) {
    if (e.code === "KeyW") {
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
        box.classList.add("stop");
        clearInterval(timer);
        box.classList.add("fade-out");
      }
      setTimeout(function () {
        player.classList.remove("is-jumping");
      }, 500);
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
    console.log("I am colliding !!");
  }
}

function timer() {
  setInterval(() => {
    x -= 10;
    slideMob();
  }, 20);
}

start.addEventListener("click", timer);
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

movePlayer();
