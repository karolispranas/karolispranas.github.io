var maze;
var gritSize = 50;
var exitPos;
var entrancePos;
var count = 0;
var path;
var walls = [];
var pathFound = false;
var positivePath = [];
var negativePath = [];
var figure;

// var perimeter;

function setup() {
  createCanvas(1800, 900);

  exitPos = createVector(width-75, height-50);
  entrancePos = createVector(width-1725, height-850);

  maze = new Maze(gritSize, exitPos, entrancePos);
  path = new Path();
  figure = new Figure();
}

function draw(){

  // noLoop();

  background(0);
  frameRate(20);

  if(count == 0) {
    maze.drawMaze(1, 1, 17, 35);
  }

  // stroke(255);
  maze.show();

  if(pathFound == false){
    path.findPositivePath();
    path.findNegativePath();
  }

  path.show();

  if(pathFound == true){
    figure.grow();
    figure.show();
  }

  count = 1;
}