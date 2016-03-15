/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
// GLOBAL CANVAS/GAME VARIABLES
// Canvases
canvas = document.getElementById('main_canvas');

// Contexts of canvases
ctx = canvas.getContext('2d');
//bottomCtx = bottomCanvas.getContext('2d');

// Game states/procedures for canvases.
game = new Game();

frames=0; // framecount

/*
 *   MAIN LOOP 
 */

function MainLoop() {
	// Update active game states.
	if(game.active)
		game.update();
	
	// Draw active game states.
	if(game.active)
		game.draw();
	
	// Request next frame.
	requestAnimationFrame(MainLoop);
	
	frames++;
}
MainLoop();
