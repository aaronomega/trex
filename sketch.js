var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimage,cloudgroup;
var obstacles,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6, obstacleGroups;
var play = 1;
var end = 0;
var gameover,restart;
 var gamestate = play;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacles = loadImage("obstacle1.png");
  obstacles2 = loadImage("obstacle2.png");
  obstacles3 = loadImage("obstacle3.png");
  obstacles4 = loadImage("obstacle4.png");
  obstacles5 = loadImage("obstacle5.png");
  obstacles6 = loadImage("obstacle6.png");
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");                     
}

function setup() {
  createCanvas(600, 200);
  gameover
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  obstacleGroups = new Group();
  cloudgroup = new Group();
  score = 0;
  
  ground = createSprite(200,190,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,194,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(225);
  
  
if (gamestate === play){
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
 
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -6; 
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  score = frameCount;
  
  
  spawnclouds ();
  spawnobstacles();
  if (obstacleGroups.isTouching(trex)){
    gamestate = end;
    
    
  }
  
  
  text("Score: " + score,500,50);
  trex.collide(invisibleGround);
  
drawSprites();
}
  
  else if (gamestate === end){
    
   trex.changeAnimation(trex_collided);
    gameover.visible = true;
    restart.visible = true;
    
  }

}
function spawnclouds(){
  
  if (frameCount % 60 ===0){
    cloud=createSprite(300,random(10,100),20,10);
    cloud.addImage("cloud",cloudimage);
    cloud.velocityX = -2;
    cloud.scale=0.5;
   cloudgroup.add ( cloud );
  cloudgroup.lifetime  = 133 ;
  }
}
function spawnobstacles(){
  
  if (frameCount % 100 ===0){
  
   var obstacle=createSprite(600,170,20,10);
   obstacle.velocityX = -6 ; 
    obstacleGroups.add( obstacle );
    
  var rand=Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(obstacles);
      break;
    case 2: obstacle.addImage(obstacles2);
      break;
    case 3: obstacle.addImage(obstacles3);
      break;
     case 4: obstacle.addImage(obstacles4);
      break;
      case 5: obstacle.addImage(obstacles5);
      break; 
     case 6: obstacle.addImage(obstacles6);
      break; 
      default:break;
      
  }
    obstacle.scale = 0.5;
     obstacle.lifetime  = 133 ;
    
}
}





