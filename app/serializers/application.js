export default DS.RESTSerializer.extend({
    extract: function(store, type, payload){
        Em.Logger.debug(payload);
        return payload;
    }
});