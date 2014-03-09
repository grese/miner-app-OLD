export default Em.Route.extend({
    model: function(){
        var self = this;
        return Em.RSVP.hash({
            miners: self.store.findAll('miner')
        });
    }
});