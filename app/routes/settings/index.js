import User from 'minerapp/models/user';
import ElementsAlertController from 'minerapp/controllers/elements/alert';
export default Em.Route.extend({
    model: function(){
        var self = this;

        var userid = this.controllerFor('application').get('user.id');
        userid = userid ? userid : 1;
        Em.Logger.debug('USER: ', this.controllerFor('application').get('user'));
        return Em.RSVP.hash({
            info: self.store.find('setting', {type: 'DEVICE_INFO'})
                .then(function(result){ return result.objectAt(0); }),
            pools: self.store.find('pool'),
            perfExp: self.store.find('setting', {type: 'PERFORMANCE_ALERT'})
                .then(function(result){ return result.objectAt(0); }),
            //user: self.store.find('user', userid),
            notification: self.store.find('setting', {type: 'EMAIL_NOTIFICATION'})
                .then(function(result){ return result.objectAt(0); }),
            analytics: self.store.find('setting', {type: 'ANALYTICS_CONFIG'})
                .then(function(result){ return result.objectAt(0); })

        });
    },
    afterModel: function(model){
        var info = JSON.stringify(model.info.get('value')),
            perfExp = JSON.stringify(model.perfExp.get('value')),
            notification = JSON.stringify(model.notification.get('value')),
            analytics = JSON.stringify(model.analytics.get('value'));
        this.set('initialSettings', {
            info: info,
            perfExp: perfExp,
            notification: notification,
            analytics: analytics
        });
    },
    convertObjectToStr: function(obj){
        if(typeof obj === 'object'){
            return JSON.stringify(obj);
        }else{
            return obj;
        }
    },
    objectsAreEqual: function(obj1, obj2){
        var str1 = this.convertObjectToStr(obj1),
            str2 = this.convertObjectToStr(obj2);
        return str1 !== str2;
    },
    setupController: function(controller, model){
        this.controllerFor('settings.info').set('model', model.info);
        this.controllerFor('pools.pools').set('model', model.pools);
        this.controllerFor('alerts.alerts').set('perfExpSetting', model.perfExp);
        this.controllerFor('settings.notification').set('model', model.notification);
        this.controllerFor('settings.user').set('model', model.user);
        this.controllerFor('settings.analytics').set('model', model.analytics);
    },
    actions: {
        saveSettings: function(){
            var self = this;
            var dirtyModels = {};


            if(this.controllerFor('pools.pools').get('hasDirtyPools')){
                dirtyModels.pools = this.controllerFor('pools.pools').save();
            }
            if(this.controllerFor('settings.user').get('model.isDirty')){
                dirtyModels.user = this.controllerFor('settings.user').save();
            }

            if(this.objectsAreEqual(this.controllerFor('settings.info').get('model.value'),
                this.get('initialSettings.info'))){
                dirtyModels.info = this.controllerFor('settings.info').save();
            }

            if(this.objectsAreEqual(this.controllerFor('settings.notification').get('model.value'),
                this.get('initialSettings.notification'))){
                dirtyModels.notification = this.controllerFor('settings.notification').save();
            }
            if(this.objectsAreEqual(this.controllerFor('settings.analytics').get('model.value'),
                this.get('initialSettings.analytics'))){
                dirtyModels.analytics = this.controllerFor('settings.analytics').save();
            }
            if(this.objectsAreEqual(this.controllerFor('alerts.alerts').get('perfExpSetting.value'),
                this.get('initialSettings.perfExp'))){
                dirtyModels.perfExp = this.controllerFor('alerts.alerts').save();
            }

            Em.RSVP.hash(dirtyModels).then(function(responses){
                var valid = true,
                    errSections = "";
                for(var e in responses){
                    if(e in dirtyModels && dirtyModels[e]){
                        if(!responses[e]){
                            valid = false;
                            var str = '<li>'+e.charAt(0).toUpperCase() + e.substring(1)+'</li>';
                            errSections += str;
                        }
                    }
                }
                if(!valid){
                    self.send('showHero', {
                        type: 'danger',
                        message: 'An error occurred while saving your settings... Please check the following sections ' +
                            'and try again<br/><ul>'+errSections+'</ul>',
                        title: 'Error while saving settings!'
                    });
                }else{
                    if(Object.keys(dirtyModels).length > 0){
                        self.send('showHero', {
                            type: 'success',
                            message: 'Your settings have been saved successfully.',
                            title: 'Settings Saved!'
                        });
                    }else{
                        self.send('showAlert', {
                            type: 'info',
                            message: 'It looks like none of your settings have changed since you last saved...',
                            title: 'No Changes? '
                        });
                    }
                }
            });
        }
    }
});