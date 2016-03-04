/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Character(x,y) {
	this.x = x;
	this.y = y;
	this.w = 28;
	this.h = 50;
	
	this.name = "Bob";
	this.age = 27;
	this.color = "blue";
	
	this.speechBubble = null;
	
	this.update = function() {
		if(this.speechBubble != null) {
			this.speechBubble.tick();
			if(this.speechBubble.ticks == 0)
				this.speechBubble = null;
		}
	}
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(50+room.x+this.x, 50+room.y+this.y, this.w, this.h);
		ctx.fillStyle = ColorLuminance(ctx.fillStyle, -.2);
		ctx.fillRect(50+room.x+this.x, 50+room.y+this.y, 5, this.h);
		
		if(this.speechBubble != null) {
			this.speechBubble.draw();
		}
	};
	
	this.speak = function() {
		this.speechBubble = new SpeechBubble(this.x, this.y-20, "Lines.");
	}
}
