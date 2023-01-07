function Wall(from, to) {
	this.from = from;
	this.to = to;
	
	this.show = function() {

		if(!auxilaryVisible){
			stroke(0);
		} else 
		stroke(255);
		strokeWeight(2);
		line(this.from.x, this.from.y, this.to.x, this.to.y);
	}
}