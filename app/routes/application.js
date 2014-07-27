export default Em.Route.extend({
    actions: {
        logout: function(){
            this.store.adapterFor('application').logoutUser();
            this.transitionTo('/login');
        },
        showAlert: function(params){
            var outlet = params.outlet ? params.outlet : 'alert';
            this.controllerFor('elements.alert').setProperties({
                type: params.type,
                message: params.message,
                title: params.title
            });
            this.render('elements.alert', {
                into:  params.targetView,
                outlet: outlet,
                controller: 'elements.alert'
            });
        },
        showHero: function(params){
            this.controllerFor('elements.hero').setProperties({
                type: params.type,
                message: params.message,
                title: params.title
            });
            this.render('elements.hero', {
                into: 'application',
                outlet: 'hero',
                controller: 'elements.hero'
            });
            window.scrollTo(0, 0);
        },
        loading: function(){
            Em.Logger.debug('IN LOADING');
        },
        reloadPage: function(){
            Em.Logger.debug('RELOADING PAGE');
            var currentLoc = window.location.href;
            window.location = currentLoc;
        },
        showWaitScreen: function(config){
            var method = config.get('method'),
                duration = config.get('duration');
            this.controllerFor('elements.please-wait').setProperties({
                method: method,
                duration: duration // milliseconds
            });
            this.render('elements.please-wait', {
                into: 'application',
                controller: 'elements.please-wait'
            });

        }
    }
});