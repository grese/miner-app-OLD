export default DS.RESTSerializer.extend({
    normalizePayload: function(payload){
        payload.id = 0;
        return {summary: Em.A([payload])};
    }
});