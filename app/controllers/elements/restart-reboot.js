import DeviceMixin from 'minerapp/mixins/device-mixin';
export default Em.Controller.extend(DeviceMixin, {
    restartModalVisible: false,
    rebootModalVisible: false,
    actions: {
        restartClicked: function(){
            this.set('restartModalVisible', true);
        },
        rebootClicked: function(){
            this.set('rebootModalVisible', true);
        },
        doRestart: function(){
            Em.Logger.debug('Restarting miner...');
            this.send('showWaitScreen', Em.Object.create({
                method: 'RESTART',
                duration: 30
            }));
            Em.$.get('/api/restart').then(function(result){
                Em.Logger.debug('got result: ', result);
            });
        },
        doReboot: function(){
            Em.Logger.debug('Rebooting machine...');
            this.send('showWaitScreen', Em.Object.create({
                method: 'REBOOT',
                duration: 30
            }));
            Em.$.get('/api/reboot').then(function(result){
                Em.Logger.debug('got result: ', result);
            });
        },
        cancelRestart: function(){
            Em.Logger.debug('Cancelling restart...');
        },
        cancelReboot: function(){
            Em.Logger.debug('Cancelling reboot...');
        }
    },
    showSuccess: function(title, message){
        this.send('showHero', {
            type: 'success',
            title: title,
            message: message
        });
    },
    showWarning: function(title, message){
        this.send('showHero', {
            type: 'warning',
            title: title,
            message: message
        });
    },
    showFailure: function(title, message){
        this.send('showHero', {
            type: 'danger',
            title: title,
            message: message
        });
    }
});