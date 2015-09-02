/* addAuthorizedUser.js */

var cardRequested = document.getElementById('cardRequested');
var sendCardRequested = document.getElementById('sendCardRequested');
var sendCardNotRequested = document.getElementById('sendCardNotRequested');
sendCardRequested.style.display = "block";
sendCardNotRequested.style.display = "none";
cardRequested.checked = true;
cardRequested.onchange = function() {
    if (this.checked == true) {
        sendCardRequested.style.display = "block";
        sendCardNotRequested.style.display = "none";
    }
    else {
        sendCardRequested.style.display = "none";
        sendCardNotRequested.style.display = "block";
    }
}


