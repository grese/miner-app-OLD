/*
 This will convert the `number` param from mh to gh (divide it by 1000), and
  then return it fixed to `decimals` decimal places.
 */
export default Ember.Handlebars.makeBoundHelper(function(number, decimals) {
    var dec = ((decimals != null) && (typeof decimals !== 'undefined')) ? decimals : 2;
    var num = ((number != null) && (typeof number !== 'undefined')) ? number / 1000 : 0;
    return num.toFixed(dec);
});

