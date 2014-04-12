var attr = DS.attr;
export default DS.Model.extend({
    value: attr('number'),
    type: attr('string'),
    date: attr('date'),
    ID: attr('number')
});