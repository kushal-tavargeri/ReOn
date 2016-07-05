//BASE SETUP

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BITest');

var subView = require('./app/models/subviews.js');
var View = require('./app/models/view.js'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	//Autenticate User if reqd
	console.log('Check');
	next();
})
router.get('/', function(req, res){
	res.json({message: "Hello"});
});

router.route('/subviews')
	.post(function(req, res){
		var subview = new subView();
		subview.name = req.body.name;
		subview.header = req.body.header;
		var jsonObj = JSON.parse(req.body.dimensions);
		var subDim = new Array();
		for(obj in jsonObj){
			var dim = jsonObj[obj];
			//TODO get dim type via dict
			dim.type = "Hierarchical";
			subDim.push(dim);
		}
		console.log(subDim);
		subview.dimensions = subDim;
		subview.measures = JSON.parse(req.body.measures);
		subview.filters = JSON.parse(req.body.filters);
		subview.vizType = JSON.parse(req.body.vizType);
		subview.queryObject = JSON.parse(req.body.queryObject);
		subview.queryOutputFormat= req.body.queryOutputFormat;
	
		subview.save(function(err){
			if(err)
				res.send(err);
			res.json({message: "Subview Saved"});
		});
	})
	.get(function(req, res){
		subView.find(function(err, subviews){
			if(err)
				res.send(err);
			res.json(subviews);
		});
	});

router.route('/subview/:svid')
	.get(function(req, res){
		subView.findById(req.params.svid, function(err, subview){
			if(err)
				res.send(err);
			res.json(subview);
		});
	})
	.put(function(req, res){
		subView.findById(req.params.svid, function(err, subview){
			if(err)
				res.send(err);
			subview.name = req.body.name;
			subview.header = req.body.header;
			subview.dimensions = JSON.parse(req.body.dimensions);
			subview.measures = req.body.measures;
			subview.filters = req.body.filters;
			subview.vizType = JSON.parse(req.body.vizType);
			subview.queryObject = req.body.queryObject;
			subview.queryOutputFormat= req.body.queryOutputFormat;

			subview.save(function(err){
				if(err)
					res.send(err);
				res.json({message: "Subview Updated"});
			});
		});
	});	

router.route('/subview/:svid/filters')
	.get(function(req, res){
		subView.findById(req.params.svid, function(err, subview){
			if(err)
				res.send(err);
			res.json(subview.filters);
		});
	})
	.put(function(req, res){
		subView.findById(req.params.svid, function(err, subv){
			if(err)
				res.send(err);
			subv.filters = JSON.parse(req.body.filters);
			console.log(subv);
			res.json({message: "Success"});
		});
	});

router.route('/views')
	.post(function(req, res){
		var view = new View();
		view.reportId = req.body.reportId;
		view.orgId = req.body.orgId;
		view.reportType = req.body.reportType;
		view.reportName = req.body.reportName;
		view.dimensionFilters = JSON.parse(req.body.dimensionFilters)
		var svarray = JSON.parse(req.body.subviews);
		console.log("SV");
		console.log(svarray);
		var sv  = new Array();
		svarray.forEach(function(s){
			console.log(s);
			sv.push(mongoose.Types.ObjectId(s));
		});
		console.log(sv);
		view.subviews = sv;

		view.save(function(err){
			if(err)
				res.send(err);
			res.json({message: "View Saved"});
		});
	})
	
	.get(function(req, res){
		View.find().populate('subviews').exec(function(err, views){
			if(err)
				res.send(err)
			console.log()
			res.json(views);
		});
	});
	
router.route('/view/:vid')
	.get(function(req, res){
		View.findOne({_id: req.params.vid}).populate('subviews').exec(function(err, view){
			if(err)
				res.send(err);
			res.json(view);
		});
	})
	.put(function(req, res){
		View.findById(req.params.vid, function(err, view){
			if(err)
				res.send(err);
			view.reportId = req.body.reportId;
			view.orgId = req.body.orgId;
			view.reportType = req.body.reportType;
			view.reportName = req.body.reportName;
			view.dimensionFilters = JSON.parse(req.body.dimensionFilters)
			var svarray = JSON.parse(req.body.subviews);
			var sv  = new Array();
			svarray.forEach(function(s){
				sv.push(mongoose.Types.ObjectId(s));
			});
			view.subviews = sv;

			view.save(function(err){
				if(err)
					res.send(err);
				res.json({message: "View Updated"});
			});
		});
	});	


app.use('/api', router);

app.listen(port);

console.log("Here we go");

