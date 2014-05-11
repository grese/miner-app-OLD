export default Em.ObjectController.extend({
    actions: {
        save: function(){
            var user = this.get('model'),
                self = this;
            user.save().then(function(){
                self.send('showHero', {
                    type: 'success',
                    title: 'Changes Saved',
                    message: 'Your user settings have been saved successfully.'
                });
            }).catch(function(err){
                Em.Logger.error('<ERROR> While attempting to save your user settings', err);
                self.send('showHero', {
                    type: 'danger',
                    title: 'Error while saving',
                    message: 'An error occurred while saving your user information.  Please try again.'
                });
            });
        }
    }
});