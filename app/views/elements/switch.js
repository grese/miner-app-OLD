export default Em.Checkbox.extend({
    didInsertElement: function(){
        $("#"+this.get('elementId')).bootstrapSwitch({
            size: 'small',
            onColor: 'success',
            offColor: 'danger'
        });
    }
});
