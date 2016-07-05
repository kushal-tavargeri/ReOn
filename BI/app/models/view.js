var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var viewSchema = new Schema({
	reportId: Number,
	orgId: Number,
	reportType: String,
	reportName: String,
	dimensionFilters: [{}],
	subviews: [{type: Schema.ObjectId, ref: 'Subview'}]
});

module.exports = mongoose.model('View', viewSchema);