/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function SpeechBubble(x,y,lines) {
	this.x = x;
	this.y = y;
	this.w = 50;
	this.h = 15;
	this.ticks = 30;
	
	this.lines = lines;
	this.color = "white";
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(50+room.x+this.x, 50+room.y+this.y, this.w, this.h);
		ctx.fillStyle = "black";
		ctx.font = "10px Arial";
		ctx.fillText("Hey bitch.", 50+room.x+this.x+2, 50+room.y+this.y+10);
	};

	this.tick = function() {
		this.ticks--;
	}

}
