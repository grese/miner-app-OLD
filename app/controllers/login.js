export default Em.Controller.extend({
    actions: {
        login: function(){
            var model = this.get('model'),
                username = model.get("username"),
                password = model.get('password');
            var user = this.store.adapterFor('application').loginUser('grese', 'schmiles');
            user.then(function(data){
                console.log(data);
            });

        }
    }
});