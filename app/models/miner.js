var attr = DS.attr;
var Miner = DS.Model.extend({
    name: attr(),
    description: attr(),
    expectedSpeed: attr()
});
export default Miner;