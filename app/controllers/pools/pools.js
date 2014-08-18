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
    getPoolErrors: function(){
        var errors = [];
        return this.get('model').map(function(pool){
            pool.validate.catch(function(err){
                errors = errors.concat(err.name);
                errors = errors.concat(err.url);
                errors = errors.concat(err.username);
                errors = errors.concat(err.password);
                errors = errors.concat(err.enabled);
            });
            return errors;
        });
    },
    poolsAreValid: function(){
        var valid = true;
        this.get('model').map(function(pool){
            if(!pool.get('isValid')){ valid = false; }
        });
        return valid;
    }.property('model.@each.isValid'),
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