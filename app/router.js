var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
    this.route('login');
    this.route('dashboard');

    this.resource('users', function(){
        this.route('edit', {path: ':id'});
        this.route('new');
    });
});

Router.reopen({ location: 'history' });

export default Router;
