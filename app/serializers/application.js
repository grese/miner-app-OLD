export default DS.RESTSerializer.extend({

    extract: function(store, type, payload){
        console.log('PAYLOAD: ', payload);
        return payload;
    }
});