var rpc = require('miner-rpc'),
    client = rpc.client(),
    mongoose = require('mongoose'),
    Miner = require('../db/models/miner'),
    MinerModel = Miner.Miner,
    TrendModel = require('../db/models/trend'),
    SettingModel = require('../db/models/setting'),
    collectionInterval = 15000,
    collecting = true,
    collectionTimer = null;

var collectTrends = function(){

    // Get Summary:
    client.get('summary', function(err, summary){
        if(!err){
            TrendModel.populateTrend('SUMMARY', summary);
        }
        else { return console.log(err); }
    });

    // Get Devices:
    client.get('devs', function(err1, devices){
        if(!err1){
            devices.forEach(function(device){
                MinerModel.findOne({ID: device.ID}, function(err, miner){
                    if(!err){
                        if(miner){
                            miner.PGA = device.PGA;
                            miner.Name = device.Name;
                            miner.Enabled = device.Enabled;
                            miner.Status = device.Status;
                            miner.Temperature = device.Temperature;
                            miner['MHS 5s'] = device['MHS 5s'];
                            miner['MHS av'] = device['MHS av'];
                            miner.Accepted = device.Accepted;
                            miner.Rejected = device.Rejected;
                            miner['Hardware Errors'] = device['Hardware Errors'];
                            miner.Utility = devices.Utility;
                            miner['Last Share Pool'] = device['Last Share Pool'];
                            miner['Last Share Time'] = device['Last Share Time'];
                            miner['Total MH'] = device['Total MH'];
                            miner.Frequency = device.Frequency;
                            miner['Diff1 Work'] = device['Diff1 Work'];
                            miner['Difficulty Accepted'] = device['Difficulty Accepted'];
                            miner['Difficulty Rejected'] = device['Difficulty Rejected'];
                            miner['Last Share Difficulty'] = device['Last Share Difficulty'];
                            miner['No Device'] = device['No Device'];
                            miner['Last Valid Work'] = device['Last Valid Work'];
                            miner['Device Hardware%'] = device['Device Hardware%'];
                            miner['Device Rejected%'] = device['Device Rejected%'];
                            miner['Device Elapsed'] = device['Device Elapsed'];
                        }else{
                            Miner.populateMiner(device);
                        }

                        TrendModel.populateTrend('MINER', device);
                    }else{
                        return console.log(err);
                    }
                });
            });
        }else{
            return console.log(err1);
        }
    });
};

var collectMinerData = function(interval){
    collectionTimer = setInterval(function(){
        if(collecting){
            collectTrends();
        }
    }, interval);
};
var setCollectionSettings = function(enabled, newInterval){
    console.log('IN CALLBACK: ', enabled, newInterval);
    if(collectionTimer !== null){
        clearInterval(collectionTimer);
    }
    if(enabled){
        collectMinerData(newInterval);
    }
};

var startAnalyticsCollection = function(){
    SettingModel.getAnalyticsConfig(setCollectionSettings);
};

var clearPreviousTrendData = function(){
    TrendModel.clearAllTrends();
};

exports.clearPreviousTrendData = clearPreviousTrendData;
exports.startAnalyticsCollection = startAnalyticsCollection;