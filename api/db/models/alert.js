var mongoose = require('mongoose'),
    db = require('../db');

var ALERT_TYPES = {
    PERFORMANCE_EXPECTATION: 'PERFORMANCE_EXPECTATION'
};

var AlertSchema = new mongoose.Schema({
    type: {type: String, enum: [ALERT_TYPES.PERFORMANCE_EXPECTATION]},
    value: Object
});
AlertSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
AlertSchema.set('toJSON', {
    virtuals: true
});

var Alert = mongoose.model('alerts', AlertSchema);

exports.find = function(req, res){
    var query = req.query ? req.query : {};
    return Alert.find(query, function(err, alerts){
        if(!err){
            return db.sendAjaxResponse(res, alerts);
        }else{
            return console.log(err);
        }
    });
};

exports.findById = function(req, res){
    return Alert.findById(req.params.id, function(err, alert){
        if(!err){
            return db.sendAjaxResponse(res, alert);
        }else{
            return console.log(err);
        }
    });
};

exports.updateAlert = function(req, res){
    var a = req.body.alert;

    return Alert.findById(req.params.id, function(err, alert){
        var alertObj;
        if(alert){
            alertObj = alert;
            alertObj.type = a.type;
            alertObj.value = a.value;
        }else{
            alertObj = {
                type: a.type,
                value: a.value
            };
        }
        return alertObj.save(function(err){
            if(!err){
                return db.sendAjaxResponse(res, alertObj);
            }else{
                return console.log(err);
            }
        });
    });
};

exports.createAlert = function(req, res){
    var a = req.body.alert,
        alert;
    if(a.type === ALERT_TYPES.PERFORMANCE_EXPECTATION){
        alert = new Alert({
            type: a.type,
            value: {
                enabled: a.value.enabled,
                numDevices: a.value.numDevices,
                numMhs: a.value.numMhs
            }
        });
    }else{
        alert = new Alert({});
    }
    alert.save(function(err){
        if(!err){
            console.log('Alert created!');
            return db.sendAjaxResponse(res, alert);
        }else{
            return console.log(err);
        }
    });
};

exports.deleteAlert = function(req, res){
    return Alert.findById(req.params.id, function (err, alert) {
        return alert.remove(function (err) {
            if (!err) {
                console.log("Deleted alert.");
                return db.sendAjaxResponse(res, alert);
            } else {
                return console.log(err);
            }
        });
    });
};