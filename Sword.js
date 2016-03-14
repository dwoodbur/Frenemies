/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Sword(x,y,wielder) {
	this.x = x;
	this.y = y;
	this.wielder = wielder;
	
	// Sword swing data
	this.p2x=0;
	this.p2y=0;
	this.range = 50;
	this.dir = "";
	this.speed = 10;
	
	this.color = "white";
	
	this.update = function() {
		if(this.dir == "d") {
			this.p2x += this.speed;
			this.p2y = Math.sqrt(this.range*this.range-Math.pow(this.p2x, 2));
			if(this.p2x >= this.range) {
				this.wielder.stopSwinging();
				this.p2x = 0;
				this.p2y = 0;
			}
		}
		else if(this.dir == "u") {
			this.p2x += this.speed;
			this.p2y = -1*Math.sqrt(this.range*this.range-Math.pow(this.p2x, 2));
			if(this.p2x >= this.range) {
				this.wielder.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
		else if(this.dir == "l") {
			this.p2y += this.speed;
			this.p2x = -1*Math.sqrt(this.range*this.range-Math.pow(this.p2y, 2));
			if(this.p2y >= this.range) {
				this.wielder.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
		else if(this.dir == "r") {
			this.p2y += this.speed;
			this.p2x = Math.sqrt(this.range*this.range-Math.pow(this.p2y, 2));
			if(this.p2y >= this.range) {
				this.wielder.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
	};
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		var CX = this.wielder.x+room.x;
		var CY = this.wielder.y+room.y;
		if(this.wielder.swinging) {
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = this.color;
			ctx.moveTo(CX+(this.wielder.w/2), CY+(this.wielder.h/2));
			ctx.lineTo(CX+(this.wielder.w/2)+this.p2x, CY+(this.wielder.h/2)+this.p2y);
			ctx.stroke();
			ctx.closePath();
		}
		else {
			ctx.fillStyle = this.color;
			switch(this.wielder.dir) {
				case "r":
					ctx.fillRect(CX+(this.wielder.w/2)+5, CY-10, 5, 40);
					ctx.fillStyle = this.wielder.color2;
					ctx.fillRect(CX+(this.wielder.w/2)+2, CY+30, 10, 10);
					break;
				case "l":
					ctx.fillRect(CX+(this.wielder.w/2)-5, CY-10, 5, 40);
					ctx.fillStyle = this.wielder.color2;
					ctx.fillRect(CX+(this.wielder.w/2)-8, CY+30, 10, 10);
					break;
				case "u":
					break;
				case "d":
					ctx.fillRect(CX+(this.wielder.w/2), CY-10, 5, 40);
					ctx.fillStyle = this.wielder.color2;
					ctx.fillRect(CX+(this.wielder.w/2)-3, CY+30, 10, 10);
					break;
			
			}
		}
	};
	
	this.setSwing = function(dir) {
		this.dir = dir;
		
		if(dir == "d" || dir == "u") {
			this.p2x = -this.range;
			this.p2y = Math.sqrt(this.range*this.range-Math.pow(this.p2x, 2));
		}
		else if(this.dir == "l" || this.dir == "r") {
			this.p2y = -this.range;
			this.p2x = Math.sqrt(this.range*this.range-Math.pow(this.p2y, 2));
		}

	};
}
