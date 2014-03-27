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
            this.store.createRecord('pool', {});
        },
        savePools: function(){
            var self = this;
            $.each(this.get('model.content'), function(idx, itm){
                itm.save().catch(self.savePoolsFailure);
            });
        }
    }
});