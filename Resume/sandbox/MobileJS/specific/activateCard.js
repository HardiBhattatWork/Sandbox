/* activateCard.jsp */

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// FORM SUBMIT ACTION
var splitSSN = function () {
   var ssnTemp = document.getElementById('ssnTemp').value;
   if (ssnTemp.length > 0) {
       if(ssnTemp[0] !=undefined){document.getElementById('ssnDigit1').value = ssnTemp[0];}else{document.getElementById('ssnDigit1').value = "";}
      if(ssnTemp[1] !=undefined){document.getElementById('ssnDigit2').value = ssnTemp[1];}else{document.getElementById('ssnDigit2').value = "";}
      if(ssnTemp[2] !=undefined){document.getElementById('ssnDigit3').value = ssnTemp[2];}else{document.getElementById('ssnDigit3').value = "";}
      if(ssnTemp[3] !=undefined){document.getElementById('ssnDigit4').value = ssnTemp[3];}else{document.getElementById('ssnDigit4').value = "";}
   }else{
       document.getElementById('ssnDigit1').value = "";
      document.getElementById('ssnDigit2').value = "";
      document.getElementById('ssnDigit3').value = "";
      document.getElementById('ssnDigit4').value = "";
   }
}

var activateCardFormSubmit = function () {
   splitSSN();
   
   if (!BCM.slide.checkErrors()) {
      document.getElementById('ssnTemp').type = 'text';
      document.getElementById('securityCode').type = 'password';
   //   document.getElementById('activateCardForm').action = document.getElementById('activateCardForm').action + '?activatedFromPanel=true';
      BCM.slide.forward(document.getElementById('activateCardForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('activateCardForm'), 'submit', activateCardFormSubmit);

var sendActivateCard = function () {
   return true;
};


// Check length on Chrome for Android -- not respecting min/max number field lengths.
var checkLength = function () {
   if (this.value.search(/[^0-9]/) != -1) {
        var cleanVal = this.value.replace(/[^0-9]/g,'');
        this.value = cleanVal;
   }
    
   if (this.getAttribute('max')) {
      var maxLength = this.getAttribute('maxlength');
      if (this.value.length > maxLength) {
         var newValue = this.value.slice(0, maxLength);
         this.value = newValue;
      }
   }
};
BCM.addEvent(document.getElementById('ssnTemp'), 'keyup', checkLength);
BCM.addEvent(document.getElementById('securityCode'), 'keyup', checkLength);