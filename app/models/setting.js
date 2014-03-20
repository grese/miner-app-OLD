var attr = DS.attr;
export default DS.Model.extend({
    toAddress: attr(),
    fromAddress: attr(),
    smtpServer: attr(),
    smtpAuth: attr(),
    smtpAuthUsername: attr(),
    smtpAuthPassword: attr(),
    smtpAuthPort: attr()
});