var monkey, monkey_running;
var stone, stoneImage, stoneGroup;
var banana, bananaImage, bananaGroup;
var jungle, jungleImage;
var inviground, invisigravity;
var score;


function preload() {
monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
bananaImage = loadImage("banana.png");
stoneImage = loadImage('stone.png');
jungleImage = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(100,200,400,400);
    jungle.addImage("jungleimage",jungleImage);
    jungle.scale = 1;
  
  monkey = createSprite(50,370,10,10);
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.1;
    
  inviground = createSprite(200,380,400,2);
    inviground.visible = false;
  
  invisigravity = createSprite(200,200,400,2);
    invisigravity.visible = false; 
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}


function draw() {
  background(220);

//jungle velcocity and infinate background
  jungle.velocityX = -3;
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
//monkey velocity and collide ground  
  monkey.velocityY = 2 ;
  monkey.collide(inviground);
  monkey.collide(invisigravity);

//monkey jump
  if (keyDown("space")) {
    monkey.velocityY = -20;
  }
  
//if foodgroup is touching mokey, score increase
  if (bananaGroup.isTouching(monkey)) {
    score = score + 2;
    bananaGroup.destroyEach();
  }

//switch case for score increase
  switch(score) {
    case 10: monkey.scale = 0.12;
      break;
    case 20:
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    
    default: break;
  } 
  
//if obstaclegroup is touching monkey, animal scale is starting scale
  if (stoneGroup.isTouching(monkey)) {
    monkey.scale = 0.1
    stoneGroup.destroyEach();
  }
  
  
    spawnbanana();
    spawnstone();
  drawSprites();
  
//score
  stroke("white");
  textSize(25);
  fill("white");
  text("Score: "+ score, 250,100);
}


function spawnbanana () {
  if (frameCount % 80 === 0){    
    banana = createSprite(450,random(250,300),10,10);
    banana.addImage("bananaimage",bananaImage);
    banana.scale = 0.05;
    
    banana.velocityX = -4;
    banana.lifetime = 110;
    
    bananaGroup.add(banana);
  }  
}


function spawnstone () {
  if (frameCount % 120 === 0) {
    stone = createSprite(450,360,10,10);
    stone.addImage("stoneimage",stoneImage);
    stone.scale = 0.15;
    
    stone.collide(inviground);
    stone.velocityX = -5;
    stone.lifetime = 110;
    
    stoneGroup.add(stone);    
  }   
}


