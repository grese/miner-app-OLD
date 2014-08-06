export default DS.RESTAdapter.extend({
    namespace: 'api',
    getJSON: function(path){
        return this.ajax('/'+this.get('namespace')+'/'+path);
    },
    loginUser: function(username, password){
        return $.post('/api/login', {username: username, password: password}).then(function(data){
            return data;
        });
    },
    logoutUser: function(){
        sessionStorage.removeItem('user');
        return this.ajax('/api/logout');
    }
});
