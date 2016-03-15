/*
 *  Do Not Go Gentle Digital Prototype
 *  by Dylan Woodbury
 *  
 */

function Game() {
	
	/*------*/
	/* DATA */
	/*------*/
	
	this.active = true;
	
	wave = 0;
	
	// Constants
	var CLOCK_DURATION = 45;
	
	// Key codes returned from KeyListener object
	keys = new KeyListener();
	keyCodes = {
		BACK: 8,
		TAB: 9,
		ENTER: 13,
		SHIFT: 16,
		ESCAPE: 27,
		SPACE: 32,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		A: 65,
		D: 68,
		S: 83,
		W: 87,
		ONE: 49,
		TWO: 50,
		THREE: 51,
		FOUR: 52,
		FIVE: 53,
		P: 80
	};
	tabFlag = false;
	
	keyBurns = {}; // key burnouts - (which key, how much longer)
	
	// Mouse data
	mouse = {x: -1, y: -1};
	
	// Time data
	shadowMult = 0;
	brightnessMult = -.17;
	timeChanged = false;
	time = 0;
	
	//NUM_NPCs = 2;
	
	this.cameraMode = "camera";
	this.cameraMode = "NPC";
	
	
	POSSIBLE_NAMES = ["Dylan","Connor","Ryan","Barack","Kanye","Beyonce","Magellan","Virgil","Neil Patrick Harris"];
	
	/*----------------*/
	/* INITIALIZATION */
	/*----------------*/
	
	
	// Set up lists to hold game objects.
	initializeContainers();
	
	// Create game objects.
	generateObjects();
	
	generateNPCs();
	
	
	/*-----------*/    // Loop: -Update()
	/* GAME LOOP */	   //		-Draw()		(repeat)
	/*-----------*/
	
	
	// Updates game state.
	this.update = function() {
		handleCameraInput();
		if(!GAME_PAUSED) {
		handleCollisionDetection();
		checkNPCDeath();
		
		updateObjects();
		updateNPCs();
		}
			
		// Check game over.
		//this.checkPlayerDeath();
	};
	
	// Draws frame.
	this.draw = function() {
		// Clear canvas for next frame.
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		// Draw room and objects in it.
		drawBackground();
		drawObjects();
		
		drawUI();
		
		for(var i in NPCs) {
			if(NPCs[i].target != null) {
				ctx.fillStyle = "red";
				ctx.fillRect(NPCs[i].target.x, NPCs[i].target.y, NPCs[i].w, NPCs[i].h);
			}
		}
	};
	
	
	/*--------------------------*/
	/* INITIALIZATION FUNCTIONS */
	/*--------------------------*/
	
	function initializeContainers() {
		NPCs = [];
		enemies = [];
		trees = [];
		bushes = [];
		//tablets = [];
		//portals = [];
	}
	
	function generateNPCs() {
		NPCs[0] = new NPC(450, 450);
		/*NPCs[1] = new NPC(650, 450);
		NPCs[2] = new NPC(850, 450);
		NPCs[3] = new NPC(450, 300);
		NPCs[4] = new NPC(650, 300);
		NPCs[5] = new NPC(850, 300);*/
	}
	
	function generateObjects() {
		//player = new Player(0, 0);
		room = new Room(0, 0, canvas.width*2, canvas.height*2);
		death = new Death(300, 300);
		room.center();
		//player.center();
		generateTrees();
		generateBushes();
		generateCharacters();
		generateEnemies();
		//generateTablets();
		//portals.push(new Portal(0, 360, 50, 100, new Room(0, 0, canvas.width, canvas.height)));
	}
		// sub functions
		function generateTrees() {
			var TREE_WIDTH = 10;
			var TREE_HEIGHT = 75;
			for(var i=0; i<20; i++)
				trees.push(new Tree(Math.random()*(room.w-TREE_WIDTH), 
									Math.random()*(room.h-TREE_HEIGHT)));
		}
		function generateBushes() {
			var BUSH_WIDTH = 20;
			var BUSH_HEIGHT = 20;
			for(var i=0; i<50; i++)
				bushes.push(new Bush(Math.random()*(room.w-BUSH_WIDTH), 
									 Math.random()*(room.h-BUSH_HEIGHT)));
		}
		function generateCharacters() {
			var CHAR_WIDTH = 28;
			var CHAR_HEIGHT = 50;
			for(var i=0; i<0; i++)
				characters.push(new Character(Math.random()*(room.w-CHAR_WIDTH),
											  Math.random()*(room.h-CHAR_HEIGHT)));
		}
		function generateEnemies() {
			var ENEMY_WIDTH = 30;
			var ENEMY_HEIGHT = 30;
			
			if(wave == 0)
				numEnemies = 0;
			else if(wave == 1)
				numEnemies = 90;
			else if(wave == 2)
				numEnemies = 120;
			else if(wave == 3)
				numEnemies = 150;
			else numEnemies = 200;

			for(var i=0; i<numEnemies; i++)
				enemies.push(new Enemy(Math.random()*(room.w-ENEMY_WIDTH),
									   Math.random()*(room.h-ENEMY_HEIGHT)));
		}
		
			function generateMoreEnemies(num) {
				var ENEMY_WIDTH = 30;
				var ENEMY_HEIGHT = 30;
				for(var i=0; i<num; i++)
					enemies.push(new Enemy(Math.random()*(room.w-ENEMY_WIDTH),
									   Math.random()*(room.h-ENEMY_HEIGHT)));
			}
		
		function generateTablets() {
			var TABLET_WIDTH = 15;
			var TABLET_HEIGHT = 15;
			for(var i=0; i<4; i++)
				tablets.push(new Tablet(Math.random()*(room.w-TABLET_WIDTH),
										Math.random()*(room.h-TABLET_HEIGHT),
										"FORWARD"));
				tablets.push(new Tablet(Math.random()*(room.w-TABLET_WIDTH),
										Math.random()*(room.h-TABLET_HEIGHT),
										"BACKWARD"));
		}
		
	/*------------------*/
	/* UPDATE FUNCTIONS */
	/*------------------*/
	
	
	function setPlayerSpeed() {
		// Set player speed (decreases if moving diagonally).
		if((keys.isPressed(keyCodes.DOWN) || keys.isPressed(keyCodes.UP)) 
			&& (keys.isPressed(keyCodes.LEFT) | keys.isPressed(keyCodes.RIGHT)))
		{
			player.speed = player.diagSpeed;
		}
		else player.speed = player.regSpeed;
	}
	
	function handleCameraInput() {
		if(keys.isPressed(keyCodes.DOWN) || keys.isPressed(keyCodes.UP) || keys.isPressed(keyCodes.LEFT) || keys.isPressed(keyCodes.RIGHT)) {
			if(this.cameraMode == "NPC") {
				for(var i=0; i<NPCs.length; i++)
					NPCs[i].cameraLock = false;
			}
			// Handle vertical movement.
			if(keys.isPressed(keyCodes.DOWN))
				room.moveDown();
			if(keys.isPressed(keyCodes.UP))
				room.moveUp();
				
			// Handle horizontal movement.
			if(keys.isPressed(keyCodes.LEFT))
				room.moveLeft();
			if(keys.isPressed(keyCodes.RIGHT))
				room.moveRight();
		}
			
		if(keys.isPressed(keyCodes.ONE) || keys.isPressed(keyCodes.TWO) || keys.isPressed(keyCodes.THREE) || 
			keys.isPressed(keyCodes.FOUR) || keys.isPressed(keyCodes.FIVE) || keys.isPressed(keyCodes.SIX)) {
			if(this.cameraMode == "NPC") {
				for(var i=0; i<NPCs.length; i++)
					NPCs[i].cameraLock = false;
			}
			this.cameraMode = "NPC";
			if(keys.isPressed(keyCodes.ONE) && NPCs.length >= 1)
				NPCs[0].lockOn();
			else if(keys.isPressed(keyCodes.TWO) && NPCs.length >= 2)
				NPCs[1].lockOn();
			else if(keys.isPressed(keyCodes.THREE) && NPCs.length >= 3)
				NPCs[2].lockOn();
			else if(keys.isPressed(keyCodes.FOUR) && NPCs.length >= 4)
				NPCs[3].lockOn();
			else if(keys.isPressed(keyCodes.FIVE) && NPCs.length >= 5)
				NPCs[4].lockOn();
			else if(keys.isPressed(keyCodes.SIX) && NPCs.length >= 6)
				NPCs[5].lockOn();
		}
			
		// Handle player actions.
		/*if(keys.isPressed(keyCodes.SPACE) && !("SPACE" in keyBurns) && !player.swinging) {
			keyBurns["SPACE"] = 20;
			handleSpace();
		}
		if(!keys.isPressed(keyCodes.SPACE) && player.pumping) {
			player.pumping = false;
			player.pumpCount = 0;
			
		}*/
			
		if(keys.isPressed(keyCodes.TAB) && !("TAB" in keyBurns)) {
			
			switchTabFlag();
			keyBurns["TAB"] = 15;
		}
		
		handlePauseGame();
			
		// Tick key burnouts.
		for(var i in keyBurns) {
			keyBurns[i]--;
			if(keyBurns[i] == 0)
				delete keyBurns[i];
		}
	}
		// sub functions
		handleSpace = function() {
			if(player.stage != 1) {
				if(!player.swinging) {
					player.swing();
				}
			}
			else {
				if(!player.pumping) {
					player.pump();
				}
			}
		};
		
		switchTabFlag = function() {
			if(tabFlag)
				tabFlag = false;
			else tabFlag = true;
		}
		
	function handlePauseGame() {
		if(keys.isPressed(keyCodes.P) && !("P" in keyBurns)) {
			if(GAME_PAUSED)
				GAME_PAUSED = false;
			else GAME_PAUSED = true;
			keyBurns["P"] = 15;
		}
	}
	
	function handleCollisionDetection() {
		
		// Enemy hits NPC.
		for(var i in NPCs) {
			var NPC = NPCs[i];
			for(var j in enemies) {
				var enemy = enemies[j];
				if(enemyCollide(enemy, NPC)) {
					NPC.damage(1);
				}
			}
		}
		// NPC hits enemy
		for(var i in NPCs) {
			var NPC = NPCs[i];
			if(NPC.swinging) {
				var badGuys = enemies.concat(NPC.enemyNPCs);
				for(var j=0; j<badGuys.length; j++) {
					var enemy = badGuys[j];
					var enemyHit = null;
					if(NPC.dir == "u") {
						if(enemy.y+enemy.h < NPC.y+NPC.h &&
								((enemy.x < NPC.x+NPC.w && enemy.x > NPC.x) || (enemy.x+enemy.w > NPC.x && enemy.x+enemy.w < NPC.x+NPC.w)) &&
								NPC.y+NPC.h - (enemy.y+enemy.h) < NPC.sword.range) {
							enemyHit = enemy;
						}
					}
					else if(NPC.dir == "d") {
						if(enemy.y+enemy.h > NPC.y+NPC.h &&
								((enemy.x < NPC.x+NPC.w && enemy.x > NPC.x) || (enemy.x+enemy.w > NPC.x && enemy.x+enemy.w < NPC.x+NPC.w)) &&
								enemy.y+enemy.h - (NPC.y+NPC.h) < NPC.sword.range) {
							enemyHit = enemy;
						}
					}
					else if(NPC.dir == "l") {
						if(enemy.x+(enemy.w/2) < NPC.x+(NPC.w/2) &&
								((enemy.y+enemy.h > NPC.y && enemy.y+enemy.h < NPC.y+NPC.h) || (enemy.y < NPC.y+NPC.h && enemy.y > NPC.y)) &&
								NPC.x - enemy.x < NPC.sword.range) {
							enemyHit = enemy;
						}
					}
					else if(NPC.dir == "r") {
						if(enemy.x+(enemy.w/2) > NPC.x+(NPC.w/2) &&
								((enemy.y+enemy.h > NPC.y && enemy.y+enemy.h < NPC.y+NPC.h) || (enemy.y < NPC.y+NPC.h && enemy.y > NPC.y)) &&
								enemy.x-NPC.x < NPC.sword.range) {
							enemyHit = enemy;
						}
					}
					if(enemyHit != null) {
						// Enemy
						//if(j < enemies.length) {
						if(enemyHit.type == "enemy") {
							enemies.splice(j,1);
							//if(Math.random()<.3)
								//NPC.say("Gotcha!", 40);
						}
						// NPC
						else {
							enemyHit.damage(0.02);
							if(enemyHit.hp <= 0){
								NPC.hp = 100;
                        NPC.healthBar.update();
								NPC.say("Suck it!", 100);
							}
								
						}
					}
				}
				if(enemies.length == 0) {
					wave++;
					generateEnemies();
				}	
			}
		}
		for(var i=0; i<enemies.length; i++) {
			var enemy = enemies[i];
			if(enemy.mode != "alert") {
				for(var j=0; j<NPCs.length; j++) {
					var NPC = NPCs[j];
					if(distTo({x: enemy.x+enemy.w/2, y: enemy.y+enemy.h/2}, {x: NPC.x+NPC.w/2, y: NPC.y+NPC.h/2}) < 110) {
						enemy.alert(NPC);
						break;
					}
				}
			}
		}
				
	}
	
		function distTo(pt1, pt2) {
			return Math.sqrt(Math.pow(pt2.y-pt1.y, 2)+Math.pow(pt2.x-pt1.x, 2));
		}
	
		function pointIn(point, rect) {
			if(point.x > rect.x && point.x < rect.x+rect.w &&
					point.y > rect.y && point.y < rect.y+rect.h)
				return true;
			return false;
		}
		// sub functions
		function collide(agent, obj) {
			if((agent.x+agent.w > obj.x && agent.x+agent.w < obj.x+obj.w) || (agent.x < obj.x+obj.w && agent.x > obj.x)) {
				if(Math.abs(agent.y+agent.h-(obj.y+obj.h)) < player.speed) {
					return true;
				}
			}
			return false;
		}
		
		
		function enemyCollide(enemy, agent) {
			if((enemy.x+enemy.w > agent.x && enemy.x+enemy.w < agent.x+agent.w) ||
				(enemy.x < agent.x+agent.w && enemy.x > agent.x) ||
				(enemy.x+(enemy.w/2) < agent.x+agent.w && enemy.x+(enemy.w/2) > agent.x)) {
				if(enemy.y >= agent.y+22 && enemy.y < agent.y+agent.h-10) {
					return true;
				}
			}
			return false;
		}
	
	function updateObjects() {
		for(var i=0; i<enemies.length; i++) {
			enemies[i].update();
		}
		
		//player.update();
		
		if(timeChanged == CLOCK_DURATION) {
			updateClock();
		}
	}
	
	function updateNPCs() {
		for(var i=0; i<NPCs.length; i++) {
			NPCs[i].update();
			if(NPCs[i].timeUntilUpdate <= 0)
				NPCs[i].execute();
		}
	}
	
	function updateClock() {
		time = this.shadowMult/2;
	}
	
	function checkNPCDeath() {
		for(var i in NPCs) {
			var NPC = NPCs[i];
			if(NPC.hp <= 0)
				NPCs.splice(i, 1);
		}
	};
	
	/*----------------*/
	/* DRAW FUNCTIONS */
	/*----------------*/
	
	
	function drawBackground() {		
		// Draw background elements
		room.draw();
	}
	
	function drawObjects() {
		// Get list of objects to be drawn.
		var objectList = getObjectsToDraw();
		
		// Sort object list by y position.
		objectList.sort(function(a,b) {
			return a.y+a.h - (b.y+b.h);
		});
		
		for(var i in trees) {
			trees[i].drawShadow();
		}
		
		// Draw objects.
		for(var i in objectList) {
			objectList[i].draw();
		}
	}
		// sub functions
		function getObjectsToDraw() {
			var objectList = [];
			//objectList.push(player);			
			objectList = objectList.concat(NPCs);
			objectList = objectList.concat(getSpeechBubbles());
			objectList = objectList.concat(trees);
			objectList = objectList.concat(bushes);
			objectList = objectList.concat(enemies);
			//objectList = objectList.concat(tablets);
			//objectList = objectList.concat(portals);
			return objectList;
		}
		
		function getSpeechBubbles() {
			var speech_bubbles = [];
			for(var i in NPCs) {
				if(NPCs[i].speechBubble != null)
					speech_bubbles.push(NPCs[i].speechBubble);
			}
			
			return speech_bubbles;
		}
	
	function drawPane() {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(canvas.width/3, 0);
		ctx.lineTo(canvas.width/3, canvas.height);
		ctx.stroke();
		ctx.moveTo(2*canvas.width/3, 0);
		ctx.lineTo(2*canvas.width/3, canvas.height);
		ctx.stroke();
		ctx.moveTo(0, canvas.height/3);
		ctx.lineTo(canvas.width, canvas.height/3);
		ctx.stroke();
		ctx.moveTo(0, 2*canvas.height/3);
		ctx.lineTo(canvas.width, 2*canvas.height/3);
		ctx.stroke();
	}
	
	function drawData() {
		ctx.fillStyle = "white";
		ctx.font = "10px Arial";
		
		ctx.fillText("Wave: " + (wave+1), 5, 10);
		ctx.fillText("Bots Remaining: " + NPCs.length, 5, 25);
		ctx.fillText("Enemies: " + enemies.length, 5, 40);
		
	}
	
	function drawClock() {
		ctx.fillStyle = "black";
		ctx.fillRect(50, 50, canvas.width-100, 50);
		
		if(time > .72)
			ctx.fillStyle = "red";
		else if(time > .33)
			ctx.fillStyle = "yellow";
		else ctx.fillStyle = "green";
		ctx.fillRect(50, 50, (1-time)*(canvas.width-100), 50);
	}
	
	function drawUI() {
		// Draw pane and data if in dev-mode.
		if(tabFlag) {
			drawPane();
			drawData();
		}
		
		// Draw clock if active.
		if(timeChanged > 0) {
			drawClock();
			timeChanged--;
		}
	}
		
	
	/*---------------------------*/
	/* EVENT FUNCTIONS/LISTENERS */
	/*---------------------------*/
        
        
    // Returns mouse position (x,y).
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
         };
     }
        
    // Activates arrow if mouse is over.
    function mouseMovement(mousePos) {
		mouse.x = mousePos.x;
		mouse.y = mousePos.y;
    }
    
    function checkClick(mousePos) {
		// check for click response
    }
        
    canvas.addEventListener('mousemove', function(evt){mouseMovement(getMousePos(canvas, evt))}, false);
    //canvas.addEventListener('mouseout', function(evt){nullFoodPics()}, false);
    canvas.addEventListener('mousedown', function(evt){checkClick(getMousePos(canvas, evt))}, false);
    
   
   
   /*
    * OTHER SYSTEM FUNCTIONS */
   
   function tickTime(num) {
		shadowMult += .025*num;
		brightnessMult -= .01*num;
		//player.regSpeed -= .06*num;
		//player.diagSpeed = player.regSpeed*.707;
		timeChanged = CLOCK_DURATION;
   }
   
   function untickTime(num) {
   		shadowMult -= .025*num;
		brightnessMult += .01*num;
		//player.regSpeed += .06*num;
		//player.diagSpeed = player.regSpeed*.707;
		timeChanged = CLOCK_DURATION;
   }
    
	
}
