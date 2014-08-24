
var PoolModel = DS.Model.extend(Em.Validations.Mixin, {
    name: DS.attr('string'),
    url: DS.attr('string'),
    username: DS.attr('string'),
    password: DS.attr('string'),
    enabled: DS.attr('boolean'),
    quota: DS.attr('number'),
    priority: DS.attr('number')
});

PoolModel.reopen({
    validations: {
        name: {
            presence: { message: 'Pool name is required.' }
        },
        url: {
            presence: { message: 'Pool URL is required.' }
        }
    }
});

export default PoolModel;