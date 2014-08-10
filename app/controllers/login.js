export default Em.Controller.extend({
    attemptedTransition: null,
    inProgress: false,
    actions: {
        login: function(){
            this.set('inProgress', true);
            var self = this,
                model = self.get('model'),
                username = model.get("username"),
                password = $.md5(model.get('password'));
            var RESTAdapter = self.store.adapterFor('application');
            var login = RESTAdapter.loginUser(username, password);
            login.then(function(data){
                self.set('inProgress', false);
                if(data.result === 'SUCCESS'){
                    var attemptedTranny = self.get('attemptedTransition');
                    if(attemptedTranny){
                        attemptedTranny.retry();
                        self.set('attemptedTransition', null);
                    }else{
                        self.transitionToRoute('dashboard');
                    }

                }else{
                    Em.Logger.error('<ERROR>: Login Error received from server: ', data);
                }
            }).fail(function(err){
                    self.set('inProgress', false);
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