/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function VertStarEffect(duration, numStars, canvas) {
	this.dots = [];
	this.count = 0;
	this.maxCount = duration;
	this.canvas = canvas;
	
	for(var i=0; i < numStars; i++) {
		this.dots.push(new Dot(Math.ceil(Math.random()*canvas.width), Math.ceil(Math.random()*canvas.height), Math.ceil(Math.random()*10), Math.ceil(Math.random()*10)));
	}
	
	this.update = function() {
		this.count++;
		for(var i in this.dots) {
			if(this.dots[i].y-(this.count*this.dots[i].v) < 0) {
				this.dots[i].y += this.canvas.height;
			}
		}
	};
	
	this.draw = function(ctx) {
		for(var i in this.dots)
			this.dots[i].draw(ctx, this.count);
		
	};
}
