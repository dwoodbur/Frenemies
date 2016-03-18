var HumanMaleFirstNames = "HumanMaleFirstNames.txt";
var hmfnFile = new File(HumanMaleFirstNames);

function NameGenerator() {
	this.chains = {};
	
	this.parseDataSet = function(){
		// Populate human male first names
		this.chains.humanMaleFirst = [];
		hmfnFile.open("r"); // open file with read access
		while (!hmfnFile.eof) {
			// read each line of text
			var name = file.readln();
			this.chains.humanMaleFirst.push(name);
			console.log(name);
		}
		hmfnFile.close();
	};
}


