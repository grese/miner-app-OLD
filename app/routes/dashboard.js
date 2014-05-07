export default Em.Route.extend({
    model: function(params){
        var self = this,
            startDate, endDate;
        if(params && params.startDate && params.endDate){
            startDate = params.startDate.format(),
            endDate = params.endDate.format();
        }else{
            startDate = moment().subtract('months', 1).format();
            endDate = moment().format();
        }
        return Em.RSVP.hash({
            //summary: self.store.find('summary', 0),
            miners: self.store.find('miner'),
            summaryTrend: self.store.find('trend', {type: 'SUMMARY', startDate: startDate, endDate: endDate}),
            minerTrend: self.store.find('trend', {type: 'MINER', startDate: startDate, endDate: endDate})
        });
    },
    actions: {
        updateModel: function(params){
            var self = this;
            if(params && params.startDate && params.endDate){
                self.model({startDate: params.startDate, endDate: params.endDate}).then(function(data){
                    self.controllerFor('dashboard').set('model', data);
                });
            }else{
                self.model().then(function(data){
                    self.controllerFor('dashboard').set('model', data);
                });
            }

        }
    }
});