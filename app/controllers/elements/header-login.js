export default Em.Controller.extend({
    isLoggedIn: function(){
        var token = sessionStorage.getItem('apitoken');
        return token && token.length > 0;
    }.property()
});