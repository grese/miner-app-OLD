export default Em.Controller.extend({
    isPerfExpEnabled: function(){
        if(!this.get('perfExpSetting.value.enabled')){
            return 'disabled';
        }else{
            return false;
        }
    }.property('perfExpSetting.value.enabled'),
    perfExpSetting: null,
    actions: {
        save: function(){
            var self = this;
            this.get('perfExpSetting').save().then(function(){
                self.send('showHero', {
                    type: 'success',
                    title: 'Changes Saved',
                    message: 'Your performance settings have been saved successfully.'
                });
            }).catch(function(err){
                Em.Logger.error('<ERROR> While attempting to save the performance expectation setting', err);
                self.send('showHero', {
                    type: 'danger',
                    title: 'Error while saving',
                    message: 'An error occurred while attempting to save the performance expectation setting.'
                });
            });

        }
    }
});