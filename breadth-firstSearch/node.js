function Node(pos) {
	this.pos = pos;
    this.top = false;
    this.left = false;
    this.bottom = false;
    this.right = false;
    this.parentOf = [];
    this.parent;
	this.positive;
	this.negative;
	this.connected;
	
	this.show = function() {
		if (this.connected == true) {
			fill(0,0,255);

		}else if(this.positive == true){
			fill(0,255,0);
		}
		else {
			fill(255,0,0);
		}
		noStroke();
		ellipse(this.pos.x, this.pos.y, 10, 10);
	}
}