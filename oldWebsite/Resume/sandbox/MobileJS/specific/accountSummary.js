/* accountSummary.jsp */

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// BUILD THE ACTIVITY BUTTON
if (BCM.execute()) {
   if (document.getElementById('accountactivity') && document.getElementsByClassName("loadingText").length > 0) {
      var callback = function (responseText) {
         document.getElementById('activityContainer').innerHTML = responseText;
      }

      BCM.ajax.get('accountSummary?prepareTransactionButtonInfo', callback)
   }
}

var mvdIconClick = function () {
    MVD.mvdPanel.init(document.getElementById('panel_mvdDate'));
};
BCM.addEvent(document.getElementById('mvdDate'), 'click', mvdIconClick);
