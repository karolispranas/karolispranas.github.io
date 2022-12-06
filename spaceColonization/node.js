 // Node class
 function Node() {
	this.pos = createVector( random(100, width-100),random(50, height-50));
	this.positiveReached = false;
	this.negativeReached = false;
	
	this.show = function() {
		
		if (nodesVisible == true) {
			if (this.positiveReached == true) {
				fill(0, 255, 0);
			}else if (this.negativeReached == true) {
				fill(255, 0, 0);
			} else {
				fill(255, 255, 255);
			}
		}else {
			noFill();
		}
		noStroke();
		ellipse(this.pos.x, this.pos.y, 4, 4);
	}
}
  