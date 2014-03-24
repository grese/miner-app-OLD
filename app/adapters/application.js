export default DS.RESTAdapter.extend({
    init: function(){
        this._super();
        var token = sessionStorage.getItem('apitoken');
        if(token){
            this.set('headers.apitoken', token);
        }else{
            Em.Logger.error('No API-token available. User must login.');
        }
    },
    namespace: 'api',
    loginUser: function(username, password){
        var x = this.ajax('/auth/login', 'POST', {data: {username: username, password: password}});
        return x;
    },
    logoutUser: function(){
        sessionStorage.removeItem('apitoken');
        this.ajax('/auth/logout');
        this.transitionTo('/login');
    },
    headers: {
        apitoken: null
    }
});
