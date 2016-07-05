function Chart(name, X, Y, key, axesType){
	this.name = name;
	this.X  = X;
	this.Y = Y;
	this.key = key;
	if(axesType === 'Single' || axesType === 'Dual')
		this.axesType = axesType;
	else
		this.axesType = 'Single';
}

module.exports = Chart;


