
var PID = PID || {};

if (typeof PID == "undefined" || !PID) {
   PID = {};
}

PID.pidPanel = {
   // Sets visible state of MODAL, ensure only one is open at a time
   pidPanelVisible: false,

   move: function () {
      if (document.getElementById('pidPanelParent')) {
         document.getElementById('pidPanelParent').style.marginTop = (((window.innerHeight - pidPanel.clientHeight) / 2) + window.scrollY) + 'px';
      }
   },
   
   destroyOverlay: function () {
      var bodyElem = document.getElementsByTagName('body')[0];
      bodyElem.style.overflow = 'auto';
      bodyElem.removeChild(document.getElementById('pidOverlay'));
   },

   // Close the MODAL
   close: function () {
      if (document.getElementById('pidPanelParent')) {
         BCM.removeEvent(document.getElementById('m'), 'click', PID.pidPanel.close);
         PID.pidPanel.destroyOverlay();

         pidPanelParent.style.opacity = '0';
         setTimeout(function () {
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('pidPanelParent'));
         }, 500);
         this.pidPanelVisible = false;
      }
   },
   init: function (content) {
      if (content && content != '') {
         if (!this.pidPanelVisible) {
            var bodyElem = document.getElementsByTagName('body')[0];
            bodyElem.style.overflow = 'hidden';
            
            var background = document.createElement('div');
            background.setAttribute('id', 'pidOverlay');
            background.style.height = bodyElem.scrollHeight + 'px';
            bodyElem.appendChild(background);

            BCM.addEvent(background, 'click', function () {PID.pidPanel.close();});
            
            var pidPanelParent = document.createElement('div');
            pidPanelParent.setAttribute('id', 'pidPanelParent');
            
            var pidPanelBody = document.createElement('div');
            pidPanelBody.setAttribute('id', 'pidPanelBody');
   
            // Get MODAL Content (clone -> fill)
            var clone = content.cloneNode(true);
            while (clone.hasChildNodes()) {
               pidPanelBody.appendChild(clone.firstChild);
            }
            
            // Build the Close Link
            var closeButton = document.createElement('span');
            closeButton.setAttribute('id', 'pidPanel-close');
            closeButton.setAttribute('class', 'sprite');
            pidPanelBody.appendChild(closeButton);
            
            // Append hidden MODAL to DOM
            pidPanelParent.appendChild(pidPanelBody);
            bodyElem.appendChild(pidPanelParent);
            
            // Center pidPanel
            var src = window.event.target;
            pidPanelBody.style.top = bodyElem.scrollTop + 'px';
            
            // Enable pidPanel Close Link
            BCM.addEvent(closeButton, 'click', function () {PID.pidPanel.close();});
            
            // Show pidPanel
            pidPanelParent.style.webkitTransition = 'opacity .49s linear 0s';
            pidPanelParent.style.opacity = '1';
            this.pidPanelVisible = true;
         } else {
            PID.pidPanel.close();
         }
      }
   }
};
