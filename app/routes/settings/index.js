import User from 'minerapp/models/user';
export default Em.Route.extend({
    model: function(){
        var self = this;
        return Em.RSVP.hash({
            pools: self.store.find('pool'),
            alerts: self.store.find('alert'),
            user: self.store.find('user'),
            settings: self.store.find('setting')
        });
    },
    afterModel: function(model){
        Em.Logger.debug('The Pools: ', model.pools);
        Em.Logger.debug('The Alerts: ', model.alerts);
        Em.Logger.debug('The Users: ', model.user);
        Em.Logger.debug('The Settings: ', model.settings);
        this.controllerFor('settings.pools').set('model', model.pools);

    }
});