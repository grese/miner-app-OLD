export default DS.RESTAdapter.extend({
    init: function(){
        this._super();
        var user = sessionStorage.getItem('user');
        if(user){
            var token = JSON.parse(user).token;
            this.set('headers.apitoken', token);
        }else{
            Em.Logger.error('No API-token available. User must login.');
        }
    },
    namespace: 'api',
    loginUser: function(username, password){
        return $.post('/auth/login', {username: username, password: password}).then(function(data){
            return data;
        });
    },
    logoutUser: function(){
        sessionStorage.removeItem('user');
        return this.ajax('/auth/logout');
    },
    headers: {
        apitoken: null
    }
});
