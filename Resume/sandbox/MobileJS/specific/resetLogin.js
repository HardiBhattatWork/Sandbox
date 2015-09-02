/* resetLogin.jsp */

var registerCreateFormSubmit = function () {
   BCM.slide.forward(document.getElementById('registerCreateForm'));
   return false;
};

BCM.addEvent(document.getElementById('registerCreateForm'), 'submit', registerCreateFormSubmit);