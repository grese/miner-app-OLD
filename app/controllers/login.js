export default Em.Controller.extend({
    actions: {
        login: function(){
            var self = this,
                model = self.get('model'),
                username = model.get("username"),
                password = model.get('password');
            var RESTAdapter = self.store.adapterFor('application');
            var user = RESTAdapter.loginUser(username, password);
            Em.Logger.debug('LOGGING IN....');
            user.then(function(data){
                if(data.result === 'SUCCESS'){
                    Em.Logger.debug('LOGIN SUCCESS!!!!!!');
                    Em.Logger.debug('Login success');
                    RESTAdapter.set('headers.apitoken', data.token);
                    var cookie = JSON.stringify({userid: data.user.id, token: data.token});
                    sessionStorage.setItem('user', cookie);
                    //self.transitionToRoute('/');
                    window.location = '/';
                }else{
                    Em.Logger.error('Login error', data);
                }
            }).fail(function(err){
                    Em.Logger.error('Login error', err);
                    self.send('showHero', {
                        type: 'danger',
                        message: 'The username or password entered were invalid.  Please verify your login credentials ' +
                            'and try again',
                        title: 'Login error'
                    });
                });
        }
    }
});