import ApplicationAdapter from 'minerapp/adapters/application';
export default ApplicationAdapter.extend({
    namespace: 'minertest',
    pathForType: function(){
        return 'devs';
    }
});