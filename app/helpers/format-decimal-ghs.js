/*
 This will convert the `number` param from mh to gh (divide it by 1000), and
  then return it fixed to `decimals` decimal places.
 */
export default Ember.Handlebars.makeBoundHelper(function(number, decimals) {
    var num = number / 1000;
    return num.toFixed(decimals);
});

