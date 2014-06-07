import User from 'minerapp/models/user';
import ElementsAlertController from 'minerapp/controllers/elements/alert';
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
                .then(function(result){ return result.objectAt(0); }),
            analytics: self.store.find('setting', {type: 'ANALYTICS_CONFIG'})
                .then(function(result){ return result.objectAt(0); })

        });
    },
    setupController: function(controller, model){
        this.controllerFor('pools.pools').set('model', model.pools);
        this.controllerFor('alerts.alerts').set('perfExpSetting', model.perfExp);
        this.controllerFor('settings.notification').set('model', model.notification);
        this.controllerFor('settings.user').set('model', model.user);
        this.controllerFor('settings.analytics').set('model', model.analytics);
    },
    actions: {
        saveSettings: function(){
            Em.Logger.debug('Saving settings...');
            var self = this;
            //this.store.adapterFor('application').set('namespace', 'apx');
            var errors = {
                pools: null,
                alerts: null,
                notifications: null,
                user: null,
                analytics: null
            };
            Em.RSVP.hash({
                pools: this.controllerFor('pools.pools').save().catch( function(){ errors.pools = true; } ),
                alerts: this.controllerFor('alerts.alerts').save().catch( function(){ errors.alerts = true; } ),
                notifications: this.controllerFor('settings.notification').save().catch( function(){ errors.notifications = true; } ),
                user: this.controllerFor('settings.user').save().catch( function(){ errors.user = true; } ),
                analytics: this.controllerFor('settings.analytics').save().catch( function(){ errors.analytics = true; } )
            }).then(function(responses){
                Em.Logger.debug('FINISHED SAVING!', responses);
                var errOccurred = false,
                    erroneousSections = '';
                for(var e in responses){
                    if(!responses[e]){
                        errOccurred = true;
                        var str = '<li>'+e.charAt(0).toUpperCase() + e.substring(1)+'</li>';
                        erroneousSections += str;
                    }
                }
                if(errOccurred){
                    self.send('showHero', {
                        type: 'danger',
                        message: 'An error occurred while saving your settings... Please check the following sections ' +
                            'and try again<br/><ul>'+erroneousSections+'</ul>',
                        title: 'Error while saving settings!'
                    });
                }else{
                    self.send('showHero', {
                        type: 'success',
                        message: 'Your settings have been saved successfully.',
                        title: 'Settings Saved!'
                    });
                }

            });
        }
    }
});