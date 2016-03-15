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
	this.stage = 0;
	this.age = 0;
	this.type = "NPC";
	
	this.sword = new Sword(this.x, this.y, this);
	this.dir = "";
	this.timeUntilUpdate = 0;
	this.swinging = false;
	this.pumping = false;
	this.pumped = false;
	this.pumpCount = 0;
	
	this.hp = 100;
	this.healthBar = new HealthBar(this, this.x, this.y);
	
	this.root;
	this.target = null;
	
	this.moving = false;
	this.inCombat = false;
	
	// Personality
	this.selfishness = 0;
	this.charisma = 0;
	this.bravery = 0;
	
	this.relationships = [];
	this.enemyNPCs = [];
	
	this.speechBubble = null;
	this.speechDur = 0;
	
	this.cameraLock = false;
	
	this.tiredOfExploring = 0;
	this.exploreTarget = null;
	
	this.fleeing = false;
	
	var skinTones = ["#FAE7D0", "#DFC183","#AA724B","#C8ACA3","#E8CDA8","#7B4B2A","#FFCC99","#CEAB69","#935D37",
		"#C0A183","#CAA661","#573719","#FEB186","#B98865","#7B4B2A","#C18E74","#B58A3F","#483728"];
	this.color = skinTones[Math.floor(Math.random()*skinTones.length)];
	this.color2 = ColorLuminance(this.color, -.3);
	

	this.wanderTimer = 0;

	this.name = POSSIBLE_NAMES[Math.floor(Math.random()*POSSIBLE_NAMES.length)];
	POSSIBLE_NAMES.splice(POSSIBLE_NAMES.indexOf(this.name), 1);

	
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
		if(this.speechBubble != null) {
			this.speechDur--;
			if(this.speechDur <= 0)
				this.speechBubble = null;
		}
		if(this.tiredOfExploring > 0)
			this.tiredOfExploring--;
			
		if(this.fleeing) {
			if(!enemyNear(this))
				this.fleeing = false;
		}
	};
	
	function enemyNear(NPC) {
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < 50) {
				return true;
			}
		}
		return false;
	}
	
	this.draw = function() {
		if(this.dir == "u")
			this.sword.draw();
		if(this.dir == "u")
			ctx.fillStyle = this.color2;
		else ctx.fillStyle = this.color;
		ctx.fillRect(room.x+this.x, room.y+this.y, this.w, this.h);
		ctx.fillStyle = this.color2;
		if(this.dir == "r")
			ctx.fillRect(room.x+this.x, room.y+this.y, 5, this.h);
		else if(this.dir == "l")
			ctx.fillRect(room.x+this.x+this.w-5, room.y+this.y, 5, this.h);
			
		/*if(this.pumping && this.pumpCount != 1) {
			ctx.fillStyle = "red";
			ctx.fillRect(room.x+this.x, room.y+this.y+(this.h*(1-this.pumpCount)), this.w, this.h*this.pumpCount);
		}*/
		
		ctx.fillStyle = "black";
		ctx.font = "10px Arial";
		ctx.fillText(this.name, room.x+this.x+(this.w/2) - .5*ctx.measureText(this.name).width, room.y+this.h+8+this.y);
		
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
			
		this.healthBar.draw();
		
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
		if(this.speechBubble != null)
			this.speechBubble.y = Math.round(Math.max(this.y-this.speed, room.y));
		if(this.healthBar != null)
			this.healthBar.y = Math.round(Math.max(this.y-this.speed, room.y));
		if(this.cameraLock)
			room.lockOn(this);
		//this.timeUntilUpdate -= this.speed;
		//this.timeUntilUpdate -= this.speed;
	};
	this.moveDown = function() {
		this.y = Math.round(Math.min(this.y+this.speed, room.h-this.h*2));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "d";
		if(this.speechBubble != null)
			this.speechBubble.y = Math.round(Math.min(this.y+this.speed, room.h-this.h*2));
		if(this.healthBar != null)
			this.healthBar.y = Math.round(Math.min(this.y+this.speed, room.h-this.h*2));
		if(this.cameraLock)
			room.lockOn(this);
		//this.timeUntilUpdate -= this.speed;
		//this.timeUntilUpdate -= this.speed;
	};
	this.moveLeft = function() {
		this.x = Math.round(Math.max(this.x-this.speed, room.x));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "l";
		if(this.speechBubble != null)
			this.speechBubble.x = Math.round(Math.max(this.x-this.speed, room.x));
		if(this.healthBar != null)
			this.healthBar.x = Math.round(Math.max(this.x-this.speed, room.x));
		if(this.cameraLock)
			room.lockOn(this);
		//this.timeUntilUpdate -= this.speed;
		//this.timeUntilUpdate -= this.speed;
	};
	this.moveRight = function() {
		this.x = Math.round(Math.min(this.x+this.speed, room.w-this.w));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "r";
		if(this.speechBubble != null)
			this.speechBubble.x = Math.round(Math.min(this.x+this.speed, room.w-this.w));
		if(this.healthBar != null)
			this.healthBar.x = Math.round(Math.min(this.x+this.speed, room.w-this.w));
		if(this.cameraLock)
			room.lockOn(this);
		//this.timeUntilUpdate -= this.speed;
		//this.timeUntilUpdate -= this.speed;
	};
	
	this.center = function() {
		this.x = room.x+room.w/2-(this.w/2);
		this.y = room.y+room.h/2-(this.h/2);
	};
	
	this.turnUp = function() {
		this.dir = "u";
	};
	this.turnDown = function() {
		this.dir = "d";
	};
	this.turnLeft = function() {
		this.dir = "l";
	};
	this.turnRight = function() {
		this.dir = "r";
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
		var moveTar = {x:target.x,y:target.y};
		this.moving = true;
		if(this.x + 5 < moveTar.x) 
			this.moveFor(5,'r');
		else if(this.x - 5 > moveTar.x) 
			this.moveFor(5,'l');
		else if(this.y - 5 > moveTar.y) 
			this.moveFor(5,'u');
		else if(this.y + 5 < moveTar.y) 
			this.moveFor(5,'d');
		else
			this.moving = false;
	};
	
	this.attack = function(target){
		// If close enough to target
		this.target = target;

		if(Math.sqrt(Math.pow(target.x - this.x , 2) + Math.pow(target.y - this.y, 2)) < this.sword.range){
			this.moving = false;
			// If facing target, swing at it
			if(this.isFacing(target)){
				
				this.swing();
			}
			// If not facing target, face it
			else{
				this.faceTarget(target);
			}
		}
		// Otherwise, move to target
		else{
			this.moveTo(target);
		}
		this.wanderTimer = 0;
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
		
		var InDangerCheck = new Check(new NearEnemy(this, 50));
		
		var FightPersonalityCheck = new Check(new ShouldIFight(this));
		var FightAction = new Action(new Fight(this));
		var FightSequence = new Sequence([FightPersonalityCheck, FightAction]);
		var FlightAction = new Action(new Flight(this));
		var FightOrFlightSelector = new Selector([FightSequence, FlightAction]);
		
		var SurvivalSequence = new Sequence([InDangerCheck, FightOrFlightSelector])
		
		// Betrayal tree
		
		var BetrayalCheck = new Check(new ShouldBetray(this));
		var BetrayalAction = new Action(new Betray(this));
		
		var BetrayalBranch = new Sequence([BetrayalCheck,BetrayalAction]);
		
		var WanderAction = new Action(new Wander(this));
		
		this.root = new Selector([SurvivalSequence, BetrayalBranch, WanderAction]);

	};
	this.initTree();
	
	this.execute = function() {
		this.root.execute();
	};
	
	this.damage = function(amount) {
		this.hp-=amount;
		if(this.healthBar != null)
			this.healthBar.update();
	};
	
	this.say = function(saying, duration) {
		this.speechBubble = new SpeechBubble(this.x, this.y, saying);
		this.speechDur = duration;
	};
	
	this.lockOn = function() {
		this.cameraLock = true;
	};
		
	this.unlock = function() {
		this.cameraLock = false;
	};
}
