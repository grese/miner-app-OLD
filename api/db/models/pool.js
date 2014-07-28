var mongoose = require("mongoose"),
    db = require('../db'),
    fs = require('fs'),
    minerDir = '../cgminer';

var PoolSchema = new mongoose.Schema({
    name: String,
    url: String,
    username: String,
    password: String,
    enabled: Boolean
});
PoolSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
PoolSchema.set('toJSON', {
    virtuals: true
});

var Pool = mongoose.model('pools', PoolSchema);

exports.find = function(req, res){
    var query = req.query ? req.query : {};
    return Pool.find(query, function(err, pools){
        if(!err){
            pools.forEach(function(p){
                p.password = null;
            });
            return db.sendAjaxResponse(res, pools);
        }else{
            return console.log(err);
        }
    });
};

exports.findById = function(req, res){
    return Pool.findById(req.params.id, function(err, pool){
        if(!err){
            pool.password = null;
            return db.sendAjaxResponse(res, p);
        }else{
            return console.log(err);
        }
    });
};

exports.updatePool = function(req, res){
    var p = req.body.pool;
    return Pool.findById(req.params.id, function(err, pool){
        pool.name = p.name;
        pool.url = p.url;
        pool.username = p.username;
        pool.enabled = p.enabled;
        if(p.password){ pool.password = p.password; }
        return pool.save(function(err){
            if(!err){
                console.log('Updated pool!');
                savePoolConfigToFlatFile();
                return db.sendAjaxResponse(res, pool);
            }else{
                console.log(err);
                return res.send({result: 'FAILURE', message: 'An error occurred while updating the record.'});
            }
            return db.sendAjaxResponse(res, pool);
        });
    });
};

exports.createPool = function(req, res){
    var p = req.body.pool;
    var pool = new Pool({
        url: p.url,
        name: p.name,
        username: p.username,
        password: p.password,
        enabled: p.enabled
    });
    pool.save(function(err){
        if(!err){
            console.log('Pool created!');
            savePoolConfigToFlatFile();
            return db.sendAjaxResponse(res, pool);
        }else{
            console.log(err);
            return res.send({result: 'FAILURE', message: 'An error occurred while creating the record'});
        }
        return db.sendAjaxResponse(res, pool);
    });
};

exports.deletePool = function(req, res){
    return Pool.findById(req.params.id, function (err, pool) {
        return pool.remove(function (err) {
            if (!err) {
                console.log("Deleted pool.");
                savePoolConfigToFlatFile();
                return db.sendAjaxResponse(res, pool);
            } else {
                console.log(err);
                return res.send({result: 'FAILURE', message: 'An error occurred while trying to delete the record.'});
            }
        });
    });
};

var savePoolConfigToFlatFile = function(){
    Pool.find(function(err, pools){
        if(!err){
            var pool_list = [];
            if(pools && pools.length > 0){
                for(var i=0; i<pools.length; i++){
                    if(pools[i].enabled){
                        pool_list.push({
                            url: pools[i].url,
                            user: pools[i].username,
                            pass: pools[i].password
                        });
                        //poolConfig+= ('-o '+pools[i].url+' -u '+pools[i].username+' -p '+pools[i].password+' \n');
                    }
                }
                writeConfigFile(pool_list);
            }else{
                console.log('No Pools in DB...');
            }
        }else{
            return console.log(err);
        }
    });
};
var writePoolConfigToFile = function(config){
    var configFile = minerDir+'/pools.txt';
    fs.writeFile(configFile, config, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Saved miner config to: "+configFile);
        }
    });
};

var writeConfigFile = function(pools){
    var configFile = minerDir+'/miner.conf',
        minerConfig = {
        pools: pools,
        "api-listen" : true,
        "api-port" : "4028",
        "expiry" : "120",
        "failover-only" : true,
        "log" : "5",
        "queue" : "2",
        "scan-time" : "60",
        "worktime" : true,
        "shares" : "0",
        "kernel-path" : "/usr/local/bin",
        "api-allow" : "W:127.0.0.1"
        };
    var configStr = JSON.stringify(minerConfig);
    fs.writeFile(configFile, configStr, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Saved miner config to: "+configFile);
        }
    });
};