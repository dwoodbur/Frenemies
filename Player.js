/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Player(x, y) {
	
	this.x = x;
	this.y = y;
	this.w = 28;
	this.h = 50;
	this.regSpeed = 8;
	this.diagSpeed = this.regSpeed*.707;
	this.speed = this.regSpeed;
	this.tag = "player";
	this.color = "#FFFFFF";
	this.stage = 0;
	this.age = 0;
	
	this.sword = new Sword(this.x, this.y);
	this.dir = "d";
	this.swinging = false;
	this.pumping = false;
	this.pumped = false;
	this.pumpCount = 0;
	
	/* DRAW */
	
	this.update = function() {
		if(this.swinging) {
			this.sword.update();
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
	
	
	/* MOVEMENT */
	
	this.moveUp = function() {
		this.y = Math.round(Math.max(this.y-this.speed, room.y));
		if(player.y+room.y < canvas.height/3)
			room.y = Math.round(Math.min(0, room.y+this.speed));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "u"
	};
	this.moveDown = function() {
		this.y = Math.round(Math.min(this.y+this.speed, room.h-this.h*2));
		if(this.y+this.h+room.y > 2*canvas.height/3)
			room.y = Math.round(Math.max(-1*(canvas.height-this.h), room.y-this.speed));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "d";
	};
	this.moveLeft = function() {
		this.x = Math.round(Math.max(this.x-this.speed, room.x));
		if(this.x+room.x < canvas.width/3)
			room.x = Math.round(Math.min(0, room.x+this.speed));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "l";
	};
	this.moveRight = function() {
		this.x = Math.round(Math.min(this.x+this.speed, room.w-this.w));
		if(this.x+room.x+this.w > 2*canvas.width/3)
			room.x = Math.round(Math.max(-1*(room.w-this.w), room.x-this.speed));
		if(!keys.isPressed(keyCodes.SHIFT))
			this.dir = "r";
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
		
	}
	
	this.pump = function() {
		this.pumping = true;
		this.pumpCount = 0;
	}
		
}
