/* resetPassword.jsp */

var resetPasswordFormSubmit = function () {
   BCM.slide.forward(document.getElementById('resetPassword'));
   return false;
};
BCM.addEvent(document.getElementById('resetPassword'), 'submit', resetPasswordFormSubmit);

var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);