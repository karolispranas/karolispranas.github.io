// Figure class main calculations
function NewFigure(nodes, pos) {
	this.branches = [];
	this.validNodes = nodes;

    // Create an ending point
	this.pos = pos;
	var dir = createVector(-1, 0);
	var end = new Branch(null, pos, dir, false, true);
	this.branches.push(end);

	var endingBranch = end;
	var found = false;

	// Keep the begining and ending roots groving until there is a node in between max and min distance
	while (!found) {
	  for (var i = 0; i < this.validNodes.length; i++) {
		var d = p5.Vector.dist(endingBranch.pos, this.validNodes[i].pos);
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
		// Go througth all of the nodes and find the closest branch to the node
	  for (var i = 0; i < this.validNodes.length; i++) {
		if (!this.validNodes[i].negativeReached) {
		
			var node = this.validNodes[i];
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

			// if we find the branch that it in between the min and max distance and is closest to the node, the branch is gonna get pulled towards it
			if (closestBranch != null) {
				var newDir = p5.Vector.sub(node.pos, closestBranch.pos);
				newDir.normalize();
				closestBranch.dir.add(newDir);
				closestBranch.count++;
			}
		}
	  }
  

    for (var i = 0; i < this.validNodes.length; i++) {
        var node = this.validNodes[i];
        if (node.positiveReached == true && node.negativeReached == true) {
            begin();
        }
    }
  
	  // Go througth all the branches and average it's direction based on how many nodes are puling it, create a new branch towards the pulling node
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
	  for (var i = 0; i < this.validNodes.length; i++) {
		this.validNodes[i].show();
	  }
  
	  for (var i = 0; i < this.branches.length; i++) {
		this.branches[i].show();
	  }
  
	}
  }