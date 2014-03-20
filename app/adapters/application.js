export default DS.RESTAdapter.extend({
    namespace: 'api',
    loginUser: function(username, password){
        return this.ajax('/api/login', 'POST', {data: {username: username, password: password}});
    }
});
