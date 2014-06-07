export default Em.ObjectController.extend({
    isDataCollectionEnabled: function(){
        if(!this.get('model.value.dataCollectionEnabled')){
            return 'disabled';
        }else{
            return false;
        }
    }.property('model.value.dataCollectionEnabled'),
    save: function(){
        return this.get('model').save();
    }
});