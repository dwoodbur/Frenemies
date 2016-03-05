function Node() {
	this.type="";
}

Check.prototype = new Node();
Check.prototype.constructor = Check;
function Check(check) {
	this.type = "check";
	this.check = check;
	
	this.execute = function() {
		return this.check.execute();
	};
}

Action.prototype = new Node();
Action.prototype.constructor = Action;
function Action(action) {
	this.type = "action";
	this.action = action;
	
	this.execute = function() {
		return this.action.execute();
	};
}

Selector.prototype = new Node();
Selector.prototype.constructor = Selector;
function Selector(children) {
	this.type = "selector";
	this.child_nodes = children;
	
	this.execute = function() {
		for(var i=0; i<this.child_nodes.length; i++)
			if(this.child_nodes[i].execute())
				return true;
		return false;
	};
}

Sequence.prototype = new Node();
Selector.prototype.constructor = Sequence;
function Sequence(children) {
	this.type = "sequence";
	this.child_nodes = children;
	
	this.execute = function() {
		for(var i=0; i<this.child_nodes.length; i++)
			if(!this.child_nodes[i].execute())
				return false;
		return true;
	};
}
