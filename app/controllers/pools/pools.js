export default Em.Controller.extend({
    save: function(){
        var promises = this.get('model.content').map(function(pool){
            return pool.save();
        });
        return Em.RSVP.all(promises);
    },
    actions: {
        newPool: function(){
            var pool = this.store.createRecord('pool', {});
        },
        deletePool: function(pool){
            pool.deleteRecord();
            pool.save();
        }
    }
});