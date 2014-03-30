export default Em.ObjectController.extend({
    actions: {
        saveNotification: function(){
            var self = this;
            this.get('model').save().then(function(){
                self.showResponse(false);
            }).catch(function(err){
                Em.Logger.error(err);
                self.showResponse(true);
            });
        }
    },
    showResponse: function(errs){
        if(errs){
            this.send('showHero', {
                type: 'danger',
                title: 'Error saving changes',
                message: 'An error occurred on the server while trying to save your changes'
            });
        }else{
            this.send('showHero', {
                type: 'success',
                title: 'Notification Updated',
                message: 'Your changes have been saved.'
            });
        }
    }
});