
var monkey , monkey_running, monkey_Collide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkey_Collide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("jungle.jpg") ;
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(displayWidth , displayHeight);

 ground = createSprite(width,height,900,300);


  monkey = createSprite(width , height ,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkey_Collide);
  ground.addAnimation("ground", groundImg);
  
  invisiGround = createSprite(width , height ,600,7);
  invisiGround.visible = false;

    obstacleGroup = createGroup();
    bananaGroup = createGroup();
}

function draw(){
  background("skyblue");
 
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = height;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkey_Collide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!",width , height);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", width , height);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
   fill("red");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(width , height, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(width , height,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






