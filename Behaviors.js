function MoveRandomDir(NPC) {
	this.execute = function() {
		var r = Math.random();
		if(r<.25)
			NPC.moveTo({x: NPC.x-50, y: NPC.y});
		else if(r<.5)
			NPC.moveTo({x: NPC.x+50, y: NPC.y});
		else if(r < .75)
			NPC.moveTo({x: NPC.x, y: NPC.y-50});
		else NPC.moveTo({x: NPC.x, y: NPC.y+50});
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

function Fight(NPC) {
	this.execute = function() {
		var minDist = 9999;
		var nearestEnemy = null;
		for(var i=0; i<enemies.length; i++) {
			var dist = Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2))
			if(dist < minDist) {
				nearestEnemy = enemies[i];
				minDist = dist;
			}
		}
		if(minDist <= 50) {
			NPC.attack(nearestEnemy);
			return true;
		}
		else return false;
	}
}

function NearEnemy(NPC) {
	this.execute = function() {
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < 100) {
				console.log("There is an enemy!");
				return true;
			}
		}
		return false;
	}
}

/*
function TurnToNearestEnemy(NPC) {
	this.execute = function() {
		var minDist = 999;
		var nearestEnemy = null;
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < minDist) {
				nearestEnemy = enemies[i];
				minDist = Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2))
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
<<<<<<< HEAD
			if(angle > 3*Math.PI/4 || angle < -3*Math.PI/4)
=======
			if(angle < Math.PI/4 || angle > 3*Math.PI/2)
				NPC.turnRight();
			else if(angle < 3*Math.PI/4)
				NPC.turnUp();
			else if(angle < 5*Math.PI/4)
>>>>>>> 8e743212a4c92112e15efb7121c895f3961288f3
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
*/

// Betrayal stuff

function ShouldBetray(NPC){
	this.execute = function(){
		
		// Calculate how much the NPC needs to betray someone
		var necessity = 2*(1 - NPC.hp/100) - 1;
		if(necessity < NPC.selfishness) {
			return false;
		}
			
		// Calculate confidence for successfully betraying each NPC
		var bestTargetScore = -1;
		var bestTargetIndex = -1;
		for(var i=0; i<NPCs.length;i++){
			if(NPCs[i]==NPC) continue;
			
			var confidence = NPC.hp/NPCs[i].hp;
			if(confidence > bestTargetScore){
				bestTargetScore = confidence;
				bestTargetIndex = i;
			}
		}
		if(bestTargetScore + NPC.selfishness > 0){
			NPC.target = NPCs[bestTargetIndex];
			return true;
		}
		return false;
	};
}

function Betray(NPC){
	this.execute = function(){
		// Calculate how much the NPC needs to betray someone
		if(NPC.target != null) {
		if(NPC.target.hp >= 0)
			NPC.attack(NPC.target);
		}
		return true;
	};
}

