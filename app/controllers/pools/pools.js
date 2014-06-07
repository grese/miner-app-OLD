export default Em.Controller.extend({
    savePoolsFailure: function(){
        this.send('showHero', {
            type: 'danger',
            message: 'Error Saving',
            description: 'Could not persist your items to the database.'
        });
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
                title: 'Pools updated',
                message: 'Your changes have been saved.'
            });
        }
    },
    actions: {
        newPool: function(){
            var pool = this.store.createRecord('pool', {});
            pool.save();
        },
        save: function(){
            var self = this;
            $.each(this.get('model.content'), function(idx, itm){
                if(itm && itm.get('isDirty')){
                    itm.save().then(function(){
                        self.showResponse(false);
                    }).catch(function(err){
                        Em.Logger.error(err);
                        self.showResponse(true);
                    });
                }
            });
        },
        deletePool: function(pool){
            pool.deleteRecord();
            pool.save();
        }
    }
});