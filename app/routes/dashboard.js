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
            summary: self.store.find('summary').then(function(result){
                return result.objectAt(0);
            }),
            miners: this.store.find('miner'),
            summaryTrend: self.store.find('trend', {type: 'SUMMARY', startDate: startDate, endDate: endDate}),
            minerTrend: self.store.find('trend', {type: 'MINER', startDate: startDate, endDate: endDate})
        });
    },
    setupController: function(controller, model){
        Em.Logger.debug('trends: ', model.summaryTrend);
        var self = this;
        controller.set('model', model);

        Em.Logger.debug('summary: ', model.summary);
        this.store.find('alert', {type: 'PERFORMANCE_EXPECTATION'}).then(function(result){
            if(result){
                var perfExp = result.objectAt(0);
                if(perfExp && perfExp.get('value.enabled')){
                    var actualNumDevices = model.miners.length,
                        expectedDevices = perfExp.get('value.numDevices'),
                        actualAvgSpeed = model.summary.get('MHS av'),
                        expectedSpeed = perfExp.get('value.numMhs');

                    var messages = [];
                    if(expectedSpeed > actualAvgSpeed){
                        messages.push('The average speed of your miners is currently less than your expected speed setting.');
                    }
                    if(expectedDevices > actualNumDevices){
                        messages.push('The number of devices currently running on your machine is less than your expected number of devices.');
                    }

                    self.send('showHero', {
                        type: 'warning',
                        title: 'Performance Warning',
                        message: messages.join('<br/>')
                    });
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