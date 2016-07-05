function QueryVizMap(name){
	this.name = name; 
}

QueryVizMap.prototype.vizOptions = function(){
	var opt1 = ['Table', 'Bar', 'Line', 'Pie', 'Area'];
	var opt2 = ['DoubleBar', 'DoubleLine', 'LineBar'];
	var opt3 = ['ComplexChart'];
	var opt4 = ['DoubleComplexChart'];
	var opt5 = ['CompositeTable'];

	var options = {};
	if(this.name == 'F1'){
		options.general = opt1;
		options.specific = opt1;
	}
	else if(this.name == 'F2'){
		options.general = opt1;
		options.specific = opt2;
	}
	else if(this.name == 'F3'){
		options.general = opt1;
		options.specific = opt2;
	}
	else if(this.name == 'F4'){
		options.general = opt1;
		options.specific = opt3;
	}
	else if(this.name == 'F5'){
		options.general = opt1;
		options.specific = opt4;
	}
	else if(this.name == 'F6'){
		options.general = opt1;
		options.specific = opt4;
	}
	else if(this.name == 'F7'){
		options.general = opt1;
		options.specific = opt5;
	}
	
	return options;
}

QueryVizMap.prototype.formatVizMap = function(){
	formatList = ["F1", "F2", "F3", "F4", "F5", "F6", "F7"];
	var map = {};
	for(i=0; i< formatList.length; i++){
		var q = new QueryVizMap(formatList[i]); 
		map[formatList[i]] = q.vizOptions();
	}
	return map;
}

module.exports = QueryVizMap;