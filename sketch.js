var trex, ground, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, invisibleground, clouds, obstacles, rand, gameState, PLAY, END, trexcollide, restart, gameOver
var trex1
PLAY = 1 
END = 0
gameState = PLAY;
var CloudGroup
var ObstacleGroup

var score = 0

function preload() {
  trex1 = loadAnimation('trex1.png', 'trex3.png','trex4.png');
  restartimage = loadImage('restart.png')
  gameoverimage = loadImage('gameOver.png')
  ground1 = loadImage('ground2.png');
  clouds1 = loadImage('cloud.png');
  trexcollide = loadImage('trex_collided.png')
  obstacle1 = loadImage('obstacle1.png')
  obstacle2 = loadImage('obstacle2.png')
  obstacle3 = loadImage('obstacle3.png')
  obstacle4 = loadImage('obstacle4.png')
  obstacle5 = loadImage('obstacle5.png')
  obstacle6 = loadImage('obstacle6.png')
}

function setup() {
  createCanvas(800, 400);
trex = createSprite(50, 380, 10, 10);
trex.addAnimation('animation',trex1);
trex.scale = 0.4
CloudGroup = new Group();
ObstacleGroup = new Group();
invisibleground = createSprite(200, 395, 400, 10);
restart = createSprite(400, 200, 10, 10);
restart.visible = false;
gameOver = createSprite(400, 280, 10, 10);
gameOver.visible = false;
  
ground = createSprite(200, 390, 400, 10);
ground.addImage('groundimage',ground1);
}

function draw() {
  background(150);
  invisibleground.visible = false;
  trex.collide(invisibleground);
  trex.velocityY = trex.velocityY+0.8;
 
fill("white");
textSize(15);
text("Score: "+ score, 15, 15);
  
if (mousePressedOver(restart)) {
  reset();
}
  
  if (gameState === PLAY) {
     if (keyDown("space") && trex.y>=371) {
    trex.velocityY = -12;
  }
    
    
  if (ObstacleGroup.isTouching(trex)) {
    gameState = END;
  }
score = score + Math.round(getFrameRate()/60);

  SpawnClouds();
  SpawnObstacles();
  ground.velocityX = -5;
if (ground.x<0) {
ground.x = ground.width/2;   
}
    
  } else if (gameState === END) {
    ground.velocityX = 0;
    CloudGroup.setVelocityXEach(0);
    ObstacleGroup.setVelocityXEach(0);
    restart.visible = true;
    restart.addImage('restart.png', restartimage);
    gameOver.visible = true;
    gameOver.addImage('gameOver.png', gameoverimage);
    score = 0;
    
    CloudGroup.setLifetimeEach(-1);
    ObstacleGroup.setLifetimeEach(-1);
    trex.addImage('trex_collided.png', trexcollide);
  }


  
  

  drawSprites();
}


function SpawnClouds() {
if (frameCount%60===0) {
clouds = createSprite(800, random(10, 350), 10, 10);
clouds.addImage('cloudanimation', clouds1);
clouds.velocityX = -2;
clouds.scale = 0.6;
CloudGroup.add(clouds);
clouds.depth = trex.depth;
trex.depth = trex.depth + 1;
clouds.lifetime = 400
}
console.log(rand);  
  
}

function SpawnObstacles() {
if (frameCount%80===0) {
obstacles = createSprite(800, 370, 10, 10);
rand = Math.round(random(1,6));
switch(rand) {
  case 1: obstacles.addImage('obstacle1.png',obstacle1);
  break;
  case 2: obstacles.addImage('obstacle2.png', obstacle2);
  break;
  case 3: obstacles.addImage('obstacle3.png', obstacle3);
  break;
  case 4: obstacles.addImage('obstacle4.png', obstacle4);
  break;
  case 5: obstacles.addImage('obstacle5.png', obstacle5);
  break;
  case 6: obstacles.addImage('obstacle6.png', obstacle6);
  break;
  default: break
}

obstacles.velocityX = -5;
obstacles.scale = 0.6;
ObstacleGroup.add(obstacles);
obstacles.lifetime = 160;
}
}
  
  
  
  
function reset() {
gameState = PLAY;
  
gameOver.visible = false;
restart.visible = false;
  
ObstacleGroup.destroyEach();
CloudGroup.destroyEach();
  
  
score = 0;
}