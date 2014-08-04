export default Em.Controller.extend({
    routeDidChange: function(){
        //if(!this.isLoggedIn()) this.transitionToRoute('/login');
    }.observes('currentPath'),
    isLoggedIn: function(){
        //var user = this.get('user');
        //return user && user.userid && user.token;
        return true;
    },
    user: function(){
        return JSON.parse(sessionStorage.getItem('user'));
    }.property()
});