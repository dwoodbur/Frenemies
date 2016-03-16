function Button(x,y,w,h,text,id) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.text = text;
	this.id = id;
	this.color = "red";
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.font = "20px Arial";
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = "black";
		ctx.fillText(this.text, this.x+10, this.y+20);
	}
	
	this.clickWithin = function(point) {
		if(point.x < this.x+this.w && point.x > this.x)
			if(point.y < this.y+this.h && point.y > this.y)
				return true;
		return false;
	};
}
