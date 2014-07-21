/*
    API Utilities for Shell Commands...
    Used for functions such as restarting & rebooting the machine, and specifying cgminer flags
 */

/*
    rebootMachine:  runs a shell script to reboot the machine.  returns 200 for success and 500 for failure.
 */
var rebootMachine = function(req, res, next){
    console.log('Rebooting machine... Service will go down temporarily.');

    return res.send(200);
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