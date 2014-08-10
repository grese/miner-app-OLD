
var PoolModel = DS.Model.extend(Em.Validations.Mixin, {
    name: DS.attr('string'),
    url: DS.attr('string'),
    username: DS.attr('string'),
    password: DS.attr('string'),
    enabled: DS.attr('boolean')
});

PoolModel.reopen({
    validations: {
        name: {
            presence: { message: 'Pool name is required.' }
        },
        url: {
            presence: { message: 'Pool URL is required.' },
            url: { allowIp: true, allowPort: true, protocols: ['http', 'https', ''] }
        },
        username: {
            presence: { message: 'Pool username is required.' }
        },
        password: {
            presence: { message: 'Pool password is required.' }
        }
    }
});

export default PoolModel;