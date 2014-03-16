var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
    name: attr(),
    miners: hasMany('miner'),
    numExpectedMiners: attr(),
    totalExpectedSpeed: attr()
});