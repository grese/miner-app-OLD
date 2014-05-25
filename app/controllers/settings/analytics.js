export default Em.ObjectController.extend({
    isDataCollectionEnabled: function(){
        if(!this.get('model.value.dataCollectionEnabled')){
            return 'disabled';
        }else{
            return false;
        }
    }.property('model.value.dataCollectionEnabled'),
    actions: {
        save: function(){
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
                title: 'Analytics Settings Updated',
                message: 'Your changes have been saved.'
            });
        }
    }
});