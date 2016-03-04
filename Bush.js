/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Bush(x, y) {
	this.x = x;
	this.y = y;
	this.w = 20;
	this.h = 20;
	
	this.color = ColorLuminance("#00FF00", -.3);
	this.color2 = ColorLuminance("#00FF00", -.5);
	this.color3 = ColorLuminance("#00FF00", -.8);
	
	this.update = function() {
		
		
	};
	var BUSH_OUTLINE = 2;
	this.draw = function() {
		var CX = room.x+this.x;
		var CY = room.y+this.y;
		ctx.fillStyle = "black";
		ctx.fillRect(CX+20-BUSH_OUTLINE, CY-BUSH_OUTLINE, this.w+2*BUSH_OUTLINE, this.h+2*BUSH_OUTLINE);
		ctx.fillStyle = this.color3;
		ctx.fillRect(CX+20, CY, this.w, this.h);
		
		ctx.fillStyle = "black";
		ctx.fillRect(CX+10-BUSH_OUTLINE, CY-10-BUSH_OUTLINE, this.w+2*BUSH_OUTLINE, this.h+2*BUSH_OUTLINE);
		ctx.fillStyle = this.color2;
		ctx.fillRect(CX+10, CY-10, this.w, this.h);
		
		ctx.fillStyle = "black";
		ctx.fillRect(CX-BUSH_OUTLINE, CY-BUSH_OUTLINE, this.w+2*BUSH_OUTLINE, this.h+2*BUSH_OUTLINE);
		ctx.fillStyle = this.color;
		ctx.fillRect(CX, CY, this.w, this.h);
		
	};
	
	this.rustle = function() {
		this.clocks.push(new Clock("BUSH-CONTACT", 12));
		this.states.push("rustle");
	};
}
