
chains = {};
	
parseDataSet = function(){
	
};

function generateName(race,gender){
   var name = "";
   if(race == "human"){
      var firstName = gender=="male"?choose(HumanMaleFirstNames) :choose(HumanFemaleFirstNames);
      name = firstName+ " "+choose(HumanSurnames);
   }
      
   return name;
}


choose = function(array){
   return array[1 + Math.floor(array.length * Math.random())];
}
