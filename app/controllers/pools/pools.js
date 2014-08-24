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
    validatePools: function(){
        this.get('model').map(function(pool){
            pool.validate();
        });
    },
    validationErrors: function(){
        var errors = [];
        this.get('model').map(function(pool){
            var errs = pool.get('errors');
            if(errs.name.length > 0)
                errors = errors.concat(errs.name);
            if(errs.url.length > 0)
                errors = errors.concat(errs.url);
        });
        return errors;
    }.property('poolsAreValid'),
    poolsAreValid: function(){
        var valid = true;
        this.get('model').map(function(pool){
            if(!pool.get('isValid')){ valid = false; }
        });
        return valid;
    }.property('model.@each.isValid'),
    hasDirtyPools: function(){
        Em.Logger.debug('POOLS: ', this.get('model'));
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