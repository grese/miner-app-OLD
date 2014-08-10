export default Em.Controller.extend({
    user: function(){
        var user = sessionStorage.getItem('piminer_user');
        if(user){
            return JSON.parse(user);
        }else{
            return null;
        }
    }.property(),
    isLoggedIn: function(){
        return this.get('user') !== null;
    }.property('user')
});