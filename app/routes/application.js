export default Em.Route.extend({
    enter: function(){
        console.log('entered application route!');
        var token = sessionStorage.getItem('apitoken');
        if(!token || token.length <= 0)
            this.transitionTo('/login');
    },
    actions: {
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
        logout: function(){
            var x = this.store.adapterFor('application').logoutUser();
            console.log(x);
        }
    }
});