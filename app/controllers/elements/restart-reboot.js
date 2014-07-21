export default Em.Controller.extend({
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
            this.store.adapterFor('application').getJSON('/restart').then(function(){
                Em.Logger.debug('Miner restart complete!');
            }).catch(function(err){
                Em.Logger.error('<ERROR> While trying to restart miner.', err);
            });

        },
        doReboot: function(){
            Em.Logger.debug('Rebooting machine...');
            this.store.adapterFor('application').getJSON('/reboot').then(function(){
                Em.Logger.debug('Machine reboot complete!');
            }).catch(function(err){
                Em.Logger.error('<ERROR> While trying to reboot machine.', err);
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