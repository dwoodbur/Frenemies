/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Tree(x,y) {
	this.x = x;
	this.y = y;
	//this.w = 10;
	//this.h = 75;
	
	this.w = 20;
	this.h = 150+(Math.random()*100);
	
	this.tag = "tree";
	
	this.branches = [];
	this.leaves = [];
	
	// Get random number of branches for each side.
	var numLeftBranches = 3+Math.floor(Math.random()*2);
	var numRightBranches = 3+Math.floor(Math.random()*2);

	// Get average y step up for each branch.
	var yStepLeft = (this.h-30)/numLeftBranches;
	var yStepRight = (this.h-30)/numRightBranches;
	
	// Get average length step for each branch.
	var lengthStepLeft = 40/numLeftBranches;
	var lengthStepRight = 40/numRightBranches;

	this.generateBranches = function(side, numBranches, yStep, lengthStep) {
		for(var i=0; i<numBranches; i++) {
		// Pick spot on tree, size.
		var branch = {x: this.x+this.w/2, 
					  y: this.y+15+(yStep*i)+Math.floor(Math.random()*3),
					  length: 20+(lengthStep*i)+(Math.random()*20)};
					  
		if(side == "left")
			branch.length *= -1;
		
		if(Math.random() < .8)
			this.branches.push(branch);
		}
	};
	this.generateBranches("left", numLeftBranches, yStepLeft, lengthStepLeft);
	this.generateBranches("right", numRightBranches, yStepRight, lengthStepRight);
	
	
	
	
	this.generateLeaves = function() {
		for(var i=0; i<this.branches.length; i++) {
			var branch = this.branches[i];
			var numLeaves = Math.ceil(Math.random()*2);
			for(var j=0; j<numLeaves; j++) {
				var leaf = {x: branch.x+Math.floor(Math.random()*branch.length),
								y: branch.y,
								w: 25,
								h: 25};
				
				this.leaves.push(leaf);
			}
		}
	};
	//this.generateLeaves();
	
	
	
	TREE_OUTLINE_WIDTH = 3;
	LEAF_OUTLINE_WIDTH = 2;
	this.draw = function() {
		ctx.fillStyle = "black";
		ctx.fillRect(room.x+this.x-TREE_OUTLINE_WIDTH, room.y+this.y-TREE_OUTLINE_WIDTH, this.w+2*TREE_OUTLINE_WIDTH, this.h+2*TREE_OUTLINE_WIDTH);
		ctx.fillStyle = "brown";
		ctx.fillRect(room.x+this.x, room.y+this.y, this.w, this.h);
		
		

		for(var i=0; i<this.branches.length; i++) {
			var branch = this.branches[i];
			ctx.fillStyle = "black";
			if(branch.length > 0)
				ctx.fillRect(room.x+branch.x+(this.w/2), room.y+branch.y-TREE_OUTLINE_WIDTH, branch.length+TREE_OUTLINE_WIDTH-(this.w/2), 10+2*TREE_OUTLINE_WIDTH);
			else ctx.fillRect(room.x+branch.x-(-1*branch.length)-TREE_OUTLINE_WIDTH, room.y+branch.y-TREE_OUTLINE_WIDTH, (-1*branch.length)-(this.w/2)+TREE_OUTLINE_WIDTH, 10+2*TREE_OUTLINE_WIDTH);
			ctx.fillStyle = "brown";
			ctx.fillRect(room.x+branch.x, room.y+branch.y, branch.length, 10);
		}
		var CX = room.x;
		var CY = room.y;
		for(var i=0; i<this.leaves.length; i++) {
			var leaf = this.leaves[i];
			ctx.fillStyle = "black";
			ctx.fillRect(CX+leaf.x-LEAF_OUTLINE_WIDTH, CY+leaf.y-LEAF_OUTLINE_WIDTH, leaf.w+2*LEAF_OUTLINE_WIDTH, leaf.h+2*LEAF_OUTLINE_WIDTH);
			ctx.fillStyle = "green";
			ctx.fillRect(CX+leaf.x, CY+leaf.y, leaf.w, leaf.h);
		}
	};
	
	this.drawShadow = function() {
		ctx.fillStyle = "black";
		ctx.globalAlpha = .6;
		var x1 = room.x+this.x+this.w;
		var y1 = room.y+this.y+this.h;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1, y1-this.w);
		ctx.lineTo(x1+(shadowMult*this.h), y1-this.w-(shadowMult*this.h));
		ctx.lineTo(x1+(shadowMult*this.h)+this.w, y1-this.w-(shadowMult*this.h));
		ctx.closePath();
		ctx.fill();
		ctx.globalAlpha = 1;
	}
	
}
