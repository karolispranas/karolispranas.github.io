function Wall(from, to) {
	this.from = from;
	this.to = to;
	
	this.show = function() {
	
		stroke(255);
		// noStroke();
		strokeWeight(2);
		line(this.from.x, this.from.y, this.to.x, this.to.y);
	}
}