/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Enemy(x,y) {
	this.x = x;
	this.y = y;
	this.w = 30;
	this.h = 30;
	this.speed = 4;
	this.color = "grey";
	this.alertDx = 0;
	this.alertDy = 0;
	
	this.mode = "wander";
	this.direction = "";
	this.directionCount = 0;
	this.targetNPC = null;
	
	this.pumped = false;
	
	this.update = function() {
		if(!this.pumped) {
 			switch(this.mode) {
				case "wander":
					this.wander();
					break;
				case "alert":
					this.alertUpdate();
					break;
			}
		}
		else if(this.pumped) {
			this.color = "blue";
		}
	};
	
	this.alert = function(NPC) {
		this.mode = "alert";
		this.color = "black";
		this.targetNPC = NPC;
	};
	
	this.alertUpdate = function() {
		if(this.directionCount == 0) {
			this.directionCount = 20+Math.floor(Math.random()*20);
			
			var NPC = this.targetNPC;
			var px = NPC.x+NPC.w/2;
			var py = NPC.y+NPC.h/2;
			var ex = this.x+this.w/2;
			var ey = this.y+this.h/2;
			
			if(ex > px) {
				this.alertDx = -3;
			} else this.alertDx = 3;
			if(ey > py) {
				this.alertDy = -3;
			} else this.alertDy = 3;
		}
		this.x += this.alertDx;
		this.y += this.alertDy;
		
		this.directionCount--;
	};
	
	this.wander = function() {
		this.mode = "wander";
		this.color = "grey";
		if(this.directionCount == 0) {
			if(Math.random()<.8 || this.direction == "")
				this.direction = randomDirection();
			else this.direction = "";
			this.directionCount = 20+Math.floor(Math.random()*20);
		}
		
		switch(this.direction) {
			case "N":
				this.y = Math.max(this.y-this.speed, room.y-50);
				if(this.y == room.y)
					this.direction == "S";
				break;
			case "S":
				this.y = Math.min(this.y+this.speed, room.h-this.h-100);
				if(this.y == room.h-this.h)
					this.direction == "N";
				break;
			case "W":
				this.x = Math.max(this.x-this.speed, room.x-50);
				if(this.x == room.x)
					this.direction == "E";
				break;
			case "E":
				this.x = Math.min(this.x+this.speed, room.w-this.w-100);
				if(this.x == room.w-this.w)
					this.direction == "W";
				break;
		}
		
		this.directionCount--;
	};
		function randomDirection() {
			var r = Math.random();
			if(r < .25)
				return "N";
			else if(r < .5)
				return "E";
			else if(r < .75)
				return "S";
			else return "W";
		}
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(room.x+this.x, room.y+this.y, this.w, this.h);
		
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
	};
}
