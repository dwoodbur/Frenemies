/*
 *  Do Not Go Gentle Digital Prototype
 *  by Dylan Woodbury
 *  
 */

/*
 * 	Game
 * 
 * 	-Contains Game Objects
 * 	-Update()
 *  -Draw()
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
		W: 87
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
	NPCs = [];
	
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
  		// Move player, handle effects of movement.	
		//setPlayerSpeed();
		handleCameraInput();
		
		//handleCollisionDetection();
			
		// Update objects that need.
		updateObjects();
		
		updateNPCs();
			
		// Update canvases that need.
		updateOtherCanvases();
			
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
		drawOtherCanvases();
	};
	
	
	/*--------------------------*/
	/* INITIALIZATION FUNCTIONS */
	/*--------------------------*/
	
	function initializeContainers() {
		characters = [];
		enemies = [];
		trees = [];
		bushes = [];
		tablets = [];
		portals = [];
	}
	
	function generateNPCs() {
		NPCs[0] = new NPC(450, 450);
		NPCs[1] = new NPC(800, 450);
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
		generateTablets();
		portals.push(new Portal(0, 360, 50, 100, new Room(0, 0, canvas.width, canvas.height)));
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
				numEnemies = 5;
			else if(wave == 1)
				numEnemies = 8;
			else if(wave == 2)
				numEnemies = 12;
			else if(wave == 3)
				numEnemies = 15;
			else numEnemies = 30;

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
			
			/*var minDist = 999999;
			var minIndex = -1;
			for(var i in characters) {
				var character = characters[i];
				var dist = Math.sqrt(Math.pow(player.x-character.x, 2)+Math.pow(player.y-character.y, 2));
				if(dist < minDist) {
					minDist = dist;
					minIndex = i;
				}
			}
			if(minIndex != -1 && minDist < 120) {
				characters[minIndex].speak();
			}*/
		};
		
		switchTabFlag = function() {
			if(tabFlag)
				tabFlag = false;
			else tabFlag = true;
		}
	
	function handleCollisionDetection() {
		// Player hits bush.
		/*for(var i in bushes) {
			var bush = bushes[i];
			if(collide(player, bush))
				
		}*/
		
		// Player hits enemy.
		for(var i in enemies) {
			var enemy = enemies[i];
			if(enemyCollide(enemy, player)) {
				tickTime(2);
				if(leftGame.mode != "vert_star_effect")
					triggerSideStarEffect(100,100);
				//player.updateAge();
			}
		}
		/*
		if(player.swinging) {
			for(var i=0; i<enemies.length; i++) {
				var enemy = enemies[i];
				if(player.dir == "u") {
					if(enemy.y+enemy.h < player.y+player.h &&
							((enemy.x < player.x+player.w && enemy.x > player.x) || (enemy.x+enemy.w > player.x && enemy.x+enemy.w < player.x+player.w)) &&
							player.y+player.h - (enemy.y+enemy.h) < player.sword.range) {
						enemies.splice(i,1);
					}
				}
				else if(player.dir == "d") {
					if(enemy.y+enemy.h > player.y+player.h &&
							((enemy.x < player.x+player.w && enemy.x > player.x) || (enemy.x+enemy.w > player.x && enemy.x+enemy.w < player.x+player.w)) &&
							enemy.y+enemy.h - (player.y+player.h) < player.sword.range) {
						enemies.splice(i,1);
					}
				}
				else if(player.dir == "l") {
					if(enemy.x+(enemy.w/2) < player.x+(player.w/2) &&
							((enemy.y+enemy.h > player.y && enemy.y+enemy.h < player.y+player.h) || (enemy.y < player.y+player.h && enemy.y > player.y)) &&
							player.x - enemy.x < player.sword.range) {
						enemies.splice(i,1);
					}
				}
				else if(player.dir = "r") {
					if(enemy.x+(enemy.w/2) > player.x+(player.w/2) &&
							((enemy.y+enemy.h > player.y && enemy.y+enemy.h < player.y+player.h) || (enemy.y < player.y+player.h && enemy.y > player.y)) &&
							enemy.x-player.x < player.sword.range) {
						enemies.splice(i,1);
					}
				}
			}
			if(enemies.length == 0) {
				wave++;
				generateEnemies();
			}
		}
		else if(player.pumped) {
			var focus = {x: player.x+player.w/2,
						 y: player.y+player.h};
			var distTop = focus.y;
			var distBottom = canvas.height-focus.y;
			var distLeft = focus.x;
			var distRight = canvas.width-focus.x;
			for(var i=0; i<enemies.length; i++) {
				var enemy = enemies[i];
				if((enemy.y+enemy.h > focus.y-30 && enemy.y+enemy.h < focus.y+30 && Math.abs(enemy.x+enemy.w/2 - focus.x) < 300)) {
						enemy.pumped = true;
				} else enemy.pumped = false;
			}
		}*/
		/*
		for(var i=0; i<portals.length; i++) {
			if(pointIn({x: player.x, y: player.y}, portals[i]) ||
					pointIn({x: player.x+player.w, y: player.y}, portals[i]) ||
					pointIn({x: player.x, y: player.y+player.h}, portals[i]) ||
					pointIn({x: player.x+player.w, y: player.y+player.h}, portals[i])) {
				room = portals[i].targRoom;
				trees = [];
				bushes = [];
				enemies = [];
				characters = [];
				tablets = [];
				portals = [];
				generateTrees();
			}
		}
		
		for(var i=0; i<enemies.length; i++) {
			var enemy = enemies[i];
			if(distTo({x: enemy.x+enemy.w/2, y: enemy.y+enemy.h/2}, {x: player.x+player.w/2, y: player.y+player.h/2}) < 110)
				enemy.alert();
		}
		
		for(var i=0; i<tablets.length; i++) {
			var tab = tablets[i];
			if(collide(player, tab)) {
				tablets.splice(i,1);
				untickTime(1);
			}
		}
		*/
		
		
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
		
		
		function enemyCollide(enemy, player) {
			if((enemy.x+enemy.w > player.x && enemy.x+enemy.w < player.x+player.w) ||
				(enemy.x < player.x+player.w && enemy.x > player.x) ||
				(enemy.x+(enemy.w/2) < player.x+player.w && enemy.x+(enemy.w/2) > player.x)) {
				if(enemy.y >= player.y+22 && enemy.y < player.y+player.h-10) {
					return true;
				}
			}
			return false;
		}
	
	function updateObjects() {
		for(var i=0; i<bushes.length; i++) {
			bushes[i].update();
		}
		for(var i=0; i<characters.length; i++) {
			characters[i].update();
		}
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
	
	function updateOtherCanvases() {
		if(bottomGame.active)
			bottomGame.update();
		if(leftGame.active)
			leftGame.update();
		if(rightGame.active)
			rightGame.update();
	}
	
	this.checkPlayerDeath = function() {
		if(player.age > 100) {
			this.active = false;
			leftGame.active = false;
			rightGame.active = false;
			bottomGame.active = false;
			ctx.clearRect(0,0,canvas.width, canvas.height);
			leftCtx.clearRect(0,0,leftCanvas.width, leftCanvas.height);
			rightCtx.clearRect(0,0,rightCanvas.width, rightCanvas.height);
			bottomCtx.clearRect(0,0,bottomCanvas.width, bottomCanvas.height);
			
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
			objectList = objectList.concat(trees);
			objectList = objectList.concat(bushes);
			objectList = objectList.concat(characters);
			objectList = objectList.concat(enemies);
			objectList = objectList.concat(tablets);
			objectList = objectList.concat(portals);
			return objectList;
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
		ctx.fillText("DATA", 5, 10);
		
		ctx.fillText("Room", 5, 30);
		ctx.fillText("(x,y): ("+room.x+","+room.y+")", 5, 40);
			
		//ctx.fillText("Player", 5, 55);
		//ctx.fillText("(x,y): ("+player.x+","+player.y+")", 5, 65);
			
		ctx.fillText("Mouse", 5, 80);
		ctx.fillText("(x,y): ("+mouse.x+","+mouse.y+")", 5, 90);
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
	
	function drawOtherCanvases() {
		if(leftGame.active)
			leftGame.draw();
		if(rightGame.active)
			rightGame.draw();
		if(bottomGame.active)
			bottomGame.draw();
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
    
    
    /*---------------------*/
    /* SIDE CANVAS EFFECTS */
    /*---------------------*/
   
   function triggerSideStarEffect(duration, numStars) {
   		leftGame.initStarEffect(duration, numStars, leftCanvas);
   		rightGame.initStarEffect(duration, numStars, rightCanvas);
   }
   
   
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
