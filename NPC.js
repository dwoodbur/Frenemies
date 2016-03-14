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
	this.stage = 0;
	this.age = 0;
	
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
	
	this.speechBubble = null;
	this.speechDur = 0;
	
	this.cameraLock = false;
	
	var skinTones = ["#FAE7D0", "#DFC183","#AA724B","#C8ACA3","#E8CDA8","#7B4B2A","#FFCC99","#CEAB69","#935D37",
		"#C0A183","#CAA661","#573719","#FEB186","#B98865","#7B4B2A","#C18E74","#B58A3F","#483728"];
	this.color = skinTones[Math.floor(Math.random()*skinTones.length)];
	this.color2 = ColorLuminance(this.color, -.3);
	

	
	/* DRAW */
	
	this.update = function() {
		if(this.swinging) {
			this.sword.update();
		}
		else {
			if(this.dir == "d")
				this.moveDown();
			else if(this.dir == "u")
				this.moveUp();
			else if(this.dir == "l")
				this.moveLeft();
			else
				this.moveRight();
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
	};
	
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
			
		this.healthBar.draw();
	};
	
	
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
		this.timeUntilUpdate -= this.speed;
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
		this.timeUntilUpdate -= this.speed;
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
		this.timeUntilUpdate -= this.speed;
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
		this.timeUntilUpdate -= this.speed;
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
	
	this.initTree = function() {
		var MoveRandomAction = new Action(new MoveRandomDir(this));
		var SwingSwordAction = new Action(new SwingSword(this));
		
		var NearEnemyCheck = new Check(new NearEnemy(this));
		var FaceEnemyAction = new Action(new TurnToNearestEnemy(this));
		
		var CheckForEnemySequence = new Sequence([NearEnemyCheck, FaceEnemyAction, SwingSwordAction]);
		
		this.root = new Selector([CheckForEnemySequence, MoveRandomAction]);
	};
	this.initTree();
	
	this.execute = function() {
		this.root.execute();
	};
	
	this.damage = function() {
		this.hp-=20;
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
