export default Em.Checkbox.extend({
    size: 'small',
    onColor: 'success',
    offColor: 'danger',
    didInsertElement: function(){
        var self = this;
        $("#"+this.get('elementId')).bootstrapSwitch({
            size: self.get('size'),
            onColor: self.get('onColor'),
            offColor: self.get('offColor')
        }).on('switchChange.bootstrapSwitch', function (event, state) {
            self.set('checked', state);
        });
    }
});