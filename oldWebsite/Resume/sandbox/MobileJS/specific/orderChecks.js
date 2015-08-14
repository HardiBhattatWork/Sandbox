/* Order Checks js file */

// FORM SUBMIT ACTION
var orderChecksFormSubmit = function () {
   BCM.slide.forward(document.getElementById('orderChecksForm'));
   return false;
};
BCM.addEvent(document.getElementById('orderChecksForm'), 'submit', orderChecksFormSubmit);