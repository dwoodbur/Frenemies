/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
// GLOBAL CANVAS/GAME VARIABLES
// Canvases
canvas = document.getElementById('main_canvas');
leftCanvas = document.getElementById('left_canvas');
rightCanvas = document.getElementById('right_canvas');
//bottomCanvas = document.getElementById('bottom_canvas');

// Contexts of canvases
ctx = canvas.getContext('2d');
leftCtx = leftCanvas.getContext('2d');
rightCtx = rightCanvas.getContext('2d');
//bottomCtx = bottomCanvas.getContext('2d');

// Game states/procedures for canvases.
game = new Game();
//bottomGame = new BottomGame();
leftGame = new LeftGame();
rightGame = new RightGame();

frames=0; // framecount

/*
 *   MAIN LOOP 
 */

function MainLoop() {
	// Update active game states.
	if(game.active)
		game.update();
	if(leftGame.active)
		leftGame.update();
	if(rightGame.active)
		rightGame.update();
	//if(bottomGame.active)
		//bottomGame.update();
	
	// Draw active game states.
	if(game.active)
		game.draw();
	if(leftGame.active)
		leftGame.draw();
	if(rightGame.active)
		rightGame.draw();
	//if(bottomGame.active)
		//bottomGame.draw();
	
	// Request next frame.
	requestAnimationFrame(MainLoop);
	
	frames++;
}
MainLoop();
