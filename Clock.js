/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function Clock(type,ticks) {
	this.type = type;
	this.ticks = ticks;
	this.totalTicks = ticks;
	this.instruction = "";
	
	this.tick = function() {
		this.ticks--;
		
		switch(this.type)
		{
			case "BUSH-CONTACT":
				if(this.ticks == 0)
					this.instruction = "RUSTLE";
				else if(this.ticks == Math.floor(this.totalTicks/2))
					this.instruction = "RUSTLE";
				else if(this.ticks == this.totalTicks-1)
					this.instruction = "RUSTLE";
				else this.instruction = "";
				break;
		}
	};
	
}
