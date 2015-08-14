/* reviewCancelPayment.jsp */

// FORM SUBMIT ACTION
var reviewCancelFormSubmit = function () {
   BCM.slide.forward(document.getElementById('paymentCancelForm'));
   return false;
};
BCM.addEvent(document.getElementById('paymentCancelForm'), 'submit', reviewCancelFormSubmit);

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

var typeButtons = document.getElementsByName('cancelType');
for (var i = typeButtons.length; i--;) {
   typeButtons[i].onclick = function () {
      var otherBoxes = document.getElementsByClassName('paymentSelectBox');
      for (var i = 0, len = otherBoxes.length; i < len; i++) {
         BCM.removeClass(otherBoxes[i], 'selectBox-on');
      }

      BCM.addClass(this.parentNode, 'selectBox-on');
      this.checked = true;
   };
}

if (BCM.slide.viewPreviousPage && BCM.slide.viewPreviousPage.indexOf('history') > -1) {
   document.getElementById('cancel').href = BCM.slide.viewPreviousPage;
}
