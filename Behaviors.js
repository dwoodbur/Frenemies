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
