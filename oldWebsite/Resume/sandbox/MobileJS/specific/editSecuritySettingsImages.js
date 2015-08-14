/* editSecuritySettingsImages.js */

//Set BCM namespace
BCM.namespace = function() {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = ("" + a[i]).split(".");
        o = BCM;
        for (j = (d[0] == "BCM") ? 1 : 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

//Setup a namespace to contain your own code within the BCM namespace
BCM.namespace("passmark");
var carousel = null;
var curpos, items = [];
var resultsArray = [];
BCM.passmark.counter = 0;
BCM.passmark.currentPage = document.getElementById('currentPage');
BCM.passmark.page = Math.ceil(BCM.passmark.counter);  

function getCallback(arg1_cat, arg2_start, arg3_end) {
    var carousel = this,
            counter = 0;
    curpos = arg2_start;
    var callback = function(responseText) {
        resultsArray = JSON.parse(responseText);
        //load first set of images
        getImages(resultsArray, counter);
        BCM.paginator.page = BCM.passmark.counter / 6 + 1;
        BCM.paginator.pagesTotal = getPageTotal(resultsArray.length);
        BCM.passmark.currentPage.innerText = BCM.paginator.pageReportTemplate();
    };

    BCM.ajax.get("login?getPassmarkImages=getPassmarkImages&from=" + arg2_start + "&to=" + arg3_end + "&category=" + arg1_cat, callback);
}

//get total number of pages
function getPageTotal(i) {
    var numPages = Math.ceil(i / 6);
    return numPages;
};

if (document.getElementById('nextLink')) {
    var nextLink = document.getElementById('nextLink');
    nextLink.onclick = function() {
        if (getPageTotal(resultsArray.length) <= (BCM.passmark.counter/6 + 1)) {
            return false;
        } else {
            var counter = BCM.passmark.counter + 6;
            BCM.passmark.counter = counter;
            BCM.paginator.page = BCM.passmark.counter / 6 + 1;
            BCM.paginator.pagesTotal = getPageTotal(resultsArray.length);

            getImages(resultsArray, counter);
            BCM.passmark.currentPage.innerText = BCM.paginator.pageReportTemplate();
            return false;
        }
    };
};

if (document.getElementById('previousLink')) {
    var previousLink = document.getElementById('previousLink');
    previousLink.onclick = function() {
        var counter = BCM.passmark.counter;
        if (0 >= counter / 6) {
            return false;
        } else {
            counter = BCM.passmark.counter - 6;
            BCM.passmark.counter = counter;
            BCM.paginator.page = BCM.passmark.counter / 6 + 1;

            getImages(resultsArray, counter);
            BCM.passmark.currentPage.innerText = BCM.paginator.pageReportTemplate();
            return false;
        }
    };
};

   
BCM.changeImage = function(thisImage) {        
    var passmarkImage = document.getElementById('passmarkImage') || document.createElement("input");
    passmarkImage.value = thisImage.src;    
    top.BCM.storeImage = passmarkImage.value;
    //add class for selected image
    if (passmarkImage.value != undefined && passmarkImage.value !=""){
        var imgArray = document.getElementsByTagName('img'); 
       //console.log(imgArray);
        for (i=0; i < imgArray.length; i++){
            if (imgArray[i].className == 'rsaImage item-selected') {
                imgArray[i].className = 'rsaImage'; 
            }
        }        
        thisImage.className += ' item-selected';       
    };
};


BCM.paginator = {
    containers: "pagination",
    page: BCM.passmark.page,
    pagesTotal: getPageTotal(resultsArray.length),
    totalRecords: endNum,
    pageReportTemplate: function() {
        return "Page " + this.page + " of " + this.pagesTotal;
    },
    arrowHide: function(j) {
        console.log(j/6 + " " + this.pagesTotal);
        if (j <= 0) {
            previousLink.style.visibility="hidden";
        }
        else {
            previousLink.style.visibility="visible";
        }
        if (j/6 + 1 >= this.pagesTotal && j/6 != 0) {
            nextLink.style.visibility="hidden";
        }
        else {
            nextLink.style.visibility="visible";
        }
    }
};

function getImages(resultsArray, j) {
    BCM.paginator.arrowHide(j)
    var counter = 1;
    var imageContainer = document.getElementById('imageContainer');
    //array containing next images set for preloading
    var nextImgSet = [];
    //array containing all images with class rsaImage
    var imageClassArray = imageContainer.getElementsByClassName('rsaImage');
    var numImages = imageClassArray.length;
    for (i = 0; i < numImages; i++) {
        //add spinner
        var opts = {lines: 13, length: 5, width: 2, radius: 5, rotate: 0, color: '#333', speed: 1, trail: 60, shadow: false, hwaccel: false, className: 'spinner', zIndex: 2e9, top: 40, left: 40};
        var spinner = new Spinner(opts).spin(imageClassArray[i].parentNode);
        imageClassArray[i].src = resultsArray[i + j];
        nextImgSet.push(resultsArray[i + j + 6]);
        //check if images have loaded and 
        
        //remove selected class
        imageClassArray[i].className = 'rsaImage';

        imageClassArray[i].onload = function() {          
            var previous = this.previousSibling;
            previous.parentNode.removeChild(previous);
            if (counter >= 6) {
                //preload imags once this present set has loaded
                preloadImages(nextImgSet);
            }
            counter++; 
        };
        
        imageClassArray[i].onclick = function() {             
             BCM.changeImage(this);
        };
    };
}


function preloadImages(nextImgSet) {
    var images = [];
    for (i = 0; i < nextImgSet.length; i++) {
        images[i] = new Image();
        images[i].src = nextImgSet[i];
    }
}



BCM.passmark.Carousel = {
    carousel: {},
    init: function(arg1_size, arg3_cat, arg3_start, arg4_end, maxPage)
    {
        getCallback.call(carousel, arg3_cat, arg3_start, arg4_end);
    }

}

if(document.getElementById('imageCategory')) {
    var imageCategory = document.getElementById('imageCategory');
    var oMenuCat = "All Images";
    var startNum = 0;
    var endNum = 1200;
    var maxPage = 2;
    var menuSize = 4;
    BCM.passmark.Carousel.init(menuSize, oMenuCat, startNum, endNum, maxPage);
    imageCategory.onchange = function() {
        if (this.value == 'All Images') {
            endNum = 1200;
            BCM.passmark.counter = 0;
            BCM.paginator.page = 1;
            BCM.paginator.pagesTotal = 100;
        }
        else {
            endNum = 108;
            BCM.passmark.counter = 0;
            BCM.paginator.page = 1;
            BCM.paginator.pagesTotal = 18;
        }
        getCallback(this.value, startNum, endNum, maxPage);
    }


}

//update passmarkImage with image selected in editSecuritySettingsImages for mobile after cancel
if(document.getElementById('passmarkImage')) {
    var cancelButton = document.getElementById('cancelLink');
    cancelButton.onclick = function() {
          if (top.BCM.storeImage) {
            top.BCM.storeImage = undefined;
           }  
   };
}

//Hide field level error when back end validation is shown

var securityPhrase_Error = document.getElementById('securityPhrase_Error');
var securityPhrase = document.getElementById('securityPhrase');
securityPhrase.onblur = function(){
    securityPhrase_Error.style.display = 'none';
}