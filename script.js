
//     <!-- Author: Kunal Yadav, 000930870 -->

// Select all elements with the class 'character'
const characters = document.getElementsByClassName('character'); 
// Select the element with the ID 'obstacles'
const obstacle = document.getElementById('obstacles'); 
// Select the element with the class 'score'
const scoreCounter = document.querySelector('.score'); 
// Select the element with the class 'high-score'
const highScoreCounter = document.querySelector('.high-score'); 
// Select the element with the ID 'button1'
const startButton = document.getElementById('button1'); 

// Initialize game variables
let score = 0; 
let highScore = 0; 
let jumping = false; 
let collisionDetected = false; // Flag for collision detection
let gameInterval; 
let scoreInterval; 
let gameStarted = false; 

// Function to update the score and high score
function updateScore() { 
  score++; 
  scoreCounter.textContent = 'Score: ' + score; 
  if (score > highScore) { 
    highScore = score; 
    highScoreCounter.textContent = 'High Score: ' + highScore; 
  } 
} 

// Function to handle jump action
function jump(event) { 
  if ((event.code === 'Space' || event.target.id === 'button2') && !jumping && gameStarted) { 
    jumping = true; 
    for (let i = 0; i < characters.length; i++) { 
      characters[i].classList.add('jumping'); 
    } 
    setTimeout(() => { 
      for (let i = 0; i < characters.length; i++) { 
        characters[i].classList.remove('jumping'); 
      } 
      jumping = false; 
    }, 800); 
  } 
} 

// Function to check for collisions between characters and the obstacle
function checkCollision() { 
  const obstacleRect = obstacle.getBoundingClientRect(); 
  for (let i = 0; i < characters.length; i++) { 
    const characterRect = characters[i].getBoundingClientRect(); 
    if (characterRect.right > obstacleRect.left && characterRect.left < obstacleRect.right && 
      characterRect.bottom > obstacleRect.top && characterRect.top < obstacleRect.bottom) { 
      if (!collisionDetected) { // Check if a collision has already been detected
        collisionDetected = true; 
        alert('Game Over! Your score: ' + score); 
        resetGame(); 
      } 
    } 
  } 
} 

// Function to reset the game state
function resetGame() { 
  score = 0; 
  scoreCounter.textContent = 'Score: ' + score; 
  clearInterval(gameInterval); 
  clearInterval(scoreInterval); 
  obstacle.style.animation = 'none'; // Stop the obstacle animation
  setTimeout(() => { 
    obstacle.style.animation = 'animateObstacles 2s linear infinite'; // Restart the obstacle animation
    collisionDetected = false; 
  }, 10); 
  startGame(); // Restart the game
} 

// Function to start or restart the game
function startGame() { 
  if (!gameStarted) { 
    gameStarted = true; 
    startButton.remove(); // Remove the start button
    gameInterval = setInterval(checkCollision, 10); // Check for collisions at intervals
    scoreInterval = setInterval(updateScore, 500); // Update the score at intervals
    obstacle.style.animation = 'animateObstacles 2s linear infinite'; // Start obstacle animation
    document.addEventListener('keydown', jump); // Listen for keydown events to handle jumping
    document.getElementById('button2').addEventListener('click', jump); // Listen for button click to handle jumping
  } else { 
    gameInterval = setInterval(checkCollision, 10); // Restart collision checking
    scoreInterval = setInterval(updateScore, 500); // Restart score updating
    obstacle.style.animation = 'animateObstacles 2s linear infinite'; // Restart obstacle animation
  } 
} 

// Add event listener to the start button to begin the game
startButton.addEventListener('click', startGame); 
