export default Em.Controller.extend({
    routeDidChange: function(){
        if(!this.isLoggedIn()) this.transitionToRoute('/login');
    }.observes('currentPath'),
    isLoggedIn: function(){
        var user = JSON.parse(sessionStorage.getItem('user'));
        return user && user.userid && user.token;
    }
});