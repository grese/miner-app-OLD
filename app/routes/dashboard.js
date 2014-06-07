export default Em.Route.extend({
    model: function(params){
        var self = this,
            startDate, endDate;
        if(params && params.startDate && params.endDate){
            startDate = params.startDate.format();
            endDate = params.endDate.format();
        }else{
            startDate = moment().subtract('hours', 1).format();
            endDate = moment().format();
        }
        return Em.RSVP.hash({
            startDate: startDate,
            endDate: endDate,
            //summary: self.store.find('summary', 0),
            summary: Em.Object.create(),
            miners: self.store.find('miner'),
            summaryTrend: self.store.find('trend', {type: 'SUMMARY', startDate: startDate, endDate: endDate}),
            minerTrend: self.store.find('trend', {type: 'MINER', startDate: startDate, endDate: endDate})
        });
    },
    setupController: function(controller, model){
        var self = this;
        controller.set('model', model);

        this.store.find('alert', {type: 'PERFORMANCE_EXPECTATION'}).then(function(result){
            if(result){
                var perfExp = result.objectAt(0);
                Em.Logger.debug(perfExp.get('value'));
                if(perfExp && perfExp.get('value.enabled')){
                    var actualNumDevices = model.miners.get('content').length,
                        expectedDevices = perfExp.get('value.numDevices'),
                        actualAvgSpeed = model.summary.get('MHS av'),
                        actualSpeed = model.summary.get('MHS 5s'),
                        expectedSpeed = perfExp.get('value.numMhs');
                    if(expectedSpeed > actualSpeed){
                        self.send('showHero', {
                            type: 'warning',
                            title: 'Performance Warning',
                            message: 'The current collective speed of your miners is currently less than your expected speed setting.'
                        });
                    }else if(expectedSpeed > actualAvgSpeed){
                        self.send('showHero', {
                            type: 'warning',
                            title: 'Performance Warning',
                            message: 'The average speed of your miners is currently less than your expected speed setting.'
                        });
                    }else if(expectedDevices > actualNumDevices){
                        self.send('showHero', {
                            type: 'warning',
                            title: 'Performance Warning',
                            message: 'The number of devices currently running on your machine is less than your expected number of devices.'
                        });
                    }
                }

            }
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