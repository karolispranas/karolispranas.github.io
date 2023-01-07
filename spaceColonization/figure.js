function Figure(nodes, pos) {
	this.branches = [];
	this.tips = [];
	this.nodes = nodes;

	this.pos = pos;
	var dir = createVector(1, 0);
	var begining = new Branch(null, pos, dir, true, false, false);
	this.branches.push(begining);

	var beginingBrach = begining;
	var found = false;

	while (!found) {
	  for (var i = 0; i < this.nodes.length; i++) {
		var d = p5.Vector.dist(beginingBrach.pos, this.nodes[i].pos);
		if (d < maxDist) {
		  found = true;
		}
	  }
	  if (!found) {
		var branch = beginingBrach.next();
		beginingBrach = branch;
		this.branches.push(beginingBrach);
	  }
	}
  
	this.grow = function() {
	  for (var i = 0; i < this.nodes.length; i++) {
		if (!this.nodes[i].positiveReached) {
			var node = this.nodes[i];
			var closestBranch = null;
			var record = maxDist;
			for (var j = 0; j < this.branches.length; j++) {
				var branch = this.branches[j];
				var d = p5.Vector.dist(node.pos, branch.pos);
				if (d < minDist) {
				
					node.positiveReached = true;
					closestBranch = null;
					break;
				} else if (d > maxDist) {
				
				} else if (closestBranch == null || d < record) {
					closestBranch = branch;
					record = d;
				}
			
		}

			if (closestBranch != null) {
		  		var newDir = p5.Vector.sub(node.pos, closestBranch.pos);
		  		newDir.normalize();
		  		closestBranch.dir.add(newDir);
		  		closestBranch.count++;
			}
		}
	  }

	for (var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];
		if (node.positiveReached == true && node.negativeReached == true) {
			
			begin();
		}
	}
  
	  for (var i = this.branches.length - 1; i >= 0; i--) {
		var branch = this.branches[i];
		if (branch.count > 0) {

		  branch.dir.div(branch.count + 1);
		  this.branches.push(branch.next());
          } 

          branch.reset();
		} 
	}

  
	this.show = function() {
	  for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].show();
	  }
  
	  for (var i = 0; i < this.branches.length; i++) {
		this.branches[i].show();
	  }
  
	}
  }