/*
 * Copyright (c) 2009 BarclaycardUS
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of BarclaycardUS.
 * ("Confidential Information").
 */



/*
 * RightNow function for faq links
 */

function parseDomain(targetDoc, targetDomain, redirectTop) {
    if(!targetDomain) {
        targetDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    }

    var targetUrl = targetDomain + targetDoc;
    document.location = targetUrl;

}


/* Javascript constants definitions /*
 *
 */

//test for BCUS
var BCUS = BCUS || {};

BCUS.Constants = {};

BCUS.Constants.Password = (function() {
    return {
        PWD_REGEX:/^(((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))|((?=.*\d)(?=.*[a-z])(?=.*[!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~]))|((?=.*\d)(?=.*[A-Z])(?=.*[!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~])))(?!=.*[\\~`_\\|\\{\\}])[a-zA-Z0-9!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~]{8,30}$/        
    };
}() );
/*
 *
 * This software is wholly based on the work of Yahoo! Inc.
 *
 * Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * version: 2.7.0
 */

if (typeof BCUS == "undefined" || !BCUS) {
   /**
    * The BCUS global namespace object.  If BCUS is already defined, the
    * existing BCUS object will not be overwritten so that defined
    * namespaces are preserved.
    * @class BCUS
    * @static
    */
   var BCUS = {};
}

/**
 * Returns the namespace specified and creates it if it doesn't exist
 * <pre>
 * BCUS.namespace("property.package");
 * BCUS.namespace("YAHOO.property.package");
 * </pre>
 * Either of the above would create BCUS.property, then
 * BCUS.property.package
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * BCUS.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * For implementation code that uses YUI, do not create your components
 * in the namespaces created by the library.  defined by YUI -- create
 * your own, e.g., BCUS.util, BCUS.widget, BCUS.lang, BCUS.env)
 *
 * @method namespace
 * @static
 * @param  {String*} arguments 1-n namespaces to create
 * @return {Object}  A reference to the last namespace object created
 */


BCUS.namespace = function() {
   var a=arguments, o=null, i, j, d;
   for (i=0; i<a.length; i=i+1) {
      d=(""+a[i]).split(".");
      o=BCUS;
      for (j=(d[0] == "BCUS") ? 1 : 0; j<d.length; j=j+1) {
         o[d[j]]=o[d[j]] || {};
         o=o[d[j]];
      }
   }
   return o;
};

/**
 * Provides an object focused function to pop open a new window.
 *
 * Built to support the following "legacy" NewWindow function
 *
 * <pre>function NewWindow(mypage, myname, w, h, scroll, toolbar, resize) {
 *      newwinprops = 'height='+h+',width='+w+',scrollbars='+scroll+',toolbar='+toolbar+',resizable='+resize+',menubar,status';
 *      newWin = window.open(mypage, myname,newwinprops)
 *  }</pre>
 *
 *  @method popwin
 *  @static
 *  @param {String*}  the URL to display in the new window. blank if omitted
 *  @param {String*}  the name of the new window. If window by the name already exists, popwin will not create a new window and cfg in ignored
 *  @param {Object*}  an anonymous object, or previously set object, that defines features of a window. If omitted, a default feature set is provided.
 */

BCUS.popwin = function() {
   var pop = window, features = [], a = arguments;
   var path,winname,cfg,feature;
   var config = {
      width:"640",
      height:"480",
      scrollbars:true,
      toolbars:true,
      resizable:true,
      menubar:true,
      status:true,
      location:true
   };

   if(a.length == 0 || !a) {
      path="";
      winname="pop";
      cfg=config;
   }

   if(a.length == 1) {
      if( typeof a[0] == "object") {
         path = "";
         winname= "pop";
         cfg=a[0];
      } else {
         path = a[0];
         winname="pop";
         cfg=config;
      }
   }

   if(a.length == 2) {
      if( typeof a[1] == "object") {
         path = a[0];
         winname= "pop";
         cfg=a[1];
      } else if (typeof a[1] == "string") {
         path = a[0];
         winname= a[1];
         cfg=config;
      }
   }

   if(a.length == 3) {
      path = a[0];
      winname= a[1];
      cfg=a[2];
   }

   for (feature in config) {
      if(config.hasOwnProperty(feature)) {
         switch(feature) {
            case "width":
               config[feature] = cfg[feature] || config[feature];
               break;
            case "height":
               config[feature] = cfg[feature] || config[feature];
               break;
            case "scrollbars":
               config[feature] = ((cfg[feature])? "yes": "no");
               break;
            case "toolbars":
               config[feature] = ((cfg[feature])? "yes": "no");
               break;
            case "resizable":
               config[feature] = ((cfg[feature])? "yes": "no");
               break;
            case "menubar":
               config[feature] = ((cfg[feature])? "yes": "no");
               break;
            case "status":
               config[feature] = ((cfg[feature])? "yes": "no");
               break;
         }
      }
      features.push(feature + "=" + config[feature]);
   }

   features.join(",");

   return pop.open(path,winname,features);
};


/**
 * Provides a utility function to set the active tab of a tabview by parsing
 * the URL of the current document for a "hash" (#).
 *
 * The value of the hash is match properties of tabs in the tabview, then the
 * tab is made the active tab.
 *
 * @method setActiveTabByHash
 * @static
 * @param  {String}
 * @param  {String}
 */

BCUS.setActiveTabByHash = function(tabview,hash) {
   if(typeof YAHOO == "undefined" || !YAHOO ) {
   // BAIL
   } else {
      if(tabview) {
         var url = hash.split('#');
         if (url[1]) {
            //We have a hash
            var tabHash = url[1];
            var tabs = tabview.get('tabs');
            for (var i = 0; i < tabs.length; i++) {
               if (tabs[i].get('href') == '#' + tabHash) {
                  tabview.set('activeIndex', i);
                  break;
               }
            }
         }
      }
   }
};

//Stores the original heights of collapsible elements so they may be restored in animation.
BCUS.offerHeights = [];
/**
 * Utility method that will "open" a collapsed element.
 *
 * TODO: allow an HTMLElement and the Easing method to be provided
 *
 * @method expandElement
 * @static
 * @param  {String} a String reference to an HTML element by id
 */

BCUS.expandElement = function(el) {
   if(typeof YAHOO == "undefined" || !YAHOO ) {
      return false;
   } else {
      YAHOO.util.Dom.setStyle(el, "height", "auto");
      YAHOO.util.Dom.setStyle(el, "visibility", "visible");
      var anim = new YAHOO.util.Anim(el, {
         height: {from: 0, to: el.scrollHeight}
      }, .3, YAHOO.util.Easing.easeIn);
      return anim;
   }
};

//Special case for rewards Details page, doesn't look right with regular expand element, for some reason
BCUS.expandElementModified = function(el) {
   if(typeof YAHOO == "undefined" || !YAHOO ) {
      return false;
   } else {
     // YAHOO.util.Dom.setStyle(el, "height", "auto");
      YAHOO.util.Dom.setStyle(el, "visibility", "visible");
      var anim = new YAHOO.util.Anim(el, {
         height: {from: 0, to: el.scrollHeight}
      }, .3, YAHOO.util.Easing.easeIn);
      return anim;
   }
};

/**
 * Utility method that will "collapse" an open element.
 *
 * TODO: allow an HTMLElement and the Easing method to be provided
 *
 * @method expandElement
 * @static
 * @param  {String} a String reference to an HTML element by id
 */

BCUS.collapseElement = function(el) {
   if(typeof YAHOO == "undefined" || !YAHOO ) {
      return false;
   } else {
      YAHOO.util.Dom.setStyle(el, "visibility", "hidden");
      var anim = new YAHOO.util.Anim(el, {
         height: {from: el.scrollHeight, to: 0}
      }, .5, YAHOO.util.Easing.easeOut);
      return anim;
   }
};


//as above, but for specifically the balance transfer elements.
BCUS.expandBTElement = function(el) {
   if(typeof YAHOO == "undefined" || !YAHOO ) {
      return false;
   } else {
      var elName = typeof(el) == "string" ? el : el.id;
      //YAHOO.util.Dom.setStyle(el, "height", "auto");
      //YAHOO.util.Dom.setStyle(el, "visibility", "visible");
      var anim = new YAHOO.util.Anim(el, {
         height: {from: 0, to: BCUS.offerHeights[elName]}
      }, .5, YAHOO.util.Easing.easeIn);
      return anim;
   }
};

BCUS.collapseBTElement = function(el) {
   if(typeof YAHOO == "undefined" || !YAHOO ) {
      return false;
   } else {
      var elName = typeof(el) == "string" ? el : el.id;
      BCUS.offerHeights[elName] = YAHOO.util.Dom.get(el).scrollHeight;
     // YAHOO.util.Dom.setStyle(el, "visibility", "hidden");
      var anim = new YAHOO.util.Anim(el, {
         height: {from: el.scrollHeight, to: 0}
      }, .5, YAHOO.util.Easing.easeOut);
      return anim;
   }
};

/**
 *  An email regex. Very tight.
 *  Alphanum, RFC822 characters, @-sign, alphanums dashes and dots,
 *  a 2-4 letter suffix, no more no less, case insensitive
 */
BCUS.emailRegex = /^[a-z0-9][^\(\)\<\>\@\,\;\:\\\"\[\]]*\@[a-z0-9][a-z0-9\-\.]*\.[a-z]{2,4}$/i;

/**
 *  A POBOX regex
 *  @returns boolean
 */
BCUS.isPOBox = function() {
   var re = /(^[\d\s]*p\.\s*[o0]\.([\s\d]+[\d\w\s\.]*)?$)|(^p[o0](b[o0])?([\s\d]+[\d\w\s\.]*)?$)|(^[\d\s]*p\s*[o0]\s*b\s*[o0]?\s*x([\s\d]+[\d\w\s\.]*)?$)|(^[\d\s]*p[o0](st(al)?)?\s*([o0]ffice(b[o0]x)?|bb?[o0]x|drawer)([\s\d]+[\d\w\s\.]*)?$)|(^[\d\s]*[o0]ffice\s*p[o0]st(al)?([\s\d]+[\d\w\s\.]*)?$)|(^[\d\s]*(p[o0]bx|pb[o0]x|p\s+b[o0]x|pbx|p\s+b|p\s+[0o]|p[o0]b|b[o0]x|drawer)([\s\d]+[\d\w\s\.]*)?$)|(^[\d\s]*b[o0]x\s+p\s*[o0](st(al)?)?\s*([o0]ffice)?([\s\d]+[\d\w\s\.]*)?$)/i;
   var a = arguments, retv = false;
   if(a) {
      var o = a[0];
      o = o.replace(/[\\.,:;']/g, "");
      o = o.replace(/[_]/g," ");
      retv = re.test(o);
   }

   return retv;
};

BCUS.addComma = function(input) {
      input += '';
      var x = input.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
               x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
};

BCUS.validate = {
   // HTML5 data-attributes (incl. maxlength) for validations
   VALIDATION_KEYS:[
   "data-required",
   "data-mask",
   "data-match",
   "data-minlength",
   "data-maxlength",
   "maxlength",
   "data-password",
   "data-minAllowed",
   "data-maxAllowed",
   "data-earliestDate",
   "data-latestDate",
   "data-noSoonerThan",
   "data-noLaterThan"
   ],
   ERROR_VALUE_TOO_SHORT:"valueTooShort",
   ERROR_VALUE_TOO_LONG:"valueTooLong",
   ERROR_MISMATCH:"mismatch",
   ERROR_VALUE_DOES_NOT_MATCH:"valueDoesNotMatch",
   ERROR_VALUE_NOT_PRESENT:"valueNotPresent",
   ERROR_VALUE_DOES_NOT_MEET_CRITERIA:"valueDoesNotMeetCriteria",
   ERROR_VALUE_EXPRESSION_FAILED:"valueFailedExpression",
   ERROR_VALUE_ABOVE_MAXIMUM:"valueAboveMaximum",
   ERROR_VALUE_BELOW_MINIMUM:"valueBelowMinimum",
   ERROR_DATE_TOO_EARLY:"dateTooEarly",
   ERROR_DATE_TOO_LATE:"dateTooLate",
   ERROR_DATE_MISMATCH:"dateMismatch",

   execute: function(e,o) {
      var Y = YAHOO.lang,
      target = YAHOO.util.Event.getTarget(e),
      beanclass = o.beanclass,
      callbacks = o.callbacks,
      Dom = YAHOO.util.Dom,
      validate = BCUS.validate,
      validations = BCUS.validate.VALIDATION_KEYS;
      if(!target){
          target = e;
      }
     // if (target.type == "password" && !YAHOO.util.Dom.hasClass(target,"cvv")){return;}
      for( var v = 0, len = validations.length; v < len; v = v + 1) {
         if(Dom.getAttribute(target,validations[v]) != null) {
            var test = Dom.getAttribute(target,validations[v]),
            validation = validations[v],
            hasError = false,
            errorEl = target.id + "_Error";
            switch (validation) {
               case "data-mask":
                  if(!validate.isBlank(target) && validation == "data-mask" && validate.checkMask(target, test)) {
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_DOES_NOT_MATCH);
                     break;
                  }
               case "data-match":
                  if(validation == "data-match" && validate.checkMatch(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_MISMATCH);
                     break;
                  }
               case "data-minlength":
                  if(!validate.isBlank(target) && validation == "data-minlength" && validate.checkMinLength(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_TOO_SHORT);
                     break;
                  }
               case "data-maxlength":
                  if(!validate.isBlank(target) && validation == "data-maxlength" && validate.checkDataMaxLength(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_TOO_LONG);
                     break;
                  }
               case "data-required":
                  if(test == "true" && validate.isBlank(target)) {
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_NOT_PRESENT);
                     break;
                  }
               case "maxlength":
                  if(!validate.isBlank(target) && validation == "maxlength" && validate.checkMaxLength(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_TOO_LONG);
                     break;
                  }
               case "data-password":
                  if(validation == "data-password" && validate.checkPassword(target, test)) {
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_DOES_NOT_MEET_CRITERIA);
                     break;
                  }
               case "data-minAllowed":
                  if(!validate.isBlank(target) && validation == "data-minAllowed" && validate.checkMinAllowed(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_BELOW_MINIMUM);
                     break;
                  }
               case "data-maxAllowed":
                  if(!validate.isBlank(target) && validation == "data-maxAllowed" && validate.checkMaxAllowed(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_VALUE_ABOVE_MAXIMUM);
                     break;
                  }
               case "data-earliestDate":
                  if(!validate.isBlank(target) && validation == "data-earliestDate" && validate.checkEarliestDate(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_DATE_TOO_EARLY);
                     break;
                  }
               case "data-latestDate":
                  if(!validate.isBlank(target) && validation == "data-latestDate" && validate.checkLatestDate(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_DATE_TOO_LATE);
                     break;
                  }
               case "data-noSoonerThan":
                  if(!validate.isBlank(target) && validation == "data-noSoonerThan" && validate.checkNoSoonerThan(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_DATE_MISMATCH);
                     break;
                  }
               case "data-noLaterThan":
                  if(!validate.isBlank(target) && validation == "data-noLaterThan" && validate.checkNoLaterThan(target, test)){
                     hasError = true;
                     Dom.addClass(target, "error");
                     Dom.get(errorEl).innerHTML = validate.getErrorMessage(target,beanclass,validate.ERROR_DATE_MISMATCH);
                     break;
                  }
               default:
                  //remove error state
                  Dom.removeClass(target,"error");
            }
         }
         if(hasError) {

            break;
         } else {
            if(callbacks != null && v === len - 1) {
               for( var c = 0, cl = callbacks.length; c < cl; c = c + 1) {
                  if(callbacks[c].field === target.id) {
                     callbacks[c].callback.call(null,callbacks[c].callback);
                  }
               }
            }
         }
      }
   },
   isBlank: function(el,field) { // synonym for checkRequired; required fields can not be blank.
      var Y = YAHOO.lang;
      var Dom = YAHOO.util.Dom;

      if(Dom.hasClass(el,'yui-menu-button'))
      {
         type = "button";
      }
      else
      {
         var type = el.type.toLowerCase();
      }
      var result;
      if (type === "checkbox") {
         result = !el.checked;
      }
      else if(type === 'button' && YAHOO.util.Dom.getElementsByClassName("notLogged").length == 0)
      {
         var typeContent = Dom.get(field+'-button').innerHTML;
         if((typeContent == '<em class="yui-button-label">Please select</em>')||(typeContent == '<EM class=yui-button-label>Please select</EM>'))
         {
            var validate = BCUS.validate;
            var recoveredBean = YAHOO.util.Dom.getAttribute(field, 'data-beanclass');
            if (recoveredBean == "undefined" || recoveredBean == undefined){
                recoveredBean = BCUS.recoveredBean;
            }
            var errorEl = el.id + "_Error";
            Dom.addClass(el, "error");
            Dom.addClass(field, "errorBorder");
            Dom.get(errorEl).innerHTML = validate.getErrorMessage(el,recoveredBean,BCUS.validate.ERROR_VALUE_EXPRESSION_FAILED);
         }
         else
         {
            Dom.removeClass(el,"error");
            Dom.removeClass(field, "errorBorder");
         }
      }
      else {
         if (el.value){
            result = (Y.trim(el.value) === "" || Y.trim(el.value).length === 0);
         }
         else{result = true;}
      }
      return result;
   },
   checkMask: function(el,t) {
      var result = false,
      Dom = YAHOO.util.Dom,
      regex = null;
      if(Dom.getAttribute(el,"data-mask") != null) {
         regex = new RegExp(t);
         result = (!regex.test(el.value));
      } else {
         result = false;
      }
      if (YAHOO.util.Dom.hasClass(el,"isDate")){
          var d = el.value;
          if (!BCUS.validateDate(d)){return true;}
      }
      return result;
   },
   checkMatch: function(el,t) {
      var Dom = YAHOO.util.Dom,
      result = false;
      if(Dom.get(t)) {
          if (Dom.getAttribute(el,"type")== "password"){
            result = (el.value !== Dom.get(t).value);
          }
          else{
             result = (el.value.toLowerCase() !== Dom.get(t).value.toLowerCase()); 
          }
      } else {
         result = false;
      }
      return result;
   },
   checkMaxLength: function(el,t) {
      var Y = YAHOO.lang,
      Dom = YAHOO.util.Dom,
      result = false;
      if(Dom.getAttribute(el,"maxlength") != null) {
         result = (Y.trim(el.value).length > t);
      } else {
         result = false;
      }
      return result;
   },
   checkDataMaxLength: function(el,t) {
      var Y = YAHOO.lang,
      Dom = YAHOO.util.Dom,
      result = false;
      if(Dom.getAttribute(el,"data-maxlength") != null) {
         result = (Y.trim(el.value).length > t);
      } else {
         result = false;
      }
      return result;
   },
   checkMinLength: function(el,t) {
      var Y = YAHOO.lang,
      Dom = YAHOO.util.Dom,
      result = false;
      if(Dom.getAttribute(el,"data-minlength") != null) {
         result = (Y.trim(el.value).length < t);
      } else {
         result = false;
      }
      return result;
   },
   checkRequired: function(el) {
      return (isBlank(el)) ;
   },
   checkSelectedMenuItem: function(e) {
      var Dom = YAHOO.util.Dom,
      index = e.newValue.index,
      value = e.newValue.value,
      parent = e.newValue.parent,
      result = true;
      if ( value.toLowerCase() === "please select" || index === 0) {
         Dom.get(parent).addClass("error");
         result = false;
      } else {
         Dom.get(parent).removeClass("error");
      }
      return result;
   },
   checkPassword: function(el,t) {
      var result = false,
      Dom = YAHOO.util.Dom,
      regex = null;
      if(Dom.getAttribute(el,"data-password") != null) {
         regex = new RegExp(BCUS.Constants.Password.PWD_REGEX);
         result = !regex.test(el.value);
      }

      return result;
   },
   checkMinAllowed: function(el,t) {
      Dom = YAHOO.util.Dom,
      result = false;
      if(Dom.getAttribute(el,"data-minAllowed") != null) {
         result = (parseInt(el.value.replace(/\,/g,'')) < t);
      } else {
         result = false;
      }
      return result;
   },
   checkMaxAllowed: function(el,t) {
      Dom = YAHOO.util.Dom,
      result = false;
      if(Dom.getAttribute(el,"data-maxAllowed") != null) {
         result = (parseFloat(el.value) > t);
      } else {
         result = false;
      }
      return result;
   },
   checkEarliestDate: function(el,t){
        var Dom = YAHOO.util.Dom,
        result = false;
        if (Dom.getAttribute(el,"data-earliestDate") != null){
            var elDate = new Date(el.value);
            if (elDate.getFullYear()<2000){
               elDate.setFullYear((elDate.getFullYear()%100) + 2000);
            }
            var tt = new Date(t);
            tt.setHours(0);
            tt.setMinutes(0);
            tt.setSeconds(0);
            elDate.setSeconds(1);
            result = (elDate < tt);
        }
        return result;

   },
   checkLatestDate: function(el,t){
        var Dom = YAHOO.util.Dom,
        result = false;
        if (Dom.getAttribute(el,"data-latestDate") != null){
            var elDate = new Date(el.value);
            if (elDate.getFullYear()<2000){
               elDate.setFullYear((elDate.getFullYear()%100) + 2000);
            }
            result = (elDate > new Date(t));
        }
        return result;
   },
   checkNoSoonerThan: function(el,t){
        var Dom = YAHOO.util.Dom,
        result = false;
        try{
            var compDate = new Date(Dom.get(t).value);
            if (compDate.getFullYear()<2000){
               compDate.setFullYear((compDate.getFullYear()%100) + 2000);
            }
        }
        catch(e){return false;}
        if (Dom.getAttribute(el,"data-noSoonerThan") != null && compDate){
            var elDate = new Date(el.value);
            if (elDate.getFullYear()<2000){
               elDate.setFullYear((elDate.getFullYear()%100) + 2000);
            }
            result = (elDate < compDate);
        }
        return result;
   },
   checkNoLaterThan: function(el,t){
        var Dom = YAHOO.util.Dom,
        result = false;
        try{
            var compDate = new Date(Dom.get(t).value);
            if (compDate.getFullYear()<2000){
               compDate.setFullYear((compDate.getFullYear()%100) + 2000);
            }
        }
        catch(e){return false;}
        if (Dom.getAttribute(el,"data-noLaterThan") != null && compDate){
            var elDate = new Date(el.value);
            if (elDate.getFullYear()<2000){
               elDate.setFullYear((elDate.getFullYear()%100) + 2000);
            }
            result = (elDate > compDate);
        }
        return result;
   },
   getErrorMessage: function(t,b,k) {
       //special case needed for MOW shopping cart
      var codeId = t.id;
      if (codeId.indexOf("quantityBox") != -1){
          codeId= "quantity";
      }
      if (codeId.indexOf("onboard") != -1){
          codeId= "onBoardDeliveryInfo." + codeId.substring(8,codeId.indexOf("_",9));
      }
      if (codeId.indexOf("menubutton-d") != -1){
          codeId= "onBoardDeliveryInfo.funShipName";
      }
      if (codeId.indexOf("menubutton-s-") != -1){
          codeId= "stateMenu"
      }
      if (codeId.indexOf("secQuestionAnswer") != -1){
          codeId= "secQuestionAnswer";
      }
      var xhr = YAHOO.util.Connect,
      Dom = YAHOO.util.Dom,
      key = b + "." + codeId + "." + k,
      callback = {
         success: function(o) {
            try {
               var message = YAHOO.lang.JSON.stringify(eval(o.responseText));
               Dom.get(t.id + "_Error").innerHTML = YAHOO.lang.JSON.parse(message);
            } catch (e) {
               Dom.get(t.id + "_Error").innerHTML =  "Unable to retrieve error message.";
            }
         },
         failure: function() {
            if (t.id != "cashForPoints"){
                Dom.get(t.id + "_Error").innerHTML = "Connection failure. Unable to retrieve error message.";
            }
         }
      };
      xhr.asyncRequest("GET", "errorMessage?key=" + key, callback)  ;
   }
};



/**
 * Initializes the global by creating some default namespaces.
 * @method init
 * @static
 * @private
 */

(function() {
   BCUS.namespace("Panel","Dialogs","PageLoaded","DataTable","Controls","Options","Products","Tags","XHR");

   BCUS.Tags.scode = {
      /**
       * The hostname of the server
       */
      hostname: document.location.host.toLowerCase() || "",
      /**
       * The Omniture account environment
       */
      account: (document.location.host.toLowerCase().match(/^(127\.|10\.|192\.|localhost|dev0[123]|qa0[123]|vdas*|vqas*|preprod|dd|dg|jagd|tiger|panther)/i)) ? "barclaysecmwebdev" : "barclaysglobalcm",
      /**
       * Fire a dynamic page view to omniture
       */
      pageView: function(pageName,channel,cpc) {
            s.pageName=channel+pageName;
            s.channel=channel;
            s.prop11=cpc;
            s.events="event17";
            s.t();
        }
   };

   /**
    * Google Analytics Tracking Code
    */
   BCUS.Tags.ga = {
      /**
       * Google Analytics Tracking Code
       * QA Profile
       */
      qaTrackingCode : "UA-5741612-3",
      /**
       * Google Analytics Tracking Code
       * Production Profile
       */
      prodTrackingCode : "UA-5741612-4"
   };

   BCUS.clearInput = function(e) {
      if (Modernizr.input.placeholder) {
          var field = YAHOO.util.Event.getTarget(e);
             if (YAHOO.util.Dom.getAttribute(field,"placeholder") && !(field.value == YAHOO.util.Dom.getAttribute(field,"placeholder"))){
                 return;
             }
            field.value = "";
      } else {
         var field = YAHOO.util.Event.getTarget(e);
         if (field.id == 'username') {
            if (field.value == 'Enter Username') {
               field.value = "";
            }
         } else {
             if (YAHOO.util.Dom.getAttribute(field,"placeholder") && !(field.value == YAHOO.util.Dom.getAttribute(field,"placeholder"))){
                 return;
             }
            field.value = "";
         }
      }
   }

   //prevent default behavior
   BCUS.preventDefault = function (e) {
      e = e || window.event;
      if (e.preventDefault)
         e.preventDefault();
      e.returnValue = false
   }

   /* Tooltip function.
    * Renders to the right of the formfield.  Takes HTML from a hidden DD after the field and renders a new panel. */

   BCUS.menuSwitch = function(jargon)
   {
      if(jargon==true)
      {
      //console.log("menuswitch works true");
      }
      else{
         BCUS.toolTip;
      }
   }
   BCUS.createErrorPanel = function(el) {
      var field=el.id;
      if (el.type == "radio") {
         field = el.name;
      }
      var fieldError = field + "_Error";
      var fieldDisplay = el.id;

      if (YAHOO.util.Dom.getAttribute(YAHOO.util.Dom.get(el.id), 'data-fieldDisplay')) {
         fieldDisplay = YAHOO.util.Dom.getAttribute(YAHOO.util.Dom.get(el), 'data-fieldDisplay');
      }
      /* Balance Transfer Terms Page specific, places toolTip on left side of object.
       * Modifying it to also work for the paperless statements page -- LMP
       * Modifyinf it to also work for the registerAndLinkTravelCommunity.jsp page -- SRS
       *   */
      if(field=='checkTerms' || field=='canPrintVerification' || field=='stopPaperStmts' || field == 'card1' || field == 'agreeToTermsCheckbox')
      {
        var errorHTML = '<div class=\"errorIcon\"> </div><strong>Error</strong>';
        var msg = '<p>'+YAHOO.util.Dom.get(fieldError).innerHTML+'</p>';
        var fieldErrorPanel = fieldError + "Panel";
        var isVisible = !(field=='stopPaperStmts' && !YAHOO.util.Dom.hasClass("canPrintVerification","yui-button-checked")) ? true : false;
        BCUS.errorPanel = new YAHOO.widget.Overlay(fieldErrorPanel, {
            context: [fieldDisplay, "tl", "tr", ["beforeShow", "windowResize"], [-255, -28]],
            fixedcenter: false,
            visible: isVisible,
            constraintoviewport:false,
            draggable:false,
            zIndex:9000,
            effect:{
                effect:YAHOO.widget.ContainerEffect.FADE,
                duration:0.25
            }
        });
        BCUS.errorPanel.setHeader("");
        BCUS.errorPanel.setBody(errorHTML + msg);
        BCUS.errorPanel.render(document.body);
        YAHOO.util.Dom.addClass(fieldErrorPanel, "error");
        BCUS.errorPanel.align("tl","tr");
        if (isVisible){
            BCUS.errorPanel.show();
        }
        return BCUS.errorPanel;
      }
      /* Default places toolTip on right side of object. */
      else
      {
        var errorHTML = '<div class=\"errorIcon\"> </div><strong>Error</strong>';
        if(YAHOO.util.Dom.get(fieldError).innerHTML == 'undefined' && fieldError != "cashForPoints_Error")
        {
            var msg = '<p>Connection failure. Unable to retrieve error message.</p>';
        }else {
            var msg = '<p>'+YAHOO.util.Dom.get(fieldError).innerHTML+'</p>';
        }
        var fieldErrorPanel = fieldError + "Panel";
        BCUS.errorPanel = new YAHOO.widget.Overlay(fieldErrorPanel, {
            context: [fieldDisplay, "tl", "tr", ["beforeShow", "windowResize"], [23, -15]],
            fixedcenter: false,
            visible: true,
            width: "190px",
            constraintoviewport:false,
            draggable:false,
            zIndex:9000,
            effect:{
                effect:YAHOO.widget.ContainerEffect.FADE,
                duration:0.25
            }
        });
        BCUS.errorPanel.setHeader("");
        BCUS.errorPanel.setBody(errorHTML + msg);
        BCUS.errorPanel.render(document.body);
        YAHOO.util.Dom.addClass(fieldErrorPanel, "error");
        BCUS.errorPanel.align("tl","tr");
        //BCUS.errorPanel.hide();
        BCUS.errorPanel.show();
        return BCUS.errorPanel;
      }
   }
   BCUS.toolTip = function(e,resourcePrefix) {
      var el= YAHOO.util.Event.getTarget(e);
      if (YAHOO.util.Dom.hasClass(el , "noToolTip") && YAHOO.util.Dom.getAttribute(el,"type") == "radio"){return;}
      if(YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button'))
      {
         el = YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button');
      }
      var passThis = this;
      BCUS.renderToolTip(el,passThis,resourcePrefix);
   }
   BCUS.renderToolTip = function(el,passThis,resourcePrefix) {
      var field = el.id;
      var fieldTip = field + "_Tip";
      var fieldDisplay = field;

      /* Checks to see if field is a menu button */
      var hasMenu = YAHOO.util.Dom.hasClass(field,"yui-menu-button");

      /* If menu button, set the DD ancestor, make menu visible and add attribute from original dropdown */
      if(hasMenu)
      {
         var tabAncestor = Dom.getElementBy(function(){return true;},"button",field)

         var renderDropMenu = YAHOO.util.Dom.getNextSibling(field);
         YAHOO.util.Dom.setStyle(renderDropMenu, 'visibility', 'visible');
         YAHOO.util.Dom.removeClass(renderDropMenu, 'yui-overlay-hidden');
         YAHOO.util.Dom.addClass(renderDropMenu, 'visible');
         YAHOO.util.Dom.setStyle(renderDropMenu, 'z-index', '2');

         var attrHolder = Dom.get(field);
         attrHolder.setAttribute('data-beanclass',resourcePrefix);

      }

      /* Sets the tooltip to the field with Attribute data-fieldDisplay for multiple input field (i.e. - telephone) */
      if (YAHOO.util.Dom.getAttribute(YAHOO.util.Dom.get(field), 'data-fieldDisplay')) {
         fieldDisplay = YAHOO.util.Dom.getAttribute(YAHOO.util.Dom.get(field), 'data-fieldDisplay');
      }

      /* Checks if field has an Error Class */
      if (YAHOO.util.Dom.hasClass(field, "error")) {

         BCUS.createErrorPanel(el);
         if(hasMenu)
         {
            YAHOO.util.Event.addListener(document, "click", BCUS.fieldClickErrorToggle,field);
            (new YAHOO.util.KeyListener(tabAncestor, {
               keys:9
            }, function(ev){
               BCUS.tabErrorToggle(field);
            })).enable();
            (new YAHOO.util.KeyListener(tabAncestor, {
               shift:true,
               keys:9
            }, function(ev){
               BCUS.tabErrorToggle(field);
            })).enable();
         }
         else if(YAHOO.util.Dom.hasClass(field, "yui-checkbox-button"))
         {
            YAHOO.util.Event.addListener(field, "click", BCUS.checkboxClickErrorToggle,field);
         }
         else
         {

             //Chrome specific fix for continue-button on Balance Transfer Page
             if((passThis == YAHOO.util.Dom.get('continueButton-button')) && YAHOO.util.Dom.isAncestor('balanceTransferForm','continueButton-button'))
             {
                function hideFindBankErrorTooltip(ee)
                {
                    var el2= YAHOO.util.Event.getTarget(ee);
                   // console.log(el2.id);
                   // console.log(Dom.get('continueButton-button'));

                    if(el2.id != 'continueButton-button')
                    {
                        YAHOO.util.Dom.addClass("findBank_ErrorPanel", "yui-overlay-hidden");
                        YAHOO.util.Dom.setStyle("findBank_ErrorPanel", 'visibility', 'hidden');

                        //YAHOO.util.Event.on(passThis, "focusout", BCUS.errorPanel.hide, BCUS.errorPanel, true);
                        YAHOO.util.Event.removeListener(document, "click", hideFindBankErrorTooltip);
                    }
                }
                YAHOO.util.Event.addListener(document, "click", hideFindBankErrorTooltip);
             }
             //All others use the following focus out.
             else{
                 YAHOO.util.Event.on(passThis, "focusout", BCUS.errorPanel.hide, BCUS.errorPanel, true);
             }

         };
      }

      /* Checks for class 'noToolTip' on menubutton which has no tooltip but has a errortip */
      else if(YAHOO.util.Dom.hasClass(field,'noToolTip'))
      {
         YAHOO.util.Dom.addClass(field, "tipBorder");
         YAHOO.util.Event.addListener(document, "click", BCUS.fieldClickHelpToggle,field);
            (new YAHOO.util.KeyListener(tabAncestor, {
               keys:9
            }, function(ev){
               BCUS.tabHelpToggle(field);
            })).enable();
            (new YAHOO.util.KeyListener(tabAncestor, {
               shift:true,
               keys:9
            }, function(ev){
               BCUS.tabHelpToggle(field);
            })).enable();
      }

      /* Creates a Tooltip if field has no error class and not excluded from tooltip */
      else if (YAHOO.util.Dom.get(fieldTip)) {
         var msg = YAHOO.util.Dom.get(fieldTip).innerHTML;
         var fieldTipPanel = fieldTip + "Panel";
         var x_crd = 23;
         var y_crd = -15;
       
         if (fieldTip == "transRiskScore_Tip") {
           
             x_crd = -753;
             y_crd = 32;
         }
         BCUS.fieldPanel = new YAHOO.widget.Overlay(fieldTipPanel, {
            context: [fieldDisplay, "tl", "tr", ["beforeShow", "windowResize"], [x_crd, y_crd]],
            fixedcenter: false,
            visible: true,
            width: "190px",
            constraintoviewport:false,
            draggable:false,
            zIndex:9000,
            effect:{
               effect:YAHOO.widget.ContainerEffect.FADE,
               duration:0.25
            }
         });
           
         BCUS.fieldPanel.setHeader("");
         BCUS.fieldPanel.setBody(msg);
         BCUS.fieldPanel.render(document.body);
         YAHOO.util.Dom.addClass(fieldTipPanel, "toolTip");
         if (fieldTipPanel.indexOf("onboard_bookingNumber") != -1){
             YAHOO.util.Dom.addClass(fieldTipPanel,"cruiseBookingToolTip");
         }
         BCUS.fieldPanel.align("tl","tr");
         if(hasMenu)
         {
            YAHOO.util.Dom.addClass(field, "tipBorder");
            YAHOO.util.Event.addListener(document, "click", BCUS.fieldClickHelpToggle,field);
            (new YAHOO.util.KeyListener(tabAncestor, {
               keys:9
            }, function(ev){
               BCUS.tabHelpToggle(field);
            })).enable();
            (new YAHOO.util.KeyListener(tabAncestor, {
               shift:true,
               keys:9
            }, function(ev){
               BCUS.tabHelpToggle(field);
            })).enable();
            
         }
         else
         {
           
            YAHOO.util.Event.on(passThis, "focusout", BCUS.fieldPanel.hide, BCUS.fieldPanel, true);
            
         };
      }
      else {
         return false
      };
   };

   /* Tab key specific. Initializes the button as el for renderToolTip to use */
   BCUS.tabTypeTrigger = function(el,resourcePrefix)
   {
      var el = YAHOO.util.Dom.get(el);
      BCUS.renderToolTip(el,el,resourcePrefix);
   }

   /* Tab key specific. Removes blue border and sends button object for validation*/
   BCUS.tabHelpToggle = function(field)
   {
      var showBtn = YAHOO.util.Dom.get(field);
      var fieldTipPanel = field+'_TipPanel';

      BCUS.fieldPanel.hide();
      YAHOO.util.Dom.removeClass(field, "tipBorder");
      YAHOO.util.Dom.addClass(fieldTipPanel, "yui-overlay-hidden");
      YAHOO.util.Dom.setStyle(fieldTipPanel, 'visibility', 'hidden');

      var grabDropMenu = YAHOO.util.Dom.getNextSibling(field);
      YAHOO.util.Dom.setStyle(grabDropMenu, 'visibility', 'hidden');
      YAHOO.util.Dom.setStyle(grabDropMenu, 'z-index', '-1');

      BCUS.validate.isBlank(showBtn,field);
      YAHOO.util.Event.removeListener(document,"click",BCUS.fieldClickHelpToggle);
   }

   /* Tab key specific. Hides error panel and sends button object for re-validation*/
   BCUS.tabErrorToggle = function(field)
   {
      var showBtn = YAHOO.util.Dom.get(field);
      BCUS.errorPanel.hide();
      YAHOO.util.Event.removeListener(document,"click",BCUS.fieldClickErrorToggle);

      var grabDropMenu = YAHOO.util.Dom.getNextSibling(field);
      YAHOO.util.Dom.setStyle(grabDropMenu, 'visibility', 'hidden');
      YAHOO.util.Dom.setStyle(grabDropMenu, 'z-index', '-1');

      BCUS.validate.isBlank(showBtn,field);
   }

   /* Mouse click specific. Removes blue border, hides dropdown menu and sends button object for validation*/
   BCUS.fieldClickHelpToggle = function(e,field)
   {
      var el= YAHOO.util.Event.getTarget(e);
      var origEl = el;
      var fieldTipPanel = field + "_TipPanel";
      var dropEl = YAHOO.util.Dom.get(fieldTipPanel);
      var showBtn = YAHOO.util.Dom.get(field);
      if(YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button'))
      {
         el = YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button');
      }
      if (el != showBtn)
      {
         YAHOO.util.Dom.removeClass(field, "tipBorder");

         YAHOO.util.Dom.addClass(fieldTipPanel, "yui-overlay-hidden");
         YAHOO.util.Dom.setStyle(fieldTipPanel, 'visibility', 'hidden');
         var grabDropMenu = YAHOO.util.Dom.getNextSibling(field);
         YAHOO.util.Dom.addClass(grabDropMenu, "yui-overlay-hidden");
         YAHOO.util.Dom.setStyle(grabDropMenu, 'visibility', 'hidden');
         YAHOO.util.Dom.setStyle(grabDropMenu, 'z-index', '-1');
         YAHOO.util.Dom.removeClass(grabDropMenu, "visible");
         BCUS.validate.isBlank(showBtn,field);
         YAHOO.util.Event.removeListener(document,"click",BCUS.fieldClickHelpToggle);
      }
      else if((el == showBtn) && (YAHOO.util.Dom.getAncestorByClassName(origEl,'yui-menu-button')))
      {
         YAHOO.util.Dom.get(el).focus();
      }
   }
   /* Mouse click specific. Hides error panel, hides dropdown menu and sends button object for validation*/
   BCUS.fieldClickErrorToggle = function(e,field)
   {
      var el= YAHOO.util.Event.getTarget(e);
      var origEl = el;
      var fieldErrorPanel = field + "_ErrorPanel";
      var dropEl = YAHOO.util.Dom.get(fieldErrorPanel);
      var showBtn = YAHOO.util.Dom.get(field);
      if(YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button'))
      {
         el = YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button');
      }
      if (el != showBtn)
      {
         YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay-hidden");
         YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'hidden');
         var grabDropMenu = YAHOO.util.Dom.getNextSibling(field);
         YAHOO.util.Dom.addClass(grabDropMenu, "yui-overlay-hidden");
         YAHOO.util.Dom.setStyle(grabDropMenu, 'visibility', 'hidden');
         YAHOO.util.Dom.removeClass(grabDropMenu, "visible");
         YAHOO.util.Dom.setStyle(grabDropMenu, 'z-index', '-1');
         BCUS.validate.isBlank(showBtn,field);
         YAHOO.util.Event.removeListener(document,"click",BCUS.fieldClickErrorToggle);
      }
      else if((el == showBtn) && (YAHOO.util.Dom.getAncestorByClassName(origEl,'yui-menu-button')))
      {

         YAHOO.util.Dom.get(el).focus();
      }
   }
   /* Toggles ErrorPanel for CheckBoxs */
   BCUS.checkboxClickErrorToggle = function(e,field)
   {
       var fieldErrorPanel = field + "_ErrorPanel";
       if (field != "stopPaperStmts" && field != "canPrintVerification"){
          if(YAHOO.util.Dom.hasClass(field,"yui-button-checked"))
          {
                     YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay-hidden");
                     YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'hidden');
                     YAHOO.util.Dom.removeClass(field,"errorBorder");
          }
          else
          {
              if (field != "card1"){
                     YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay");
                     YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'visible');
                     YAHOO.util.Dom.addClass(field,"errorBorder");
              }
          }
       }
       //Special case for the enroll paperless page
       else{
           if (field == "canPrintVerification"){
               if(YAHOO.util.Dom.hasClass(field,"yui-button-checked"))
                     {
                     YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay-hidden");
                     YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'hidden');
                     YAHOO.util.Dom.removeClass(field,"errorBorder");
                     if (!YAHOO.util.Dom.hasClass("stopPaperStmts","yui-button-checked")){
                         YAHOO.util.Dom.addClass("stopPaperStmts_ErrorPanel", "yui-overlay");
                         YAHOO.util.Dom.setStyle("stopPaperStmts_ErrorPanel", 'visibility', 'visible');
                         YAHOO.util.Dom.addClass("stopPaperStmts","errorBorder");
                     }
                }
                else{
                    YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay");
                     YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'visible');
                     YAHOO.util.Dom.addClass(field,"errorBorder");
                     if (!YAHOO.util.Dom.hasClass("stopPaperStmts","yui-button-checked")){
                         YAHOO.util.Dom.addClass("stopPaperStmts_ErrorPanel", "yui-overlay-hidden");
                         YAHOO.util.Dom.setStyle("stopPaperStmts_ErrorPanel", 'visibility', 'hidden');
                         YAHOO.util.Dom.removeClass("stopPaperStmts","errorBorder");
                     }
                }
           }
           else{
               if(YAHOO.util.Dom.hasClass(field,"yui-button-checked"))
                     {
                     YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay-hidden");
                     YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'hidden');
                     YAHOO.util.Dom.removeClass(field,"errorBorder");

                }
                else{
                    if (YAHOO.util.Dom.hasClass("canPrintVerification","yui-button-checked")){
                     YAHOO.util.Dom.addClass(fieldErrorPanel, "yui-overlay");
                     YAHOO.util.Dom.setStyle(fieldErrorPanel, 'visibility', 'visible');
                     YAHOO.util.Dom.addClass(field,"errorBorder");
                    }

                }
           }
       }

   }

   BCUS.focusOnFirstField = function (formId,errorsOnly) {
      if (YAHOO.util.Dom.get(formId)) {
         var theForm = document.forms[formId];
         var foundError = false;
         var firstFocusableField = null;
         var focusField = null;
         var indexOfFormElements = 0;
         var focusOnErrorFields = false;

         if (errorsOnly != null) {
            focusOnErrorFields = errorsOnly;
         }

         while (!foundError && indexOfFormElements < theForm.elements.length) {
            var elem = YAHOO.util.Dom.get(theForm.elements[indexOfFormElements].id);
            if (elem != null) {
               var focusableField = true;


               if (elem.tagName.toLowerCase() == "input"){
                  var elemInputType = elem.getAttribute("type");
                  if (elemInputType != null && ((elemInputType.toLowerCase() == "radio") || (elemInputType.toLowerCase() == "checkbox"))) {
                     focusableField = false;
                  }
               }
               if (focusableField) {
                  if (firstFocusableField == null) {
                     // set the first field to focus
                     firstFocusableField = elem;

                  }
                  if (YAHOO.util.Dom.hasClass(elem,"error")) {
                     foundError = true;
                     focusField = elem;

                  }
               }
            }
            indexOfFormElements++;
         }
         if (!foundError && firstFocusableField != null && !focusOnErrorFields) {

            focusField = firstFocusableField;
         }

         if (focusField != null) {
            focusField.focus();
         }
      }

   }

   /* faq functionality.
    * Renders below the triggering DIV.  Takes HTML from a hidden div after the field and renders a new panel. */

   function callbackFaqJSON(requestFAQ, faq) {

      var xhr = YAHOO.util.Connect.asyncRequest("GET", requestFAQ,  {
         success: function (o) {
            try {
               var faqResponse = "<h1 id='faqTitle'>Commonly asked questions</h1>";

               function jsonFilter(key,val) {
                  if(key == 'question') {
                     faqResponse += "<br><strong><div id='faqQuestion'>" + val +"</div></strong>"
                  }
                  else if (key == 'answer') {
                     faqResponse += "<div id='faqAnswer'>" + val +"</div>"
                  }
                  else {

                  }
               }
               var jsonResponse = YAHOO.lang.JSON.parse(o.responseText, jsonFilter);
               //console.log(jsonResponse);
               var faqPanel = faq + "Panel";
               BCUS.faqPanel = new YAHOO.widget.Overlay(faqPanel, {
                  context: ["help", "tl", "tr", ["beforeShow", "windowResize"], [-204, 20]],
                  fixedcenter: false,
                  visible: false,
                  width: "395px",
                  constraintoviewport:false,
                  draggable:false,
                  zIndex:9005
               });
               BCUS.faqPanel.setHeader(" ");
               BCUS.faqPanel.setBody(faqResponse);
               BCUS.faqPanel.setFooter("Still have more questions? Visit our <a href='/servicing/headerLinks?handleFaq=' event='footerFaq' class='footerFaq'>Help page</a>");
               BCUS.faqPanel.render(document.body);
               BCUS.faqPanel.cfg.setProperty("effect",{
                  effect: YAHOO.widget.ContainerEffect.FADE,
                  duration: 0.25
               });
               YAHOO.util.Dom.addClass("help", "helpOn");
               YAHOO.util.Dom.addClass(faqPanel, "faqTextOn");
               BCUS.faqPanel.align("tl","tr");
               BCUS.faqPanel.show();
               YAHOO.util.Event.removeListener(document, "click", BCUS.faqToggle);
               YAHOO.util.Event.removeListener("help", "click", BCUS.faqRender);
               YAHOO.util.Event.addListener(document, "click", BCUS.faqToggle);
            }
            catch (e) {
               alert("Error: Unable to retrieve FAQ Questions");
            }
         },
         failure: function (o) {
            alert("Failure: Unable to connect to FAQ RightNew");
         }
      });
   }

   BCUS.faqRender = function() {
      var faq = "help_faq";
      var requestFAQ = 'messageCenter?getFAQs';
      callbackFaqJSON(requestFAQ, faq);
      //make sure only 1 click faqToggle listener
   };

   BCUS.faqToggle = function(e) {
      var el = YAHOO.util.Event.getTarget(e);
      var faqEl = YAHOO.util.Dom.get("help_faqPanel");
      var showBtn = YAHOO.util.Dom.get("help");

      if (el != faqEl && !YAHOO.util.Dom.isAncestor(faqEl, el)) {
         if (el == showBtn) {
            if (!BCUS.faqPanel.cfg.getProperty("visible")) {
               BCUS.faqPanel.show();
               YAHOO.util.Dom.addClass("help", "helpOn");
            } else {
               BCUS.faqPanel.hide();
               YAHOO.util.Dom.removeClass("help", "helpOn");
            }
         } else {
            BCUS.faqPanel.hide();
            YAHOO.util.Dom.removeClass("help", "helpOn");
         }
      };


   };

    BCUS.cashBackDeliveryRender = function(e,str){
         var panelId = "where" + str + "Panel";
         var panelName = str.toLowerCase() + "Panel";
         var anchor = YAHOO.util.Event.getTarget(e);
         if(!BCUS[panelName]){
             var msg = YAHOO.util.Dom.get(panelId).innerHTML;
             YAHOO.util.Dom.get(panelId).innerHTML = "";
             BCUS[panelName] = new YAHOO.widget.Panel(panelId,
             {
                 context: [anchor, "tl", "tr", ["beforeShow", "windowResize"], [-230, 16]],
                 fixedcenter: false,
                 visible: false,
                 width: "520px",
                 constraintoviewport:false,
                 draggable:false,
                 underlay:"none",
                 zIndex:9000
             });
             var panel = BCUS[panelName];
             panel.anchor=anchor;
             panel.panelId=panelId;
             panel.setHeader("");
             panel.setBody(msg);
             panel.render(document.body);
             panel.beingRendered = true;
             panel.cfg.setProperty("effect",{
                effect: YAHOO.widget.ContainerEffect.FADE,
                duration: 0.25
             });
             panel.align("tl","tr");
             YAHOO.util.Dom.removeClass(panelId, "hide");
             YAHOO.util.Dom.addClass(anchor, "cbdhelpOn");
             panel.show();
             YAHOO.util.Event.removeListener(anchor, "click");
             YAHOO.util.Event.addListener(document, "click",BCUS.cashBackDeliveryToggle,{str:str.toLowerCase()});

         }
         else{
             if (!YAHOO.util.Dom.hasClass(anchor, "cbdhelpOn"))
            {
                var panel = BCUS[panelName];
                YAHOO.util.Dom.addClass(anchor, "cbdhelpOn");
                 panel.show();
                 panel.beingRendered = true;
                 //YAHOO.util.Event.removeListener(anchor, "click",BCUS.cashBackDeliveryRender,{str:str});
                 YAHOO.util.Event.addListener(document, "click",BCUS.cashBackDeliveryToggle,{str:str.toLowerCase()});
            }
             else{
                 var panel = BCUS[panelName];
                 panel.hide();
                 YAHOO.util.Dom.removeClass(anchor, "cbdhelpOn");
                 YAHOO.util.Event.addListener(anchor, "click",BCUS.cashBackDeliveryToggle,{str:str.toLowerCase()});
                 YAHOO.util.Event.removeListener(document, "click",BCUS.cashBackDeliveryToggle,{str:str.toLowerCase()});
             }
          }

    }

      BCUS.cashBackDeliveryToggle = function(e,obj) {
       var panel = BCUS[obj.str.toLowerCase() + "Panel"]
       if (panel.beingRendered){
           panel.beingRendered = false;
           return;
       }
       if(panel){
           var el = YAHOO.util.Event.getTarget(e);
             var keyEl = YAHOO.util.Dom.get(panel.panelId);
             var keyButtons = YAHOO.util.Dom.get(panel.anchor);
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass(panel.anchor, "cbdhelpOn")) {
                   panel.show();
                   YAHOO.util.Dom.addClass(panel.anchor, "cbdhelpOn");
                } else {
                   panel.hide();
                   YAHOO.util.Dom.removeClass(panel.anchor, "cbdhelpOn");
                   YAHOO.util.Event.removeListener(document, "click",BCUS.cashBackDeliveryToggle,{str:obj.str});
                }
             } else {
              // panel.show();
              //  YAHOO.util.Dom.addClass(panel.anchor, "cbdhelpOn");
             }
       }
  }

    BCUS.calculatorRender = function(e){
        var calcLink = YAHOO.util.Event.getTarget(e);
         if(!BCUS.calcPanel){
    //         var msg = YAHOO.util.Dom.get("calculatorPanel").innerHTML;//Card Benefits
   //          YAHOO.util.Dom.get("calculatorPanel").innerHTML = "";
             BCUS.calcPanel = new YAHOO.widget.Panel("calculatorPanel",
             {
                 context: [calcLink, "tl", "tr", ["beforeShow", "windowResize"], [-330, 25]],
                 fixedcenter: false,
                 visible: false,
                 width: "450px",
                 constraintoviewport:false,
                 draggable:false,
                 underlay:"none",
                 zIndex:3000
             });
             BCUS.calcPanel.setHeader("");
      //       BCUS.calcPanel.setBody(msg);
             BCUS.calcPanel.render(document.body);
             BCUS.calcPanel.render();
             BCUS.calcPanel.cfg.setProperty("effect",{
                effect: YAHOO.widget.ContainerEffect.FADE,
                duration: 0.25
             });
             BCUS.calcPanel.align("tl","tr");
             YAHOO.util.Dom.removeClass("calculatorPanel", "hide");
             BCUS.calcPanel.show();
             YAHOO.util.Dom.addClass("calculatorTotal","dontVanish");
             YAHOO.util.Dom.addClass("bd","manageMOWPanelOpen");
             YAHOO.util.Dom.get("cashForPoints").focus()
             BCUS.calcPanel.beingRendered = true;
             YAHOO.util.Event.removeListener(calcLink, "click",BCUS.calculatorRender);
             YAHOO.util.Event.addListener(calcLink, "click",BCUS.calculatorToggle);
             YAHOO.util.Event.addListener(document, "click",BCUS.calculatorToggle);

         }
         else{
          //   BCUS.cbPanel.show();
          //   YAHOO.util.Event.addListener(calcLink, "click",BCUS.calculatorToggle);
           //  YAHOO.util.Event.removeListener(document, "click",BCUS.calculatorToggle);
         }
    }

      BCUS.calculatorToggle = function(e) {

       if(!BCUS.calcPanel.beingRendered){
             var el = YAHOO.util.Event.getTarget(e);
             var keyEl = YAHOO.util.Dom.get("calculatorPanel");
             var keyButtons = YAHOO.util.Dom.get("calculatorLink");
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass("calculatorLink", "calchelpOn")) {
                   BCUS.calcPanel.show();
                   BCUS.calcPanel.beingRendered = true;
                   YAHOO.util.Dom.addClass("bd","manageMOWPanelOpen");
                   YAHOO.util.Dom.get("cashForPoints").focus()
                   YAHOO.util.Dom.addClass("calculatorTotal","dontVanish");
                   YAHOO.util.Dom.addClass("calculatorLink", "calchelpOn");
                } else {
                   BCUS.calcPanel.hide();
                   BCUS.menuButton.getMenu().hide();
                   YAHOO.util.Dom.removeClass("bd","manageMOWPanelOpen");
                   YAHOO.util.Dom.removeClass("calculatorTotal","dontVanish");
                   YAHOO.util.Dom.removeClass("calculatorLink", "calchelpOn");
                   YAHOO.util.Dom.get("cashForPoints").value = "";
                   Dom.get("calculatorTotal").innerHTML = "0";
                   BCUS.calcRates.getMenu().cfg.owner.activeItem = BCUS.calcRates.getMenu().getItem(0);
                   BCUS.calcRates.set("label", ("<em class=\"yui-button-label\">" + BCUS.calcRates.getMenu().getItem(0).cfg.getProperty("text") + "</em>"));
                   YAHOO.util.Dom.removeClass("cashForPoints","error");
                }
             } else {
                BCUS.calcPanel.show();
                BCUS.calcPanel.beingRendered = true;
                YAHOO.util.Dom.addClass("bd","manageMOWPanelOpen");
                YAHOO.util.Dom.get("cashForPoints").focus()
                YAHOO.util.Dom.addClass("calculatorTotal","dontVanish");
                YAHOO.util.Dom.addClass("calculatorLink", "calchelpOn");
             }
       }
       else{BCUS.calcPanel.beingRendered = false}
  }

    BCUS.merchantDisclosureRender = function(e) {

      var msg = YAHOO.util.Dom.get("merchantDisclosurePanel").innerHTML;//Card Benefits
      YAHOO.util.Dom.get("merchantDisclosurePanel").innerHTML = "";
         if(!YAHOO.util.Dom.hasClass("mdAnchor", "mdhelpOn")){
             BCUS.mdPanel = new YAHOO.widget.Panel("merchantDisclosurePanel",
             {
                 context: [this, "tl", "tr", ["beforeShow", "windowResize"], [-230, 16]],
                 fixedcenter: false,
                 visible: false,
                 width: "350px",
                 constraintoviewport:false,
                 draggable:false,
                 underlay:"none",
                 zIndex:9000
             });
             BCUS.mdPanel.setHeader("");
             BCUS.mdPanel.setBody(msg);
             BCUS.mdPanel.render(document.body);
             BCUS.mdPanel.render();
             BCUS.mdPanel.cfg.setProperty("effect",{
                effect: YAHOO.widget.ContainerEffect.FADE,
                duration: 0.25
             });
             YAHOO.util.Dom.addClass("merchantDisclosurePanel", "merchantDisclosureTextOn");
             BCUS.mdPanel.align("tl","tr");
             YAHOO.util.Dom.removeClass("merchantDisclosurePanel", "hide");
             BCUS.mdPanel.show();
             YAHOO.util.Event.removeListener("mdAnchor", "click",BCUS.merchantDisclosureRender);
             YAHOO.util.Event.addListener(document, "click",BCUS.merchantDisclosureToggle);

         }
         else{
             BCUS.cbPanel.hide();
             YAHOO.util.Event.addListener("mdAnchor", "click",BCUS.merchantDisclosureToggle);
             YAHOO.util.Event.removeListener(document, "click",BCUS.merchantDisclosureToggle);
         }

    }
  BCUS.merchantDisclosureToggle = function(e) {

       if(BCUS.mdPanel){
             var el = YAHOO.util.Event.getTarget(e);
             var keyEl = YAHOO.util.Dom.get("merchantDisclosurePanel");
             var keyButtons = YAHOO.util.Dom.get("mdAnchor");
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass("mdAnchor", "mbhelpOn")) {
                   BCUS.mdPanel.show();
                   YAHOO.util.Dom.addClass("mdAnchor", "mdhelpOn");
                } else {
                   BCUS.mdPanel.hide();
                   YAHOO.util.Dom.removeClass("mdAnchor", "mdhelpOn");
                }
             } else {
                BCUS.mdPanel.show();
                YAHOO.util.Dom.addClass("mdAnchor", "mdhelpOn");
             }
       }
  }

  BCUS.purchaseRedemptionRender = function(e,o){
      var msg = YAHOO.util.Dom.get("purchaseRedemptionPanel").innerHTML;//Card Benefits
      var el = YAHOO.util.Event.getTarget(e);
         if(!BCUS.prPanel){
             YAHOO.util.Dom.get("purchaseRedemptionPanel").innerHTML = "";
            BCUS.prPanel = new YAHOO.widget.Panel("purchaseRedemptionPanel",
             {
                 context: [el, "tl", "tr", ["beforeShow", "windowResize"], [-180, 15]],
                 fixedcenter: false,
                 visible: false,
                 width: "275px",
                 constraintoviewport:false,
                 draggable:false,
                 underlay:"none",
                 zIndex:9000
             });
             BCUS.prPanel.setHeader("");
             BCUS.prPanel.setBody(msg);
             BCUS.prPanel.render(document.body);
             BCUS.prPanel.render();
             BCUS.prPanel.cfg.setProperty("effect",{
                effect: YAHOO.widget.ContainerEffect.FADE,
                duration: 0.25
             });
             BCUS.prPanel.index=o.index;
             YAHOO.util.Dom.addClass("purchaseRedemptionPanel", "purchaseRedemptionTextOn");
             BCUS.prPanel.align("tl","tr");
             YAHOO.util.Dom.removeClass("purchaseRedemptionPanel", "hide");
             BCUS.prPanel.show();
             YAHOO.util.Event.removeListener(el, "click",BCUS.purchaseRedemptionRender);
             YAHOO.util.Event.addListener(document, "click",BCUS.purchaseRedemptionToggle);

         }
         else{
             BCUS.prPanel.hide();
             //YAHOO.util.Dom.get("purchaseRedemptionPanel").innerHTML = "";
             var i = BCUS.prPanel.index
             BCUS.prPanel = null;
             if (YAHOO.util.Dom.hasClass(el,"redeemNowLink")){
                 if (el.id == "rnl_"+i){
                     YAHOO.util.Event.addListener(el, "click",BCUS.purchaseRedemptionRender,{index:i});
                     YAHOO.util.Event.removeListener(document, "click",BCUS.purchaseRedemptionToggle);
                 }
                 else{
                    BCUS.purchaseRedemptionRender(e, {index:el.id.substr(4)});
                 }
             }

         }

  }

    BCUS.purchaseRedemptionToggle = function(e,overrideClick) {

       if(BCUS.prPanel){
             var el = YAHOO.util.Event.getTarget(e);
             if (YAHOO.util.Dom.hasClass(el,"redeemNowLink")){YAHOO.util.Event.preventDefault(e);}

             var keyEl = YAHOO.util.Dom.get("purchaseRedemptionPanel");
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el) && el.id != "rnl_" + BCUS.prPanel.index  ) {
                BCUS.prPanel.hide();
                var index = BCUS.prPanel.index;
                YAHOO.util.Event.addListener("rnl_"+index, "click",BCUS.purchaseRedemptionRender,{index:el.id.substr(4)});
                YAHOO.util.Event.removeListener(document, "click",BCUS.purchaseRedemptionToggle);
                BCUS.prPanel = null;
             } else {
                return;
             }
       }
  }

    BCUS.deliveryInfoRender = function(e, elem){
      var id = YAHOO.util.Dom.getAttribute(elem, "id");
      var panelId = id + "DeliveryInfoPanel";
      var msg = YAHOO.util.Dom.get(panelId).innerHTML;
      YAHOO.util.Dom.get(panelId).innerHTML = "";
         if(!YAHOO.util.Dom.hasClass(elem, "cbhelpOn")){
             BCUS[panelId] = new YAHOO.widget.Panel(panelId,
             {
                 context: [this, "tl", "tr", ["beforeShow", "windowResize"], [-250, 18]],
                 fixedcenter: false,
                 visible: false,
                 width: "450px",
                 constraintoviewport:false,
                 draggable:false,
                 underlay:"none",
                 zIndex:9000
             });
             BCUS[panelId].setHeader("");
             BCUS[panelId].setBody(msg);
             BCUS[panelId].render(document.body);
             BCUS[panelId].render();
            BCUS[panelId].cfg.setProperty("effect",{
                effect: YAHOO.widget.ContainerEffect.FADE,
                duration: 0.25
             });
             YAHOO.util.Dom.addClass(panelId, "deliveryInfoTextOn");
             BCUS[panelId].align("tl","tr");
             YAHOO.util.Dom.removeClass(panelId, "hide");
             BCUS[panelId].show();
             YAHOO.util.Event.removeListener(elem, "click",BCUS.deliveryInfoRender);
             YAHOO.util.Event.addListener(document, "click", function(e){

                 var el = YAHOO.util.Event.getTarget(e);
                 var keyEl = YAHOO.util.Dom.get(panelId);
                 var keyButtons = elem;
                 if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                    if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass("cbIcon", "cbhelpOn")) {
                       BCUS[panelId].show();
                       YAHOO.util.Dom.addClass(elem, "cbhelpOn");
                    } else {
                       BCUS[panelId].hide();
                       YAHOO.util.Dom.removeClass(elem, "cbhelpOn");
                    }
                 } else {
                    BCUS[panelId].show();
                    YAHOO.util.Dom.addClass(elem, "cbhelpOn");
                 }
             });

         }
         else{
             BCUS[panelId].hide();
             YAHOO.util.Event.addListener(elem, "click",BCUS.deliveryInfoToggle);
             YAHOO.util.Event.removeListener(document, "click");
         }

    }

    BCUS.deliveryInfoToggle = function(e) {

       if(BCUS.cbPanel){
             var el = YAHOO.util.Event.getTarget(e);
             var keyEl = YAHOO.util.Dom.get("cardBenefitsPanel");
             var keyButtons = YAHOO.util.Dom.get("cbIcon");
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass("cbIcon", "cbhelpOn")) {
                   BCUS.cbPanel.show();
                   YAHOO.util.Dom.addClass("cbIcon", "cbhelpOn");
                } else {
                   BCUS.cbPanel.hide();
                   YAHOO.util.Dom.removeClass("cbIcon", "cbhelpOn");
                }
             } else {
                BCUS.cbPanel.show();
                YAHOO.util.Dom.addClass("cbIcon", "cbhelpOn");
             }
       }
  }

    BCUS.cardBenefitsRender = function(e) {

      var msg = YAHOO.util.Dom.get("cardBenefitsPanel").innerHTML;//Card Benefits
      var ft = YAHOO.util.Dom.get("cardBenefitsFooter").innerHTML;
      if (BCUS.cbHasBeenRendered == undefined){
        BCUS.cbHasBeenRendered = false; //put in there to prevent weirdness when sliding back to the page.
      }
      var x_cord = -312;
      var y_cord = 30;
      
      if (YAHOO.util.Dom.hasClass("cbIcon" ,"transRiskIcon")){
          x_cord = -777;
          y_cord = 32;
      }
      
      YAHOO.util.Dom.get("cardBenefitsPanel").innerHTML = "";
            
         if(!YAHOO.util.Dom.hasClass("cbIcon", "cbhelpOn")){
             BCUS.cbPanel = new YAHOO.widget.Panel("cardBenefitsPanel",
             {
                 context: [this, "tl", "tr", ["beforeShow", "windowResize"], [x_cord , y_cord]],
                 fixedcenter: false,
                 visible: false,
                 width: "450px",
                 constraintoviewport:false,
                 draggable:false,
                 underlay:"none",
                 zIndex:9000
             });
             if (!BCUS.cbHasBeenRendered){
                 BCUS.cbHasBeenRendered = true;
                 BCUS.cbPanel.setBody(msg);
                 BCUS.cbPanel.setHeader("");
                 if (!YAHOO.util.Dom.hasClass("cbIcon" ,"transRiskIcon")){
                    BCUS.cbPanel.setFooter(ft);
                 }
             }
             else{
                 YAHOO.util.Dom.get("cardBenefitsPanel").innerHTML = msg;
             }
             BCUS.cbPanel.render(document.body);
             BCUS.cbPanel.render();
             BCUS.cbPanel.cfg.setProperty("effect",{
                effect: YAHOO.widget.ContainerEffect.FADE,
                duration: 0.25
             });
             YAHOO.util.Dom.addClass("cardBenefitsPanel", "cardbenefitsTextOn");
             BCUS.cbPanel.align("tl","tr");
             YAHOO.util.Dom.removeClass("cardBenefitsPanel", "hide");
             BCUS.cbPanel.show();
             YAHOO.util.Event.removeListener("cbIcon", "click",BCUS.cardBenefitsRender);
             YAHOO.util.Event.addListener(document, "click",BCUS.cardBenefitsToggle);

         }
         else{
             BCUS.cbPanel.hide();
             YAHOO.util.Event.addListener("cbIcon", "click",BCUS.cardBenefitsToggle);
             YAHOO.util.Event.removeListener(document, "click",BCUS.cardBenefitsToggle);
         }

    }
  BCUS.cardBenefitsToggle = function(e) {  
       if(BCUS.cbPanel){
             var el = YAHOO.util.Event.getTarget(e);
             var keyEl = YAHOO.util.Dom.get("cardBenefitsPanel");
             var keyButtons = YAHOO.util.Dom.get("cbIcon");
            
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass("cbIcon", "cbhelpOn")) {
                   BCUS.cbPanel.show();
                   YAHOO.util.Dom.addClass("cbIcon", "cbhelpOn");
                } else {
                   BCUS.cbPanel.hide();
                   YAHOO.util.Dom.removeClass("cbIcon", "cbhelpOn");
                }
             } else {
                BCUS.cbPanel.show();
                YAHOO.util.Dom.addClass("cbIcon", "cbhelpOn");
             }
       }
  }

  
  
  
  
   BCUS.enrollTandC = function(e) {
      var msg = YAHOO.util.Dom.get("enrollTandC").innerHTML;
      paperlessTandC = new YAHOO.widget.Overlay("paperlessTandC", {
         context: ["seeDetails", "tl", "tr", ["beforeShow", "windowResize"], [-260, 15]],
         fixedcenter: false,
         visible: false,
         width: "463px",
         constraintoviewport:false,
         draggable:false,
         zIndex:9000,
         effect:{
            effect:YAHOO.widget.ContainerEffect.FADE,
            duration:0.25
         }
      });
      paperlessTandC.setHeader("");
      paperlessTandC.setBody(msg);
      paperlessTandC.render(document.body);
      YAHOO.util.Dom.addClass("paperlessTandC", "paperlessOverlay");
      YAHOO.util.Dom.addClass("paperlessTandC", "floatLeft");
      paperlessTandC.align("tl","tr");
      YAHOO.util.Event.addListener(document, "click", BCUS.enrollTandCToggle);
   };

   BCUS.enrollTandCToggle = function(e) {
      var el = YAHOO.util.Event.getTarget(e);
      var faqEl = YAHOO.util.Dom.get("paperlessTandC");
      var showBtn = YAHOO.util.Dom.get("seeDetails");

      if (el != faqEl && !YAHOO.util.Dom.isAncestor(faqEl, el)) {
         if (el == showBtn) {
            if (!paperlessTandC.cfg.getProperty("visible")) {
               paperlessTandC.show();
               YAHOO.util.Dom.addClass("cws-doc","printTandC");
            } else {
               paperlessTandC.hide();
               YAHOO.util.Dom.removeClass("cws-doc","printTandC");
            }
         } else {
            paperlessTandC.hide();
            YAHOO.util.Dom.removeClass("cws-doc","printTandC");
         }
      };
   };

/*
    * BCUS.createOverlay();
    * Creates an overlay on a page. The overlay element must have the class="overlayContent" and the overlay link/button must have the class="overlayLink".
    * The function finds the first element with a class of overlayContent and the first element with a class of overlayLink.
    * the overlayContent element should have a <c:import /> tag that imports the content to be displayed in the overlay.
    * This overlay function will only work if ther is one overlay on the page. If there is more then one it will not work for the others.
    * There is an eventListener which toggles the overlay when link/button is clicked and on "blur" events. 
    * 
    * @params none
    */
    BCUS.createOverlay = function() {
        var overlayContentId = YAHOO.util.Dom.getElementsByClassName('overlayContent')[0].id,
            msg = YAHOO.util.Dom.get(overlayContentId).innerHTML,
            overlayLinkId = YAHOO.util.Dom.getElementsByClassName('overlayLink')[0].id,
            overlayConfiguration = {
                width: "36em",
                height: "18em",
                context: [overlayLinkId, "tr", "br", ["beforeShow", "windowResize"], [180, 2]],
                effect: {
                    effect: YAHOO.widget.ContainerEffect.FADE,
                    duration: 0.25
                },
                fixedcenter: false,
                constraintoviewport: false,
                iframe: false,
                monitorresize: false,
                visible: false
            },
            overlay = new YAHOO.widget.Overlay("overlay", overlayConfiguration);
            
        overlay.setHeader("");
        overlay.setBody(msg);
        overlay.render(document.body); 
        YAHOO.util.Dom.addClass("overlay", "overlayStyle");//adds the styling for the overlay
        /* Event listener for toggeling the overlay */
        YAHOO.util.Event.addListener(document, 'click', function(e) {
            BCUS.toggleOverlay(e, overlay, overlayLinkId);
        });
        
    };
    
    /*
    * BCUS.toggleOverlay();
    * Checks if the page element clicked is not the overlay or an ancestor of the overlay. If it is not then it checks if it is the overlay Link,
    * if it is the overlay link it will show or hide the overlay based on the  visible value in the overlay configuration overlay.cfg.getProperty("visible").
    *
    * @params e - page element
    * @params overlay - the overlay that was created by BCUS.createOverlay(), needed for the use of the show() and hide() methods
    * @params overlayLinkId - The overlayLinkId from the overlay that was created by BCUS.createOverlay()
    */
    BCUS.toggleOverlay = function(e, overlay, overlayLinkId) {
        var element = YAHOO.util.Event.getTarget(e),
            overlayElement = YAHOO.util.Dom.get("overlay"),
            showButton = YAHOO.util.Dom.get(overlayLinkId),
            visible = overlay.cfg.getProperty("visible");
        
        if (element != overlayElement && !YAHOO.util.Dom.isAncestor(overlayElement, element)) {
            if (element == showButton) {
                if (!visible) {
                overlay.show();
                } else {
                overlay.hide();
                }
            } else {
                overlay.hide();
            }
        }
            
    }
    
   BCUS.keyRender = function(e) {
      var msg = YAHOO.util.Dom.get("keyText").innerHTML;

      if(!YAHOO.util.Dom.hasClass(this,'keyOn')){
         BCUS.keyPanel = new YAHOO.widget.Overlay("keyPanel", {
            context: [this, "tl", "tr", ["beforeShow", "windowResize"], [-628, 20]],
            fixedcenter: false,
            visible: false,
            width: "650px",
            constraintoviewport:false,
            draggable:false,
            zIndex:9000
         });
         BCUS.keyPanel.setHeader("");
         BCUS.keyPanel.setBody(msg);
         BCUS.keyPanel.render(document.body);
         BCUS.keyPanel.render();
         BCUS.keyPanel.cfg.setProperty("effect",{
            effect: YAHOO.widget.ContainerEffect.FADE,
            duration: 0.25
         });
         YAHOO.util.Dom.addClass("keyPanel", "keyPanel");
         BCUS.keyPanel.align("tl","tr");

      }else {
         BCUS.keyPanel.hide();
      }
   }

   BCUS.keyToggle = function(e) {
      if(YAHOO.util.Dom.get("keyPanel")){
         var el = YAHOO.util.Event.getTarget(e);
         var keyEl = YAHOO.util.Dom.get("keyPanel");
         var keyButtons = YAHOO.util.Dom.getElementsByClassName("keyIcon");
         if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
            if (YAHOO.util.Dom.hasClass(el,"keyIcon")) {
               if (!BCUS.keyPanel.cfg.getProperty("visible") && !YAHOO.util.Dom.hasClass(el,'keyOn')) {
                  BCUS.keyPanel.show();
                  YAHOO.util.Dom.removeClass(keyButtons, "keyOn");
                  YAHOO.util.Dom.addClass(el, "keyOn");
               } else {
                  BCUS.keyPanel.hide();
                  YAHOO.util.Dom.removeClass(el, "keyOn");
               }
            } else {
               BCUS.keyPanel.hide();
               YAHOO.util.Dom.removeClass(keyButtons, "keyOn");
            };
         }
      }

   };
  /*
   BCUS.PAVWarningRender = function(tempPAVDiv,returnReviewButton,exitReviewButton) {

      var Dom = YAHOO.util.Dom;
      var panelPavDiv = document.getElementById('pavDiv');
      panelPavDiv.innerHTML = ' ';



      var msg = tempPAVDiv.innerHTML;

      BCUS.pavPanel = new YAHOO.widget.Panel("pavDiv", {
         fixedcenter: true,
         visible: true,
         width: "400px",
         close: true,
         constraintoviewport:true,
         draggable:false,
         modal: true,
         zIndex:9000
      });

      BCUS.pavPanel.setHeader("");
      BCUS.pavPanel.setBody(msg);
      BCUS.pavPanel.render(document.body);
      if (YAHOO.util.Dom.getElementsByClassName("accountSummaryPage").length){
          YAHOO.util.Dom.addClass("pavDiv_mask", "inAC")
      }
      BCUS.pavPanel.render();
      BCUS.pavPanel.cfg.setProperty("effect",{
         effect: YAHOO.widget.ContainerEffect.FADE,
         duration: 0.25
      });
      YAHOO.util.Dom.addClass("pavPanel", "pavPanel");
      BCUS.pavPanel.align("tl","tr");


      var oCloseButton = new YAHOO.widget.Button("closePopUp");
      if(Dom.get("closePopUp"))
      {
         Dom.addClass(oCloseButton, "green");
      }
      var oExitButton = new YAHOO.widget.Button("exitPopUp");

      //If not on a review page 'Return to review' links to Fraud Review Page and 'Exit review' closes Pop Up.
      if(returnReviewButton == 'fraudDetection')
      {
          if(Dom.get("closePopUp-button"))
          {
            oCloseButton.set("onclick",
            {
                fn: function(e)
                {
                    YAHOO.util.Event.preventDefault(e);
                    window.location.href = returnReviewButton;
                }
            });
            Dom.get('closePopUp-button').focus();
          }
          if(Dom.get("exitPopUp-button"))
          {
            oExitButton.set("onclick",
            {
                fn: function(e)
                {
                    YAHOO.util.Event.preventDefault(e);
                    BCUS.pavPanel.hide();

                    var animAttr = {height: {to: 65}, opacity:{from:0,to:1}}
                    var alertAnim = new YAHOO.util.Anim("alert",animAttr,0.75);
                    if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                        if (YAHOO.util.Dom.get("accountSummaryAlertWrapper") && YAHOO.util.Dom.hasClass("accountSummaryAlertWrapper","hide")){
                            YAHOO.util.Dom.removeClass("accountSummaryAlertWrapper","hide");
                        }
                        if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                            YAHOO.util.Dom.removeClass("alert","hide")
                        }
                        alertAnim.animate();
                    }
                }
            });
          }

          function closeBoxClick(){
              var animAttr = {height: {to: 65}, opacity:{from:0,to:1}}
              var alertAnim = new YAHOO.util.Anim("alert",animAttr,0.75);
              if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                if (YAHOO.util.Dom.get("accountSummaryAlertWrapper") && YAHOO.util.Dom.hasClass("accountSummaryAlertWrapper","hide")){
                    YAHOO.util.Dom.removeClass("accountSummaryAlertWrapper","hide");
                }
                if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                    YAHOO.util.Dom.removeClass("alert","hide");
                }
                alertAnim.animate();
              }
          }
          var getCloseBox = Dom.getElementsByClassName('container-close');
          YAHOO.util.Event.addListener(getCloseBox[0], "click", closeBoxClick);
      }
      else //If on a review page 'Return to review' closes Pop Up and 'Exit review' continues to location user clicked.
      {
          if(Dom.get("closePopUp-button"))
          {
            oCloseButton.set("onclick",
            {
                fn: function(e)
                {
                    YAHOO.util.Event.preventDefault(e);
                    BCUS.pavPanel.hide();
                }
            });
            Dom.get('closePopUp-button').focus();
          }
          if(Dom.get("exitPopUp-button"))
          {
            oExitButton.set("onclick",
            {
                fn: function(e)
                {
                    YAHOO.util.Event.preventDefault(e);
                    window.location.href = exitReviewButton;
                }
            });
          }
      }
      if (!Modernizr.borderradius) {
            BCUS.roundCorners.adjustButtons();
      }
      BCUS.pavPanel.show();
      Dom.get('closePopUp-button').focus();
   }
*/
   //Checks Fraud Pages for clicks other than Fraud Page related
   BCUS.fraudPageClickCheck = function(e) {
      var Dom = YAHOO.util.Dom;
      var Event = YAHOO.util.Event;

      var el= Event.getTarget(e);
      var field= el.id;

      var isFormAncestor = Dom.isAncestor("fraudDetectionForm",el);
      var isTableAncestor = Dom.isAncestor("transactions",el);

      var getAncestorLink = Dom.getAncestorByTagName(el,'a');
      var isAlertLink = Dom.getElementsBy(function(el){return true;},'a', 'alert');
      var aLinks = Dom.getElementsBy(function(el){return true;},'a')
      var isCloseButton = Dom.hasClass(el,"container-close");
      var linkClicked = false;
      var isPopUpClicked = Dom.isAncestor("mainFraudContent",field);
      var isAlertClicked = Dom.isAncestor("alert",el);
      var isReturnToActivityReview = Dom.isAncestor('verification',el);

      if(getAncestorLink)
      {
        var isfraudAlertLink = Dom.getAttribute(getAncestorLink,'href');
      }

      for(var i=0; i<aLinks.length; i++ )
      {
          if(((el == aLinks[i]) || (getAncestorLink == aLinks[i])))
          {
              if(isAlertClicked && (isfraudAlertLink == 'fraudDetection'))
              {
                linkClicked = false;
              }
              else
              {
                linkClicked = true;
              }
          }
      }
      if(((isFormAncestor)&& (!isReturnToActivityReview) && ((field == 'accountLink-button') || (linkClicked) && (!isTableAncestor) ) ) || ((!isPopUpClicked) && (!isFormAncestor) && (linkClicked) &&(!isCloseButton)))
      {
          if(getAncestorLink)
          {
              var getHref = Dom.getAttribute(getAncestorLink,'href');
          }
          else
          {
              var getHref = Dom.getAttribute(el,'href');
          }
          linkClicked = false;
          YAHOO.util.Event.preventDefault(e);

          var callPAVBack = {
            success: function(o)
            {
                var tempPAVDiv = document.createElement("div");
                tempPAVDiv.innerHTML = o.responseText;
                tempPAVDiv = BCUS.getHtmlById(tempPAVDiv,"mainContent",'section');
                BCUS.showOverlay("PAVWarning",tempPAVDiv,{aux1:"close",aux2:getHref});
            },
            failure: function(o)
            {
                //alert ("Failed");
            }
          }
          var url = "Temporary.action?pageName=WEB-INF/view/frauddetection/warningPopUp.jsp";
          var xhr = YAHOO.util.Connect.asyncRequest('GET', url, callPAVBack);
      }
   }

/*
   BCUS.PAVRender = function(tempPAVDiv) {
      var Dom = YAHOO.util.Dom;
      var panelPavDiv = document.getElementById('pavDiv');
      panelPavDiv.innerHTML = ' ';

      var msg = tempPAVDiv.innerHTML;

      BCUS.pavPanel = new YAHOO.widget.Panel("pavDiv", {
         fixedcenter: true,
         visible: true,
         width: "400px",
         close: true,
         constraintoviewport:true,
         draggable:false,
         modal: true
      });

      BCUS.pavPanel.setHeader("");
      BCUS.pavPanel.setBody(msg);
      BCUS.pavPanel.render(document.body);
      if (YAHOO.util.Dom.getElementsByClassName("accountSummaryPage").length){
          YAHOO.util.Dom.addClass("pavDiv_mask", "inAC")
      }
      BCUS.pavPanel.render();
      BCUS.pavPanel.cfg.setProperty("effect",{
         effect: YAHOO.widget.ContainerEffect.FADE,
         duration: 0.25
      });
      YAHOO.util.Dom.addClass("pavPanel", "pavPanel");
      BCUS.pavPanel.align("tl","tr");

      var oReviewButton = new YAHOO.widget.Button("reviewActivity");
      if(Dom.get("reviewActivity"))
      {
         Dom.addClass(oReviewButton, "green");
         Dom.get('reviewActivity-button').focus();
      }

      var oCancelPavButton = new YAHOO.widget.Button("closePopUp",{
         type: "link"
      });
      if(Dom.get("closePopUp"))
      {
         Dom.addClass(oCancelPavButton, "green");
         if(Dom.get("closePopUp-button"))
         {
            Dom.get('closePopUp-button').focus();
         }
         oCancelPavButton.set("onclick",
         {
            fn: function(e)
            {
                YAHOO.util.Event.preventDefault(e);
                BCUS.pavPanel.hide();

                var animAttr = {height: {to: 85}, opacity:{from:0,to:1}}
                var alertAnim = new YAHOO.util.Anim("alert",animAttr,0.75);
                if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                    if (YAHOO.util.Dom.get("accountSummaryAlertWrapper") && YAHOO.util.Dom.hasClass("accountSummaryAlertWrapper","hide")){
                        YAHOO.util.Dom.removeClass("accountSummaryAlertWrapper","hide");
                    }
                    if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                        YAHOO.util.Dom.removeClass("alert","hide")
                    }
                    alertAnim.animate();
                }

            }
         });

         function closeBoxClick(){
              var animAttr = {height: {to: 85}, opacity:{from:0,to:1}}
              var alertAnim = new YAHOO.util.Anim("alert",animAttr,0.75);
              if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                if (YAHOO.util.Dom.get("accountSummaryAlertWrapper") && YAHOO.util.Dom.hasClass("accountSummaryAlertWrapper","hide")){
                    YAHOO.util.Dom.removeClass("accountSummaryAlertWrapper","hide");
                }
                if (YAHOO.util.Dom.hasClass("alert","attention") && YAHOO.util.Dom.hasClass("alert","hide")){
                    YAHOO.util.Dom.removeClass("alert","hide");
                }
                alertAnim.animate();
              }
          }
          var getCloseBox = Dom.getElementsByClassName('container-close');
          YAHOO.util.Event.addListener(getCloseBox[0], "click", closeBoxClick);
      }
      else{

          BCUS.pavPanel.hideEvent.subscribe(function(){

            var callPAVBack = {
                success: function(o)
                {
                    var tempPAVDiv = document.createElement("div");
                    tempPAVDiv.innerHTML = o.responseText;
                    tempPAVDiv = BCUS.getHtmlById(tempPAVDiv,"mainContent",'section');
                    BCUS.PAVWarningRender(tempPAVDiv,"fraudDetection","close");
                },
                failure: function(o)
                {
                    alert ("Failed");
                }
            }
            var url = "Temporary.action?pageName=WEB-INF/view/frauddetection/warningPopUp.jsp";
            var xhr = YAHOO.util.Connect.asyncRequest('GET', url, callPAVBack);
          });
      }

      if (!Modernizr.borderradius) {
            BCUS.roundCorners.adjustButtons();
      }
      //BCUS.pavPanel.hideEvent();

      BCUS.pavPanel.show();
   }
*/
   BCUS.deleteRender = function(sUrlElement,tempDiv) {
      document.getElementById('acctDel').innerHTML = ' ';
      var msg = tempDiv.innerHTML;

      BCUS.deletePanel = new YAHOO.widget.Overlay("acctDel", {
         context: [sUrlElement, "tl", "tr", ["beforeShow", "windowResize"], [-360, 20]],
         fixedcenter: false,
         visible: false,
         width: "390px",
         constraintoviewport:false,
         draggable:false,
         zIndex:9000
      });

      BCUS.deletePanel.showEvent.subscribe(function(){
          var bd = YAHOO.util.Dom.get("bd");
          YAHOO.util.Dom.addClass(bd,"deleteAccountOpen");
      });

      BCUS.deletePanel.setHeader("");
      BCUS.deletePanel.setBody(msg);
      BCUS.deletePanel.render(document.body);
      BCUS.deletePanel.render();
      BCUS.deletePanel.cfg.setProperty("effect",{
         effect: YAHOO.widget.ContainerEffect.FADE,
         duration: 0.25
      });
      YAHOO.util.Dom.addClass("deletePanel", "deletePanel");
      BCUS.deletePanel.align("tl","tr");
      var Button = YAHOO.widget.Button,
      Dom = YAHOO.util.Dom;
      var oDeleteButton = new Button("deleteAccountConfirmed");
      if(Dom.get("deleteAccountConfirmed"))
      {
         Dom.addClass(oDeleteButton, "green");
      }
      var oCancelButton = new YAHOO.widget.Button("deleteAccountCanceled",{
         type: "link"
      });
      if (!Modernizr.borderradius) {
            BCUS.roundCorners.adjustButtons();
      }
      oCancelButton.set("onclick",
      {
         fn: function(e)
         {
            YAHOO.util.Event.preventDefault(e);
            BCUS.deletePanel.hide();
         }
      });
      BCUS.deletePanel.show();
   }
/*
   BCUS.activateRender = function(tempDiv) {
      Dom = YAHOO.util.Dom;
      var panelDiv = document.getElementById('activateCardPanel');
      panelDiv.innerHTML = ' ';
      var msg = tempDiv.innerHTML;

      BCUS.activateCardPanel = new YAHOO.widget.Panel("activateCardPanel", {
          width: "400px",
          fixedcenter: true,
          constraintoviewport: true,
          close: true,
          visible: true,
          modal: true,
          underlay:"none",
          zIndex:4,
          draggable: false
      });

      BCUS.activateCardPanel.setHeader("");
      BCUS.activateCardPanel.setBody(msg);
      var animAttr = {height: {to: 65}, opacity:{from:0,to:1}}
      var alert = YAHOO.util.Dom.getElementsByClassName("attention","div","accountSummaryAlertWrapper");
      var alertAnim = new YAHOO.util.Anim(alert,animAttr,0.75);
      alertAnim.onComplete.subscribe(function(){

      });
      BCUS.activateCardPanel.hideEvent.subscribe(function(){
          if (alert){
              YAHOO.util.Dom.addClass(alert,"alertHidden");
             YAHOO.util.Dom.removeClass("accountSummaryAlertWrapper","hide");
             alertAnim.animate();
          }
      });
      BCUS.activateCardPanel.render(document.body);
      BCUS.activateCardPanel.render();
      BCUS.activateCardPanel.cfg.setProperty("effect",{
         effect: YAHOO.widget.ContainerEffect.FADE,
         duration: 0.25
      });
      var hd = YAHOO.util.Dom.getElementsByClassName("hd","div",panelDiv);
      var action = YAHOO.util.Dom.getAttribute("activateCardForm", "action");
      YAHOO.util.Dom.setAttribute("activateCardForm", "action",action + "?activatedFromPanel=true");
      YAHOO.util.Dom.addClass(hd,"hide");
      YAHOO.util.Dom.addClass("activateCard", "activateCard");
      YAHOO.util.Dom.addClass("help","hide");
      YAHOO.util.Dom.addClass("pageLine","hide");
      YAHOO.util.Dom.removeClass("boxLine","hide");
      YAHOO.util.Dom.removeClass("activateCardPageTitle","pageTitle");
      YAHOO.util.Event.on("activateCardForm", "focusin", BCUS.toolTip);
      YAHOO.util.Event.on(YAHOO.util.Dom.getElementsByClassName("validate"), "focusout",BCUS.validate.execute,{beanclass:"com.barclaycardus.app.cws.action.ActivateCardActionBean"});
      //Create input box focus borders for older versions of IE
      function ie7borders(){
        var oFormElement = YAHOO.util.Dom.getElementsByClassName('inputBox', 'input',"activateCardForm");
        debugger;
        for (var i in oFormElement){
            var elem = oFormElement[i];
            elem.showBorder = function (e) {YAHOO.util.Dom.addClass(this,"blueBorder");}
            elem.hideBorder = function (e) {YAHOO.util.Dom.removeClass(this,"blueBorder");}
            YAHOO.util.Event.addListener(elem, 'focusin', elem.showBorder);
            YAHOO.util.Event.addListener(elem, 'focusout', elem.hideBorder);
        }
      }
      if (YAHOO.env.ua.ie > 0 && YAHOO.env.ua.ie < 8){
        ie7borders();
      }
      var focusField = YAHOO.util.Dom.get("ssnDigit1");
      focusField.focus();
      BCUS.activateCardPanel.align("tl","tr");
      var Button = YAHOO.widget.Button;

      var oActivateCardButton = new Button("continueButton");
      if(Dom.get("continueButton"))
      {
         Dom.addClass(oActivateCardButton, "green");
      }

      var oCancelButton = new YAHOO.widget.Button("cancelButtonPanel",{
         type: "link"
      });
      oCancelButton.set("onclick",
      {
         fn: function(e)
         {

            YAHOO.util.Event.preventDefault(e);
            BCUS.activateCardPanel.hide();
         }
      });

      BCUS.activateCardPanel.show();
      BCUS.activatePanelAutotab();

   }*/

   BCUS.activatePanelAutotab = function(){
    var Event = YAHOO.util.Event,
        Dom = YAHOO.util.Dom;

    BCUS.namespace("autotab");

    BCUS.autotab.hasPreviousValue = false;

    BCUS.autotab.fields = Dom.getElementsByClassName(
        "autotab", "input"
    );

    if(BCUS.autotab.fields.length) {
        Event.on(BCUS.autotab.fields, "focus", function(e) {
            /*
             * When we shift-tab, or refocus on a field that will autotab, check to
             * see if the field has a value equal to its maxlength. This will suppress
             * the resulting onkeyup event in the field, otherwise we can never refocus on
             * a field with a value.
             */

            if(this.value.length == this.maxLength) {
                BCUS.autotab.hasPreviousValue = true;
            }

            if(Dom.hasClass(this,"dim")) {
                Dom.removeClass(this,"dim");
                this.value = "";
            }
        });

        Event.on(BCUS.autotab.fields, "keyup", function(e) {
            /*
             * Create a regular expression to match on the first 3 characters of the
             * current field name. This is used so that autotab does not go to the
             * next field in the array provided in BCUS.autoTabFields.
             */
            var reName = new RegExp("^"+this.name.substring(0,3));

            /*
             * If onkeyup the value is not equal the maxLength, reset the state of
             * hasPreviousValue so that we can autotab
             */
            if(this.value.length != this.maxLength) {
                BCUS.autotab.hasPreviousValue = false;
            }

            /*
             * Now, with each keyup event, check the length of the field, then advance
             * to the next field in the fieldset denoted by the regex of the field name.
             */
            if(!BCUS.autotab.hasPreviousValue && (this.value.length == this.maxLength)) {
                for(var el in BCUS.autotab.fields) {
                    if(BCUS.autotab.fields[el].tabIndex == (this.tabIndex+1) && reName.test(BCUS.autotab.fields[el].name)){
                        BCUS.autotab.fields[el].focus();
                    }
                }
            }

        });
    }
};

   BCUS.getHtmlById = function(el,id,tag)
   {
      var e;
      e = YAHOO.util.Dom.getElementBy(function(el)
      {
         return (el.id === id);
      },tag,el);
      //if we timeout we dont want the page to slide in so we have to redirect to it
      if(YAHOO.util.Dom.hasClass(e , "timeoutSection"))
      {
         window.location = "timeout";
      }

      return e.parentNode;
   }

   function set_matching_word(selectObj, txtObj)
   {
      var letter = txtObj.value;

      for(var i = 0; i < selectObj.length; i++)
      {
         if(selectObj.options[i].value == letter)
            selectObj.selectedIndex = i;
      }
   }
   YAHOO.util.DataSource.Parser.currency = function(cur){
      if(YAHOO.lang.isString(cur)){
         cur = cur.replace(/^[^0-9\-\.]+|,/g,'');
      } else if(!YAHOO.lang.isNumber(cur)){
         return 0;
      }
      return parseFloat(cur);
   };

   BCUS.alertBoxAnimate = function(e) {
      var el= YAHOO.util.Event.getTarget(e);
      var thisAlert = el.parentNode;
      var thisAlertBox = null;
      for(var el1 = el; YAHOO.util.Dom.getNextSibling(el1) ; el1 = YAHOO.util.Dom.getNextSibling(el1)){
          if (YAHOO.util.Dom.getNextSibling(el1).id == "AlertBox"){
              thisAlertBox = YAHOO.util.Dom.getNextSibling(el1);
              break;
          }
      }

      var anim_up = new YAHOO.util.Anim(thisAlert, {
         height: {
            to: 0
         }
      }, .4, YAHOO.util.Easing.easeOut);
      //height doesn't include padding-top so do that separately

      var padding_anim = new YAHOO.util.Anim(thisAlert, {
         paddingTop: {
            to: 0
         }
      }, .4, YAHOO.util.Easing.easeOut);

      var margin_anim = new YAHOO.util.Anim(thisAlert, {
         marginBottom: {
            to: 0
         }
      }, .4, YAHOO.util.Easing.easeOut);

      var anim_fadeOut = new YAHOO.util.Anim(thisAlertBox, {
         opacity: {
            to: 0
         }
      }, .2);
      var foCloseButton = new YAHOO.util.Anim(el, {
         opacity: {
            to: 0
         }
      }, .2);

      anim_fadeOut.animate();
      foCloseButton.animate();
      padding_anim.animate();
      margin_anim.animate();
      anim_up.animate();

      //CUstom code to make open errorpanels animate as well
      if (YAHOO.util.Dom.get("accountProtectorForm") || YAHOO.util.Dom.get("enrollPaperlessForm") || YAHOO.util.Dom.get("fraudDetectionForm") || YAHOO.util.Dom.get("termsForm") || YAHOO.util.Dom.get("registerAndLinkTravelCommunityForm")){
          var elems = YAHOO.util.Dom.getElementsByClassName("error","div")
          if (elems){
            var attributes = {
               top: {by: -87, unit:'px'}
            };
            for (var i=0; i<elems.length; i++){
                if (elems[i].id=="card1_ErrorPanel" || elems[i].id=="canPrintVerification_ErrorPanel" || elems[i].id=="checkTerms_ErrorPanel" || elems[i].id=="isCaseConfirmed_ErrorPanel" || elems[i].id=="stopPaperStmts_ErrorPanel" || elems[i].id=="agreeToTermsCheckbox_ErrorPanel"){
                    var a= new YAHOO.util.Anim(elems[i], attributes,.4, YAHOO.util.Easing.easeOut);
                    a.animate();
                }
            }
          }
      }
   }

   BCUS.namespace("formatDataTable");
   BCUS.namespace("formatDataTable.Date");
   BCUS.namespace("formatDataTable.DateTime");

   BCUS.formatDataTable.Date = function (el, oRecord, oColumn, oData) {
      el.innerHTML = YAHOO.util.Date.format( oData, {
         format: "%m/%d/%y"
      });
   }

   BCUS.formatDataTable.DateTime = function (el, oRecord, oColumn, oData) {
      el.innerHTML = YAHOO.util.Date.format( oData, {
         format: "%m/%d/%y %I:%M %p"
      });
   }

   /**
    * Passmark Carousel implementation for security image
    *
    * @method
    * @static
    * @param
    */
   //Setup a namespace to contain your own code within the BCUS namespace
   BCUS.namespace("passmark");
   var carousel = null;
   var curpos, items = [];


   function getImageTag(img) {

      return "<img type='passmarkImage' src=\"" + img + "\" alt=\"" + img + "\" >";
   }
   function getCallback(arg1_cat, arg2_start, arg3_end) {
      var carousel = this,
      curpos = arg2_start;

      YAHOO.util.Connect.asyncRequest("GET",
         "login?getPassmarkImages=getPassmarkImages&from="+arg2_start+"&to="+arg3_end+"&category="+arg1_cat, {
            success: function (o) {

               var i = curpos,
               j = 0,
               r = eval('(' + o.responseText + ')'),
               item,
               loadingItems;

               curpos += r.length;

               while (i < curpos) {

                  if (r[j]) {

                     item = getImageTag(r[j]);
                     loadingItems = carousel.getLoadingItems();

                     if(loadingItems[i]){
                        // use replaceItem to swap out each placeholder item on the previous page and allow for backwards navigation
                        carousel.replaceItem(item,i);
                     } else {
                        carousel.addItem(item);
                     }

                  } else {
                     break;
                  }
                  i++;
                  j++;
               }

            },

            failure: function (o) {
               alert("Ajax request failed!");
            }
         });
   }

   function getOnLoad(arg1_cat, arg2_start, arg3_end) {
      var carousel = this;
      YAHOO.util.Connect.asyncRequest("GET",
         "login?getPassmarkImages=getPassmarkImages&from="+arg2_start+"&to="+arg3_end+"&category="+arg1_cat, {
            success:function(o) {
               try {
                  var i, r = eval('(' + o.responseText + ')');

                  curpos = r.length;

                  for (i = 0; i < curpos; i++) {
                     items.push(r[i]);
                  }

                  // check if the Carousel widget is available
                  if (typeof carousel != "undefined") {
                     for (i = 0; i < curpos; i++) {
                        // if so, shove the elements into it
                        carousel.addItem(getImageTag(items[i]));
                     }

                     carousel.set("selectedItem", carousel.get("firstVisible"));
                     items = [];
                  }
               } catch (e) {
                  alert("The feed did not return any images."+e);
                  return;
               }
            },
            failure:function(o) {
               alert("Failure on getCallback()");
            }
         });
   }
   // Get the image link from within its (parent) container.
   function getImage(parent) {
      var el = parent.firstChild;

      while (el) {  // walk through till as long as there's an element
         if (el.nodeName.toUpperCase() == "IMG") { // found an image
            // flickr uses "_s" suffix for small, and "_m" for big images respectively
            return el.src.replace(/_s\.jpg$/, "_m.jpg");
         }
         el = el.nextSibling;
      }

      return "";
   }

   BCUS.passmark.Carousel = {
      carousel: '',
      init: function(arg1_size, arg3_cat, arg3_start, arg4_end, maxPage)
      {

         YAHOO.util.Dom.get("carouselContainer").innerHTML = "";
         carousel = new YAHOO.widget.Carousel("carouselContainer", {
            autoPlayInterval: 2000,
            isCircular: false,
            animation: {
               speed: 0.5
            },
            numItems: arg1_size,
            numVisible: [5,3]
         });

         var numVisible = 15;
         var numItemStart = 0;
         var numItemEnd = 15;


         paginator = new YAHOO.widget.Paginator({
            containers: "pagination",
            rowsPerPage : numVisible,
            totalRecords: arg1_size,
            pageReportTemplate    : "Page {currentPage} of {totalPages}",
            template: "{PreviousPageLink} <strong>{CurrentPageReport}</strong> {NextPageLink}",
            // Options for PreviousPageLink component
            previousPageLinkLabel : "&nbsp;&nbsp;&nbsp;&nbsp;Previous",
            previousPageLinkClass : "yui-pg-previous", // default
            previousPageLinkTitle : "Previous Page",   // default
            // Options for NextPageLink component
            nextPageLinkLabel     : "Next&nbsp;&nbsp;&nbsp;&nbsp;",
            nextPageLinkClass : "yui-pg-next", // default
            nextPageLinkTitle : "Next Page"   // default
         });

         carousel.paginator;
         //look at the 2 following dunction for defects
         paginator.subscribe("changeRequest", function (state) {
            var grabDropMenu = YAHOO.util.Dom.getElementsByClassName("yui-menu-button-menu");
            YAHOO.util.Dom.setStyle(grabDropMenu, 'visibility', 'hidden');
            carousel.set("selectedItem", (state.page - 1) * numVisible);
            paginator.setState(state);

         });

         carousel.on("pageChange", function (page) {
            if (maxPage >= (page) && ((page+1) % maxPage)< 1) {
               maxPage = maxPage +1;
               numItemStart = numItemStart + numVisible;
               numItemEnd = numItemEnd + numVisible;
               getCallback.call( carousel,  arg3_cat, numItemStart, numItemEnd);
            }
            paginator.setPage(page + 1, true);
         });

         carousel.on("click", function (ev) {
            var item = ev.target.getAttribute("alt");
            if(ev.target.getAttribute("type") == "passmarkImage") {
               var passmarkHidden = document.getElementById("passmarkImage");
               var imgPlaceholder = YAHOO.util.Dom.getElementsByClassName("bar");
               YAHOO.util.Dom.setAttribute(imgPlaceholder, "src", item);
               YAHOO.util.Dom.setAttribute(passmarkHidden, "value", item);
               YAHOO.util.Dom.setStyle("browseImagesPanel", 'visibility', 'hidden');
               YAHOO.util.Dom.get("carouselContainer").innerHTML = ""
            }
         });
         if(YAHOO.util.Dom.getElementsByClassName("yui-menu-button") != "")
         {
            YAHOO.util.Event.on("menubutton-c-button", "click", BCUS.MenuButtonToggle);
         }


         carousel.render(); // get ready for rendering the widget
         carousel.show();    // display the widget
         paginator.render(); // rendering paginator
         carousel.addListener(document, "beforeShow", getOnLoad.call(carousel, arg3_cat, arg3_start, arg4_end));

      }

   }
   BCUS.BrowseImagesPanelToggle = {
      init: function (ImagesPanel ,Imagebutton, carouselContainer) {
         YAHOO.util.Event.on(document, "click", function (ev) {
            var el = YAHOO.util.Event.getTarget(ev);
            var grabPanel = YAHOO.util.Dom.get(ImagesPanel);
            if(el == BCUS.browseImagesPanel || YAHOO.util.Dom.isAncestor( ImagesPanel, el) ){
            //do nothing.
            }
            else if (YAHOO.util.Dom.generateId(el) == Imagebutton && YAHOO.util.Dom.getStyle(ImagesPanel, 'visibility') == "hidden") {

               YAHOO.util.Dom.setStyle(grabPanel, 'visibility', 'visible');
            //               BCUS.browseImagesPanel.show();
            } else {

               YAHOO.util.Dom.setStyle(grabPanel, 'visibility', 'hidden');
               YAHOO.util.Dom.get(carouselContainer).innerHTML = "";
            //               BCUS.browseImagesPanel.hide();
            }
         });
      }
   }
   BCUS.MenuButtonToggle = function(e) {
      var el= YAHOO.util.Event.getTarget(e);
      if(YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button'))
      {
         el = YAHOO.util.Dom.getAncestorByClassName(el,'yui-menu-button');
      }
      var field = el.id;

     /* Checks to see if field is a menu button */
      var hasMenu = YAHOO.util.Dom.hasClass(field,"yui-menu-button");

      if(hasMenu) {
         var renderDropMenu = YAHOO.util.Dom.getNextSibling(field);
      }

     YAHOO.util.Event.on(document, "click", function (ev) {
         var el2 = YAHOO.util.Event.getTarget(ev);
         if(YAHOO.util.Dom.getAncestorByClassName(el2,'yui-menu-button'))
         {
            el2 = YAHOO.util.Dom.getAncestorByClassName(el2,'yui-menu-button');
         }
      if(el == el2)
      {
         YAHOO.util.Dom.setStyle(renderDropMenu, 'visibility', 'visible');
         YAHOO.util.Dom.removeClass(renderDropMenu, 'yui-overlay-hidden');
         YAHOO.util.Dom.addClass(renderDropMenu, 'visible');
         YAHOO.util.Dom.setStyle(renderDropMenu, 'z-index', '2');
      }
      else {
         YAHOO.util.Dom.setStyle(renderDropMenu, 'visibility', 'hidden');
         YAHOO.util.Dom.removeClass(renderDropMenu, 'yui-overlay-visible');
         YAHOO.util.Dom.addClass(renderDropMenu, 'hidden');
         YAHOO.util.Dom.setStyle(renderDropMenu, 'z-index', '1');
      }
     });
   }

   BCUS.isNumberOrLetterKey= function(e)
   {
      var keynum;
      var keychar;
      var numcheck;
      keynum = (window.event)?e.keyCode:
      (e.which)?e.which:0;
      if (keynum==0) {
         keynum = e.keyCode;
         if (keynum==37||keynum==39) return true;
      }
      if (keynum==08||keynum==13||keynum==46) return true;
      keychar = String.fromCharCode(keynum);
      numcheck = /[0-9A-Za-z\t ]/;
      return numcheck.test(keychar);
   }

    /**
    * IFrame Height Resize
    *
    * @method
    * @static
    * @param
    */
   //Setup a namespace to resize IFrame
   BCUS.resizeIframe =  function(height){
      if (height != "") {
         document.getElementById("IFrameResize").height = parseInt(height);
      }
   }

   /**
    * Placeholder text for Inputs
    *
    */
    BCUS.placeholderText = function(attr){
            var inp = YAHOO.util.Dom.get(attr.el);
            YAHOO.util.Event.addListener(inp, "focusin", BCUS.removeDim,inp,true);
            YAHOO.util.Event.addListener(inp,  "focusout", BCUS.checkDim,inp,true);
            if (inp.value == "" || inp.value == YAHOO.util.Dom.getAttribute(inp, "placeholder")){
                if (Modernizr.input.placeholder) {
                    // your placeholder text should already be visible!
                } else {
                    if(inp.value == ''){
                        inp.value = attr.txt;
                    }
                    inp.blur();



                };
            }
            else{
                YAHOO.util.Dom.removeClass(inp,"dim");
            }
            YAHOO.util.Event.addListener(attr.el,'focusin',BCUS.clearInput);
    }

    BCUS.checkDim = function() {
        var element = new YAHOO.util.Element(this.id);
        var idValue = element.get('value');
        if (idValue == "" || idValue == YAHOO.util.Dom.getAttribute(this, "placeholder")){
            if (!Modernizr.input.placeholder){
                this.value = YAHOO.util.Dom.getAttribute(this, "placeholder");
            }
           if (!YAHOO.util.Dom.hasClass(this.id,"dim")) {
            YAHOO.util.Dom.addClass(this.id, "dim");
           }

        }
    }

    BCUS.removeDim = function() {
       if (YAHOO.util.Dom.hasClass(this.id,"dim")) {
        YAHOO.util.Dom.removeClass(this.id, "dim");
       }
       if (this.value == YAHOO.util.Dom.getAttribute(this,"placeholder")){
           this.value = "";
       }
    }

    BCUS.validateDate = function(d){
        var arr = d.split("/");
        var mo = Number(arr[0]);
        var day = Number(arr[1]);
        var y = Number(arr[2]);
        var maxday;
        switch (mo){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                maxday = 31;
                break;
            case 2:
                maxday = y%4 == 0 ? 29 : 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                maxday = 30;
                break;
            default:
                return false;
                break;
        }
        if (day > 0 && day <= maxday){
            return true;
        }
        else{return false;}
    }
    
    BCUS.setupPreventDoubleSubmit = function(){
        YAHOO.util.Event.addListener(document.body, "keypress", BCUS.preventDoubleSubmit);
        BCUS.thisform = YAHOO.util.Dom.getElementBy(function(){return true;},"form");
        if (BCUS.thisform){
            YAHOO.util.Event.on(BCUS.thisform,"focusin",function(e){
                YAHOO.util.Dom.addClass(BCUS.thisform,"formFocused");
            });
            YAHOO.util.Event.on(BCUS.thisform,"focusout",function(e){
                YAHOO.util.Dom.removeClass(BCUS.thisform,"formFocused");
            });
        }
        var btns = YAHOO.util.Dom.getElementsByClassName("sButton");
        for(var i=0; i<btns.length; i++){
            var btn = btns[i];
            YAHOO.util.Event.addListener(btn,"click",function(e){
                if (BCUS.formSubmitted) {
                        YAHOO.util.Event.preventDefault(e);
                        return false;
                } else {
                        BCUS.formSubmitted = true;
                        if (btn.id == "loginButton"){
                            YAHOO.util.Dom.get(btn.id + "-button").disabled = true;
                            //setTimeout(function(){YAHOO.util.Dom.get(btn.id + "-button").disabled = false; alert(YAHOO.util.Dom.get(btn.id + "-button").disabled);}, 1500)
                        }
                        return true;
                }
            });
        }
        
    };
    
    BCUS.formSubmitted = false;
   
    BCUS.preventDoubleSubmit = function(e){
        var key;
        if (window.event) {
                key = window.event.keyCode;
        } else {
                key = e.which;
        }
        if (key == 13 && BCUS.thisform && YAHOO.util.Dom.hasClass(BCUS.thisform,"formFocused")) {
                if (BCUS.formSubmitted) {
                        YAHOO.util.Event.preventDefault(e);
                        return false;
                } else {
                        var elem = YAHOO.util.Event.getTarget(e);
                        if (!(YAHOO.env.ua.ie > 0 && (elem.type == "button" || elem.nodeName == "A" )) && elem.nodeName.toLowerCase() != "input"){
                            BCUS.formSubmitted = true;
                        }
                        return true;
                        
                }
        }
	
    }
    
    BCUS.redeemRewardsOverlay = function(e) {
    
    YAHOO.util.Event.preventDefault(e);
    
    var el = YAHOO.util.Event.getTarget(e);
    var getHref = Dom.getAttribute(el,'href');
    
    
      if(!YAHOO.util.Dom.hasClass("redeemRewardsPanelId", "rdmRwdOn")){
        BCUS.RedeemRewardsPanel = new YAHOO.widget.Panel("RedeemRewardsPanel",{
        visible:true,
        width:"460px",
        height:"235px",
        constraintoviewport: false,
        draggable:false,
        close:false,
        fixedcenter: true,
        modal: true,
        underlay:"none",
        zIndex:9000,
        effect:{
                effect:YAHOO.widget.ContainerEffect.FADE,
                duration:0.25
         }
    });
                                        
    var checkbox = new YAHOO.widget.Button("redeemRwdsDontShowCkBox", {
        type: "checkbox"
    });
                                        
    var learnHow = new YAHOO.widget.Button("learnHow", {
        type: "link"
    });
    var continueToPartner = new YAHOO.widget.Button("continueToPartner", {
        type: "link"
    });
                        
    continueToPartner.set("onclick",
    {
        fn: function(e){
            YAHOO.util.Event.preventDefault(e);
            
            if(checkbox.get("checked")==true){       
                var xhr = YAHOO.util.Connect.asyncRequest("GET", "Rewards.action?setRedeemRewardsIntercept", goToPartnerSiteAjax); 
                YAHOO.util.Event.removeListener(document, "click",BCUS.redeemRewardPanelToggle);
                YAHOO.util.Event.removeListener("redeemRewardsPanelId", "click",BCUS.redeemRewardsOverlay);
            }
                                
            BCUS.popwin(getHref,  {
                width: '800', 
                height: '600', 
                scrollbars:true,
                toolbars:true,
                resizable:true,
                menubar:true,
                status:true,
                location:true,
                target:''
            });
           
           BCUS.RedeemRewardsPanel.hide();
           YAHOO.util.Dom.removeClass("redeemRewardsPanelId", "rdmRwdOn");
        }
    });

    learnHow.set("onclick",
    {
        fn: function(e){
            YAHOO.util.Event.preventDefault(e);
           if(checkbox.get("checked")==true){       
                var xhr = YAHOO.util.Connect.asyncRequest("GET", "Rewards.action?setRedeemRewardsIntercept", learnHowAjax); 
                YAHOO.util.Event.removeListener(document, "click",BCUS.redeemRewardPanelToggle);
                YAHOO.util.Event.removeListener("redeemRewardsPanelId", "click",BCUS.redeemRewardsOverlay);
            }
                                
            window.location.href="Rewards.action?updatePartnerProfile";
        }
    });

    if(YAHOO.util.Dom.get("learnHow")){
        YAHOO.util.Dom.addClass(learnHow, "green");
    }
    var learnHowAjax = {
        success:function(o) {
            window.location.href="Rewards.action?updatePartnerProfile";
        },
        failure:function(o) {}
    }
                        
    var goToPartnerSiteAjax = {
        success:function(o) {
            BCUS.popwin(getHref,  {
                width: '800', 
                height: '600', 
                scrollbars:true,
                toolbars:true,
                resizable:true,
                menubar:true,
                status:true,
                location:true,
                target:''
            });
        },
        failure:function(o) {}
    }
                    
    BCUS.RedeemRewardsPanel.render(document.body);
    YAHOO.util.Dom.removeClass("redeemRewardsPanelId", "hide");
    BCUS.RedeemRewardsPanel.show();
    YAHOO.util.Event.removeListener("redeemRewardsPanelId", "click",BCUS.redeemRewardsOverlay);
    YAHOO.util.Event.addListener(document, "click",BCUS.redeemRewardPanelToggle);
      }
}





BCUS.redeemRewardPanelToggle = function(e) {
            
       if(BCUS.RedeemRewardsPanel){
             var el = YAHOO.util.Event.getTarget(e);
             var keyEl = YAHOO.util.Dom.get("RedeemRewardsPanel");
             var keyButtons = YAHOO.util.Dom.get("redeemRewardsPanelId");
          //   var listeners = YAHOO.util.Event.getListeners(document, "click");
                //     alert(" listners.length = "  + listeners.length + " i = " + i.valueOf());
              //      for (var i=0; i<listeners.length; ++i) {
                 //     var listener = listeners[i];
                //       alert(" listners.length = "  + listeners.length + " i = " + i.valueOf());
                //       alert( "type =  " + listener.type   ); // The event type
                //      alert("listners.length = "  + listeners.length + " i = " + i.valueOf() + " function to execute = " + listener.fn     ); // The function to execute
                   //alert("type =  " +  listener.obj    ); // The custom object passed into addListener
                   //alert("type =  " +  listener.adjust ); // Scope correction requested, if true, listener.obj
                              // is the scope, if an object, that object is the scope
             //    }
             
             
             if (el != keyEl && !YAHOO.util.Dom.isAncestor(keyEl, el)) {
                if ((el == keyButtons || YAHOO.util.Dom.isAncestor(keyButtons,el)) && !YAHOO.util.Dom.hasClass("redeemRewardsPanelId", "rdmRwdOn")) {
                   YAHOO.util.Event.preventDefault(e);
                   BCUS.RedeemRewardsPanel.show();
                   YAHOO.util.Dom.addClass("redeemRewardsPanelId", "rdmRwdOn");
                } 
                         
             }
       }
}
//Purpose: Get ads for account summary page
BCUS.getAds = function(overlayContentId){
    try {
        var callback = {
            success: function(o) {
                try {
                    //create container for divs from ajax call
                    var responseContainer = document.createElement("div");
                    //put ads in container
                    responseContainer.innerHTML = o.responseText;
                    //create collection of all divs in container
                    var divs = responseContainer.getElementsByTagName("div");
                    //set the innerHTML of each ad location to that of the corresponding ad in the responseContainer
                    //e.g. if we only have 4 ads in the ajax call, we will only look for 4 ad location divs
                    for (i=0; i<divs.length; i++) {               
                        //check to see if the ad div to house our ad is on the page
                        //then set the innerHTML
                        if (YAHOO.util.Dom.get(divs.item(i).getAttribute("data-location"))) {
                            YAHOO.util.Dom.get(divs.item(i).getAttribute("data-location")).innerHTML = divs.item(i).innerHTML;
                        }                        
                        //for modal ads via AJAX, check for existence of modal data-adtype AND that content exists
                        //if there is no ad content, we will still have a text child node with spaces from interwoven content
                        //IE does not count text nodes, therefore if non-IE, a child node count > 1 will indicate we have
                        //ad content. For IE, it will be > 0. As a result, we will just look for a div element
                        
                        if (divs.item(i).getAttribute("data-adtype") == "modal" && divs.item(i).getElementsByTagName('div').length > 0 ) {
                            //create temporary div
                            var adContainer = document.createElement("div");
                            //set innerHTML of temporary div to ad content
                            adContainer.innerHTML = divs.item(i).innerHTML;
                            BCUS.showOverlay("adServerModalAjax", adContainer);
                        }                        
                    }
                    
                    
                }
                catch(err) {
                    //console.log("BCUS.getAds: ad placement failed: " + err);
                }    
            },                  
            failure: function() {
                //console.log("BCUS.getAds: ajax call failed: " + err);
            }
        }
        //URL servicing/Ad?overlayContentId=
        var ajaxURL = "Ad?overlayContentId=" + overlayContentId;
        YAHOO.util.Connect.asyncRequest('GET',ajaxURL,callback);        
    }
    catch(err){    
        //console.log("BCUS.getAds failed: " + err);
    }

}

//Purpose: Send tracking data for modal ads
//URL: //Ad?updateTrackingInformation&accepted=true
//Accepted flag is false for close (x) and no thanks buttons.
BCUS.sendModalAdTracking = function(accepted){
    try {
        var callback = {
            success: function() {       
                //console.log("BCUS.sendModalAdTracking: tracking sent");
            },                  
            failure: function() {
                //console.log("BCUS.sendModalAdTracking: ajax call failed: " + err);
            }
        }
        //
        var ajaxURL = "Ad?updateTrackingInformation&accepted=" + accepted;
        YAHOO.util.Connect.asyncRequest('GET',ajaxURL,callback);        
    }
    catch(err){    
        //console.log("BCUS.sendModalAdTracking failed: " + err);
    }

}

BCUS.showOverlay = function(type, tempDiv, auxData){
      Dom = YAHOO.util.Dom;
      var panelDiv = document.getElementById('overlayContainer');
      var msg = false;
      //if passing temp div, use that content
      //otherwise use content from overlayContainer
      if (tempDiv){
        panelDiv.innerHTML = ' ';
        msg = tempDiv.innerHTML;
      }
      else{
          msg = panelDiv.innerHTML;
      }
      var attr = {
          width:"400px",
          fixedcenter: true,
          constraintoviewport: true,
          close: true,
          visible: true,
          modal: true,
          underlay:"none",
          zIndex:4,
          draggable: false
      };
      switch(type){
        case "PAV":
            
        break;
        case "PAVWarning":
            
        break;
        case "photoId":
            attr.width = "330px";            
        break;
        case "activateCard":

        break;
        case "adServerModal":            
        case "adServerModalAjax":
            attr.width = "600px";            
        break;
        default:
        break;
      }
      Dom.addClass(Dom.getElementsByClassName("alertBox"),"hide");
      //When creating a panel from existing content (non-AJAX), YUI
      //has an issue with allocating image space (used for height/center calculation)
      //from within nested content. So, we need to create the panal from the parent div
      if (type == "adServerModal") {
          BCUS.overlayPanel = new YAHOO.widget.Panel("adModalContainer", attr);
      } else {
          BCUS.overlayPanel = new YAHOO.widget.Panel("overlayContainer", attr);          
      }
      
      if (msg){
         BCUS.overlayPanel.setBody(msg);
      }
      else{
          
      }
      
      BCUS.overlayPanel.render(document.body);
      BCUS.overlayPanel.render();
      BCUS.overlayPanel.cfg.setProperty("effect",{
         effect: YAHOO.widget.ContainerEffect.FADE,
         duration: 0.25
      });
      
      BCUS.overlayPanel.align("tl","tr");
      BCUS.overlayInit(type, auxData);
      Dom.addClass("overlayContainer",type)
      if (!auxData || (auxData && !auxData.ensuingOverlay)){
          BCUS.overlayPanel.hideEvent.subscribe(function(){
              Dom.removeClass(Dom.getElementsByClassName("alertBox"),"hide");
              if (Dom.get("accountSummaryAlertWrapper")){
                  Dom.removeClass("accountSummaryAlertWrapper","hide");
              }
          });
      }
      else{
          
      }
  }
  
         
  BCUS.overlayInit = function(type,auxData){
        var Dom = YAHOO.util.Dom;
        Dom.addClass(Dom.getElementsByClassName("alertBox"),"hide");
        switch(type){
            case "PAV":
              if (YAHOO.util.Dom.getElementsByClassName("accountSummaryPage").length){
                  YAHOO.util.Dom.addClass("pavDiv_mask", "inAC")
              }
              YAHOO.util.Dom.addClass("overlayContainer", "pavPanel");
              var oReviewButton = new YAHOO.widget.Button("reviewActivity");
              if(Dom.get("reviewActivity"))
              {
                 Dom.addClass(oReviewButton, "green");
                 Dom.get('reviewActivity-button').focus();
              }

              var oCancelPavButton = new YAHOO.widget.Button("closePopUp",{
                 type: "link"
              });
              if(Dom.get("closePopUp"))
              {
                 Dom.addClass(oCancelPavButton, "green");
                 if(Dom.get("closePopUp-button"))
                 {
                    Dom.get('closePopUp-button').focus();
                 }
                 oCancelPavButton.set("onclick",
                 {
                    fn: function(e)
                    {
                        YAHOO.util.Event.preventDefault(e);
                        BCUS.overlayPanel.hide();
                        }
                 });

              }
              else{

                  BCUS.overlayPanel.hideEvent.subscribe(function(){
                    Dom.get("overlayContainer").innerHTML = "";
                    var callPAV2Back = {
                        success: function(o)
                        {
                            var tempPAVDiv = document.createElement("div");
                            tempPAVDiv.innerHTML = o.responseText;
                            tempPAVDiv = BCUS.getHtmlById(tempPAVDiv,"mainContent",'section');
                            BCUS.showOverlay("PAVWarning",tempPAVDiv,{aux1:"fraudDetection",aux2:"close"});
                        },
                        failure: function(o)
                        {
                            //alert ("Failed");
                        }
                    }
                    var url = "Temporary.action?pageName=WEB-INF/view/frauddetection/warningPopUp.jsp";
                    var xhr = YAHOO.util.Connect.asyncRequest('GET', url, callPAV2Back);
                  });
              }

              if (!Modernizr.borderradius) {
                    BCUS.roundCorners.adjustButtons();
              }
              //BCUS.overlayPanel.hideEvent();
              
              BCUS.overlayPanel.show();
            break;
            case "PAVWarning":
              if (YAHOO.util.Dom.getElementsByClassName("accountSummaryPage").length){
                  YAHOO.util.Dom.addClass("pavDiv_mask", "inAC")
              }   
              YAHOO.util.Dom.addClass("overlayContainer", "pavPanel");
              var oCloseButton = new YAHOO.widget.Button("closePopUp");
              if(Dom.get("closePopUp"))
              {
                 Dom.addClass(oCloseButton, "green");
              }
              var oExitButton = new YAHOO.widget.Button("exitPopUp");

              //If not on a review page 'Return to review' links to Fraud Review Page and 'Exit review' closes Pop Up.
              if(auxData.aux1 == 'fraudDetection')
              {
                  if(Dom.get("closePopUp-button"))
                  {
                    oCloseButton.set("onclick",
                    {
                        fn: function(e)
                        {
                            YAHOO.util.Event.preventDefault(e);
                            window.location.href = auxData.aux1;
                        }
                    });
                    Dom.get('closePopUp-button').focus();
                  }
                  if(Dom.get("exitPopUp-button"))
                  {
                    oExitButton.set("onclick",
                    {
                        fn: function(e)
                        {
                            YAHOO.util.Event.preventDefault(e);
                            BCUS.overlayPanel.hide();

                        }
                    });
                  }
              }
              else //If on a review page 'Return to review' closes Pop Up and 'Exit review' continues to location user clicked.
              {
                  if(Dom.get("closePopUp-button"))
                  {
                    oCloseButton.set("onclick",
                    {
                        fn: function(e)
                        {
                            YAHOO.util.Event.preventDefault(e);
                            BCUS.overlayPanel.hide();
                        }
                    });
                    Dom.get('closePopUp-button').focus();
                  }
                  if(Dom.get("exitPopUp-button"))
                  {
                    oExitButton.set("onclick",
                    {
                        fn: function(e)
                        {
                            YAHOO.util.Event.preventDefault(e);
                            window.location.href = auxData.aux2;
                        }
                    });
                  }
              }
              if (!Modernizr.borderradius) {
                    BCUS.roundCorners.adjustButtons();
              }
              BCUS.overlayPanel.show();
              Dom.get('closePopUp-button').focus();
            break;
            case "photoId":
                var pageButtons = function(){
                   if (YAHOO.util.Dom.get("cancelButton")){
                      var cancelButton = new YAHOO.widget.Button("cancelButton", { type: "link" });
                      cancelButton.set("onclick", {
                         fn: function(e){
                            YAHOO.util.Event.preventDefault(e);
                            BCUS.overlayPanel.hide();
                         }
                      });
                   };
                   if(YAHOO.util.Dom.get("continueButton")) {
                      var continueButton = new YAHOO.widget.Button("continueButton", { type: "link" });
                      YAHOO.util.Dom.addClass(continueButton, "green");
                   }
                   if(YAHOO.util.Dom.get("continueButtonRestricted")) {
                      var continueButtonRestricted = new YAHOO.widget.Button("continueButtonRestricted",{
                         type: "button",
                         disabled: "true"
                      });
                   }
                }
                if(YAHOO.util.Dom.get("imageGuidelines")){
                   YAHOO.util.Event.on("imageGuidelines", "click", function(e){
                      YAHOO.util.Event.preventDefault(e);
                      BCUS.popwin(this.href, "imageGuidelines", {
                         width: "550",
                         height: "900",
                         location: false,
                         scrollbars: false
                      });
                      return false;
                   });
                }
                if(YAHOO.util.Dom.get("PhotoCardAgreement")){
                   var ie7Height = "";
                   if((document.all)&&(navigator.appVersion.indexOf("MSIE 7.")!=-1)){
                      ie7Height = "550";
                   } else {
                      ie7Height = "510";
                   }
                   YAHOO.util.Event.on("PhotoCardAgreement", "click", function(e){
                      YAHOO.util.Event.preventDefault(e);
                      BCUS.popwin(this.href, "PhotoCardAgreement", {
                         width: "550",
                         height: ie7Height,
                         location: false,
                         scrollbars: false
                      });
                      return false;
                   });
                }
                if(YAHOO.util.Dom.get("photoCardFAQs")){
                   YAHOO.util.Event.on("photoCardFAQs", "click", function(e){
                      YAHOO.util.Event.preventDefault(e);
                      BCUS.popwin(this.href, "photoCardFAQs", {
                         width: "550",
                         height: "820",
                         location: false,
                         scrollbars: false
                      });
                      return false;
                   });
                }
                
                //round buttons for IE
                if(!Modernizr.borderradius ) {
                    BCUS.roundCorners.adjustButtons();                 
                }                 
                
                // for non-AJAX modals, remove class set to prevent FOUC (Flash of unstyled content) right before showing image
                if (Dom.get("overlayContainerPhotoId")) {
                    Dom.removeClass("overlayContainerPhotoId", "displayNone");
                }
                
                pageButtons();
                BCUS.overlayPanel.center();
                BCUS.overlayPanel.show();
            break;
            case "activateCard":
              var action = YAHOO.util.Dom.getAttribute("activateCardForm", "action");
              YAHOO.util.Dom.setAttribute("activateCardForm", "action",action + "?activatedFromPanel=true");
              YAHOO.util.Dom.addClass("activateCard", "activateCard");
              YAHOO.util.Dom.addClass("help","hide");
              YAHOO.util.Dom.addClass("pageLine","hide");
              YAHOO.util.Dom.removeClass("boxLine","hide");
              YAHOO.util.Dom.removeClass("activateCardPageTitle","pageTitle");
              YAHOO.util.Event.on("activateCardForm", "focusin", BCUS.toolTip);
              YAHOO.util.Event.on(YAHOO.util.Dom.getElementsByClassName("validate"), "focusout",BCUS.validate.execute,{beanclass:"com.barclaycardus.app.cws.action.ActivateCardActionBean"});
              //Create input box focus borders for older versions of IE
              function ie7borders(){
                var oFormElement = YAHOO.util.Dom.getElementsByClassName('inputBox', 'input',"activateCardForm");
                for (var i in oFormElement){
                    var elem = oFormElement[i];
                    elem.showBorder = function (e) {YAHOO.util.Dom.addClass(this,"blueBorder");}
                    elem.hideBorder = function (e) {YAHOO.util.Dom.removeClass(this,"blueBorder");}
                    YAHOO.util.Event.addListener(elem, 'focusin', elem.showBorder);
                    YAHOO.util.Event.addListener(elem, 'focusout', elem.hideBorder);
                }
              }
              if (YAHOO.env.ua.ie > 0 && YAHOO.env.ua.ie < 8){
                ie7borders();
              }
              var focusField = YAHOO.util.Dom.get("ssnDigit1");
              focusField.focus();

              var Button = YAHOO.widget.Button;

              var oActivateCardButton = new Button("continueButton");
              if(Dom.get("continueButton"))
              {
                 Dom.addClass(oActivateCardButton, "green");
              }

              var oCancelButton = new YAHOO.widget.Button("cancelButtonPanel",{
                 type: "link"
              });
              oCancelButton.set("onclick",
              {
                 fn: function(e)
                 {

                    YAHOO.util.Event.preventDefault(e);
                    BCUS.overlayPanel.hide();
                 }
              });

              BCUS.overlayPanel.show();
              BCUS.activatePanelAutotab();
            break;
            case "adServerModal":
            case "adServerModalAjax":   
                //get panel X button
                var xButton = Dom.getElementsByClassName("container-close", null, BCUS.overlayPanel.element)[0];                
                //create cancel button
                if (Dom.get("cancelButton")) {
                    var cancelButton = new YAHOO.widget.Button("cancelButton");            
                    //set onclick event
                    cancelButton.set("onclick", {
                         fn: function(e){
                            BCUS.sendModalAdTracking("false");
                            BCUS.overlayPanel.hide();
                            //alert("cancel");
                         }
                      });
                }
                //create continue button
                if (Dom.get("continueButton")) {
                    var continueButton = new YAHOO.widget.Button("continueButton");
                    Dom.addClass(continueButton, "green")
                    //set onclick event
                    continueButton.set("onclick", {
                        fn: function(e){
                            BCUS.sendModalAdTracking("true");
                            BCUS.overlayPanel.hide();
                            //alert("learn more");
                         }
                    });
                        
                }
                                
                //capture x button click event and send tracking                
                YAHOO.util.Event.on(xButton, "click", function(){
                    BCUS.sendModalAdTracking("false");
                });
                
                //round buttons for IE
                if(!Modernizr.borderradius ) {
                    BCUS.roundCorners.adjustButtons();                 
                }   
                
                // for non-AJAX modals, remove class set to prevent FOUC (Flash of unstyled content) right before showing image
                if (Dom.get("adModalContainer")) {
                    Dom.removeClass("adModalContainer", "displayNone");
                }
                BCUS.overlayPanel.render();
                BCUS.overlayPanel.center();
                BCUS.overlayPanel.show();
                                
            break;
            default:
            break;
        }

    }
     






// End bcus.js
})();
