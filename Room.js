/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Room(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = "#00FF00";
	
	this.camSpeed = 3;
	
	HIGHLIGHT_WIDTH = 60;
	
	this.draw = function() {
		//if(player.stage != 1) {
			ctx.fillStyle = ColorLuminance(this.color, brightnessMult);
			ctx.fillRect(this.x, this.y, this.w, this.h);
		//}
		/*else if(player.stage == 1) {
			ctx.fillStyle = "orange";
			ctx.fillRect(this.x, this.y, this.w, this.h);
			ctx.fillStyle = "purple";
			var focus = {x: this.x+player.x+(player.w/2),
						 y: this.y+player.y+player.h};
			var distTop = focus.y;
			var distBottom = canvas.height-focus.y;
			var distLeft = focus.x;
			var distRight = canvas.width-focus.x;
			var bottomFocus = {x: focus.x-distBottom,
							   y: canvas.height};
			var topFocus = {x: focus.x+distTop,
							y: 0};
			ctx.beginPath();
			ctx.moveTo(bottomFocus.x-HIGHLIGHT_WIDTH*.8, bottomFocus.y);
			ctx.lineTo(bottomFocus.x+HIGHLIGHT_WIDTH*.8, bottomFocus.y);
			ctx.lineTo(topFocus.x+HIGHLIGHT_WIDTH*.8, topFocus.y);
			ctx.lineTo(topFocus.x-HIGHLIGHT_WIDTH*.8, topFocus.y);
			ctx.closePath();
			ctx.fill();
			
			ctx.beginPath();
			ctx.moveTo(0, distTop-HIGHLIGHT_WIDTH/2);
			ctx.lineTo(0, distTop+HIGHLIGHT_WIDTH/2);
			ctx.lineTo(canvas.width, distTop+HIGHLIGHT_WIDTH/2);
			ctx.lineTo(canvas.width, distTop-HIGHLIGHT_WIDTH/2);
			ctx.closePath();
			ctx.fill();
			
			if(player.pumpCount == 1) {
				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.moveTo(this.x+player.x, this.y+player.y+player.h-HIGHLIGHT_WIDTH/2);
				ctx.lineTo(this.x+player.x+HIGHLIGHT_WIDTH*1.6, this.y+player.y+player.h-HIGHLIGHT_WIDTH/2);
				ctx.lineTo(this.x+player.x+player.w, this.y+player.y+player.h+HIGHLIGHT_WIDTH/2);
				ctx.lineTo(this.x+player.x-HIGHLIGHT_WIDTH, this.y+player.y+player.h+HIGHLIGHT_WIDTH/2);
				ctx.closePath();
				ctx.fill();
			}
			
			
			ctx.beginPath();
			
		}*/
	};
	
	this.center = function() {
		this.x = (-1/2)*((this.w/2)-(canvas.width/2));
		this.y = (-1/2)*((this.h/2)-(canvas.height/2));
	};
	
	this.lockOn = function(object) {
		this.x = Math.max((-1)*((object.x+object.w/2)) + canvas.width/2, -this.w+canvas.width);
		this.x = Math.min(this.x, 0);
		this.y = Math.max((-1)*(object.y+object.h/2) + canvas.height/2, -this.h+canvas.height);
		this.y = Math.min(this.y, 0);
	};
	
	this.moveUp = function() {
		this.y += this.camSpeed;
	};
	this.moveDown = function() {
		this.y -= this.camSpeed;
	};
	this.moveLeft = function() {
		this.x += this.camSpeed;
	};
	this.moveRight = function() {
		this.x -= this.camSpeed;
	};
	
}
