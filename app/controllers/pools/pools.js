export default Em.Controller.extend({
    save: function(){
        var promises = this.get('model').map(function(pool){
            if(pool.get('isDirty')){
                return pool.save();
            }
        });
        if(promises.length > 0){
            return Em.RSVP.all(promises);
        }else{
            return null;
        }
    },
    hasDirtyPools: function(){
        var has = false;
        this.get('model').map(function(pool){
            if(pool.get('isDirty')){ has = true; }
        });
        return has;
    }.property('model.@each.isDirty'),
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