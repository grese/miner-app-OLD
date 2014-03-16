export default Em.Controller.extend({
    actions: {
        create: function(){
            var model = this.get('model');
            var user = this.store.createRecord('user', {
                username: model.get('username'),
                password: model.get('password'),
                email: model.get('email')
            });
            user.save();
            this.transitionToRoute('users');
        }
    }
});