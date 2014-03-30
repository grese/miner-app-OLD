var attr = DS.attr;
export default DS.Model.extend({
    type: attr('string'),
    value: attr()
});