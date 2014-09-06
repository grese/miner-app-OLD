export default Em.View.extend({
    classNames: ['select-input'],
    $element: null,
    templateName: 'elements/select-input',
    didInsertElement: function(){
        var self = this;
        this.set('$select', $('#'+this.get('elementId')+' .select'));
        self.get('$select').selectpicker({
            style: null
        });
        self.get('$select').selectpicker('val', this.get('value'));
        this.get('$select').on('change', function(e){
            self.set('value', self.get('$select').val());
        });
    }
});