const box = document.querySelector(".box");
const box2 = document.querySelector(".box2");

function movePlayer() {
  document.addEventListener("keydown", move);
  function move(e) {
    let player = document.querySelector(".player");
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
movePlayer();
var timer = setInterval(() => {
  x -= 10;
  boxMove();
}, 20);

function boxMove() {
  box.style.transform = `translateX(${x}px)`;
  if (x < -200) {
    x = 800;
  }
}

// start();
// sendNewBoxes();

// once box has left the scene/player dodge the box
// isBoxDead()

// while player still alive
// sendNewBoxes()

// collision()
