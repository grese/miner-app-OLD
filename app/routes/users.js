import AuthenticatedRoute from 'minerapp/routes/authenticated';
export default AuthenticatedRoute.extend({
    model: function(){
        return this.store.find('user');
    }
});