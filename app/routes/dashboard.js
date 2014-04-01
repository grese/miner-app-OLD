export default Em.Route.extend({
    model: function(){
        var self = this;
        return Em.RSVP.hash({
            summary: self.store.find('summary', 0),
            miners: self.store.findAll('miner')
        });
    },
    afterModel: function(model){
        Em.Logger.debug('THE MODEL: ', model.miners);
    },
    actions: {
        refreshMiners: function(){
            this.model();
        }
    }
});