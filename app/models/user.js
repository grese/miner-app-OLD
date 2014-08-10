

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
        /*password: {
            presence: {
                if: function(object, validator) {
                    return (object.get('password') === null || object.get('password').length > 8);
                }
            }
        }*/
    }
});

export default UserModel;