export default Em.Controller.extend({
    actions: {
        login: function(){
            var model = this.get('model'),
                username = model.get("username"),
                password = model.get('password');
            Em.Logger.debug('Attempting to login with credentials: ');
            Em.Logger.debug('username: '+username+'; password: '+password);
        }
    }
});