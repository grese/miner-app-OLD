var attr = DS.attr;
export default DS.Model.extend({
    value: attr('number'),
    type: attr('string'),
    collected: attr('number'),
    deviceID: attr('number'),
    deviceName: attr('string'),
    deviceEnabled: attr('boolean')
});