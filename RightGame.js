/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function RightGame() {
	this.active = false;
	this.mode = "";
	this.state = null;
	
	this.initStarEffect = function(duration, numStars, cvs) {
		this.active = true;
		this.move = "vert_star_effect";
		this.state = new VertStarEffect(duration, numStars, cvs);
	};
	
	this.update = function() {
		this.state.update();
	};
	
	this.draw = function() {
		rightCtx.clearRect(0,0,rightCanvas.width, rightCanvas.height);
		
		if(this.state.maxCount == this.state.count) {
			this.mode = "";
			this.state = null;
			this.active = false;
		}
		else this.state.draw(rightCtx);
	};
}
