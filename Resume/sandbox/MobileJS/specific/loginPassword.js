/* loginPassword.jsp */

var loginPasswordFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
      BCM.slide.forward(document.getElementById('loginPasswordForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('loginPasswordForm'), 'submit', loginPasswordFormSubmit);