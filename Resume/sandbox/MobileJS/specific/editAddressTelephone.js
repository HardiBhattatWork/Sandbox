/* editAddresstelephone.js */


var addressTeleFormSubmit = function() {
    if (!BCM.slide.checkErrors()) {

        BCM.slide.forward(document.getElementById('addressTeleForm'));
    }
    return false;
};
BCM.addEvent(document.getElementById('addressTeleForm'), 'submit', addressTeleFormSubmit);

//placeholder functions for the following input text boxes
var streetAddress = document.getElementById('streetAddress');
var streetAddress2 = document.getElementById('streetAddress2');

    if (streetAddress.value === '') {
        streetAddress.placeholder = 'Street';
    }
    if (streetAddress2.value === '') {
        streetAddress2.placeholder = 'Apt#';
    }

streetAddress.onblur = streetAddress2.onblur = function() {
    if (streetAddress.value === '') {
        streetAddress.placeholder = 'Street';
    }
    if (streetAddress2.value === '') {
        streetAddress2.placeholder = 'Apt#';
    }
};

//Front End error validation for primary phone # fields
var primaryPhoneAreaCode = document.getElementById('primaryPhoneAreaCode');
var primaryPhoneNo1 = document.getElementById('primaryPhoneNo1');
var primaryPhoneNo2 = document.getElementById('primaryPhoneNo2');
var mobileErrors = document.getElementById('mobileErrors');

function errorClassCheck(theId) {
    var hasError = 'error';
    for (i = 0; i < theId.length; i++) {
        //console.log(theId[i]);
        if (theId[i].classList.contains(hasError) && checkValues() != true) {
             console.log('hi');
            setTimeout(function() {                 
                mobileErrors.innerHTML = "Please enter a valid telephone number.";
            }, 200);
        }else if(checkValues() == true)
        {
            console.log('hi');
            setTimeout(function() { 
             mobileErrors.innerHTML = "Required for account correspondence.";
             }, 500);
        }else{        
            mobileErrors.innerHTML = '';
        }

    };
};
    
primaryPhoneAreaCode.onblur = primaryPhoneNo1.onblur = primaryPhoneNo2.onblur =
        function() {
            var elementArray = [primaryPhoneAreaCode,primaryPhoneNo1,primaryPhoneNo2]
            switch (this.id)
            {
                case 'primaryPhoneAreaCode':
                    errorClassCheck(elementArray);
                    break;
                case 'primaryPhoneNo1':
                    errorClassCheck(elementArray);
                    break;
                case 'primaryPhoneNo2':
                    errorClassCheck(elementArray);
                    break;

            }
        };

//check and see if all tree phone input boxes are empty
function checkValues() {
    if(primaryPhoneAreaCode.value == '' && primaryPhoneNo1.value == '' && primaryPhoneNo2.value == ''){
        return true;
    }
    return false;
}