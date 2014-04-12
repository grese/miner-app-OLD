export default Em.ObjectController.extend({
    actions: {
        save: function(){
            var user = this.get('model');
            Em.Logger.debug('click');
            user.save().then(function(data){
                Em.Logger.debug('RETURNED!');
            });
        }
    }
});