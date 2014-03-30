export default Ember.Handlebars.makeBoundHelper(function(number, decimals) {
    return number.toFixed(2);
});

