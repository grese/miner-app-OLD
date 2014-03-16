var attr = DS.attr;

export default DS.Model.extend({
    name: attr('string'),
    url: attr('string'),
    username: attr('string'),
    password: attr('string')
});