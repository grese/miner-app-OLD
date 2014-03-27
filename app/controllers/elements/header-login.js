export default Em.Controller.extend({
    isLoggedIn: function(){
        var user = sessionStorage.getItem('user');
        return user && user.userid && user.token;
    }.property()
});