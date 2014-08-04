
var attr = DS.attr;

var SettingModel = DS.Model.extend({
    type: attr('string'),
    value: attr()
});


export default SettingModel;

