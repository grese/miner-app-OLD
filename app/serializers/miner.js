export default DS.RESTSerializer.extend({
    normalizePayload: function(payload){
        $.each(payload, function(idx, item){
            var id = item.DeviceID;
            item.id = id;
        });
        return {miners: payload};
    }
});