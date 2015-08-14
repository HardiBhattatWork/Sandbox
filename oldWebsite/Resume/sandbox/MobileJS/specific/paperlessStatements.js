/* paperlessStatementsComponent.jsp */

if (document.getElementById('eBill')){
    var seeDetails = document.getElementById('seeDetails');
    var disclosures = document.getElementById('disclosures');
    var eBill = document.getElementById('eBill');
    var eBillTitle = document.getElementsByClassName('eBillOverlay');

    eBill.className = "mHide";
    eBillTitle[0].className = "eBillOverlay mHide";
    disclosures.className = "mHide";
    seeDetails.innerHTML += " +"
    seeDetails.style.color = "#54558e";

    var vdToggle = function() {
        if (disclosures.classList.contains("mHide")) {
            disclosures.className = "mShow";
            eBill.className = "mShow";
            eBillTitle[0].className = "eBillOverlay mShow";
            seeDetails.innerHTML = "View disclosures -"
        }
        else {
            disclosures.className = "mHide";
            eBill.className = "mHide";
            eBillTitle[0].className = "eBillOverlay mHide";
            seeDetails.innerHTML = "View disclosures +"
        }
    };
    BCM.addEvent(seeDetails, 'click', vdToggle);
    
    
}
else {
    var seeDetails = document.getElementById('seeDetails');
    var disclosures = document.getElementById('disclosures');
    
    if (disclosures && seeDetails){
        disclosures.className = "mHide";
        seeDetails.innerHTML += " +"
        seeDetails.style.color = "#54558e";

        var vdToggle = function() {
            if (disclosures.classList.contains("mHide")) {
                disclosures.className = "mShow";
                seeDetails.innerHTML = "View disclosures -"
            }
            else {
                disclosures.className = "mHide";
                seeDetails.innerHTML = "View disclosures +"
            }
        };
        BCM.addEvent(seeDetails, 'click', vdToggle);
    }
}

    

