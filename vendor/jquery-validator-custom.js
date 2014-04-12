jQuery.validator.addMethod("didUserEditProfile", function(value, element) {
    return this.optional(element) || (parseFloat(value) > 0);
}, "* Amount must be greater than zero");