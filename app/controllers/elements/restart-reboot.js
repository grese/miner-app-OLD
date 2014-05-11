export default Em.Controller.extend({
    actions: {
        restart: function(){
            Em.Logger.debug('Restarting miner...');
            var valid = true;
            if(valid){
                this.showSuccess('HI!', 'Restarting Miner...');
            }else{
                this.showFailure('Oh No!', 'I am having trouble restarting your miner...');
            }
        },
        reboot: function(){
            Em.Logger.debug('Rebooting machine...');
            var valid = true;
            if(valid){
                this.showSuccess('Hello.', 'Rebooting Machine...');
            }else{
                this.showFailure('Aw Shit!', 'I am having trouble rebooting your machine...');
            }
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