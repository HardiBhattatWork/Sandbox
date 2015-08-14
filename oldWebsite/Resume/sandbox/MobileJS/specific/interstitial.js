/* interstitial.js */

var baseElemCount = 5;

var interstitialPaperlessFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
       BCM.slide.forward(document.getElementById('interstitialPaperlessForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('interstitialPaperlessForm'), 'submit', interstitialPaperlessFormSubmit);

/* Show/hide paperless statments confirmation checkboxes */     
var enrollChex = document.getElementById('enrollChecks'); 

var pYes = document.getElementById('paperlessYes');
BCM.addEvent(pYes, 'click', function(){enrollChex.style.display = 'block';});

var pNo = document.getElementById('paperlessNo'); 
BCM.addEvent(pNo, 'click', function(){enrollChex.style.display = 'none';});

var seeDetailsClick = function () {
    PID.pidPanel.init(document.getElementById('disclosures'));
};
BCM.addEvent(document.getElementById('seeDetails'), 'click', seeDetailsClick);

if (document.getElementsByClassName('error').length > baseElemCount) {
    enrollChex.style.display = 'block';
}