/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Sword(x,y) {
	this.x = x;
	this.y = y;
	
	// Sword swing data
	this.p2x=0;
	this.p2y=0;
	this.range = 50;
	this.dir = "";
	this.speed = 10;
	
	this.update = function() {
		if(this.dir == "d") {
			this.p2x += this.speed;
			this.p2y = Math.sqrt(this.range*this.range-Math.pow(this.p2x, 2));
			if(this.p2x >= this.range) {
				player.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
		else if(this.dir == "u") {
			this.p2x += this.speed;
			this.p2y = -1*Math.sqrt(this.range*this.range-Math.pow(this.p2x, 2));
			if(this.p2x >= this.range) {
				player.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
		else if(this.dir == "l") {
			this.p2y += this.speed;
			this.p2x = -1*Math.sqrt(this.range*this.range-Math.pow(this.p2y, 2));
			if(this.p2y >= this.range) {
				player.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
		else if(this.dir == "r") {
			this.p2y += this.speed;
			this.p2x = Math.sqrt(this.range*this.range-Math.pow(this.p2y, 2));
			if(this.p2y >= this.range) {
				player.swinging = false;
				this.p2x = 0;
				this.p2y = 0;
			}
		}
	};
	
	this.draw = function() {
		ctx.fillStyle = "brown";
		var CX = player.x+room.x;
		var CY = player.y+room.y;
		if(player.swinging) {
			ctx.beginPath();
			ctx.lineWidth = 4;
			ctx.strokeStyle = "brown";
			ctx.moveTo(CX+(player.w/2), CY+(player.h/2));
			ctx.lineTo(CX+(player.w/2)+this.p2x, CY+(player.h/2)+this.p2y);
			ctx.stroke();
		}
		else {
			switch(player.dir) {
				case "r":
					ctx.fillRect(CX+(player.w/2)+5, CY-10, 5, 40);
					ctx.fillStyle = ColorLuminance("#FFFFFF", -.2);
					ctx.fillRect(CX+(player.w/2)+2, CY+30, 10, 10);
					break;
				case "l":
					ctx.fillRect(CX+(player.w/2)-5, CY-10, 5, 40);
					ctx.fillStyle = ColorLuminance("#FFFFFF", -.2);
					ctx.fillRect(CX+(player.w/2)-8, CY+30, 10, 10);
					break;
				case "u":
					break;
				case "d":
					ctx.fillRect(CX+(player.w/2), CY-10, 5, 40);
					ctx.fillStyle = ColorLuminance("#FFFFFF", -.2);
					ctx.fillRect(CX+(player.w/2)-3, CY+30, 10, 10);
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
