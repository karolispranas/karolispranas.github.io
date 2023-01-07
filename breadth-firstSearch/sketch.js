var maze;
var gui;
var gritSize = 50;
var exitPos;
var entrancePos;
var path;
var walls;
var pathFound;
var mazeDrawn;
var positivePath;
var negativePath;
var figure;
var drawThings;
var auxilaryVisible = true;

function setup() {
  createCanvas(1800, 900);

  setSketch();

  gui = createGui('p5.gui');
  gui.addGlobals('auxilaryVisible');

  gui.addButton("Start/pause", function() {
    begin();
  });

  gui.addButton("redraw",  function() {
    setSketch();
  });
}

function draw(){

  if(drawThings){
    if(mazeDrawn == false) {
      maze.drawMaze(1, 1, 17, 35);
    }
  
    if(pathFound == false){
      path.findPositivePath();
      path.findNegativePath();
    }

      maze.show();
      path.show();
  
    if(pathFound == true){
      figure.grow();
      negativeFigure.grow();
      figure.show();
      negativeFigure.show();
    }
  }
}

function setSketch() {

  clear();

  background(0);
  frameRate(60);

  drawThings = true;
  pathFound = false;
  mazeDrawn = false;

  walls = [];
  positivePath = [];
  negativePath = [];

  exitPos = createVector(width-75, height-50);
  entrancePos = createVector(width-1725, height-850);

  maze = new Maze(gritSize, exitPos, entrancePos);
  path = new Path();
  figure = new Figure();
  negativeFigure = new NegativeFigure();
}

function begin() {
  drawThings = !drawThings;
}