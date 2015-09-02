/* register.jsp */

var registerFormSubmit = function () {
   BCM.slide.forward(document.getElementById('registerForm'));
   return false;
};

BCM.addEvent(document.getElementById('registerForm'), 'submit', registerFormSubmit);