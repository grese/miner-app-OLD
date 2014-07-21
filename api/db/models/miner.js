var mongoose = require('mongoose'),
    db = require('../db'),
    ObjectId = mongoose.Types.ObjectID;

var MinerSchema = new mongoose.Schema({
    "ID": Number,
    "PGA": Number,
    "Name": String,
    "Enabled": String,
    "Status": String,
    "Temperature": Number,
    "MHS av": Number,
    "MHS 5s": Number,
    "Accepted": Number,
    "Rejected": Number,
    "Hardware Errors": Number,
    "Utility": Number,
    "Last Share Pool": Number,
    "Last Share Time": Number,
    "Total MH": Number,
    "Frequency": Number,
    "Diff1 Work": Number,
    "Difficulty Accepted": Number,
    "Difficulty Rejected": Number,
    "Last Share Difficulty": Number,
    "No Device": Boolean,
    "Last Valid Work": Number,
    "Device Hardware%": Number,
    "Device Rejected%": Number,
    "Device Elapsed": Number,
    "Driver": String,
    "Kernel": String,
    "Model": String,
    "Device Path": String
});
MinerSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
MinerSchema.set('toJSON', {
    virtuals: true
});

var Miner = mongoose.model('miners', MinerSchema);

exports.populateMiner = function(obj){
    var miner = new Miner(obj);
    return miner.save(function(err){
        if(!err){
            console.log('created miner ID:'+miner.ID);
            return true;
        }else{
            return console.log(err);
        }
    });
};

exports.find = function(req, res){
    var query = req.query ? req.query : {};
    return Miner.find(query, function(err, miners){
        if(!err){
            return db.sendAjaxResponse(res, miners);
        }else{
            return console.log(err);
        }
    });
};

exports.findById = function(req, res){
    return Miner.findById(req.params.id, function(err, miner){
        if(!err){
            return db.sendAjaxResponse(res, miner);
        }else{
            return console.log(err);
        }
    });
};

exports.deleteMiner = function(req, res){
    return Miner.findById(req.params.id, function (err, miner) {
        return miner.remove(function (err) {
            if (!err) {
                console.log("removed");
                return db.sendAjaxResponse(res, miner);
            } else {
                return console.log(err);
            }
        });
    });
};

exports.Miner = Miner;