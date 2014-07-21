
var CGMinerClient = require('cgminer');

var client = new CGMinerClient('localhost', 4028);


var restartMiner = function(callback){
    return client.COMMAND('restart').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getDevices = function(callback){
    return client.COMMAND('devs').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getDevicesDetails = function(callback){
    return client.COMMAND('devdetails').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getPools = function(callback){
    return client.COMMAND('pools').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getSummary = function(callback){
    return client.COMMAND('summary').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getCoinInfo = function(callback){
    return client.COMMAND('coin').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getConfig = function(callback){
    return client.COMMAND('config').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getVersion = function(callback){
    return client.COMMAND('version').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getStats = function(callback){
    return client.COMMAND('stats').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var getNotifications = function(callback){
    return client.COMMAND('notify').then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};

var saveConfig = function(filename, callback){
    return client.COMMAND('save', filename).then(function(results) {
        console.log(results);
        return callback(null, results);
    }, function(err) {
        return callback(err, null);
    });
};