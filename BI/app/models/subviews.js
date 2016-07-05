var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subviewSchema = new Schema({
	name: String,
	header: String,
	dimensions: [{}],
	measures: [String],
	filters: [String],
	vizType: [{}],
	queryObject: [String],
	queryOutputFormat: String
});

module.exports = mongoose.model('Subview', subviewSchema);