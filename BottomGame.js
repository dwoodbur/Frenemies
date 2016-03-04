/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function BottomGame() {
	this.ticks=260;
	this.statement="Do Not Go Gentle";
	
	this.active = true;
	
	this.say = function(statement, ticks) {
		this.statement = statement;
		this.ticks = ticks;
		this.active = true;
	};
	
	this.update = function() {
		this.ticks--;
		if(this.ticks == 0) {
			this.active = false;
			bottomCtx.clearRect(0,0,bottomCanvas.width, bottomCanvas.height);
		}
	};
	
	this.draw = function() {
		bottomCtx.clearRect(0,0,bottomCanvas.width, bottomCanvas.height);
		//bottomCtx.fillStyle = "green";
		//bottomCtx.fillRect(0,0,bottomCanvas.width, bottomCanvas.height);
		bottomCtx.font = "bold 60px Times New Roman";
		bottomCtx.fillStyle = "white";
		var textSize = bottomCtx.measureText(this.statement);
		bottomCtx.fillText(this.statement, (bottomCanvas.width/2)-(textSize.width/2), (bottomCanvas.height/2)+10);
	};
}
