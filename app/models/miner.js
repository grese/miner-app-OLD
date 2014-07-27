var attr = DS.attr;
var Miner = DS.Model.extend({
    "ID": attr('number'),
    "PGA": attr('number'),
    "Name": attr('string'),
    "Enabled": attr('string'),
    "Status": attr('string'),
    "Temperature": attr('number'),
    "MHS av": attr('number'),
    "MHS 5s": attr('number'),
    "Accepted": attr('number'),
    "Rejected": attr('number'),
    "Hardware Errors": attr('number'),
    "Utility": attr('number'),
    "Last Share Pool": attr('number'),
    "Last Share Time": attr('number'),
    "Total MH": attr('number'),
    "Frequency": attr('number'),
    "Diff1 Work": attr('number'),
    "Difficulty Accepted": attr('number'),
    "Difficulty Rejected": attr('number'),
    "Last Share Difficulty": attr('number'),
    "No Device": attr('boolean'),
    "Last Valid Work": attr('number'),
    "Device Hardware%": attr('number'),
    "Device Rejected%": attr('number'),
    "Device Elapsed": attr('number')
});

Miner.reopen({
    getMHsAv: function(){
        return this.get('MHS av');
    }.property('MHS av'),
    getMH5s: function(){
        return this.get('MHS 5s');
    }.property('MHS 5s'),
    getHardwareErrors: function(){
        return this.get('Hardware Errors');
    }.property('Hardware Errors'),
    getLastSharePool: function(){
        return this.get('Last Share Pool');
    }.property('Last Share Pool'),
    getLastShareTime: function(){
        return this.get('Last Share Time');
    }.property('Last Share Time'),
    getTotalMH: function(){
        return this.get('Total MH');
    }.property('Total MH'),
    getDiff1Work: function(){
        return this.get('Diff1 Work');
    }.property('Diff1 Work'),
    getDifficultyAccepted: function(){
        return this.get('Difficulty Accepted');
    }.property('Difficulty Accepted'),
    getDifficultyRejected: function(){
        return this.get('Difficulty Rejected');
    }.property('Difficulty Rejected'),
    getLastShareDifficulty: function(){
        return this.get('Last Share Difficulty');
    }.property('Last Share Difficulty'),
    getNoDevice: function(){
        return this.get('No Device');
    }.property('No Device'),
    getLastValidWork: function(){
        return this.get('Last Valid Work');
    }.property('Last Valid Work'),
    getDeviceHardwarePercent: function(){
        return this.get('Device Hardware%');
    }.property('Device Hardware%'),
    getDeviceRejectedPercent: function(){
        return this.get('Device Rejected%');
    }.property('Device Rejected%'),
    getDeviceElapsed: function(){
        return this.get('Device Elapsed');
    }.property('Device Elapsed')
});

export default Miner;