/* editEmail.js */

// FORM SUBMIT ACTION
var emailFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
       BCM.slide.forward(document.getElementById('emailForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('emailForm'), 'submit', emailFormSubmit);

