// Branch class
function Branch(parent, pos, dir, positive, negative, parentOff) {
	this.positive = positive;
	this.negative = negative;
	this.pos = pos;
	this.parent = parent;
	this.dir = dir;
	this.origDir = this.dir.copy();
	this.count = 0;
	this.len = 5;
	this.parentOff = parentOff;
  
	// Save the record of the previous direction nad reset the count of nodes pulling on the branch
	this.reset = function() {
	  this.dir = this.origDir.copy();
	  this.count = 0;
	}

	if (parent == null) {
		this.depth = 1;
	} else {
		this.depth = parent.depth + 0.5;
	}
	max_depth = max(this.depth, max_depth);
  
	// Create a new branch on top of an old branch 
	this.next = function() {
	  var nextDir = p5.Vector.mult(this.dir, this.len);
	  var nextPos = p5.Vector.add(this.pos, nextDir);
	  var nextBranch = new Branch(this, nextPos, this.dir.copy(), this.positive, this.negative, false);
	  this.parentOff = true;
	  return nextBranch;
	}
  
	// Draw the branch on the screen changing it's thickness based on distance
	this.show = function() {
		if (parent != null) {
			var width = (max_depth - this.depth) / max_depth * 10 + 0.5;
			strokeWeight(width);
			var fireRed = 0;
			var fireGreen = random(150, 200);
			var fireBlue = 255;
			stroke(fireRed, fireGreen, fireBlue);
			line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
		}
	}
  }