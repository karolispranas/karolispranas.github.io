function NewFigure(nodes, pos) {
	this.branches = [];
	this.nodes = nodes;

    // Create an ending point
	this.pos = pos;
	var dir = createVector(-1, 0);
	var end = new Branch(null, pos, dir, false, true);
	this.branches.push(end);

	var endingBranch = end;
	var found = false;

	while (!found) {
	  for (var i = 0; i < this.nodes.length; i++) {
		var d = p5.Vector.dist(endingBranch.pos, this.nodes[i].pos);
		if (d < maxDist) {
		  found = true;
		}
	  }
	  if (!found) {
		var branch = endingBranch.next();
		endingBranch = branch;
		this.branches.push(endingBranch);
	  }
	}
  

	this.grow = function() {
	  for (var i = 0; i < this.nodes.length; i++) {
		if (!this.nodes[i].negativeReached) {
		
			var node = this.nodes[i];
			var closestBranch = null;
			var record = maxDist;
			for (var j = 0; j < this.branches.length; j++) {
				var branch = this.branches[j];
				var d = p5.Vector.dist(node.pos, branch.pos);
				if (d < minDist) {
			
					node.negativeReached = true;
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