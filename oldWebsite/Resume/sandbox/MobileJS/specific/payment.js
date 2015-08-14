/* payment.jsp */
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function formatCurrency(num)
{
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();

    if (cents < 10)
        cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + num.substring(num.length - (4 * i + 3));

    //return (((sign) ? '' : '-') + '$' + num + '.' + cents);
    
    var returnVal = num + '.' + cents;
    
    if (returnVal == "0.00"){
        return "";
    }
    else
        return returnVal;
}

var amtBoxes = document.getElementsByClassName('howMuchSelectBox');
for(var i = amtBoxes.length; i--;) {
    amtBoxes[i].onclick = function () {
      if (!this.childNodes[1].checked) {
         var otherBoxes = document.getElementsByClassName('howMuchSelectBox');
         for (var i = 0, len = otherBoxes.length; i < len; i++) {
            BCM.removeClass(otherBoxes[i], 'selectBox-on');
         }
         
         BCM.removeClass(document.getElementById('otherAmount'), 'error');
         document.getElementById('otherAmount_inline').style.display = 'none';
         
         BCM.addClass(this, 'selectBox-on');
         this.childNodes[1].checked = true;
                  
         if (this.childNodes[1].getAttribute('id') == 'payAmountOther') {
            document.getElementById('otherAmount').focus();
         }
         
         if (this.getAttribute('id') != 'payAmountOther') {
            document.getElementById('otherAmount').value = '';
         }
      }
   };
}

var typeBoxes = document.getElementsByClassName('paymentSelectBox');
for(var i = typeBoxes.length; i--;) {
    if(typeBoxes[i].childNodes[1].classList.contains("error")){
        typeBoxes[i].childNodes[1].classList.remove("error");
        typeBoxes[i].parentNode.childNodes[1].classList.add("error");
    }
    
    typeBoxes[i].onclick = function () {
      if (!this.childNodes[1].checked) {
         var otherBoxes = document.getElementsByClassName('paymentSelectBox');
         for (var i = 0, len = otherBoxes.length; i < len; i++) {
            BCM.removeClass(otherBoxes[i], 'selectBox-on');
         }
        
         BCM.addClass(this, 'selectBox-on');
         this.childNodes[1].checked = true;
      }
   };
}

var amtButtons = document.getElementsByName('payAmountType');
for (var i = amtButtons.length; i--;) {
   amtButtons[i].onclick = function () {
      var otherBoxes = document.getElementsByClassName('howMuchSelectBox');
      for (var i = 0, len = otherBoxes.length; i < len; i++) {
         BCM.removeClass(otherBoxes[i], 'selectBox-on');
      }

      BCM.removeClass(document.getElementById('otherAmount'), 'error');
      document.getElementById('otherAmount_inline').style.display = 'none';

      BCM.addClass(this.parentNode, 'selectBox-on');
      this.checked = true;
      
      if (this.getAttribute('id') == 'payAmountOther') {
         document.getElementById('otherAmount').focus();
      }
      
      if (this.getAttribute('id') != 'payAmountOther') {
         document.getElementById('otherAmount').value = '';
      }
   };
}

var typeButtons = document.getElementsByName('modifyType');
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

// FORM SUBMIT ACTION
var paymentFormSubmit = function () {
   if (!BCM.slide.checkErrors()) {
      document.getElementById('otherAmount').type = 'text';
      BCM.slide.forward(document.getElementById('paymentForm'));
   }
   return false;
};
BCM.addEvent(document.getElementById('paymentForm'), 'submit', paymentFormSubmit);

// BLUE HELP ICON
var helpIconClick = function () {
   BCM.modal.init(document.getElementById('helpIconContent'), true);
};
BCM.addEvent(document.getElementById('helpIcon'), 'click', helpIconClick);

// OPEN CALENDAR WIDGET
var openCalendarWidget = function () {
   var cal = new YAHOO.widget.Calendar("payCalContent", {
      locale_weekdays: "1char", 
      hide_blank_weeks: true,
      minDate: new Date(document.getElementById("minAllowedScheduledPaymentDate").innerHTML),
      maxDate: new Date(document.getElementById("maxAllowedScheduledPaymentDate").innerHTML),
      selected: new Date(document.getElementById("minAllowedScheduledPaymentDate").innerHTML)
   });
   
   if (document.getElementById('calDueDate') && document.getElementById('calDueDate').innerHTML !== '') {
      var dueDate = document.getElementById('calDueDate').innerHTML;
      cal.addRenderer(dueDate, cal.renderCellStyleHighlight1);
   }
              
   document.getElementById('payCal').style.marginLeft = 0;
   cal.render();
   cal.show();
   
   var calCreateFooter = function () {
      var disclaimer = document.createElement('tr');
      disclaimer.setAttribute('class', 'caldisclaimer');
      var disclaimerCell = document.createElement('td');
      disclaimerCell.setAttribute('colspan', '7');
      disclaimerCell.appendChild(document.createTextNode('Payments cannot be posted after 7 p.m. ET.'));
      disclaimer.appendChild(disclaimerCell);
      document.getElementById('payCalContent').firstChild.getElementsByTagName('tbody')[0].appendChild(disclaimer);
   }
   calCreateFooter();
   
   var calPosition = function () {
      document.getElementById('payCalContent').firstChild.style.marginTop = '-' + (document.getElementById('payCalContent').firstChild.clientHeight + 5) + 'px';
   };
   calPosition();
   
   var handlePayDateSelection = function (type, args, obj) {
      var selectedDate = args[0][0][1] + "/" + args[0][0][2] + "/" + (args[0][0][0] % 100);
      document.getElementById('payCalDate').innerHTML = selectedDate;
      document.getElementById('otherDate').value = selectedDate;
      cal.hide();
      document.getElementById('payCal').style.marginLeft = '5px';
      
      BCM.addClass(document.getElementById('paySchedule'), 'selectBox-on');
      document.getElementById('paySchedule').checked = true;
   };
   cal.selectEvent.subscribe(handlePayDateSelection);
   
   var calChangePageEvent = function () {
      calCreateFooter();
      calPosition();
   };
   cal.changePageEvent.subscribe(calChangePageEvent);
   
   var calClose = function () {
      var e = window.event;
      var el = e.target;
      var elid = el.id;
      if (elid != 'payCalContent_t' && elid != 'payCal' && (document.getElementById('payCalContent') && !document.getElementById('payCalContent').contains(el))) {
         cal.hide();
         document.getElementById('payCal').style.marginLeft = '5px';
      }
   }
   document.documentElement.style.cursor = 'pointer';
   BCM.addEvent(document, 'click', calClose);
}
BCM.addEvent(document.getElementById('payCal'), 'click', openCalendarWidget);

var validateCents = function(e){
    var valDecimalLength, newValue;
    valDecimalLength = (e.value.substr(e.value.indexOf(".")+1)).length;

    if(valDecimalLength > 2){
        newValue = e.value.substr(0, (e.value.length) - 1);
        e.value = newValue;
    }          
}

var fixValue = function() {
   var origVal = this.value.replace(/^[^0-9\.]*$/g,'');
   var fixedVal = formatCurrency(origVal);
   //var fixedVal = parseFloat(origVal).toFixed(2);
   this.value = fixedVal.toString();
   if(fixedVal == "")
        this.setAttribute('placeholder', '0.00');
}
BCM.addEvent(document.getElementById('otherAmount'), 'blur', fixValue);

var fixLength = function () {
    var decimalPosition, dollarsLength, newValue;
    var origVal = this.value.replace(/^[^0-9\.]*$/g,'');
    
    decimalPosition = origVal.indexOf(".");
    
    if (origVal.length >= 9) {
        if(decimalPosition == -1){
          //this.value = formatCurrency(this.value);
          newValue = parseFloat(origVal.substr(0, 9)).toFixed(2);
          this.value = newValue.toString();
        }
    }
    
    if(decimalPosition != -1){
        dollarsLength = origVal.substr(0, (decimalPosition)).length;
        if(dollarsLength > 9){
            newValue = origVal.substr(0, decimalPosition - 1) + origVal.substr(decimalPosition)
            this.value = newValue.toString();
        }
        validateCents(this);
    }
    
};
BCM.addEvent(document.getElementById('otherAmount'), 'keyup', fixLength);

var callAddBank = function () {
    if (document.getElementById('paymentForm')) {
        this.href = "javascript:";
        var paymentForm = document.getElementById('paymentForm');
        paymentForm.action += "&addBank";
        BCM.slide.forward(paymentForm);
        paymentForm.submit();
    }
}
BCM.addEvent(document.getElementById('addBank'), 'click', callAddBank);

var mvdIconClick = function () {
    MVD.mvdPanel.init(document.getElementById('panel_mvdDate'));
};
BCM.addEvent(document.getElementById('mvdDate'), 'click', mvdIconClick);
