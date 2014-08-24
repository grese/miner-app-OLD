import DeviceMixin from 'minerapp/mixins/device-mixin';
export default Em.Controller.extend(DeviceMixin, {
    message: function(){
        switch(this.get('method')){
            case 'REBOOT':
                return 'Rebooting your machine... Please wait.';
            case 'RESTART':
                return 'The mining software is restarting... Please wait.';
            default:
                return 'Please wait...';
        }
    }.property('method'),
    actions: {
        timerComplete: function(){
            this.send('reloadPage');
        }
    }
});