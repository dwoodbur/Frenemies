/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Dot(x,y,r,v) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.v = v;
	
	this.draw = function(ctx, count) {
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y-(count*this.v), 2, this.v*3);
	};
}
