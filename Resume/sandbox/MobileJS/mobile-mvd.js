var MVD = MVD || {};

if (typeof MVD == "undefined" || !MVD) {
   MVD = {};
}

MVD.mvdPanel = {
   // Sets visible state of MODAL, ensure only one is open at a time
   mvdPanelVisible: false,

   move: function () {
      if (document.getElementById('mvdPanelParent')) {
         document.getElementById('mvdPanelParent').style.marginTop = (((window.innerHeight - mvdPanel.clientHeight) / 2) + window.scrollY) + 'px';
      }
   },
   
   destroyOverlay: function () {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
      document.getElementsByTagName('body')[0].removeChild(document.getElementById('mvdOverlay'));
   },

   // Close the MODAL
   close: function () {
      if (document.getElementById('mvdPanelParent')) {
         BCM.removeEvent(document.getElementById('m'), 'click', MVD.mvdPanel.close);
         MVD.mvdPanel.destroyOverlay();

         mvdPanelParent.style.opacity = '0';
         setTimeout(function () {
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('mvdPanelParent'));
         }, 500);
         this.mvdPanelVisible = false;
      }
   },
   
   // Initialize the MODAL (will open/close depending on state)
   init: function (content) {
      // Check if Help Icon modal
      
      // If content is empty, no MODAL will fire
      if (content && content != '') {
         if (!this.mvdPanelVisible) {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            var background = document.createElement('div');
            background.setAttribute('id', 'mvdOverlay');
            background.style.height = document.getElementsByTagName('body')[0].scrollHeight + 'px';
            document.getElementsByTagName('body')[0].appendChild(background);
            
            BCM.addEvent(document.getElementById('mvdOverlay'), 'click', function () {
               MVD.mvdPanel.close();
            });
            
            var mvdPanelParent = document.createElement('div');
            mvdPanelParent.setAttribute('id', 'mvdPanelParent');
            
            var mvdPanelBody = document.createElement('div');
            mvdPanelBody.setAttribute('id', 'mvdPanelBody');
            
            var mvdPanelArrow = document.createElement('div');
            mvdPanelArrow.setAttribute('id', 'mvdPanelArrow');
            mvdPanelParent.appendChild(mvdPanelArrow);
                        
            // Get MODAL Content (clone -> fill)
            var clone = content.cloneNode(true);
            while (clone.hasChildNodes()) {
               mvdPanelBody.appendChild(clone.firstChild);
            }
            
            // Build the Close Link
            var closeButton = document.createElement('span');
            closeButton.setAttribute('id', 'mvdPanel-close');
            closeButton.setAttribute('class', 'sprite');
            mvdPanelBody.appendChild(closeButton);
            
            // Append hidden MODAL to DOM
            mvdPanelParent.appendChild(mvdPanelBody);
            document.getElementsByTagName('body')[0].appendChild(mvdPanelParent);
            
            // Center mvdPanel
            var e = window.event;
            mvdPanelParent.style.marginTop = ((e.target.offsetTop + e.target.clientHeight) -3) + 'px';

            // Enable mvdPanel Close Link
            BCM.addEvent(document.getElementById('mvdPanel-close'), 'click', function () {
               MVD.mvdPanel.close();
            });
            
            // Show mvdPanel
            mvdPanelParent.style.webkitTransition = 'opacity .49s linear 0s';
            mvdPanelParent.style.opacity = '1';
            this.mvdPanelVisible = true;
         } else {
            MVD.mvdPanel.close();
         }
      }
   }
};

if(!document.getElementById('csFooter')) {
    var cardSelector = document.getElementById('cardSelector');
    var mvdCaveat = document.createElement('DIV');

    mvdCaveat.innerHTML = "Image may not be identical to your current card.";
    mvdCaveat.id = 'csFooter';
    mvdCaveat.className = "light mt20 floatLeft f10";

    cardSelector.appendChild(mvdCaveat);
}
