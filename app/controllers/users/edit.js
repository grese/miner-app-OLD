export default Em.Controller.extend({

    actions: {
        save: function(){

            if($(this.get('formSelector')).valid()){
                var user = this.get('model');

                if(user.save()){
                    this.transitionToRoute('users');
                    this.send('showHero', {
                        type: 'success',
                        title: 'Success!',
                        message: 'The user account has been updated.'
                    });
                }else{
                    this.send('showHero', {
                        type: 'danger',
                        title: 'Whoops!',
                        message: 'Unable to update user account. Please try again later, and notify the site ' +
                            'administrator if you continue to experience issues.'
                    });
                }
            }
        },
        delete: function(){
            var user = this.get('model');
            user.deleteRecord();
            if(user.get('isDeleted')){
                user.save();
                this.transitionToRoute('users');
                this.send('showHero', {
                    title: 'Success!',
                    type: 'success',
                    message: 'The user has been deleted from the database.'
                });
            }else{
                this.send('showHero', {
                    title: 'Whoops!',
                    type: 'danger',
                    message: 'Unable to delete user account. Please try again later, and notify the site ' +
                        'administrator if you continue to experience issues.'
                });
            }
        }
    }
});