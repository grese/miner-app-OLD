export default Em.Controller.extend({
    type: null,
    dismissable: true,
    autoDismissTimeout: 12000,
    autoDismiss: true,
    alertClass: function(){
        var dismissable = this.get('dismissable') ? ' alert-dismissable' : '';
        switch(this.get('type')){
            case 'success':
                return 'alert-success'+dismissable;
            case 'danger':
                return 'alert-danger'+dismissable;
            default:
                return 'alert-warning'+dismissable;
        }
    }.property('type', 'dismissable')
});