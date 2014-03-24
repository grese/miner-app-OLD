export default Em.Controller.extend({
    routeDidChange: function(){
        if(!this.isLoggedIn()) this.transitionToRoute('/login');
    }.observes('currentPath'),
    isLoggedIn: function(){
        var token = sessionStorage.getItem('apitoken');
        return token && token.length > 0;
    }
});