function NegativeFigure() {

    this.branches = [];
    this.minDist = 15;
    var previuosNode;

    this.grow = function() {

        if(this.branches.length==0){
            var dir = createVector(0, 1);
            var pos = negativePath[0].pos;
            var begining = new Branch(null, pos, dir);
            this.branches.push(begining);
            previuosNode = negativePath[0];
            negativePath.shift(); 
        }

        if (negativePath.length!=0) {
			var node = negativePath[0];

            var closestBranch = this.branches[this.branches.length-1];
            var dist = p5.Vector.dist(node.pos, closestBranch.pos);

            if (dist < this.minDist) {

                var newPos;
                var branch;
                if(negativePath[1]!=undefined){
                    var nextNode = negativePath[1];

                   if(previuosNode.pos.x!=nextNode.pos.x && previuosNode.pos.y!=nextNode.pos.y){
                        if(node.pos.y == nextNode.pos.y && previuosNode.pos.y < node.pos.y){
                            for(var i=0; i<this.branches.length; i++){
                                branch=this.branches[i];
                                if(branch.pos.x<=node.pos.x+gritSize/2 && branch.pos.x>=node.pos.x-gritSize/2){
                                    if(branch.pos.y<node.pos.y-20 && branch.pos.y>previuosNode.pos.y+20){
                                        newPos = branch.pos;
                                        break;
                                    }
                                }
                            }     

                        } else if(node.pos.y == nextNode.pos.y && previuosNode.pos.y > node.pos.y){
                            for(var i=0; i<this.branches.length; i++){
                                branch=this.branches[i];
                                if(branch.pos.x<=node.pos.x+gritSize/2 && branch.pos.x>=node.pos.x-gritSize/2){
                                    if(branch.pos.y>=node.pos.y+20 && branch.pos.y<=previuosNode.pos.y-20){
                                        newPos = branch.pos;
                                        break;
                                    }
                                }
                            }

                        } else if(node.pos.x == nextNode.pos.x && previuosNode.pos.x < node.pos.x) {
                            for(var i=0; i<this.branches.length; i++){
                                branch=this.branches[i];
                                if(branch.pos.y<=node.pos.y+gritSize/2 && branch.pos.y>=node.pos.y-gritSize/2){
                                    if(branch.pos.x<=node.pos.x-20 && branch.pos.x>=previuosNode.pos.x+20){
                                        newPos = branch.pos;
                                        break;
                                    }
                                }
                            }
                            
                        }else if(node.pos.x == nextNode.pos.x && previuosNode.pos.x > node.pos.x) {
                            for(var i=0; i<this.branches.length; i++){
                                branch=this.branches[i];
                                if(branch.pos.y<=node.pos.y+gritSize/2 && branch.pos.y>=node.pos.y-gritSize/2){
                                    if(branch.pos.x>=node.pos.x+20 && branch.pos.x<=previuosNode.pos.x-20){
                                        newPos = branch.pos;
                                        break;
                                    }
                                }
                            }
                            
                        }
                        var dir = createVector(0, 1);
                        var newBranch = new Branch(null, newPos, dir);
                        this.branches.push(newBranch);
                   }
                }
                previuosNode = node;
                negativePath.shift();
                return;
            }   

            var newDir = p5.Vector.sub(node.pos, closestBranch.pos);
            newDir.normalize();
            closestBranch.dir.add(newDir);
            closestBranch.count++;

		}
		
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