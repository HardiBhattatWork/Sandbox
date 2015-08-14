/* verifySecurityCode.js */

var emailFormSubmit = function () {
    BCM.slide.forward(document.getElementById('emailForm'));
    return false;
};
BCM.addEvent(document.getElementById('emailForm'), 'submit', emailFormSubmit);

