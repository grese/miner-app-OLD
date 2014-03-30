export default Em.Controller.extend({
    perfExpSetting: null,
    actions: {
        savePerfExp: function(obj){
            var self = this;
            if(this.get('perfExpSetting.isDirty')){
                this.get('perfExpSetting').save()
                    .then(function(){
                        self.send('showHero', {
                            type: 'success',
                            title: 'Changes Saved',
                            message: 'Your performance settings have been saved successfully.'
                        });
                    })
                    .catch(function(err){
                        self.send('showHero', {
                            type: 'danger',
                            title: 'Error while saving',
                            message: 'Your changes have been saved successfully.'
                        });
                    });
            }
        }
    }
});