export default Em.View.extend({
    didInsertElement: function(){
        var self = this;
        $('#'+self.get('elementId .alert')).on('closed.bs.alert', function(){
            self.destroy();
        });
        if(this.get('controller.autoDismiss')){
            setTimeout(function(){
                $('#'+self.get('elementId .alert')).alert('close');
            }, this.get('controller.autoDismissTimeout'));
        }
    }
});