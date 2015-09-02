/* addAccount.jsp */

// Help icon popup
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// Resolves account number to bank name
var getBankName = function() {
    var rnField = document.getElementById('bankRouting');
    var bnPanel = document.getElementById('bankName');
    
    bnPanel.innerHTML = "";
    bnPanel.style.display = 'none';
    
    if((rnField.value.length == 9) && (rnField.className.indexOf('error') == -1)) {
        var url = 'paymentAccount?bankInfo&bankRouting=' + rnField.value;
        var opts = {lines: 13, length: 2, width: 2, radius: 3, rotate: 0, color: '#333', speed: 1, trail: 60, shadow: false, hwaccel: false, className: 'spinner', zIndex: 2e9, top: 7, left: 1};
        var spinner = new Spinner(opts).spin(bnPanel);

        bnPanel.style.display = 'block';

        var callback = function(responseText) {
            try {
                var bName = JSON.parse(JSON.stringify(eval(responseText))).bankName;
                
                if(bName.length > 30) {
                     bName = bName.substr(0, 30) + "...";
                }
                
                bnPanel.innerHTML = bName;
            } 
            catch (e) {
                bnPanel.innerHTML = "Unable to retrieve bank name.";
            }
        }

        BCM.ajax.get(url, callback);
    }
};
BCM.addEvent(document.getElementById('bankRouting'), 'blur', getBankName);

// Run bank name resolution logic on page load IF this is an edit instead of an add
if (location.href.indexOf('modifyAccount')) getBankName();

// Ensure BACK button works according to context (same as CANCEL button)
//document.getElementById('backButton').href = document.getElementById('cancelButton').href;

// Validate fields and then submit form with slide animation
var addAccountFormSubmit = function () {   
   if (!BCM.slide.checkErrors()) {      
      BCM.slide.forward(document.getElementById('addAccountForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('addAccountForm'), 'submit', addAccountFormSubmit);

// Manually enforce INPUT data mask for certain devices/browsers
var fixLength = function () {
   if (this.id != "bankNickName"){
        if (this.value.search(/[^0-9]/) != -1) {
             var cleanVal = this.value.replace(/[^0-9]/g,'');
             this.value = cleanVal;
        }
   }
   if (this.getAttribute('max')) {
      var maxLength = this.getAttribute('maxlength');
      if (this.value.length > maxLength) {
         var newValue = this.value.slice(0, maxLength);
         this.value = newValue;
      }
   }
};

BCM.addEvent(document.getElementById('bankRouting'), 'keyup', fixLength);
BCM.addEvent(document.getElementById('bankAccount'), 'keyup', fixLength);
BCM.addEvent(document.getElementById('bankAccountRe'), 'keyup', fixLength);
BCM.addEvent(document.getElementById('bankNickName'), 'keyup', fixLength);



//==============================================================================
// VALIDATION
//==============================================================================
var checkAccountTypeErrors = function () {
   var element = document.getElementById('accountType');
   
   if (element.value == '') {
      BCM.addClass(element, 'error');
      BCM.removeClass(document.getElementById('menubutton-1_inline'), 'mHide');
   } else {
      BCM.removeClass(element, 'error');
      BCM.addClass(document.getElementById('menubutton-1_inline'), 'mHide');
      BCM.addClass(document.getElementById('menubutton-1_Error'), 'mHide');
   }
}
BCM.addEvent(document.getElementById('accountType'), 'blur', checkAccountTypeErrors);

var checkReEnterMatch = function () {
   if (document.getElementById('bankAccountRe').value != document.getElementById('bankAccount').value) {
      BCM.addClass(document.getElementById('bankAccountRe'), 'error');
      BCM.removeClass(document.getElementById('bankAccountRe_inline'), 'mHide');
   }
};
BCM.addEvent(document.getElementById('bankAccountRe'), 'blur', checkReEnterMatch);
