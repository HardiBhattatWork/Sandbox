/* 
 * Account Settings Alerts js file
 */
//
//create array of tag type that may contain string
function getElementsByIdStartsWith(selectorTag, prefix) {
    var items = [];
    var myPosts = document.getElementsByTagName(selectorTag);
    for (var i = 0; i < myPosts.length; i++) {
        //omitting undefined null check for brevity
        if (myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(myPosts[i]);
        }
    }
    return items;
}

//show tipVar onload
//tipVar.className = 'mBlock';
window.onload = function() {    
    var inputVar = getElementsByIdStartsWith("input",'textVariable' );
    var tipVar = document.getElementsByClassName("toolTip") || document.getElementsByClassName("tool mBlock");
    var errorVar = document.getElementsByClassName("error" );
    if (inputVar[0] != undefined){
        inputVar[0].onblur = function() {  
          var hasError = 'error';
          if (this.classList.contains(hasError) ){           
            tipVar[0].style.display = "block";
            tipVar[0].style.color = '#f33';
            tipVar[0].className = 'toolTip mBlock';
                //addErrorText();        
          }else if (errorVar[0].innerHTML != ''){

            tipVar[0].style.display = "none";
                errorVar[0].className = "error";            
          }else{          
            tipVar[0].className = "toolTip";
            tipVar[0].style.color = '#333';
            tipVar[0].style.display = 'block';
            if(document.getElementById('frontEndError')){
                var frontEndError = document.getElementById('frontEndError');
                tipVar[0].removeChild(frontEndError);
            }
          }
        };
    };
};
