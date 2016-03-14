/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function NPC(x, y) {
	
	this.x = x;
	this.y = y;
	this.w = 28;
	this.h = 50;
	this.regSpeed = 4;
	this.diagSpeed = this.regSpeed*.707;
	this.speed = this.regSpeed;
	this.tag = "player";
	this.color = "#FFFFFF";
	this.stage = 0;
	this.age = 0;
	
	this.sword = new Sword(this.x, this.y, this);
	this.dir = "";
	this.timeUntilUpdate = 0;
	this.swinging = false;
	this.pumping = false;
	this.pumped = false;
	this.pumpCount = 0;
	
	this.root;
	this.target = null;
	
	this.moving = false;
	this.maxHealth = 100;
	this.health = this.maxHealth;
	this.inCombat = false;
	
	// Personality
	this.selfishness = 0;
	this.charisma = 0;
	this.bravery = 0;
	
	
	/* DRAW */
	
	this.update = function() {
		
		if(this.swinging) {
			this.sword.update();
		}
		else if(this.moving){
			if(this.dir == "d")
				this.moveDown();
			else if(this.dir == "u")
				this.moveUp();
			else if(this.dir == "l")
				this.moveLeft();
			else
				this.moveRight();
			this.timeUntilUpdate -= this.speed;
		}
		else{
			this.timeUntilUpdate -= this.speed;
		}
		if(this.pumping) {
			if(Math.random()<.5)
				this.x += Math.floor(Math.random()*3);
			else this.x -= Math.floor(Math.random()*3);
			if(Math.random()<.5)
				this.y += Math.floor(Math.random()*3);
			else this.y -= Math.floor(Math.random()*3);
			
			this.pumpCount = Math.min(this.pumpCount+.01, 1);
			if(this.pumpCount == 1)
				this.color = "#FFFFFF";
		}
	};
	
	this.draw = function() {
		if(this.dir == "u")
			this.sword.draw();
		if(this.dir == "u")
			ctx.fillStyle = ColorLuminance("#FFFFFF", -.1);
		else ctx.fillStyle = this.color;
		ctx.fillRect(room.x+this.x, room.y+this.y, this.w, this.h);
		ctx.fillStyle = ColorLuminance("#FFFFFF", -.2);
		if(this.dir == "r")
			ctx.fillRect(room.x+this.x, room.y+this.y, 5, this.h);
		else if(this.dir == "l")
			ctx.fillRect(room.x+this.x+this.w-5, room.y+this.y, 5, this.h);
			
		if(this.pumping && this.pumpCount != 1) {
			ctx.fillStyle = "red";
			ctx.fillRect(room.x+this.x, room.y+this.y+(this.h*(1-this.pumpCount)), this.w, this.h*this.pumpCount);
		}
		
		ctx.fillStyle = "black";
		ctx.globalAlpha = .6;
		var x1 = room.x+this.x+this.w;
		var y1 = room.y+this.y+this.h;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x1, y1-22);
		ctx.lineTo(x1+(shadowMult*this.h), y1-22-(shadowMult*this.h));
		ctx.lineTo(x1+(shadowMult*this.h)+28, y1-22-(shadowMult*this.h));
		ctx.closePath();
		ctx.fill();
		ctx.globalAlpha = 1;
		
		if(this.dir != "u")
			this.sword.draw();
	};
	
	// Sets personality variables to a random value between -1...1
	this.initPersonality = function(){
		this.selfishness = 2*Math.random() - 1;
		this.charisma = 2*Math.random() - 1;
		this.bravery = 2*Math.random() - 1;
		//this.color = "rgb("+this.selfishness+","+this.charisma+","+this.bravery+")";
	};
	this.initPersonality();
	/* MOVEMENT */
	
	this.moveUp = function() {
		this.y = Math.round(Math.max(this.y-this.speed, room.y));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "u";
		//this.timeUntilUpdate -= this.speed;
	};
	this.moveDown = function() {
		this.y = Math.round(Math.min(this.y+this.speed, room.h-this.h*2));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "d";
		//this.timeUntilUpdate -= this.speed;
	};
	this.moveLeft = function() {
		this.x = Math.round(Math.max(this.x-this.speed, room.x));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "l";
		//this.timeUntilUpdate -= this.speed;
	};
	this.moveRight = function() {
		this.x = Math.round(Math.min(this.x+this.speed, room.w-this.w));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "r";
		//this.timeUntilUpdate -= this.speed;
	};
	
	this.center = function() {
		this.x = room.x+room.w/2-(this.w/2);
		this.y = room.y+room.h/2-(this.h/2);
	};
	
	this.updateAge = function() {
		this.age = Math.floor(shadowMult/2*100);
	};

	this.swing = function() {
		this.swinging = true;
		this.sword.setSwing(this.dir);
		this.timeUntilUpdate = 1;
	};
	
	this.stopSwinging = function() {
		this.swinging = false;
		this.timeUntilUpdate = 0;
	}
	
	this.pump = function() {
		this.pumping = true;
		this.pumpCount = 0;
	};
		
	this.moveFor = function(dist, dir) {
		this.timeUntilUpdate = dist;
		this.dir = dir;
	};
	
	this.moveTo = function(target){
		this.target = target;
		
		if(this.target == null) {
			console.log("MoveTarget is null!");
			return;
		}
		this.moving = true;
		if(this.x + 25 < target.x) 
			this.moveFor(25,'r');
		else if(this.x - 25 > target.x) 
			this.moveFor(25,'l');
		else if(this.y - 25 > target.y) 
			this.moveFor(25,'u');
		else if(this.y + 25 < target.y) 
			this.moveFor(25,'d');
		else
			this.moving = false;
	};
	
	this.attack = function(target){
		// If close enough to target
		if(Math.sqrt(Math.pow(target.x - this.x, 2) + Math.pow(target.y - this.y, 2)) < 70){
			this.moving = false;
			// If facing target, swing at it
			if(this.isFacing(target)){
				
				this.swing();
			}
			// If not facing target, face it
			else{
				console.log("not facing");
				this.faceTarget(target);
			}
		}
		// Otherwise, move to target
		else{
			this.moveTo(target);
		}
	};
	
	this.isFacing = function(target){
		var deltaX = this.x - target.x;  // +: we're to the right
		var deltaY = this.y - target.y;  // +: we're below
		if(this.dir == 'r'){
			if(deltaX < 0 && Math.abs(deltaX) >= Math.abs(deltaY)) 
				return true;
			return false;
		}
		else if(this.dir == 'l'){
			if(deltaX >= 0 && Math.abs(deltaX) >= Math.abs(deltaY)) 
				return true;
			return false;
		}
		else if(this.dir == 'u'){
			if(deltaY > 0 && Math.abs(deltaY) >= Math.abs(deltaX)) 
				return true;
			return false;
		}
		else if(this.dir == 'd'){
			if(deltaY <= 0 && Math.abs(deltaY) >= Math.abs(deltaX)) 
				return true;
			return false;
		}
		else 
			return false;
	};
	
	this.faceTarget = function(target){
		var deltaX = this.x - target.x;  // +: we're to the right
		var deltaY = this.y - target.y;  // +: we're below
		if(Math.abs(deltaX) > Math.abs(deltaY)){
			if(deltaX > 0)
				this.dir = 'l';
			else
				this.dir = 'r';
		}
		else{
			if(deltaY > 0)
				this.dir = 'u';
			else
				this.dir = 'd';
		}
	};
	
	this.initTree = function() {
		var MoveRandomAction = new Action(new MoveRandomDir(this));
		var SwingSwordAction = new Action(new SwingSword(this));
		
		var NearEnemyCheck = new Check(new NearEnemy(this));
		
		var CheckForEnemySequence = new Sequence([NearEnemyCheck, SwingSwordAction]);
		
		// Betrayal tree
		
		var BetrayalCheck = new Check(new ShouldBetray(this));
		var BetrayalAction = new Action(new Betray(this));
		
		var BetrayalBranch = new Sequence([BetrayalCheck,BetrayalAction]);
		
		this.root = new Selector([BetrayalBranch, MoveRandomAction]);
	};
	this.initTree();
	
	this.execute = function() {
		this.root.execute();
	};
		
}
