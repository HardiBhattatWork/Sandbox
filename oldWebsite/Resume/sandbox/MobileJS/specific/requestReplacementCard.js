/* 
 * requestReplacementCard.js
 */


var requestReplacementCardFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {

       BCM.slide.forward(document.getElementById('requestReplacementCardForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('requestReplacementCardForm'), 'submit', requestReplacementCardFormSubmit);