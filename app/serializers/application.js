export default DS.RESTSerializer.extend({
    extract: function(store, type, payload){
        var self = this;
        $(payload).each(function(idx, itm){
            if(!itm.id){
                itm.id = itm._id;
                delete itm._id;
            }
        });
        return payload;
    }
});