/* securityGate.js */

// FORM SUBMIT ACTION
var securityFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
       BCM.slide.forward(document.getElementById('securityForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('securityForm'), 'submit', securityFormSubmit);
