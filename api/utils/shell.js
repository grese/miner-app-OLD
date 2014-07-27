/*
    API Utilities for Shell Commands...
    Used for functions such as restarting & rebooting the machine, and specifying cgminer flags
 */

var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){
        if(error){ console.log('<ERROR>: while restarting machine...'); }
        if(callback){
            callback(stdout);
        }
    });
}

/*
    rebootMachine:  runs a shell script to reboot the machine.  returns 200 for success and 500 for failure.
 */
var rebootMachine = function(req, res, next){
    console.log('Rebooting machine... Service will go down temporarily.');
    execute('shutdown -r now', function(callback){
        console.log(callback);
    });
    res.send(200);
};

/*
 restartMiner:  runs a shell script to restart the cgminer software.  returns 200 for success and 500 for failure.
 */
var restartMiner = function(req, res, next){
    console.log('Restarting Miner... Miner data will be unavailable temporarily.');
    return res.send(200);
};




// Exports...
exports.reboot = rebootMachine;
exports.restart = restartMiner;