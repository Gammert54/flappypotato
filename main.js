// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// // Follow this pattern to import other Firebase services
// // import { } from 'firebase/<service>';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDsMR-ZbnVnEreCRpMAfYbD_-N9CQWn-yA',
//   authDomain: 'flappypotato-9d3cd.firebaseapp.com',
//   projectId: 'flappypotato-9d3cd',
//   storageBucket: 'flappypotato-9d3cd.appspot.com',
//   messagingSenderId: '468074197027',
//   appId: '1:468074197027:web:2a4538b1fcde0dd5110196',
//   measurementId: 'G-TJGVNF1E6P'
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Game Loop Code tHING idc

var skinPath = 'skin_basic';

window.addEventListener('load', function () {
  this.document.querySelectorAll('#viewHighScores').forEach((element) => {
    element.addEventListener('click', showHighScores);
  });
  this.document.querySelectorAll('#play').forEach((element) => {
    element.addEventListener('click', startGame);
  });
  this.document.querySelectorAll('#showMainMenu').forEach((element) => {
    element.addEventListener('click', showMainMenu);
  });
});
var canvas;
var c;
var y;
var yPos;
var x;
var pipes = [];
var offset = 600;
var loop;
var gameRun = false;

var ruradziura = 300;
var ruraszer = 20;
var pImg = new Image();
pImg.src = `./assets/${skinPath}/player.png`;
var ruraImg = new Image();
ruraImg.src = `./assets/${skinPath}/pipe.png`;
var ruraImg2 = new Image();
ruraImg2.src = `./assets/${skinPath}/pipe2.png`;
const showMainMenu = () => {
  document.getElementById('restart').classList.remove('shown');
  document.getElementById('highScores').classList.remove('shown');
  document.getElementById('mainMenu').classList.add('shown');
};
const showHighScores = () => {
  document.getElementById('restart').classList.remove('shown');
  document.getElementById('highScores').classList.add('shown');
  document.getElementById('mainMenu').classList.remove('shown');
};

const startGame = () => {
  offset = 0;
  gameRun = true;
  pipes = [];
  document.getElementById('restart').classList.remove('shown');
  document.getElementById('highScores').classList.remove('shown');
  document.getElementById('mainMenu').classList.remove('shown');
  document.querySelector('canvas').classList.add('shown');
  canvas = document.querySelector('canvas');
  yPos = canvas.height / 2;
  y = canvas.height / 2;
  c = canvas.getContext('2d');
  x = 0;
  animate();
};
window.addEventListener('keydown', function (e) {
  if (y - 150 > 0) {
    y -= 150;
  }
});
window.addEventListener('mousedown', function (e) {
  if (y - 150 > 0) {
    y -= 150;
  }
});
const animate = () => {
  x += 10;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.drawImage(pImg, canvas.width / 2.5 - 50, yPos - 50, 100, 100);
  c.fillStyle = 'red';
  c.fill();
  if (y < 1030) {
    y += 9.98;
  }
  yPos = (y + yPos) / 2;
  // c.beginPath();
  // c.arc(canvas.width / 2.5, y, 10, 0, 2 * Math.PI);
  // c.fillStyle = 'blue';
  // c.fill();
  //   Pipes
  if (x > offset) {
    offset = x + 10 * Math.floor(Math.random() * (100 - 60) + 60);
    pipes.push({
      x: x + 1920,
      y: Math.floor(Math.random() * (1080 - 100 - ruradziura) + 100)
    });
  }
  pipes.forEach((pipe) => {
    // console.log(pipe);
    c.beginPath();
    c.drawImage(
      ruraImg,
      0,
      0,
      16,
      1080 - ruradziura - pipe.y,
      pipe.x - x,
      pipe.y + ruradziura,
      50,
      1080 - ruradziura - pipe.y
    );
    c.fillStyle = 'blue';
    c.fill();
    c.beginPath();
    c.drawImage(
      ruraImg2,
      0,
      1080 - pipe.y,
      16,
      pipe.y,
      pipe.x - x,
      0,
      50,
      pipe.y
    );
    c.fillStyle = 'blue';
    c.fill();
    pipes = pipes.filter((pipe) => pipe.x > x);

    // some cool stuffs

    // or like collision detection or smth
    function hitbox(x, y, pipeX, pipeY) {
      if (!(pipeY + ruradziura > y && pipeY < y)) {
        if (x < pipeX + ruraszer && x > pipeX) {
          return true;
        }
      }
      return false;
    }
    let isInCollision = false;
    isInCollision += hitbox(canvas.width / 2.5 + 50, yPos, pipe.x - x, pipe.y);
    isInCollision += hitbox(canvas.width / 2.5, yPos + 50, pipe.x - x, pipe.y);
    isInCollision += hitbox(canvas.width / 2.5 - 50, yPos, pipe.x - x, pipe.y);
    isInCollision += hitbox(canvas.width / 2.5, yPos - 50, pipe.x - x, pipe.y);
    isInCollision += hitbox(
      canvas.width / 2.5 + 22,
      yPos + 22,
      pipe.x - x,
      pipe.y
    );
    isInCollision += hitbox(
      canvas.width / 2.5 + 22,
      yPos - 22,
      pipe.x - x,
      pipe.y
    );
    isInCollision += hitbox(
      canvas.width / 2.5 - 22,
      yPos - 22,
      pipe.x - x,
      pipe.y
    );
    isInCollision += hitbox(
      canvas.width / 2.5 - 22,
      yPos + 22,
      pipe.x - x,
      pipe.y
    );

    if (isInCollision) {
      console.log(
        '%c Collision',
        'background: red; color: white; font-size: 27px;'
      );
      document.getElementById('restart').classList.add('shown');
      document.getElementById('score').innerText = Math.round(x / 100);
      document.getElementById('scorePHPelement').value = Math.round(x / 100);
      gameRun = false;
    }
  });

  // c.beginPath();
  // c.fillStyle = 'yellow';
  // c.arc(canvas.width / 2.5 + 50, yPos, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5, yPos + 50, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5 - 50, yPos, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5, yPos - 50, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5 + 33, yPos + 33, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5 + 33, yPos - 33, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5 - 33, yPos - 33, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.arc(canvas.width / 2.5 - 33, yPos + 33, 5, 0, 2 * Math.PI);
  // c.fill();
  // c.beginPath();
  // c.fillStyle = 'blue';

  c.beginPath();
  c.font = 'Bold 50px Roboto, Helvetica, sans-serif';
  c.fillStyle = 'white';
  c.fillText(
    Math.round(x / 100),
    canvas.width / 2 - Math.round(x / 100).toString.length * 15,
    50
  );
  // bg paralax stuffs are here!
  document.querySelector('canvas').style.backgroundPositionX = -x / 5 + 'px';

  gameRun && window.requestAnimationFrame(animate);
};

// Skin Handling
document.getElementById('skinSelect').addEventListener('change', function () {
  skinPath = document.getElementById('skinSelect').value;
  localStorage.setItem('currentSkinSelection', skinPath);
  loadSkin();
});

function loadSkin() {
  if (localStorage.getItem('currentSkinSelection') == null) {
    localStorage.setItem('currentSkinSelection', 'skin_basic');
  }
  skinPath = localStorage.getItem('currentSkinSelection');
  pImg.src = `./assets/${skinPath}/player.png`;
  ruraImg.src = `./assets/${skinPath}/pipe.png`;
  ruraImg2.src = `./assets/${skinPath}/pipe2.png`;

  document.querySelector(
    'canvas'
  ).style.background = `url('./assets/${skinPath}/bg.png')`;
}

loadSkin();

document.getElementById('skinSelect').value = localStorage.getItem(
  'currentSkinSelection'
);
