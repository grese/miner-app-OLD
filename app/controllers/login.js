export default Em.Controller.extend({
    actions: {
        login: function(){
            var self = this,
                model = self.get('model'),
                username = model.get("username"),
                password = $.md5(model.get('password'));
            var RESTAdapter = self.store.adapterFor('application');
            var user = RESTAdapter.loginUser(username, password);
            user.then(function(resp){
                Em.Logger.debug('THE REPONSE: ', resp);
                var data = JSON.parse(resp);
                if(data.result === 'SUCCESS'){
                    Em.Logger.debug('LOGIN SUCCESS!!!!!!');
                    RESTAdapter.set('headers.apitoken', data.token);
                    var cookie = JSON.stringify({userid: data.user.id, token: data.token});
                    sessionStorage.setItem('user', cookie);
                    self.transitionToRoute('/');
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