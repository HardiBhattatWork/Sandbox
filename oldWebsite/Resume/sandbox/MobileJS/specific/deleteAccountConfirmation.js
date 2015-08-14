/* deleteAccountConfirmation.jsp */

// Validate fields and then submit form with slide animation
var deleteConfirm = function () {   
   if (!BCM.slide.checkErrors()) {      
      BCM.slide.forward(document.getElementById('deleteAccountConfirmed2'));
   }
   return false;
};
BCM.addEvent(document.getElementById('deleteAccountConfirmed2'), 'submit', deleteConfirm);

// Validate fields and then submit form with slide animation
var deleteCancel = function () {   
   if (!BCM.slide.checkErrors()) {      
      BCM.slide.back(document.getElementById('deleteAccountCanceled2'));
   }
   return false;
};
BCM.addEvent(document.getElementById('deleteAccountCanceled2'), 'submit', deleteCancel);
