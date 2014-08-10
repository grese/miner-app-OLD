export default Em.Controller.extend({
    needs: ['application'],
    isLoggedIn: function(){
        return this.get('controllers.application.user') !== null;
    }.property('controllers.application.user')
});