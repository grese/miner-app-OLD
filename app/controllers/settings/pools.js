export default Em.Controller.extend({
    savePoolsFailure: function(){
        this.send('showHero', {
            type: 'danger',
            message: 'Error Saving',
            description: 'Could not persist your items to the database.'
        });
    },
    actions: {
        newPool: function(){
            var pool = this.store.createRecord('pool', {});
            pool.save();
        },
        savePools: function(){
            var self = this;
            var errs = false;
            $.each(this.get('model.content'), function(idx, itm){
                if(itm && itm.get('isDirty')) itm.save().catch(function(){
                    errs = true;
                });
            });
            if(errs){
                self.send('showHero', {
                    type: 'danger',
                    title: 'Error saving changes',
                    message: 'An error occurred on the server while trying to save your changes'
                });
            }else{
                self.send('showHero', {
                    type: 'success',
                    title: 'Pools updated',
                    message: 'Your changes have been saved.'
                });
            }
        },
        deletePool: function(pool){
            var self = this;
            pool.deleteRecord();
            pool.save();
        }
    }
});