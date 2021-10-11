class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
        image(back_img, 0, 0, 1000, 800);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =600;
      var y = 100;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y = 500;
        //position the cars a little away from each other in x direction
        // x = displayWidth - allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        // y = y + 200;
        players[index-1].x = x;
        players[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
       /* if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = players[index-1].x
          camera.position.y = displayHeight/2;
        }*/
  
        if (frameCount % 20 === 0) {
          fruits = createSprite(random(100, 1000), 0, 100, 100);
          fruits.velocityY = 6;
          var rand = Math.round(random(1,5));
          switch(rand){
            case 1: fruits.addImage("fruit1", fruit1_img);
            break;
            case 2: fruits.addImage("fruit1", fruit2_img);
            break;
            case 3: fruits.addImage("fruit1", fruit3_img);
            break;
            case 4: fruits.addImage("fruit1", fruit4_img);
            break;
            case 5: fruits.addImage("fruit1", fruit5_img);
            break;
          }
          fruitGroup.add(fruits);
        }

      }

    }

    
    
      if(keyIsDown(37) && player.index !== null){
          yVel += 0.9;
      }
    
      if(keyIsDown(39)&& player.index !== null){
          yVel -= 0.9;
      }

  //move the car
  player.distance += yVel;
  yVel *= 0.98;
  player.xPos += xVel;
  xVel *= 0.985;
  player.update();
  //display sprites
  drawSprites();
}
      }