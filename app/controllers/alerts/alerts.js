export default Em.Controller.extend({
    perfExpSetting: null,
    actions: {
        savePerfExp: function(){
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