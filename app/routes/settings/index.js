import User from 'minerapp/models/user';
export default Em.Route.extend({
    model: function(){
        var self = this;
        var userid = this.controllerFor('application').get('user.userid');
        return Em.RSVP.hash({
            pools: self.store.find('pool'),
            perfExp: self.store.find('alert', {type: 'PERFORMANCE_EXPECTATION'})
                .then(function(result){ return result.objectAt(0); }),
            user: self.store.find('user', userid),
            notification: self.store.find('setting', {type: 'EMAIL_NOTIFICATION'})
                .then(function(result){ return result.objectAt(0); })

        });
    },
    setupController: function(controller, model){
        this.controllerFor('pools.pools').set('model', model.pools);
        this.controllerFor('alerts.alerts').set('perfExpSetting', model.perfExp);
        this.controllerFor('settings.notification').set('model', model.notification);
        this.controllerFor('settings.user').set('model', model.user);
    }
});