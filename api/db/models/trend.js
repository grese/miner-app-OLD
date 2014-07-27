var mongoose = require('mongoose'),
    db = require('../db'),
    time = require('time');

var TREND_TYPES = {
    SUMMARY: 'SUMMARY',
    MINER: 'MINER',
    OTHER: 'OTHER'
};

var TrendSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            TREND_TYPES.SUMMARY,
            TREND_TYPES.MINER,
            TREND_TYPES.OTHER
        ]
    },
    date: { type: Date, default: Date.now() },
    value: Object
});

TrendSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
TrendSchema.set('toJSON', {
    virtuals: true
});

var Trend = mongoose.model('trends', TrendSchema);

exports.populateTrend = function(type, obj){
    var trend = new Trend({
        type: type,
        date: Date.now(),
        value: obj
    });
    return trend.save(function(err){
        if(!err){
            console.log(type+' trend created');
            return true;
        }else{
            return console.log(err);
        }
    });
};

exports.find = function(req, res){
    var query = {};
    if(req.query){
        if(req.query.type){
            query.type = req.query.type;
        }
        if(req.query.startDate && req.query.endDate){
            query.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }
    }

    Trend.find(query, function(err, trends){
        if(!err){
            var output = [];
            for(var i=0; i<trends.length; i++){
                var trend = trends[i];
                var date = new time.Date(trend.date);
                date.setTimezone(process.env.TZ);

                var obj = {
                    value: trend.value['MHS 5s'],
                    _id: trend._id,
                    date: date.toString(),
                    ID: trend.value.ID
                };
                output.push(obj);
            }
            return db.sendAjaxResponse(res, output);
        }else{
            return console.log(err);
        }
    });
};

exports.findById = function(req, res){
    return Trend.findById(req.params.id, function(err, trend){
        if(!err){
            return db.sendAjaxResponse(res, trend);
        }else{
            return console.log(err);
        }
    });
};

exports.updateTrend = function(req, res){
    var s = req.body.trend;

    return Trend.findById(req.params.id, function(err, trend){
        trend.type = s.type;
        trend.date = s.date ? s.date : Date.now();
        trend.value = s.value;
        return trend.save(function(err){
            if(!err){
                console.log('Updated setting!');
                return db.sendAjaxResponse(res, trend);
            }else{
                return console.log(err);
            }
        });
    });
};

exports.createTrend = function(req, res){
    var s = req.body.trend,
        trend = null,
        date = s.date ? s.date : Date.now();

    console.log('Adding trend: ', req.body.trend);

    trend = new Trend({
        type: s.type,
        date : date,
        value: s.value
    });
    trend.save(function(err){
        if(!err){
            console.log('Trend created!');
            return db.sendAjaxResponse(res, trend);
        }else{
            return console.log(err);
        }
    });
};

exports.deleteTrend = function(req, res){
    return Trend.findById(req.params.id, function (err, trend) {
        return trend.remove(function (err) {
            if (!err) {
                console.log("Deleted trend.");
                return db.sendAjaxResponse(res, trend);
            } else {
                return console.log(err);
            }
        });
    });
};

exports.clearAllTrends = function(){
    Trend.collection.drop();
};