/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function SpeechBubble(x,y,lines) {
	this.x = x;
	this.y = y;
	this.w = 80;
	this.h = 30;
	this.ticks = 30;
	
	this.lines = lines;
	this.color = "white";
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(50+room.x+this.x, -20+room.y+this.y, Math.max(this.w , this.lines.length*10), this.h);
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.fillText(this.lines, 50+room.x+this.x+2, -10+room.y+this.y+10);
	};

	this.tick = function() {
		this.ticks--;
	}

}
