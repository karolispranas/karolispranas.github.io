function Figure() {

    this.branches = [];
    this.minDist = 10;
    this.maxDist = 55;
    var previousNode;

    this.grow = function() {

        if(this.branches.length==0){
            var dir = createVector(0, 1);
            var pos = positivePath[0].pos;
            var begining = new Branch(null, pos, dir);
            this.branches.push(begining);
            previousNode = positivePath[0];
            positivePath.shift(); 
        }

        if (positivePath.length!=0) {
			var node = positivePath[0];

            // console.log("looping");
  
            var closestBranch = this.branches[this.branches.length-1];
            var dist = p5.Vector.dist(node.pos, closestBranch.pos);

            if (dist < this.minDist) {

                // console.log("connected");
                var newPos;
                var branch;
                if(positivePath[1]!=undefined){
                    var nextNode = positivePath[1];
                   if(previousNode.pos.x!=nextNode.pos.x && previousNode.pos.y!=nextNode.pos.y){
                    console.log(previousNode.pos.x+" , "+previousNode.pos.y);
                    console.log(node.pos.x+" , "+node.pos.y);
                    console.log(nextNode.pos.x+" , "+nextNode.pos.y);
                    console.log("//");
                    if(node.pos.y == nextNode.pos.y){
                        for(var i=0; i<this.branches.length; i++){
                            branch=this.branches[i];
                            if(branch.pos.x<node.pos.x+25 && branch.pos.x>node.pos.x-25){
                                if(branch.pos.y<node.pos.y-15 && branch.pos.y>previousNode.pos.y+15){
                                    newPos = branch.pos;
                                    break;
                                }
                            }else{
                                newPos = createVector(node.pos.x, node.pos.y-25);
                            }
                        }
                        // newPos = createVector(node.pos.x, node.pos.y-25);
                        
                    }else {
                        newPos = createVector(node.pos.x-25, node.pos.y);
                    }
                    // var newPos = createVector(node.pos.x-);
                    var dir = createVector(0, 1);
                    var newBranch = new Branch(null, newPos, dir);
                    this.branches.push(newBranch);
                   }
                }
                previousNode = node;
                positivePath.shift();
                return;
            }   

            var newDir = p5.Vector.sub(node.pos, closestBranch.pos);
            newDir.normalize();
            closestBranch.dir.add(newDir);
            closestBranch.count++;
				

		}
		
		// for (var i = this.leaves.length-1; i >= 0; i--) {
		// 	if (this.leaves[i].reached) {
		// 		this.leaves.splice(i, 1);
		// 	}
		// }
		
		for (var i = this.branches.length-1; i >= 0; i--) {
			var branch = this.branches[i];
			if (branch.count > 0) {
				branch.dir.div(branch.count + 1);
				this.branches.push(branch.next());
			}
			branch.reset();
		}
    }

    this.show = function() {
        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }
    }
}