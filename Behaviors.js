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

function TiredOfExploring(NPC) {
	this.execute = function() {
		if(NPC.tiredOfExploring > 0) {
			return true;
		}
		else return false;
	}
}

/*function MoveRandomPoint(NPC) {
	this.execute = function() {
		if(NPC.tiredOfExploring > 0)
			return false;
		else if(NPC.exploreTarget == null) {
			NPC.exploreTarget = getPointNear(NPC, 60+Math.floor(Math.random()*80));
			console.log("Getting target");
		}
		else {console.log("Moving to target");
			NPC.moveTo(NPC.exploreTarget);
			var dist = Math.sqrt(Math.pow(NPC.exploreTarget.x - NPC.x, 2) + Math.pow(NPC.exploreTarget.y - NPC.y, 2));
			
			if(dist < 25) {
				NPC.tiredOfExploring = 100;
				NPC.exploreTarget = null;
			}
		}
		return true;
	}
}*/

function getPointNear(object, dist) {
	var point = {x:0, y:0};
	do {
		point.x = object.x + dist*Math.cos(Math.random()*2*Math.PI);
	} while(point.x < 0 || point.x > room.w)
	do {
		point.y = object.y + dist*Math.sin(Math.random()*2*Math.PI);
	} while(point.y < 0 || point.y > room.h)
	console.log("POINT " + point.x + " " + point.y);
	return point;
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
		var hostiles = enemies;
		hostiles.concat(NPC.enemyNPCs);
		for(var i=0; i<hostiles.length; i++) {
			var dist = Math.sqrt(Math.pow(hostiles[i].x+(hostiles[i].w/2) - NPC.x, 2) + Math.pow(hostiles[i].y - NPC.y, 2))
			if(dist < minDist) {
				nearestEnemy = hostiles[i];
				minDist = dist;
			}
		}
		if(nearestEnemy != null) {
			NPC.attack(nearestEnemy);
			return true;
		}
		else return false;
	}
}

function NearEnemy(NPC, dist) {
	this.execute = function() {

		var hostiles = enemies;
		hostiles.concat(NPC.enemyNPCs);
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < dist) {

				return true;
			}
		}
		return false;
	}
}

function ShouldIFight(NPC) {
	this.execute = function() {
		if(NPC.fleeing)
			return false;
		if(NPC.bravery > .75)
			return true;
		else if(NPC.bravery < -.75)
			return false;
			
		/*var nearEnemies = [];
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < 70) {
				nearEnemies.push(enemies[i]);
			}
		}*/
		
		var prob = ((NPC.bravery+1)/2) * (NPC.hp/100);
		
		
		if(0.25<prob)
			return true;
		else return false;
	}
}

function Flight(NPC) {
	this.execute = function() {
		var upEnemies = [];
		var downEnemies = [];
		var leftEnemies = [];
		var rightEnemies = [];
		for(var i=0; i<enemies.length; i++) {
			var enemy = enemies[i];
			if(Math.sqrt(Math.pow(enemies[i].x+(enemies[i].w/2) - NPC.x, 2) + Math.pow(enemies[i].y - NPC.y, 2)) < 120
			
			) {
				if(enemy.x+enemy.w/2 > NPC.x+NPC.w/2)
					rightEnemies.push(enemy);
				else if(enemy.x+enemy.w/2 < NPC.x+NPC.w/2)
					leftEnemies.push(enemy);
				else if(enemy.y > NPC.y+NPC.h/2)
					upEnemies.push(enemy);
				else if(enemy.y < NPC.y-NPC.h/2)
					downEnemies.push(enemy);
			}
		}
		var above = upEnemies.length;
		var below = downEnemies.length;
		var right = rightEnemies.length;
		var left = leftEnemies.length;
		if(above <= Math.min(below, right, left))
			NPC.moveTo({x: NPC.x, y: Math.max(NPC.y+50, 0)});
		else if(below <= Math.min(above, right, left))
			NPC.moveTo({x: NPC.x, y: Math.min(NPC.y-50, 0)}); 
		else if(right <= Math.min(above, below, left))
			NPC.moveTo({x: Math.min(NPC.x+50, canvas.width), y: NPC.y});
		else NPC.moveTo({x: Math.max(NPC.x-50, 0), y: NPC.y});
		
		NPC.say("Ahh!!", 50);
		NPC.fleeing = true;
		
		return true;
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
		if(bestTargetScore * (1+NPC.selfishness)*0.5 >= 1){
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
			if(!(NPC.target in NPC.relationships)){
			NPC.relationships[NPC.target] = -1;
			NPC.say("Die, " + NPC.target.name +"!",140);
			NPC.target.say("How could you?! " ,140);
		}
		if(!(NPC.target in NPC.enemyNPCs)){
			NPC.enemyNPCs.push(NPC.target);
			NPC.target.enemyNPCs.push(NPC);
		}
			if(NPC.target.hp >= 0)
				NPC.attack(NPC.target);
		}
		return true;
	};
}

// Wander Behavior

function Wander(NPC) {
	this.execute = function() {
		
		if(NPC.wanderTimer <= 0 || NPC.target.x>=canvas.width || NPC.target.x<=0 ||
			NPC.target.y >= canvas.height || NPC.target.y <= 0){
			
			var angle = Math.random() * 2 *  Math.PI;
			var dist = 50 + Math.random() * 350;
			NPC.wanderTimer = dist * 0.25;
			var pos = {
				x: NPC.x + Math.cos(angle) * dist,
				y: NPC.y + Math.sin(angle) * dist
			};

			NPC.moveTo(pos);
		}
		else{
			NPC.wanderTimer --;
			NPC.moveTo(NPC.target);
		}
		return true;
	};
}

//Aid

function ShouldAid(NPC) {
   this.execute = function(){
		
		// Calculate how much the NPC needs to betray someone
		var necessity = 2*(1 - NPC.hp/100) - 1;
		if(necessity < NPC.selfishness) {
			return false;
		}
			
		// Calculate the necessity of aiding each NPC
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
		if(bestTargetScore * (1-(1+NPC.selfishness)*0.5) >= 1){
			NPC.target = NPCs[bestTargetIndex];
			return true;
		}
		return false;
	};
}
function distTo(pt1, pt2) {
			return Math.sqrt(Math.pow(pt2.y-pt1.y, 2)+Math.pow(pt2.x-pt1.x, 2));
		}
function Aid(NPC) {
   this.execute = function(){
		if(NPC.target != null) {
			if(!(NPC.target in NPC.enemyNPCs)){
            if(!(NPC.target in NPC.relationships)){
               NPC.relationships[NPC.target] = 1;
               NPC.target.say("Help! " ,140);
               NPC.say("Don't die on me, " + NPC.target.name +"!",140);
            }
            if(NPC.target.hp >= 0 && distTo(NPC, NPC.target) > 120)
               NPC.moveTo(NPC.target);
         }
		}
		return true;
	};
}
