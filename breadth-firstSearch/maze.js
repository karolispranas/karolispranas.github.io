function Maze(gritSize, exitPos, entrancePos) {
  this.gritSize = gritSize;
  this.exitPos = exitPos;
  this.entrancePos = entrancePos;

  walls.push(new Wall(createVector(width - 50, height - 850), createVector(width - 50, height - 50)));
  walls.push(new Wall( createVector(width - 1750, height - 850), createVector(width - 1750, height - 50)));

  walls.push(new Wall(createVector(width - 1750, height - 850), createVector(width - 1750 + gritSize, height - 850)));
  walls.push(new Wall(createVector(width - 1750 + gritSize*2 , height - 850), createVector(width - 50, height - 850)));
  
  walls.push(new Wall(createVector(width - 50 -gritSize, height - 50), createVector(width - 50, height - 50)));
  walls.push(new Wall(createVector(width - 1750, height - 50), createVector(width - 50 -gritSize*2, height - 50)));

  this.drawMaze = function ( startX,  startY,  endX,  endY) {

    var openingY;
    var openingX;
    var dir = 0;

    divDir(startX, startY, endX, endY); 
    if (dir == 1) {

      openingY = round(random((startY + 1) - 0.5, (endY - 1) + 0.5));
      openingX = round(random(startX - 0.5, (endX - 1) + 0.5));

      walls.push(new Wall(createVector(openingY * gritSize, startX * gritSize), createVector(openingY * gritSize, openingX * gritSize)));
      walls.push(new Wall(createVector(openingY * gritSize, (openingX + 1) * gritSize), createVector(openingY * gritSize, endX * gritSize)));

      this.drawMaze(startX, startY, endX, openingY);
      this.drawMaze(startX, openingY, endX, endY);

    } else if (dir == 2) {

      openingY = round(random(startY - 0.5, (endY - 1) + 0.5));
      openingX = round(random((startX + 1) - 0.5, (endX - 1) + 0.5));

      walls.push(new Wall(createVector(startY * gritSize, openingX * gritSize), createVector(openingY * gritSize, openingX * gritSize)));
      walls.push(new Wall(createVector((openingY + 1) * gritSize, openingX * gritSize), createVector(endY * gritSize, openingX * gritSize)));

      this.drawMaze(startX, startY, openingX, endY);
      this.drawMaze(openingX, startY, endX, endY);

    } else {
      mazeDrawn = true;
      return;
    }

    function divDir( startX,  startY,  endX,  endY) {
        var differenceX = endX - startX;        
        var differenceY = endY - startY;
        if (differenceX <= 1 || differenceY <= 1)
        {
          dir = 0;
        }else if (differenceX < differenceY) {
          dir = 1; 
        }else {
          dir = 2;
        }                                 
      }

  };

  this.show = function () {
    
    for (var i = 0; i < walls.length; i++) {
      walls[i].show();
    }
  };
}