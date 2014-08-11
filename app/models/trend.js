
var TrendModel = DS.Model.extend({
    value: DS.attr(),
    type: DS.attr('string'),
    collected: DS.attr('number'),
    deviceID: DS.attr('number'),
    deviceName: DS.attr('string'),
    deviceEnabled: DS.attr('boolean')
});

export default TrendModel;