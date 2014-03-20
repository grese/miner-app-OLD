var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
    this.route('login');
    this.route('dashboard');
    this.resource('settings', function(){});
});

Router.reopen({ location: 'history' });

export default Router;
