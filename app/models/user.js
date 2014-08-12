

var UserModel = DS.Model.extend(Em.Validations.Mixin, {
    username: DS.attr('string'),
    password: DS.attr('string')
});

UserModel.reopen({
    validations: {
        username: {
            presence: { message: 'Username is required.' },
            length: {
                minimum: 4,
                message: 'Username must be a minimum of 4 characters.'
            }
        }
    }
});

export default UserModel;