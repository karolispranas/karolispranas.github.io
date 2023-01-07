function Branch(parent, pos, dir, positive, negative) {
	this.positive = positive;
	this.negative = negative;
	this.pos = pos;
	this.parent = parent;
	this.dir = dir;
	this.origDir = this.dir.copy();
	this.count = 0;
	this.depth = 1;
  
	this.reset = function() {
	  this.dir = this.origDir.copy();
	  this.count = 0;
	}
  
	this.next = function() {
	  var nextDir = p5.Vector.mult(this.dir, length);
	  var nextPos = p5.Vector.add(this.pos, nextDir);
	  var nextBranch = new Branch(this, nextPos, this.dir.copy(), this.positive, this.negative, false);
	  this.parentOff = true;
	  return nextBranch;
	}
  
	this.show = function() {
		if (parent != null) {
			this.depth = parent.depth + 0.5;
			maxDepth = max(this.depth, maxDepth);
			var width = (maxDepth - this.depth) / maxDepth * 10 + 0.5;
			strokeWeight(width);
			var fireRed = 0;
			var fireGreen = random(150, 200);
			var fireBlue = 255;
			stroke(fireRed, fireGreen, fireBlue);
			line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
		}
	}
  }