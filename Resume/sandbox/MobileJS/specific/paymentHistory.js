/* paymentHistory.jsp */

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// BUILD TABLE CONTENT
var buildHistoryTable = {   
   currentData: '',
   tableID: '',
   
   sortDescending: {
      payDate: false,
      amount: true,
      status: true
   },
      
   init: function (sort, callback) {
      var r = JSON.parse(this.currentData);

      switch (sort) {
         case 'payDate':
            this.sortDescending.payDate = (this.sortDescending.payDate == true) ? false : true;
            BCM.sort.date(r, sort, this.sortDescending.payDate);
            break;
         case 'amount':
            this.sortDescending.amount = (this.sortDescending.amount == true) ? false : true;
            BCM.sort.numeric(r, sort, this.sortDescending.amount);
            break;
         case 'status':
            this.sortDescending.status = (this.sortDescending.status == true) ? false : true;
            BCM.sort.alpha(r, sort, this.sortDescending.status);
            break;
         default:
            BCM.sort.date(r, 'payDate', true);
      }
      
      this.currentData = JSON.stringify(r);
      
      BCM.slide.clearNodes(this.tableID);
      var tbody = document.getElementById(this.tableID);
      
      if (r.length === 0) {
         var tr = document.createElement('tr');
         var td = document.createElement('td');
         td.setAttribute('colspan', '5');
         td.setAttribute('class', 'center');
         var emptyText = 'You have no pending payments at this time.';
         if (this.tableID == 'pastBody') {
            emptyText = 'You have no past payments at this time.';
         }
         td.appendChild(document.createTextNode(emptyText));
         tr.appendChild(td);
         tbody.appendChild(tr);
      } else {
         for (var i = 0, len = r.length; i < len; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('id', 'detailRow-' + i);
            tr.setAttribute('class', 'detailRows');

            var repeatCol = document.createElement('td');
            if (r[i].frequency == 'RECURRING') {
               repeatCol.setAttribute('class', 'yui-dt0-col-repeat sprite recurring');
            } else {
               repeatCol.setAttribute('class', 'yui-dt0-col-repeat');
            }
            repeatCol.appendChild(document.createTextNode(' '));
            tr.appendChild(repeatCol);

            var dateCol = document.createElement('td');
            dateCol.setAttribute('class', 'yui-dt0-col-payDate');
            dateCol.appendChild(document.createTextNode(r[i].payDate));
            tr.appendChild(dateCol);

            var amtCol = document.createElement('td');
            amtCol.setAttribute('class', 'yui-dt0-col-amount');
            amtCol.appendChild(document.createTextNode('$' + r[i].amount));
            tr.appendChild(amtCol);

            var statusCol = document.createElement('td');
            statusCol.setAttribute('class', 'yui-dt0-col-status f8');
            statusCol.appendChild(document.createTextNode(r[i].status));
            tr.appendChild(statusCol);

            var showDetails = document.createElement('td');
            showDetails.setAttribute('class', 'sprite yui-dt0-col-modify');
            showDetails.appendChild(document.createTextNode(' '));
            tr.appendChild(showDetails);

            tbody.appendChild(tr);
         }
      }
      
      if (callback) {
         callback();
      }
   },
   
   createDetails: function (position) {
      var r = JSON.parse(this.currentData);
      var position = position.replace('detailRow-', '');
      
      var detailContent = document.createElement('div');
      detailContent.setAttribute('class', 'w100p');
      
	if (r[position].section == 'pending') {
         
        var pendingTitle = document.createElement('h2');
	pendingTitle.setAttribute('id', 'pendingTitle');    
	pendingTitle.setAttribute('class', 'mb5');   
	pendingTitle.appendChild(document.createTextNode('Pending payment'));
         
         var pendingCopy = document.getElementById('pendingCopy').cloneNode(true);
             
         detailContent.appendChild(pendingTitle);
         detailContent.appendChild(pendingCopy);
         detailContent.appendChild(document.createElement('hr'));
      }  
      
      var buildRow = function (title, content, icon) {
         var descriptionTitle = document.createElement('div');
         descriptionTitle.setAttribute('class', 'w40p mFloatleft f8 uppercase lh25 pb10');
         descriptionTitle.innerHTML = title;

         var descriptionContent = document.createElement('div');
         descriptionContent.setAttribute('class', 'w60p mFloatleft lh25 pb10');
         if (title == 'Channel') {
            var channel = document.createElement('span');
            if (content == 'phone' || content == 'cell') {
               channel.setAttribute('class', 'payment-sprite channelMobile');
               channel.appendChild(document.createTextNode('Mobile'));
            } else {
               channel.setAttribute('class', 'payment-sprite channelWeb');
               channel.appendChild(document.createTextNode('Web'));
            }
            descriptionContent.appendChild(channel);
         } else {
            descriptionContent.appendChild(document.createTextNode(content));
         }
         
         if (title == 'Pay Date' && icon == 'RECURRING') {
            var recurring = document.createElement('div');
            recurring.setAttribute('class', 'payment-sprite recurringBox floatright');
            descriptionContent.appendChild(recurring);
         }

         detailContent.appendChild(descriptionTitle);
         detailContent.appendChild(descriptionContent);
         detailContent.appendChild(document.createElement('hr'));
      }
      
      buildRow('Requested On', r[position].requestedOn);
      buildRow('Pay Date', r[position].payDate, r[position].frequency);
      buildRow('Amount', '$' + r[position].amount);
      buildRow('From Account', r[position].payFrom);
      buildRow('Reference #', r[position].referenceNum);
      buildRow('Channel', r[position].channel);
      buildRow('Status', r[position].status);
      
      if (r[position].modify != 'false') {
         var modify = document.createElement('a');
         modify.setAttribute('class', 'button purple-button back mt20 mb10');
         modify.setAttribute('href', 'ModifyPayment.action?start=&selectedRefNumber=' + r[position].referenceNum);
         modify.onclick = function () {
            BCM.slide.forward();
            return false;
         };
         modify.appendChild(document.createTextNode('Modify payment'));
         detailContent.appendChild(modify);
      }
      
      if (r[position].cancel != 'false') {
         var cancel = document.createElement('a');
         cancel.setAttribute('class', 'button purple-button back mt10 mb20');
         cancel.setAttribute('href', 'ModifyPayment.action?cancelPayment=&selectedRefNumber=' + r[position].referenceNum);
         cancel.onclick = function () {
            BCM.slide.forward();
            return false;
         };
         cancel.appendChild(document.createTextNode('Cancel payment'));
         detailContent.appendChild(cancel);
      }
      
      BCM.slide.createFakePage('Payment details', true, document.getElementById('helpIconContent'), detailContent);
   }
};

var buildPendingTableRowEvents = function () {
   var detailDescriptions = document.getElementById('pendingBody').getElementsByClassName('detailRows');
   var detailDescriptionsAction = function () {
      buildPendingTable.createDetails(this.id);
   }

   for (var i = detailDescriptions.length; i--;) {
      BCM.addEvent(detailDescriptions[i], 'click', detailDescriptionsAction);
   }
};

var buildPastTableRowEvents = function () {
   var detailDescriptions = document.getElementById('pastBody').getElementsByClassName('detailRows');
   var detailDescriptionsAction = function () {
      buildPastTable.createDetails(this.id);
   }

   for (var i = detailDescriptions.length; i--;) {
      BCM.addEvent(detailDescriptions[i], 'click', detailDescriptionsAction);
   }
};
   
// RENDER TABLES
if (BCM.execute()) {
   var buildPendingTable = Object.create(buildHistoryTable);
   buildPendingTable.tableID = 'pendingBody';
   buildPendingTable.currentData = document.getElementById('tempPendingMobile').innerHTML;
   buildPendingTable.init('payDate', buildPendingTableRowEvents);

   var buildPastTable = Object.create(buildHistoryTable);
   buildPastTable.tableID = 'pastBody';
   buildPastTable.currentData = document.getElementById('tempPastMobile').innerHTML; 
   buildPastTable.init('payDate', buildPastTableRowEvents);
}

// SORT ARROWS
var sortArrows = function (className, element, currentSort) {
   var sortDirection = document.getElementsByClassName(className);
   for (var i = sortDirection.length; i--;) {
      sortDirection[i].innerHTML = '';
   }
   
   if (currentSort) {
      element.innerHTML = '&and;';
   } else {
      element.innerHTML = '&or;';
   }
};

// TABLE SORT LISTENERS
BCM.addEvent(document.getElementById('yui-dt0-th-payDate'), 'click', function () {
   buildPendingTable.init('payDate', buildPendingTableRowEvents);
   sortArrows('sortArrows', this.getElementsByTagName('span')[0], buildPendingTable.sortDescending.payDate);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt0-th-amount'), 'click', function () {
   buildPendingTable.init('amount', buildPendingTableRowEvents);
   sortArrows('sortArrows', this.getElementsByTagName('span')[0], buildPendingTable.sortDescending.amount);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt0-th-status'), 'click', function () {
   buildPendingTable.init('status', buildPendingTableRowEvents);
   sortArrows('sortArrows', this.getElementsByTagName('span')[0], buildPendingTable.sortDescending.status);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt1-th-payDate'), 'click', function () {
   buildPastTable.init('payDate', buildPastTableRowEvents);
   sortArrows('sortArrows1', this.getElementsByTagName('span')[0], buildPastTable.sortDescending.payDate);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt1-th-amount'), 'click', function () {
   buildPastTable.init('amount', buildPastTableRowEvents);
   sortArrows('sortArrows1', this.getElementsByTagName('span')[0], buildPastTable.sortDescending.amount);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt1-th-status'), 'click', function () {
   buildPastTable.init('status', buildPastTableRowEvents);
   sortArrows('sortArrows1', this.getElementsByTagName('span')[0], buildPastTable.sortDescending.status);
   return false; 
});