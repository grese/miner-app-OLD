export default Em.Route.extend({
    model: function(){
        return this.store.find('user');
    }
});