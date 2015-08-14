/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var nicknameTip = document.getElementById('nickname_Tip');
var nickname = document.getElementById('nickname');
var nicknameError = document.getElementById('nickname_Error');
//show nicknameTip onload
nicknameTip.className = 'mBlock';

//add non-breaking space to start of each sentence on error
//this is due to fact that there are no spaces but breaks in EMWE version
function addSpace(tag) {          
         var wordArray = tag.textContent.split(".");          
         var finalTitle = "";
          
         for (i=0;i<=wordArray.length-1;i++) {
            console.log(wordArray[i]);
            finalTitle += wordArray[i];
            if (i == (wordArray.length-2)) {
                finalTitle += "";
            }else { 
                finalTitle += ". ";
            }
          }
          tag.textContent = finalTitle;
      };

function addErrorText() {
    //Enter custom text if it does not exist in document
    if (!document.getElementById('frontEndError')) {
        var frontEndErrorText = 'Please enter a nickname. ';
        var frontEndErrorSpan = document.createElement("span");
        frontEndErrorSpan.innerHTML = frontEndErrorText;
        frontEndErrorSpan.id = 'frontEndError';
        nicknameTip.insertBefore(frontEndErrorSpan, nicknameTip.firstChild);
    }
}

nickname.onblur = function() {  
  var hasError = 'error';
  if (this.classList.contains(hasError) && nicknameError.innerHTML == '' ){ 
    nicknameTip.style.display = "block";
    nicknameTip.style.color = '#f33';
    nicknameTip.className = 'mBlock';
        addErrorText();        
  }else if (nicknameError.innerHTML != ''){
    nicknameTip.style.display = "none";
        nicknameError.className = "error";
        //addSpace(nicknameError);
  }else{
    nicknameTip.style.display = "block";
    nicknameTip.style.color = '#333';
    nicknameTip.style.display = 'mBlock';
    if(document.getElementById('frontEndError')){
        var frontEndError = document.getElementById('frontEndError');
        nicknameTip.removeChild(frontEndError);
    }
  }
};

//clear nicknameTip when page loads and error exists
function clearNicknameTip () {
        if (nicknameError.innerHTML !== '') {
            nicknameTip.style.display = "none";
            if (nicknameError.childNodes[1]){
                nicknameError.firstChild.style.display ="none";
                //add spacing to second child of nicknameError container
                addSpace(nicknameError.childNodes[1]);
            }else{
               addSpace(nicknameError);
        }
        }
};

window.onload = clearNicknameTip();

