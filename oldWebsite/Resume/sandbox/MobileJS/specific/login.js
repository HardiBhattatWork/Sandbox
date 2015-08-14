/* login.js */

// FORM SUBMIT ACTION
var loginFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
       BCM.slide.forward(document.getElementById('loginForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('loginForm'), 'submit', loginFormSubmit);

// APP STORE BUTTON
//var downloadApp = function () {
//   BCM.modal.init(document.getElementById('downloadAppModal'));
//};
//BCM.addEvent(document.getElementById('downloadApp'), 'click', downloadApp);
