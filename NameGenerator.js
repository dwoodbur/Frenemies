
chains = {};
	
parseDataSet = function(){
	
};

function generateName(race){
   var name = "";
   if(race == "human"){
      name = choose(HumanMaleFirstNames) + " "+choose(HumanSurnames);
   }
      
   return name;
}


choose = function(array){
   return array[1 + Math.floor(array.length * Math.random())];
}
