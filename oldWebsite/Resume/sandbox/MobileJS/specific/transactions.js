/* transactions.jsp */

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// BUILD TABLE CONTENT
var buildActivityTable = {
   activityUrl: 'activity?viewPostedTransactionsJson=&cycleDate=',
   
   currentData: '',
   
   sortDescending: {
      description: false,
      transactionDate: false,
      amount: true
   },
      
   init: function (responseText, sort) {
      BCM.slide.clearNodes('activityBody');
      
      this.currentData = responseText;
      var r = JSON.parse(this.currentData); 

      switch (sort) {
         case 'description':
            this.sortDescending.description = (this.sortDescending.description == true) ? false : true;
            BCM.sort.alpha(r, sort, this.sortDescending.description);
            break;
         case 'transactionDate':
            this.sortDescending.transactionDate = (this.sortDescending.transactionDate == true) ? false : true
            BCM.sort.date(r, sort, this.sortDescending.transactionDate);
            break;
         case 'amount.amount':
            this.sortDescending.amount = (this.sortDescending.amount == true) ? false : true;
            BCM.sort.numeric(r, sort, this.sortDescending.amount);
            break;
         default:
            BCM.sort.date(r, 'transactionDate', false);
      }
      
      this.currentData = JSON.stringify(r);      
      var tbody = document.getElementById('activityBody');

      if (r.length === 0) {
         var tr = document.createElement('tr');
         var td = document.createElement('td');
         td.setAttribute('colspan', '3');
         td.setAttribute('class', 'center');
         td.appendChild(document.createTextNode('No activity for this statement period.'));
         tr.appendChild(td);
         tbody.appendChild(tr);
      } else {
         for (var i = 0, len = r.length; i < len; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('id', 'detailRow-' + i);
            tr.setAttribute('class', 'detailRows');

            var dateCol = document.createElement('td');
            dateCol.setAttribute('class', 'yui-dt0-col-transactionDate');
            dateCol.appendChild(document.createTextNode(r[i].transactionDate.slice(0, -3)));
            tr.appendChild(dateCol);

            var descCol = document.createElement('td');
            descCol.setAttribute('class', 'yui-dt0-col-description detailDescription');
            var descColDiv = document.createElement('div');
            descColDiv.appendChild(document.createTextNode(r[i].description));
            descCol.appendChild(descColDiv);
            tr.appendChild(descCol);
                        
            var amtCol = document.createElement('td');
            amtCol.setAttribute('class', 'yui-dt0-col-purchaseamount');
            
            var prefix = '$';
            if (r[i].type == 'CREDIT') {
               prefix = '-$';
            }
                        
            amtCol.appendChild(document.createTextNode(prefix + r[i].amount.amount.toFixed(2)));
            tr.appendChild(amtCol);

            tbody.appendChild(tr);
         }
         
         var detailDescriptions = document.getElementsByClassName('detailRows');
         var detailDescriptionsAction = function () {
            buildActivityTable.createDetails(this.id);
         }
         
         for (var i = detailDescriptions.length; i--;) {
            BCM.addEvent(detailDescriptions[i], 'click', detailDescriptionsAction);
         }
      }
   },
   
   createDetails: function (position) {
      var r = JSON.parse(buildActivityTable.currentData);
      var position = position.replace('detailRow-', '');

      var detailContent = document.createElement('div');
      detailContent.setAttribute('class', 'w100p');
      
      var buildRow = function (title, content) {
         var descriptionTitle = document.createElement('div');
         descriptionTitle.setAttribute('class', 'w40p mFloatleft f8 uppercase pb10');
         descriptionTitle.innerHTML = title;

         var descriptionContent = document.createElement('div');
         descriptionContent.setAttribute('class', 'w60p mFloatleft pb10');
         descriptionContent.innerHTML = content;

         detailContent.appendChild(descriptionTitle);
         detailContent.appendChild(descriptionContent);
         detailContent.appendChild(document.createElement('hr'));
      }
      
      buildRow('Description', r[position].description);
      
      var prefix = '$';
      if (r[position].type == 'CREDIT') {
         prefix = '-$';
      }
      
      buildRow('Amount', prefix + r[position].amount.amount.toFixed(2));
      
      buildRow('Transaction Date', r[position].transactionDate);
      
      if (r[position].postedDate && r[position].postedDate != '') {
         buildRow('Posted Date', r[position].postedDate);
      }
      
      if (r[position].merchantPhoneNumber && r[position].merchantPhoneNumber != '') {
         buildRow('Merchant Phone Number', '<a href="tel:' + r[position].merchantPhoneNumber + '">' + r[position].merchantPhoneNumber + '</a>');
      }
      if (r[position].merchantCategory && r[position].merchantCategory != '') {
         buildRow('Merchant Category', r[position].merchantCategory);
      }
      
      
      BCM.slide.createFakePage('Details', true, document.getElementById('helpIconContent'), detailContent);
   }
};

// MAKE AJAX CALL AND RENDER TABLE
var renderTable = function (sort) {
   if (activityTabChange.activeTab == false) {
      var callback = function (responseText) {
         buildActivityTable.init(responseText, sort);
      };
      BCM.ajax.get(buildActivityTable.activityUrl, callback);
   } else {
      buildActivityTable.init(document.getElementById('tempAuthsMobile').innerHTML, sort);
   }
};

// SELECT MENU ACTIONS
var billCycleSelectChange = function () {
   buildActivityTable.activityUrl = 'activity?viewPostedTransactionsJson=&cycleDate=' + this.value;
   renderTable();
   return false;
};
BCM.addEvent(document.getElementById('billCycleSelect'), 'change', billCycleSelectChange);

// TAB ACTIONS
var activityTabChange = {
   activeTab: false,
   
   init: function () {
      if (activityTabChange.activeTab) {
         BCM.removeClass(document.getElementById('transactionsTab2'), 'selected');
         BCM.addClass(document.getElementById('transactionsTab1'), 'selected');
         BCM.removeClass(document.getElementById('billCycleSelect'), 'mHide');      
         activityTabChange.activeTab = false;
         BCM.slide.clearNodes('activityBody');
      } else {
         BCM.removeClass(document.getElementById('transactionsTab1'), 'selected');
         BCM.addClass(document.getElementById('transactionsTab2'), 'selected');
         BCM.addClass(document.getElementById('billCycleSelect'), 'mHide');
         activityTabChange.activeTab = true;
         BCM.slide.clearNodes('activityBody');
      }
      
      renderTable();
   }
};
BCM.addEvent(document.getElementById('transactionsTab1'), 'click', activityTabChange.init);
BCM.addEvent(document.getElementById('transactionsTab2'), 'click', activityTabChange.init);

// FILL TABLE ONLOAD
if (BCM.execute()) {
   renderTable();
}

// SORT ARROWS
var sortArrows = function (element, currentSort) {
   var sortDirection = document.getElementsByClassName('sortDirection');
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
BCM.addEvent(document.getElementById('yui-dt0-th-transactionDate'), 'click', function () {
   buildActivityTable.init(buildActivityTable.currentData, 'transactionDate');
   sortArrows(this.getElementsByTagName('span')[0], buildActivityTable.sortDescending.transactionDate);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt0-th-description'), 'click', function () {
   buildActivityTable.init(buildActivityTable.currentData, 'description');
   sortArrows(this.getElementsByTagName('span')[0], buildActivityTable.sortDescending.description);
   return false; 
});

BCM.addEvent(document.getElementById('yui-dt0-th-purchaseamount'), 'click', function () { 
   buildActivityTable.init(buildActivityTable.currentData, 'amount.amount');
   sortArrows(this.getElementsByTagName('span')[0], buildActivityTable.sortDescending.amount);
   return false;
});