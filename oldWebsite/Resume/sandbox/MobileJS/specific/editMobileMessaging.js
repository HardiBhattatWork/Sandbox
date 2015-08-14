/* editMobileMessaging.jsp */

// REPLACE &AMP; WITH & IN SELECT BOX
var selectBox = document.getElementById('mobileCarrier');

            for (var i = 0; i < selectBox.options.length; i++) {
                if (selectBox.options[i].innerText == "AT&amp;T"){
                    selectBox.options[i].innerText = "AT&T";
                }
            }

// FORM SUBMIT ACTION
var mobileMessagingFormSubmit = function () {
    if (!document.getElementById('mobileMessagingForm').getAttribute("cancel")) {
        BCM.slide.back(document.getElementById('mobileMessagingForm'));
    } else {
        BCM.slide.back(document.getElementById('mobileMessagingForm'));
    }
    
    return false;
};
BCM.addEvent(document.getElementById('mobileMessagingForm'), 'submit', mobileMessagingFormSubmit);