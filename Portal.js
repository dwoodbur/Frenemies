/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Portal(x,y,w,h,targRoom) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.targRoom = targRoom;
	
	this.update = function() {
		
	};
	
	this.draw = function() {
		CX = room.x;
		CY = room.y;
		ctx.fillStyle = "yellow";
		ctx.fillRect(CX+this.x, CY+this.y, this.w, this.h);
	};
}
