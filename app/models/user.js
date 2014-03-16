var attr = DS.attr;

export default DS.Model.extend({
    username: attr('string'),
    password: attr('string'),
    email: attr('string')
});