/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function LeftGame() {
	this.active = false;
	this.mode = "";
	this.state = null;
	
	this.initStarEffect = function(duration, numStars, cvs) {
		this.active = true;
		this.mode = "vert_star_effect";
		this.state = new VertStarEffect(duration, numStars, cvs);
	};
	
	this.update = function() {
		this.state.update();
	};
	
	this.draw = function() {
		leftCtx.clearRect(0,0,leftCanvas.width, leftCanvas.height);
		
		if(this.state.maxCount == this.state.count) {
			this.mode = "";
			this.state = null;
			this.active = false;
		}
		else this.state.draw(leftCtx);
	};
}
