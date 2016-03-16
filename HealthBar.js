/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function HealthBar(wielder,x,y) {
	this.wielder = wielder;
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 8;
	this.color = "green";
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.rect(-10+((100-this.wielder.hp)/200)*this.w+room.x+this.x, -14+room.y+this.y, this.wielder.hp/100*this.w, this.h);
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();
	};
	
	this.update = function() {
		if(this.wielder.hp > 70)
			this.color = "green";
		else if(this.wielder.hp > 50)
			this.color = "yellow";
		else if(this.wielder.hp > 30)
			this.color = "orange";
		else this.color = "red";
	};

	this.tick = function() {
		this.ticks--;
	}

}
