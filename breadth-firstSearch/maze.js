class Maze {
  constructor(gritSize, exitPos, entrancePos) {

    // this.walls = [];
    this.gritSize = gritSize;
    this.exitPos = exitPos;
    this.entrancePos = entrancePos;

    //draw side walls
    walls.push(new Wall(createVector(width - 50, height - 850), createVector(width - 50, height - 50)));
    walls.push(new Wall( createVector(width - 1750, height - 850), createVector(width - 1750, height - 50)));

    //draw walls on the botton and top based on the oppengings
    //draw top wall
    walls.push(new Wall(createVector(width - 1750, height - 850), createVector(width - 1750 + gritSize, height - 850)));
    walls.push(new Wall(createVector(width - 1750 + gritSize*2 , height - 850), createVector(width - 50, height - 850)));
    //draw botton wall
    walls.push(new Wall(createVector(width - 50 -gritSize, height - 50), createVector(width - 50, height - 50)));
    walls.push(new Wall(createVector(width - 1750, height - 50), createVector(width - 50 -gritSize*2, height - 50)));

    // divide(0, 0, 10, 10);
    // Divide the region given upper left and lower right 
    // grid corner points
    this.drawMaze = function ( r1,  c1,  r2,  c2) {
      // var V = 1; // Vertical constant
      // this.H = 2; // Horizontal constant
      // var dir = 0;
      var cr;
      var rr;
      var dir = 0;

      // Get divide direction (V, H or 0)
      divDir(r1, c1, r2, c2);
      // var dr = r2 - r1; // Calculate deltas
      // var dc = c2 - c1;
      // if (dr <= 1 || dc <= 1) {
      //   console.log("small pp");
      //   dir = 0;
      // } // Too small              // No division
      // else if (dr < dc) {
      //   console.log("vertical");
      //   dir = 1;
      // } // Flat and wide                // Vertical division
      // else {
      //   console.log("horizontal");
      //   dir = 2;
      // } // Tall and narrow              // Horizontal division

      // // Divide in vertical direction  
      if (dir == 1) {

        // Calculate wall and opening locations
        cr = round(random((c1 + 1) - 0.5, (c2 - 1) + 0.5));
        rr = round(random(r1 - 0.5, (r2 - 1) + 0.5));

        // stroke(255);
        // Draw wall  
        walls.push(new Wall(createVector(cr * gritSize, r1 * gritSize), createVector(cr * gritSize, rr * gritSize)));
        walls.push(new Wall(createVector(cr * gritSize, (rr + 1) * gritSize), createVector(cr * gritSize, r2 * gritSize)));

        // Recursively divide two subregions
        this.drawMaze(r1, c1, r2, cr);
        this.drawMaze(r1, cr, r2, c2);

        // Divide in horizontal direction
      } else if (dir == 2) {

        // Calculate wall and opening locations
        cr = round(random(c1 - 0.5, (c2 - 1) + 0.5));
        rr = round(random((r1 + 1) - 0.5, (r2 - 1) + 0.5));

        // Draw wall  
        walls.push(new Wall(createVector(c1 * gritSize, rr * gritSize), createVector(cr * gritSize, rr * gritSize)));
        walls.push(new Wall(createVector((cr + 1) * gritSize, rr * gritSize), createVector(c2 * gritSize, rr * gritSize)));

        // Recursively divide two subregions
        this.drawMaze(r1, c1, rr, c2);
        this.drawMaze(rr, c1, r2, c2);

        // No division. We're done.
      } else {
        return;
      }

      function divDir( r1,  c1,  r2,  c2) {

          var dr = r2 - r1;        // Calculate deltas
          var dc = c2 - c1;
          if (dr <= 1 || dc <= 1)  // Too small
          dir = 0;              // No division
          else if (dr < dc)        // Flat and wide
          dir = 1;              // Vertical division
          else                     // Tall and narrow
          dir = 2;              // Horizontal division
        }

    };

    this.show = function () {
     
      for (var i = 0; i < walls.length; i++) {
        // console.log(walls[i].from.x);
        walls[i].show();
      }
    };
  }
}