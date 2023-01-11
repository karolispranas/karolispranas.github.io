// setup class main() basically
var positiveFigure;
var negaiveFigure;
var utils;
var nodes = [];
var drawThings;
var maxDepth;
var gui;
var nodesVisible = false;
var negativeFifureVisible = true;

var maxDist = 100;

var maxDistMin = 100;
var maxDistMax = 500;

var minDist = 10;

var minDistMin = 10;
var minDistMax = 40;

var nodeAmount = 400;

var nodeAmountMax = 1000;
var nodeAmountMin = 200;

var positivePosY = 460;

var positivePosYMax = 890;
var positivePosYMin = 30;

var positivePosX = 50;

var positivePosXMax = 1830;
var positivePosXMin = 50;

var negativePosY = 460;

var negativePosYMax = 890
var negativePosYMin = 30

var negativePosX = 1830;

var negativePosXMax = 1830;
var negativePosXMin = 50;

var length = 5;

var lengthMax = 30;
var lengthMin = 5;

function setup() {
  createCanvas(1880, 920);

  setSketch();

  gui = createGui('p5.gui');
  gui.addGlobals('maxDist', 'minDist', 'nodeAmount', 'positivePosY',  'positivePosX', 'negativePosY', 'negativePosX', 'length', 'nodesVisible', 'negativeFifureVisible');

  gui.addButton("Start/pause", function() {
    begin();
  });

  gui.addButton("redraw",  function() {
    setSketch();
  });

}

function draw() {

  if (drawThings) {

  background(0);

  positiveFigure.show();
  positiveFigure.grow();

  if (negativeFifureVisible == true) {
    negaiveFigure.show();
    negaiveFigure.grow();
  }
  }
}

function begin() {
  drawThings = !drawThings;
}

function setSketch() {

  frameRate(60);

  maxDepth = 0;

  drawThings = true;

  utils = new Utils();
  
  nodes = utils.GenerateNodes(nodeAmount);

  var pos = createVector( positivePosX, positivePosY);
  var negPos = createVector( negativePosX, negativePosY);

  positiveFigure = new Figure(nodes, pos);
  negaiveFigure = new NegativeFigure(nodes, negPos);
}