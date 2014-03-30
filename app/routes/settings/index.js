import User from 'minerapp/models/user';
export default Em.Route.extend({
    model: function(){
        var self = this;
        return Em.RSVP.hash({
            pools: self.store.find('pool'),
            perfExp: self.store.find('alert', {type: 'PERFORMANCE_EXPECTATION'})
                .then(function(result){ return result.objectAt(0); }),
            user: self.store.find('user'),
            notification: self.store.find('setting', {type: 'EMAIL_NOTIFICATION'})
                .then(function(result){ return result.objectAt(0); })

        });
    },
    afterModel: function(model){
        var self = this;
        Em.Logger.debug(model.notification);
        Em.Logger.debug(model.perfExp);
        this.controllerFor('pools.pools').set('model', model.pools);
        this.controllerFor('alerts.alerts').set('perfExpSetting', model.perfExp);
        this.controllerFor('settings.notification').set('model', model.notification);
    }
});