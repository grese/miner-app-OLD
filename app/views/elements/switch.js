export default Em.Checkbox.extend({
    size: 'mini',
    onColor: 'success',
    offColor: 'danger',
    didInsertElement: function(){
        var self = this;
        $("#"+this.get('elementId')).bootstrapSwitch({
            width: 30,
            size: self.get('size'),
            onColor: self.get('onColor'),
            offColor: self.get('offColor')
        }).on('switchChange.bootstrapSwitch', function (event, state) {
            Em.Logger.debug('STATE: ', state);
            self.set('checked', state);
        });
    }
});