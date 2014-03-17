export default Em.View.extend({
    didInsertElement: function(){
        var elmID = this.get('elementId'),
            formSelector = '#'+elmID+' form#login-form';
        this.get('controller').set('formSelector', formSelector);
        $(formSelector).validate({
            rules: {
                username: {
                    required: true,
                    maxlength: 32
                },
                password: {
                    required: true,
                    maxlength: 40
                }
            }
        });
    }
});