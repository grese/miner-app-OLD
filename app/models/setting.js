
var SettingModel = DS.Model.extend(Em.Validations.Mixin, {
    type: DS.attr('string'),
    value: DS.attr()
});

var SETTING_TYPES = {
    DEVICE_INFO: 'DEVICE_INFO',
    PERFORMANCE_ALERT: 'PERFORMANCE_ALERT',
    EMAIL_NOTIFICATION: 'EMAIL_NOTIFICATION',
    ANALYTICS_CONFIG: 'ANALYTICS_CONFIG'
};

SettingModel.reopen({
    validations: {
        type: {
            inclusion: {
                in: [SETTING_TYPES.DEVICE_INFO, SETTING_TYPES.PERFORMANCE_ALERT,
                SETTING_TYPES.EMAIL_NOTIFICATION, SETTING_TYPES.ANALYTICS_CONFIG],
                message: 'The setting type must be one of the approved values...'
            }
        }
    }
});

export default SettingModel;

