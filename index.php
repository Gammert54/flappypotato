<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Flappy Potato</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="shortcut icon" href="assets/player.png" type="image/x-icon" />
</head>

<body>
  <?php
  $link = mysqli_connect("nimoweb.ddns.net", "nimo", "4701");
  if (mysqli_connect_errno()) {
    echo "Error: " . mysqli_connect_error();
  }
  mysqli_select_db($link, "flappypotato");
  mysqli_set_charset($link, "utf8");

  if (isset($_POST["name"])) {
    if (mysqli_query($link, "INSERT INTO leaderboard (name, score, createdAt) VALUES (' " . $_POST['name'] . " ', ' " . $_POST['score'] . " ', ' " . time() . " ')")) {
  ?> <script>
        console.log("YAY!!!!");
      </script><?php
              } else {
                ?> <script>
        alert("Looks like there was a problem. Please try again!");
      </script><?php
              }
            }
                ?>
  <canvas width="1960" height="1080" style="
        background: url('./assets/skin_basic/bg.png');
        background-repeat: repeat-x;
        background-size: cover;
        background-position: center;
        max-width: 100vw;
        max-height: 100vh;
        -webkit-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 1);
        -moz-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 1);
        box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 1);
        overflow: hidden;
        border-radius: 1rem;
        image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
        image-rendering: -moz-crisp-edges; /* Firefox                        */
        image-rendering: -o-crisp-edges; /* Opera                          */
        image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
        image-rendering: pixelated; /* Chrome                           */
        image-rendering: optimize-contrast; /* CSS3 Proposed                  */
        -ms-interpolation-mode: nearest-neighbor; /* IE8+                           */
      "></canvas>
  <div id="mainMenu" class="shown">
    <img src="assets/flappypotatologo.png" id="logo" />
    <div class="buttons">
      <button id="play" tabindex="0">
        <img src="assets/button_play.png" alt="Play Now!" />
      </button>
      <button id="viewHighScores" tabindex="3">
        <img src="assets/button_throppy.png" alt="View Leaderboards!" />
      </button>
    </div>
    <h2>Loaded Texture Pack: </h2>
    <select name="" id="skinSelect">
      <option value="skin_basic">Default Textures</option>
      <option value="minecraft">Minecraft MARCH 1ST EDITION</option>
    </select>
  </div>
  <div id="restart">
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <span id="score">---</span>
      <h3>Submit Your Score</h3>
      <input type="text" maxlength="50" placeholder="Enter Your Username" name="name" required>
      <input type="hidden" name="score" id="scorePHPelement" required>
      <input type="submit">
    </form>
    <div class="buttons">
      <button id="play" tabindex="1">
        <img src="assets\button_replay.png" alt="Play Again!" />
      </button>
      <button id="viewHighScores" tabindex="3">
        <img src="assets/button_throppy.png" alt="View Leaderboards!" />
      </button>
    </div>
  </div>
  <div id="highScores">
    <img src="assets/flappypotatologo.png" id="logo" />
    <div id="leaderboard">
      <span class="place">
        Place
      </span>
      <span class="name">
        Name
      </span>
      <span class="score">
        Score
      </span>
      <?php

      $query = mysqli_query($link, "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 20");
      $leaderBoardPlace = 1;
      while ($row = mysqli_fetch_assoc($query)) {
      ?>
        <span class="place">
          #<?php echo $leaderBoardPlace++; ?>
        </span>
        <span class="name">
          <?php echo $row['name']; ?>
        </span>
        <span class="score">
          <?php echo $row['score']; ?>
        </span>
      <?php
      }
      ?>
    </div>
    <div class="buttons">
      <button id="showMainMenu">
        <img src="assets/button_menu.png" alt="Play Now!" />
      </button>
      <button id="play">
        <img src="assets/button_play.png" alt="Play Now!" />
      </button>
    </div>
  </div>
</body>
<script src="main.js"></script>

</html>