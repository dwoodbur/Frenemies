/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Death(x,y) {
	this.x = x;
	this.y = y;
	this.w = 28;
	this.h = 50;
	
	this.color = "black";
	
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(50+room.x+this.x, 50+room.y+this.y, this.w, this.h);
	};
}
