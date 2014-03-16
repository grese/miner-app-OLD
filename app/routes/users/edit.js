export default Em.Route.extend({
    model: function(params){
        return this.store.find('user', params.id);
    },
    setupController: function(controller, model){
        controller.set('model', model);
    }
});