function MoveRandomDir(NPC) {
	this.execute = function() {
		var r = Math.random();
		if(r<.25)
			NPC.moveFor(25, "l");
		else if(r<.5)
			NPC.moveFor(25, "r");
		else if(r < .75)
			NPC.moveFor(25, "d");
		else NPC.moveFor(25, "u");
		return true;
	}
}

function SwingSword(NPC) {
	this.execute = function() {
		NPC.swing();
		//console.log("Swinging.");
		return true;
	}
}

function NearEnemy(NPC) {
	this.execute = function() {
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < 100) {
				//console.log("There is an enemy!");
				return true;
			}
		}
		return false;
	}
}

function TurnToNearestEnemy(NPC) {
	this.execute = function() {
		var minDist = 999;
		var nearestEnemy = null;
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < minDist) {
				nearestEnemy = enemies[i];
			}
		}
		if(nearestEnemy != null) {
			var dx=0;
			var dy=0;
			if(nearestEnemy.x > NPC.x)
				dx = nearestEnemy.x - NPC.x;
			else dx = NPC.x - nearestEnemy.x;
			if(nearestEnemy.y > NPC.y)
				dy = nearestEnemy.y - NPC.y;
			else dy = NPC.y - nearestEnemy.y;
			
			var angle=Math.atan(dy/dx);
			if(angle > 3*Math.PI/4 || angle < -3*Math.PI/4)
				NPC.turnLeft();
			else if(angle > Math.PI/4)
				NPC.turnUp();
			else if(angle > -Math.PI/4)
				NPC.turnRight();
			else if(angle > -3*Math.PI/4)
				NPC.turnDown();
		}
		return true;
	};
}
