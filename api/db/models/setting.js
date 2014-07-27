var mongoose = require('mongoose'),
    db = require('../db'),
    async = require('async'),
    Pool = require('./pool'),
    fs = require('fs'),
    analytics = require('../../analytics/batch');

var SETTING_TYPES = {
    EMAIL_NOTIFICATION: 'EMAIL_NOTIFICATION',
    DEVICE_INFO: 'DEVICE_INFO',
    MINER_CONFIG: 'MINER_CONFIG',
    ANALYTICS_CONFIG: 'ANALYTICS_CONFIG'
};
exports.SETTING_TYPES = SETTING_TYPES;

var SettingSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            SETTING_TYPES.EMAIL_NOTIFICATION,
            SETTING_TYPES.DEVICE_INFO,
            SETTING_TYPES.MINER_CONFIG,
            SETTING_TYPES.ANALYTICS_CONFIG
        ]
    },
    value: Object
});

SettingSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
SettingSchema.set('toJSON', {
    virtuals: true
});

var Setting = mongoose.model('settings', SettingSchema);

exports.getSettings = function(callback){
    var dbFetches = [];
    for(var type in SETTING_TYPES){
        dbFetches.push(function(done){
            Setting.find({type: type}, function(err, settings){
                if(err){
                    console.log('<ERROR> While fetching '+type+' setting from db.', err);
                    done(err, null);
                }else{
                    done(null, settings);
                }
            });
        });
    }
    return async.parallel(dbFetches,
        function(err, results){
            if(err){
                console.log('<ERROR> While completing parallel callbacks for fetching settings...', err);
            }
            callback(results);
        });

};

exports.find = function(req, res){
    var query = req.query ? req.query : {};
    return Setting.find(query, function(err, settings){
        if(!err){
            settings.forEach(function(setting){
                if(setting.type === SETTING_TYPES.EMAIL_NOTIFICATION){
                    setting.value.smtpAuthPassword = null;
                }
            });
            return db.sendAjaxResponse(res, settings);
        }else{
            return console.log(err);
        }
    });
};

exports.findById = function(req, res){
    return Setting.findById(req.params.id, function(err, setting){
        if(!err){
            if(setting.type === SETTING_TYPES.EMAIL_NOTIFICATION){
                setting.value.smtpAuthPassword = null;
            }
            return db.sendAjaxResponse(res, setting);
        }else{
            return console.log(err);
        }
    });
};

exports.updateSetting = function(req, res){
    var s = req.body.setting,
        id = req.params.id;
    return Setting.findById(id, function(err, setting){
        setting.type = s.type;
        setting.value = s.value;
        return setting.save(function(err){
            if(!err){
                console.log('Updated setting!');
                if(setting.type === SETTING_TYPES.EMAIL_NOTIFICATION){
                    setting.value.smtpAuthPassword = null;
                }else if(setting.type === SETTING_TYPES.MINER_CONFIG){
                    saveConfigToFlatFile(SETTING_TYPES.MINER_CONFIG, id);
                }else if(setting.type === SETTING_TYPES.ANALYTICS_CONFIG){
                    analytics.startAnalyticsCollection();
                }
                return db.sendAjaxResponse(res, setting);
            }else{
                return console.log(err);
            }
        });
    });
};

exports.createSetting = function(req, res){
    var s = req.body.setting,
        setting = null;
    setting = new Setting({
        type: s.type,
        value: s.value
    });
    setting.save(function(err){
        if(!err){
            console.log('Setting created!');
            if(setting.type === SETTING_TYPES.MINER_CONFIG){
                saveConfigToFlatFile(SETTING_TYPES.MINER_CONFIG, setting.id);
            }
            return db.sendAjaxResponse(res, setting);
        }else{
            return console.log(err);
        }
    });
};

exports.deleteSetting = function(req, res){
    return Setting.findById(req.params.id, function (err, setting) {
        return setting.remove(function (err) {
            if (!err) {
                console.log("Deleted setting.");
                return db.sendAjaxResponse(res, setting);
            } else {
                return console.log(err);
            }
        });
    });
};

var saveConfigToFlatFile = function(type, id){
    if(type === SETTING_TYPES.MINER_CONFIG){
        Setting.findById(id, function(err, config){
            if(!err){
                if(config && config.value){
                    if(config.value.enabled && config.value.config){
                        writeMinerConfigToFile(config.value.config);
                    }else{
                        writeMinerConfigToFile("");
                    }
                }
            }else{
                return console.log(err);
            }
        });
    }
};

var writeMinerConfigToFile = function(config){
    var configFile = 'cgminer/config.txt';
    fs.writeFile(configFile, config, function(err){
        if(err){
            return console.log(err);
        }
    });
};

exports.getAnalyticsConfig = function(callback){
    Setting.find({type: SETTING_TYPES.ANALYTICS_CONFIG}, function(err, config){
        if(!err){
            var configObj = config[0];
            if(configObj && configObj.value){
                return callback(configObj.value.dataCollectionEnabled, configObj.value.dataInterval * 1000);
            }else{
                return callback(false, 15000);
            }
        }else{
            return console.log('<ERROR>: While fetching the analytics configuration.');
        }
    });
};

