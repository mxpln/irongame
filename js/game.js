const box = document.querySelector(".box");
const player = document.querySelector(".player");
const box2 = document.querySelector(".box2");

function movePlayer() {
  document.addEventListener("keydown", move);
  function move(e) {
    switch (e.code) {
      case "KeyW":
        player.classList.add("is-jumping");
        break;
      case "KeyS":
        player.classList.remove("is-jumping");
        break;
      default:
        break;
    }
  }
}
let x = 800;
let x_black = 200;
movePlayer();
var timer = setInterval(() => {
  x -= 10;
  x_black -= 14;
  boxMove();
  boxMoveBlack();
}, 20);

function boxMove() {
  box.style.transform = `translateX(${x}px)`;
  if (x < -200) {
    x = 800;
  }
  if (checkBoops(player.getBoundingClientRect(), box.getBoundingClientRect())) {
    console.log("I am colliding !!");
  }
}
function boxMoveBlack() {
  box2.style.transform = `translateX(${-x_black}px)`;
  if (x_black < -200) {
    x_black = 800;
  }
  // if (checkBoops(player.getBoundingClientRect(), box.getBoundingClientRect())) {
  //   console.log("I am colliding !!");
  // }
}
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
