
var writeMinerConfigToFile = function(){
    saveConfig('/Users/johngrese/Projects/MinerApp/cgminer/minerconfig.txt ', function(err, results){
        console.log('SAVED CONFIG: ', results);
    });
};
exports.writeMinerConfigToFile = writeMinerConfigToFile;