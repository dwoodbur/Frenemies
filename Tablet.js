/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Tablet(x,y,type) {
	this.x = x;
	this.y = y;
	this.w = 15;
	this.h = 15;
	this.type = type;
	
	switch(type) {
		case "BACKWARD":
			this.color = "red";
			break;
		case "FORWARD":
			this.color = "blue";
			break;
	}
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(room.x+this.x, room.y+this.y, this.w, this.h);
	}
	
	
}
