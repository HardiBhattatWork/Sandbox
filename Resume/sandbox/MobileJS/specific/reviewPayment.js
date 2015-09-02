/* reviewPayment.jsp */

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// FORM SUBMIT ACTION
var reviewPaymentFormSubmit = function () {
    if (!document.getElementById('reviewPaymentForm').getAttribute("cancel")) {
        BCM.slide.forward(document.getElementById('reviewPaymentForm'));
    } else {
        BCM.slide.back(document.getElementById('reviewPaymentForm'));
    }
    
    return false;
};
BCM.addEvent(document.getElementById('reviewPaymentForm'), 'submit', reviewPaymentFormSubmit);

var backSubmit = function () {
    document.getElementById('reviewPaymentForm').setAttribute("cancel", "true");
}
BCM.addEvent(document.getElementById('cancel'), 'click', backSubmit);
