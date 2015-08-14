/* loginChallenge.jsp */

/*
var registerButtonAction = function () {
   var registerDevice = document.getElementById('registerDevice');
   if (registerDevice && registerDevice.nodeName != 'BUTTON') {
      var newButton = document.createElement('button');
      newButton.setAttribute('id', 'registerDevice');
      newButton.setAttribute('name', 'registerDevice');
      newButton.setAttribute('value', 'true');
      newButton.setAttribute('class', 'checkbox checked');
      newButton.onclick = function () {
         return false;
      };
      
      var node = registerDevice.parentNode;
      node.removeChild(registerDevice);
      node.insertBefore(newButton, node.firstChild);
   } else if (registerDevice) {
      BCM.toggleClass(registerDevice, 'checked');
   }
   return false;
};
BCM.addEvent(document.getElementById('registerDeviceTouchTarget'), 'click', registerButtonAction);
*/

var loginChallengeFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
      BCM.slide.forward(document.getElementById('loginChallengeForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('loginChallengeForm'), 'submit', loginChallengeFormSubmit);
