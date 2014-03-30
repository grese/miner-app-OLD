export default Ember.Handlebars.makeBoundHelper(function(number, decimals) {
    return $.number(number, decimals);
});

