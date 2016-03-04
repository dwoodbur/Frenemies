/*
 *  Project Name - "Prototype"
 *  by Dylan Woodbury
 * 
 *  
 */
function KeyListener() {
	this.pressedKeys = [];
	
	this.keydown = function(e) {
		this.pressedKeys[e.keyCode] = true;
	};
	
	this.keyup = function(e) {
		this.pressedKeys[e.keyCode] = false;
	};
	
	document.addEventListener("keydown", this.keydown.bind(this));
	document.addEventListener("keyup", this.keyup.bind(this));
	
	this.isPressed = function(key) {
		return this.pressedKeys[key] ? true : false;
	};

	this.addKeyPressListener = function(keyCode, callback) {
		document.addEventListener("keypress", function(e) {
			if(e.keyCode == keyCode)
				callback(e);
		});
	};
}