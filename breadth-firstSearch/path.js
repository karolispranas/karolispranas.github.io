function Path() {
	// var start = createVector(width - 1750 + gritSize, height - 850)
    
    var positiveNodes = [];
    var negativeNodes = [];
    var nodes = [];
    var positiveQue = [];
    var negativeQue = [];
   
    var positiveRootNode = new Node(createVector(width - 1750 + gritSize*1.5, height - 850 - gritSize*0.5));
    positiveRootNode.positive = true;
    positiveNodes.push(positiveRootNode);
    var positiveStartNode = new Node(createVector(positiveRootNode.pos.x, positiveRootNode.pos.y+gritSize));
    positiveStartNode.top = true;
    positiveStartNode.positive = true;
    positiveStartNode.parent = positiveRootNode;
    positiveNodes.push(positiveStartNode);
    positiveQue.push(positiveStartNode);

    var negativeRootNode = new Node(createVector(width - 200 + gritSize*1.5, height - 50 + gritSize*0.5));
    negativeNodes.push(negativeRootNode);
    var negativeStartNode = new Node(createVector(negativeRootNode.pos.x, negativeRootNode.pos.y-gritSize));
    negativeStartNode.bottom = true;
    negativeStartNode.parent = negativeRootNode;
    negativeNodes.push(negativeStartNode);
    negativeQue.push(negativeStartNode);

    this.findPositivePath = function(){

        // var temp = new Node(createVector(1675, 825));
        // nodes.push(temp);
        if(positiveQue.length>0) {
            var currentNode = positiveQue[0];
            // for (var i = 0; i < negativeNodes.length; i++) {
            //         var node = negativeNodes[i];
            //         if (currentNode.pos.y == node.pos.y && currentNode.pos.x == node.pos.x) {
            //             noLoop();
            //         }
            //     }
            // if (currentNode.pos.y >= 825 && currentNode.pos.x >= 1675) {
            //     // return;
            //     // break;
            //     noLoop();
            // }
            if(currentNode.top==false) {
                checkTop();
            }
            if(currentNode.right==false) {
                checkRight();
            }
            if(currentNode.bottom==false) {
                checkBottom();
            }
            if(currentNode.left==false) {
                checkLeft();
            }
            positiveQue.shift();
        }

        function checkLeft(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.x == currentNode.pos.x-gritSize/2 && wall.to.x == currentNode.pos.x-gritSize/2) {
                    // var temp = new Node(createVector(wall.from.x, wall.from.y));
                    // nodes.push(temp);
                    if(wall.from.y < currentNode.pos.y && wall.to.y > currentNode.pos.y){
                        // console.log("left");
                        return;
                    }
                }
            }
            // // console.log("no wall found");
            currentNode.left=true;
            var newNode = new Node(createVector(currentNode.pos.x-gritSize, currentNode.pos.y));
            newNode.positive = true;
            newNode.parent = currentNode;
            newNode.right = true;
            currentNode.parentOf.push(newNode);
            positiveNodes.push(newNode);
            chechIfConnected(newNode);
            positiveQue.push(newNode);
        }
    
        function checkRight(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.x == currentNode.pos.x+gritSize/2 && wall.to.x == currentNode.pos.x+gritSize/2) {
                    if(wall.from.y < currentNode.pos.y && wall.to.y > currentNode.pos.y){
                        return;
                    }
                }
            }
            // console.log("no wall found");
            currentNode.right=true;
            var newNode = new Node(createVector(currentNode.pos.x+gritSize, currentNode.pos.y));
            newNode.positive = true;
            newNode.parent = currentNode;
            newNode.left = true;
            currentNode.parentOf.push(newNode);
            positiveNodes.push(newNode);
            chechIfConnected(newNode);
            positiveQue.push(newNode);
        }
    
        function checkBottom(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.y == currentNode.pos.y+gritSize/2 && wall.to.y == currentNode.pos.y+gritSize/2) {
                    if(wall.from.x < currentNode.pos.x && wall.to.x > currentNode.pos.x){
                        return;
                    }
                }
            }
            // console.log("no wall found");
            currentNode.bottom=true;
            var newNode = new Node(createVector(currentNode.pos.x, currentNode.pos.y+gritSize));
            newNode.positive = true;
            newNode.parent = currentNode;
            newNode.top = true;
            currentNode.parentOf.push(newNode);
            positiveNodes.push(newNode);
            chechIfConnected(newNode);
            positiveQue.push(newNode);
        }
    
        function checkTop(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.y == currentNode.pos.y-gritSize/2 && wall.to.y == currentNode.pos.y-gritSize/2) {
                    if(wall.from.x < currentNode.pos.x && wall.to.x > currentNode.pos.x){
                        return;
                    }
                } 
            }
            // console.log("no wall found");
            currentNode.top=true;
            var newNode = new Node(createVector(currentNode.pos.x, currentNode.pos.y-gritSize));
            newNode.positive = true;
            newNode.parent = currentNode;
            newNode.bottom = true;
            currentNode.parentOf.push(newNode);
            positiveNodes.push(newNode);
            chechIfConnected(newNode);
            positiveQue.push(newNode);
        }

        function chechIfConnected(currentNode) {
            for (var i = 0; i < negativeNodes.length; i++) {
                var node = negativeNodes[i];
                if (currentNode.pos.y == node.pos.y && currentNode.pos.x == node.pos.x) {
                    highlightPath(currentNode, node);
                    // noLoop();
                    pathFound = true;
                }
            }
        }

        function highlightPath(positiveNode, negativeNode){

            
            // console.log(negativeNode.parent);

            var positive = positiveNode;
            var negative = negativeNode;

            if(positive!=null){
                positivePath.unshift(positive);
                positive.connected = true;
            }
            if(negative!=null){
                negativePath.unshift(negative);
                negative.connected = true;
            }

            if(positive!=null){
                if(positive.parent!=undefined){
                    positive = positive.parent;
                } else {
                    positive = null;
                }
            }
            
            if(negative!=null){
                if(negative.parent!=undefined){
                    negative = negative.parent;
                } else {
                    negative = null;
                }
            }
            
            if(positive!=null || negative!=null){
                highlightPath(positive, negative)
            }
        }
    }

    this.findNegativePath = function(){
        
        // var temp = new Node(createVector(1675, 825));
        // nodes.push(temp);
        if(negativeQue.length>0) {
            var currentNode = negativeQue[0];
            // for (var i = 0; i < positiveNodes.length; i++) {
            //     var node = positiveNodes[i];
            //     // if (currentNode.pos.y == node.pos.y && currentNode.pos.x == node.pos.x) {
                    // console.log(currentNode);
            //     // }
            // }
            // if (currentNode.pos.y <= 25 && currentNode.pos.x <= 125) {
            //     // return;
            //     // break;
            //     // noLoop();
            // }
            currentNode.negative = true;
            if(currentNode.top==false) {
                checkTop();
            }
            if(currentNode.right==false) {
                checkRight();
            }
            if(currentNode.bottom==false) {
                checkBottom();
            }
            if(currentNode.left==false) {
                checkLeft();
            }
            negativeQue.shift();
        }

        function checkLeft(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.x == currentNode.pos.x-gritSize/2 && wall.to.x == currentNode.pos.x-gritSize/2) {
                    // var temp = new Node(createVector(wall.from.x, wall.from.y));
                    // nodes.push(temp);
                    if(wall.from.y < currentNode.pos.y && wall.to.y > currentNode.pos.y){
                        // console.log("left");
                        return;
                    }
                }
            }
            // // console.log("no wall found");
            currentNode.left=true;
            var newNode = new Node(createVector(currentNode.pos.x-gritSize, currentNode.pos.y));
            newNode.parent = currentNode;
            newNode.right = true;
            currentNode.parentOf.push(newNode);
            negativeNodes.push(newNode);
            negativeQue.push(newNode);
        }
    
        function checkRight(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.x == currentNode.pos.x+gritSize/2 && wall.to.x == currentNode.pos.x+gritSize/2) {
                    if(wall.from.y < currentNode.pos.y && wall.to.y > currentNode.pos.y){
                        return;
                    }
                }
            }
            // console.log("no wall found");
            currentNode.right=true;
            var newNode = new Node(createVector(currentNode.pos.x+gritSize, currentNode.pos.y));
            newNode.parent = currentNode;
            newNode.left = true;
            currentNode.parentOf.push(newNode);
            negativeNodes.push(newNode);
            negativeQue.push(newNode);
        }
    
        function checkBottom(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.y == currentNode.pos.y+gritSize/2 && wall.to.y == currentNode.pos.y+gritSize/2) {
                    if(wall.from.x < currentNode.pos.x && wall.to.x > currentNode.pos.x){
                        return;
                    }
                }
            }
            // console.log("no wall found");
            currentNode.bottom=true;
            var newNode = new Node(createVector(currentNode.pos.x, currentNode.pos.y+gritSize));
            newNode.parent = currentNode;
            newNode.top = true;
            currentNode.parentOf.push(newNode);
            negativeNodes.push(newNode);
            negativeQue.push(newNode);
        }
    
        function checkTop(){
            for(var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                if(wall.from.y == currentNode.pos.y-gritSize/2 && wall.to.y == currentNode.pos.y-gritSize/2) {
                    var temp = new Node(createVector(wall.from.x, wall.from.y));
                    nodes.push(temp);
                    if(wall.from.x < currentNode.pos.x && wall.to.x > currentNode.pos.x){
                        return;
                    }
                } 
            }
            // console.log("no wall found");
            currentNode.top=true;
            var newNode = new Node(createVector(currentNode.pos.x, currentNode.pos.y-gritSize));
            newNode.parent = currentNode;
            newNode.bottom = true;
            currentNode.parentOf.push(newNode);
            negativeNodes.push(newNode);
            negativeQue.push(newNode);
        }
    }

    this.show = function(){
        nodes = concat(negativeNodes, positiveNodes);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].show();
          }
    }
}

