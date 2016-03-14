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
		console.log("Swinging.");
		return true;
	}
}

function NearEnemy(NPC) {
	this.execute = function() {
		for(var i=0; i<enemies.length; i++) {
			if(Math.sqrt(Math.pow(enemies.x+(enemies.w/2) - NPC.x, 2) + Math.pow(enemies.y - NPC.y, 2)) < 100) {
				console.log("There is an enemy!");
				return true;
			}
		}
		return false;
	}
}

// Betrayal stuff

function ShouldBetray(NPC){
	this.execute = function(){
		
		// Calculate how much the NPC needs to betray someone
		var necessity = 2*(1 - NPC.health/NPC.maxHealth) ;
		if(necessity < NPC.selfishness) {
			return false;
		}
			
		// Calculate confidence for successfully betraying each NPC
		var bestTargetScore = -1;
		var bestTargetIndex = -1;
		for(var i=0; i<NPCs.length;i++){
			if(NPCs[i]==NPC) continue;
			
			var confidence = NPC.health/NPCs[i].health;
			if(confidence > bestTargetScore){
				bestTargetScore = confidence;
				bestTargetIndex = i;
			}
		}
		if(true || bestTargetScore + NPC.selfishness > 0){
			NPC.target = NPCs[bestTargetIndex];
			return true;
		}
		return false;
	};
}

function Betray(NPC){
	this.execute = function(){
		// Calculate how much the NPC needs to betray someone
		NPC.attack(NPC.target);
		return true;
	};
}

