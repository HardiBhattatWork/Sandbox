/* 
 * INCLUDES TO MINIMIZE REQUESTS
 * LINE 5: spin.min.js -- builds spinner for page transitions
 */
(function(a,b,c){
    function g(a,c){
        var d=b.createElement(a||"div"),e;
        for(e in c)d[e]=c[e];return d
        }
        function h(a){
        for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);
        return a
        }
        function j(a,b,c,d){
        var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";
        return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g
        }
        function k(a,b){
        var e=a.style,f,g;
        if(e[b]!==c)return b;
        b=b.charAt(0).toUpperCase()+b.slice(1);
        for(g=0;g<d.length;g++){
            f=d[g]+b;
            if(e[f]!==c)return f
                }
            }
        function l(a,b){
    for(var c in b)a.style[k(a,c)||c]=b[c];return a
    }
    function m(a){
    for(var b=1;b<arguments.length;b++){
        var d=arguments[b];
        for(var e in d)a[e]===c&&(a[e]=d[e])
            }
            return a
    }
    function n(a){
    var b={
        x:a.offsetLeft,
        y:a.offsetTop
        };
    while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;
    return b
    }
    var d=["webkit","Moz","ms","O"],e={},f,i=function(){
    var a=g("style");
    return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet
    }(),o={
    lines:12,
    length:7,
    width:5,
    radius:10,
    rotate:0,
    color:"#000",
    speed:1,
    trail:100,
    opacity:.25,
    fps:20,
    zIndex:2e9,
    className:"spinner",
    top:"auto",
    left:"auto"
},p=function q(a){
    if(!this.spin)return new q(a);
    this.opts=m(a||{},q.defaults,o)
    };
    
p.defaults={},m(p.prototype,{
    spin:function(a){
        this.stop();
        var b=this,c=b.opts,d=b.el=l(g(0,{
            className:c.className
            }),{
            position:"relative",
            zIndex:c.zIndex
            }),e=c.radius+c.length+c.width,h,i;
        a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{
            left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",
            top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"
            })),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);
        if(!f){
            var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;
            !function q(){
                j++;
                for(var a=c.lines;a;a--){
                    var e=Math.max(1-(j+a*p)%m*o,c.opacity);
                    b.opacity(d,c.lines-a,e,c)
                    }
                    b.timeout=b.el&&setTimeout(q,~~(1e3/k))
                }()
            }
            return b
        },
    stop:function(){
        var a=this.el;
        return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this
        },
    lines:function(a,b){
        function e(a,d){
            return l(g(),{
                position:"absolute",
                width:b.length+b.width+"px",
                height:b.width+"px",
                background:a,
                boxShadow:d,
                transformOrigin:"left",
                transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",
                borderRadius:(b.width>>1)+"px"
                })
            }
            var c=0,d;
        for(;c<b.lines;c++)d=l(g(),{
            position:"absolute",
            top:1+~(b.width/2)+"px",
            transform:b.hwaccel?"translate3d(0,0,0)":"",
            opacity:b.opacity,
            animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"
            }),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{
            top:"2px"
        })),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));
        return a
        },
    opacity:function(a,b,c){
        b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)
        }
    }),!function(){
    function a(a,b){
        return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)
        }
        var b=l(g("group"),{
        behavior:"url(#default#VML)"
    });
    !k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){
        function f(){
            return l(a("group",{
                coordsize:e+" "+e,
                coordorigin:-d+" "+ -d
                }),{
                width:e,
                height:e
            })
            }
            function k(b,e,g){
            h(i,h(l(f(),{
                rotation:360/c.lines*b+"deg",
                left:~~e
                }),h(l(a("roundrect",{
                arcsize:1
            }),{
                width:d,
                height:c.width,
                left:c.radius,
                top:-c.width>>1,
                filter:g
            }),a("fill",{
                color:c.color,
                opacity:c.opacity
                }),a("stroke",{
                opacity:0
            }))))
            }
            var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{
            position:"absolute",
            top:g,
            left:g
        }),j;
        if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
        for(j=1;j<=c.lines;j++)k(j);
        return h(b,i)
        },p.prototype.opacity=function(a,b,c,d){
        var e=a.firstChild;
        d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))
        }):f=k(b,"animation")
    }(),a.Spinner=p
    })(window,document);

/* 
 * START BCM NAMESPACE
 */
var BCM = BCM || {};
if (typeof BCM == "undefined" || !BCM) {
    BCM = {};
}

// Global value to enable Console debug
BCM.DEBUG = true;
BCM.log = function (log) {
    if (BCM.DEBUG) {
        console.log(log);
    }
}

/* 
 * DETECT IF TOP
 * Call this to check and see if window is the parent--if so, execute JavaScript
 */
BCM.execute = function () {
    if (window.top == window.self) {
        return true;
    } else {
        return false;
    }
};

/* 
 * ATTACH AN EVENT TO PARENT
 * @param element = DOM element that will have the listener attached
 * @param event = the type of event ('click', 'submit', etc)
 * @param callback = the action to fire
 */
BCM.addEvent = function (element, event, callback) {
    if (BCM.execute() && element) {
        element.addEventListener(event, callback, false);
    }
};

/* 
 * REMOVE AN EVENT FROM PARENT
 * @param element = DOM element that will have the listener removed
 * @param event = the type of event ('click', 'submit', etc)
 * @param callback = the action to clear
 */
BCM.removeEvent = function (element, event, callback) {
    if (BCM.execute() && element) {
        element.removeEventListener(event, callback);
    }
};

/*
 * ADD CLASS TO AN ELEMENT
 * @param element = DOM element to add CSS class to
 * @param css = CSS class to append
 */
BCM.addClass = function (element, css) {
    var classes = element.getAttribute('class');
    if (classes !== null && classes !== '') {
        var add = true;
        var a = classes.split(' ');
        for (var i = 0, len = a.length; i < len; i++){
            if (a[i] === css) {
                add = false;
            }
        }
      
        if (add) {
            classes += ' ' + css
        }
    } else {
        classes = css;
    }
   
    element.setAttribute('class', classes);
};

/*
 * REMOVE CLASS FROM AN ELEMENT
 * @param element = DOM element to remove CSS class from
 * @param css = CSS class to remove
 */
BCM.removeClass = function (element, css) {
    var classes = element.getAttribute('class');
    if(classes !== null && classes !== '') {
        var a = classes.split(' ');
        for(var i = 0, len = a.length; i < len; i++) {
            if(a[i] === css) {
                a.splice(i, 1);
            }
        } 
        if (a.length > 0) {
            element.setAttribute('class', a.join(' '));
        } else {
            element.removeAttribute('class');
        }
    }
};
   
/*
 * CHECK FOR CLASS PRESENCE ON AN ELEMENT
 * @param element = DOM element to check
 * @param css = CSS class to look for
 */
BCM.hasClass = function (element, css) {
    var classes = element.getAttribute('class');
    if (classes !== null && classes !== '') {
        var a = classes.split(' ');
        for (var i = 0, len = a.length; i < len; i++){
            if (a[i] === css) {
                return true;
            }
        }
    }
    return false;
};

/*
 * CHECK FOR DOUBLE SUBMIT AND PREVENT IT
 */
    BCM.setupPreventDoubleSubmit = function(){
        
        BCM.thisform = document.getElementById(function(){return true;},"form");
        BCM.addEvent(BCUS.thisform, "submit", BCUS.preventDoubleSubmit);
        
    };
     
 /*
 * PREVENT DOUBLE SUBMIT
 * If element has not been submitted it returns false
 * If element has been submitted it Prevents the default behavior
 * @param element = DOM element to check
 */     
    BCM.formSubmitted = false;
    BCM.preventDoubleSubmit = function(element){
        if (BCUS.formSubmitted){
            BCM.preventDefault(element);
            return false;
        }
        else{
          BCUS.formSubmitted = true;
          return true;
        }	
    }
 //prevent default behavior
  /*
 * PREVENT DEFAULT BEHAVIOR
 * If element has not been submitted it returns false
 * If element has been submitted it Prevents the default behavior
 * @param element = DOM element to check
 */ 
   BCM.preventDefault = function (element) {
      element = element ? element:window.event;
      if (element.preventDefault)
         element.preventDefault();
      element.returnValue = false
      return false;
   }


/*
 * TOGGLE BETWEEN CLASSES ON AN ELEMENT
 * If element has the class, it removes it
 * If element does not have the class, it adds it
 * @param element = DOM element to check
 * @param css = CSS class to look for
 */
BCM.toggleClass = function (element, css) {
    if (BCM.hasClass(element, css)) {
        BCM.removeClass(element, css);
    } else {
        BCM.addClass(element, css);
    }
};

/*
 * MAKE AN AJAX REQUEST
 * @method BCM.ajax.get(url, callback)
 * @param url = what to request
 */
BCM.ajax = { 
    get: function (url, callback) {
        if (url !== '' && typeof url != 'undefined') {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
            request.send(null);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        callback(request.responseText);
                    } else {
                        callback('');
                    }
                }
            }
        }
    }
}

/*
 * USE THE DOM TO INCLUDE PAGE LEVEL CSS & JS
 * PREVENTS MULTIPLE REQUESTS FOR DYNAMIC PAGES
 * @method BCM.include.js(src) or BCM.include.css(src)
 * @param src = the file to load
 * @method BCM.include.jsInit() to load files
 * @method BCM.include.update() to remove old files
 */
BCM.include = {
    jsFiles: [],
    cssFiles: [],
   
    js: function (src) {
        if (src && src != '') {
            top.BCM.include.jsFiles.push(src);
        }
    },
   
    css: function (src) {
        if (src && src != '') {
            top.BCM.include.cssFiles.push(src);
        }
    },
   
    jsInit: function () {
        for (var i = 0, len = this.jsFiles.length; i < len; i++) {
            var script = document.createElement('script');
            script.setAttribute('class', 'preloadJavaScript');
            script.setAttribute('src', this.jsFiles[i]);
            top.document.getElementsByTagName('body')[0].appendChild(script);
        }
        this.jsFiles = [];      
    },

    cssInit: function () {
        for (var i = 0, len = this.cssFiles.length; i < len; i++) {
            var styles = document.createElement('link');
            styles.setAttribute('class', 'preloadStyles');
            styles.setAttribute('rel', 'stylesheet');
            styles.setAttribute('href', this.cssFiles[i]);
            top.document.getElementsByTagName('head')[0].appendChild(styles);
        }      
        this.cssFiles = [];
    },
   
    update: function () {
        // Remove CSS files from previous page
        var mobileStyles = document.getElementsByClassName('mobileStyles').length;
        while (mobileStyles--) {
            document.getElementsByTagName('head')[0].removeChild(document.getElementsByClassName('mobileStyles')[mobileStyles]);
        }

        // Reflect CSS files as belonging to current page
        var preloadStyles = document.getElementsByClassName('preloadStyles').length;
        while(preloadStyles--) {
            document.getElementsByClassName('preloadStyles')[preloadStyles].setAttribute('class', 'mobileStyles');
        }

        // Remove JS files from previous page
        var mobileJavaScript = document.getElementsByClassName('mobileJavaScript').length;
        while (mobileJavaScript--) {
            document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('mobileJavaScript')[mobileJavaScript]);
        }

        // Reflect JS files as belonging to current page
        var preloadJavaScript = document.getElementsByClassName('preloadJavaScript').length;
        while(preloadJavaScript--) {
            document.getElementsByClassName('preloadJavaScript')[preloadJavaScript].setAttribute('class', 'mobileJavaScript');
        }
    }
};

/*
 * CORE MOBILE SLIDING ELEMENT
 * 
 */
BCM.slide = {
    backCache: '',
    currentPage: 0,
    nextPage: 0,
    pageWidth: 0,
    slideWidth: 0,
    slideHeight: 0,
    viewSection: '',
    viewPage: '',
    viewPreviousPage: '',
    viewFlowDefault: '',
    popState: 0,
    buildMenu: true,
    direction: false,
    fakePage: false,
    errors: false,

    getMain: function () {
        return document.getElementById('main');
    },
   
    getParent: function () {
        return document.getElementById('sections');
    },
   
    getCardSelector: function () {
        return document.getElementById('cardSelector');
    },

    getCurrent: function () {
        return document.getElementById('mobilePage' + this.currentPage);
    },

    getNext: function () {
        return document.getElementById('mobilePage' + this.nextPage);
    },          

    getSrc: function (src) {
        if (!src || typeof src == "undefined") {
            var e = window.event;
            src = e.target;
        }

        return src;
    },
   
    goTop: function () {
        top.window.scrollTo(0, 1);
    },

    /*
   * SET THE WIDTH AND HEIGHT OF SLIDES
   * Used to change size and maintain aspect ration on device rotation
   */
    setWidth: function () {
        this.pageWidth = document.getElementById('wrapper').clientWidth;      
        this.slideWidth = document.getElementById('content').clientWidth;
      
        this.getCurrent().style.width = this.slideWidth + 'px';
        this.getCardSelector().style.width = this.slideWidth + 'px';
   
        this.getParent().style.marginLeft = '-' + (this.slideWidth + 10) + 'px';
        document.getElementById('wrapper').style.visibility = 'visible';
    },

    setHeight: function () {
        this.slideHeight = BCM.slide.getMain().clientHeight;
    },
   
    setParentHeight: function () {
        BCM.slide.getParent().style.height = BCM.slide.getParent().clientHeight + 'px';
    },
   
    animation: {
        on: function() {
            BCM.addClass(BCM.slide.getParent(), 'slideOn');
        },
         
        off: function () {
            BCM.removeClass(BCM.slide.getParent(), 'slideOn');
        }
    },

    /*
   * BUILD THE INITIAL SLIDE MECHANISM
   */
    init: function () {
        if (BCM.slide.getCurrent()) {
            BCM.include.cssInit();
            BCM.include.jsInit();
            BCM.include.update();
         
            BCM.slide.setWidth();
            BCM.slide.setHeight();
         
            BCM.slide.setParentHeight();
        }

        var resizeAction = function () {
            BCM.slide.setWidth();
            BCM.slide.setHeight();
            if (BCM.cardSelect.cardSelectState) {
                BCM.cardSelect.open();
            }
        };

        BCM.addEvent(window, 'resize', resizeAction);
        BCM.addEvent(window, 'orientationchange', resizeAction);
    },

    /*
   * UPDATE ANCHORS TO USE SLIDE
   */
    updateLinks: function () {
       
       
        if (BCM.execute()) {
            var links = document.getElementById('content').getElementsByTagName('a');
            for (var i = links.length; i--;) {
                // if link has the target attritube, it will be skipped
                if (links[i].getAttribute('href') && !links[i].getAttribute('target') && links[i].getAttribute('href') != '#') {
                    if (!links[i].getAttribute('href').match(/tel:/gi)) {
                        links[i].onclick = function () {};

                        // If link has the class "back" it will move in reverse
                        if (links[i].className.match(/back/gi) || links[i].getAttribute('id') == 'backButton') {
                      
                            links[i].onclick = function () {
                                var src = this.getAttribute('href');
                                if (src == '' || src.match(/#/gi) || src == 'back') {
                                    if (top.BCM.slide.viewPreviousPage !== null && top.BCM.slide.viewPreviousPage !== '') {
                                        src = BCM.slide.viewPreviousPage;
                                    } else {
                                        src = BCM.slide.accountSummaryPage;
                                    }
                                }
                                BCM.slide.back(src);
                                return false;
                            };
                        } else {
                     
                            links[i].onclick = function () {
                                BCM.slide.forward(this.href);
                                return false;
                            };
                        }
                    }
                }
            }
        }
    },
   
    identifyErrors: function () {
        var inputs = document.getElementsByTagName('input');
        for (var i = inputs.length; i--;) {
	  
            BCM.addEvent(inputs[i], 'blur', function () {
			
                if (BCM.slide.validateErrors(this)) {
                    BCM.addClass(this, 'error');
                    if (this.getAttribute('id')) {
                        switch (BCM.slide.validateErrors(this)){
                            case 'data-minlength' :
                                if (document.getElementById(this.id + '_inline_data-minlength')) {
                                    BCM.removeClass(document.getElementById(this.id + '_inline_data-minlength'), 'mHide');
                                    if (document.getElementById(this.id + '_Error')) {
                                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                    }
                                }else{
                                    if (document.getElementById(this.id + '_inline')) {
                                        BCM.removeClass(document.getElementById(this.id + '_inline'), 'mHide');
                                        if (document.getElementById(this.id + '_Error')) {
                                            BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                        }
                                    }
                                }
                                break;
                            case 'data-maxlength' :
                                if (document.getElementById(this.id + '_inline_data-maxlength')) {
                                    BCM.removeClass(document.getElementById(this.id + '_inline_data-maxlength'), 'mHide');
                                    if (document.getElementById(this.id + '_Error')) {
                                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                    }
                                }else{
                                    if (document.getElementById(this.id + '_inline')) {
                                        BCM.removeClass(document.getElementById(this.id + '_inline'), 'mHide');
                                        if (document.getElementById(this.id + '_Error')) {
                                            BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                        }
                                    }
                                }
                                break;    
                            case 'data-mask' :
                                if (document.getElementById(this.id + '_inline_data-mask')) {
                                    BCM.removeClass(document.getElementById(this.id + '_inline_data-mask'), 'mHide');
                                    if (document.getElementById(this.id + '_Error')) {
                                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                    }
                                }else{
                                    if (document.getElementById(this.id + '_inline')) {
                                        BCM.removeClass(document.getElementById(this.id + '_inline'), 'mHide');
                                        if (document.getElementById(this.id + '_Error')) {
                                            BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                        }
                                    }
                                }
                                break;
                            case "data-password":
                                if (document.getElementById(this.id + '_inline_data-password')) {
                                    BCM.removeClass(document.getElementById(this.id + '_inline_data-password'), 'mHide');
                                    if (document.getElementById(this.id + '_Error')) {
                                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                    }
                                }else{
                                    if (document.getElementById(this.id + '_inline')) {
                                        BCM.removeClass(document.getElementById(this.id + '_inline'), 'mHide');
                                        if (document.getElementById(this.id + '_Error')) {
                                            BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                        }
                                    }
                                }
                                break;
                            case 'data-required' :
                                if (document.getElementById(this.id + '_inline_data-required')) {
                                    BCM.removeClass(document.getElementById(this.id + '_inline_data-required'), 'mHide');
                                    if (document.getElementById(this.id + '_Error')) {
                                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                    }
                                }else{
                                    if (document.getElementById(this.id + '_inline')) {
                                        BCM.removeClass(document.getElementById(this.id + '_inline'), 'mHide');
                                        if (document.getElementById(this.id + '_Error')) {
                                            BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                        }
                                    }
                                }
                                break;
                            default :
                                if (document.getElementById(this.id + '_inline')) {
                                    BCM.removeClass(document.getElementById(this.id + '_inline'), 'mHide');
                                    if (document.getElementById(this.id + '_Error')) {
                                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                                    }
                                }
                                break;
                        }
                    }
                }
			
            });
			
            BCM.addEvent(inputs[i], 'focus', function () {
                BCM.removeClass(this, 'error');
                if (this.getAttribute('id')) {	
                    if (document.getElementById(this.id + '_inline')) {
                        BCM.addClass(document.getElementById(this.id + '_inline'), 'mHide');
                    }
                    if (document.getElementById(this.id + '_inline_data-minlength')) {
                        BCM.addClass(document.getElementById(this.id + '_inline_data-minlength'), 'mHide');
                    }
                    if (document.getElementById(this.id + '_inline_data-maxlength')) {
                        BCM.addClass(document.getElementById(this.id + '_inline_data-maxlength'), 'mHide');
                    }
                    if (document.getElementById(this.id + '_inline_data-mask')) {
                        BCM.addClass(document.getElementById(this.id + '_inline_data-mask'), 'mHide');
                    }
                    if (document.getElementById(this.id + '_inline_data-required')) {
                        BCM.addClass(document.getElementById(this.id + '_inline_data-required'), 'mHide');
                    }
                    if (document.getElementById(this.id + '_inline_data-password')) {
                        BCM.addClass(document.getElementById(this.id + '_inline_data-password'), 'mHide');
                    }
                    if (document.getElementById(this.id + '_Error')) {
                        BCM.addClass(document.getElementById(this.id + '_Error'), 'mHide');
                    }
                }
            });	
        }
    },
   
    validateErrors: function (element) {
    
        var hasErrors = false;
        if (element.getAttribute('data-required') && element.getAttribute('data-required') == 'true') {
            if (element.value === '') {
                hasErrors = "data-required";
            }else if (element.getAttribute('data-mask') && !element.value.match(element.getAttribute('data-mask'))) {
                hasErrors = "data-mask";
            }else if (element.getAttribute('data-minlength') && (element.value.length < element.getAttribute('data-minlength'))) {
                hasErrors = "data-minlength";
            }else if (element.getAttribute('data-maxlength') && (element.value.length > element.getAttribute('data-maxlength'))) {
                hasErrors = "data-maxlength";
            }else if (element.getAttribute('data-password') && !element.value.match(/^(((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))|((?=.*\d)(?=.*[a-z])(?=.*[!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~]))|((?=.*\d)(?=.*[A-Z])(?=.*[!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~])))(?!=.*[\\~`_\\|\\{\\}])[a-zA-Z0-9!\"#$%&'\(\)\*\+,-\./:;<=>?@\[\\\]^\{\}_\|~]{8,30}$/)) {
                hasErrors = "data-password";
            }
        }
        return hasErrors;
    },
   
    /*
   * CHECK FOR ERRORS USING DATA ATTRIBUTES
   */
    checkErrors: function () {
        var hasErrors = false;
        var inputs = document.getElementsByTagName('input');
        for (var i = inputs.length; i--;) {
            hasErrors = BCM.slide.validateErrors(inputs[i]);
        }

        return hasErrors;
    },
   
    /*
   * CHECK FOR CLOSE BUTTONS ON ALERTS
   */
    checkForClose: function () {
        var closeButtons = document.getElementsByClassName('closeButton');
        if (closeButtons.length > 0) {
            var closeAlert = function () {
                var parent = this.parentNode;
                BCM.addClass(parent, 'fadeOut');
                parent.style.opacity = 0;
                setTimeout(function () {
                    parent.parentNode.removeChild(parent);
                }, 751);
            };
         
            for (var i = closeButtons.length; i--;) {
                BCM.addEvent(closeButtons[i], 'click', closeAlert);
            }
        }
    },

    // Delete the previous page from the DOM and update current page elements
    destroyPrevious: function () {
        BCM.slide.animation.off();
        while (BCM.slide.getCurrent()) {
            BCM.slide.getParent().removeChild(BCM.slide.getCurrent());
        }
      
        if (BCM.slide.fakePage) {
            BCM.slide.getParent().removeChild(document.getElementById('fakePage'));
            BCM.slide.fakePage = false;
        }

        BCM.slide.getParent().style.marginLeft = '-' + (BCM.slide.slideWidth + 10) + 'px';

        if (BCM.slide.direction) {
            BCM.slide.getCardSelector().style.marginLeft = '0px';
        }

        BCM.include.jsInit();
        BCM.include.update();
        BCM.slide.currentPage++;
      
        BCM.slide.setParentHeight();
    },
   
    // Remove the overlay built during preload and modal fire
    destroyOverlay: function () {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
        document.getElementsByTagName('body')[0].removeChild(document.getElementById('overlay'));
    },

    // Remove all nodes in an element
    clearNodes: function (element) {
        while (document.getElementById(element).hasChildNodes()) {
            document.getElementById(element).removeChild(document.getElementById(element).firstChild);
        }
    },
   
    // Move nodes from an element in preloader to parent 
    extractNodes: function (element) {
        var theChildren = document.getElementById('preload').contentWindow.document.getElementById(element);
        if (theChildren) {
            var clone = theChildren.cloneNode(true);
            while (clone.hasChildNodes()) {
                document.getElementById(element).appendChild(clone.firstChild);
            }
        }
    },

    /*
   * CREATE OVERLAY FOR PRELOAD/MODAL
   * @param noSpin = true/false (will show spinner -- used for preload)
   */
    createOverlay: function (noSpin) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        var background = document.createElement('div');
        background.setAttribute('id', 'overlay');
        background.style.height = document.getElementsByTagName('body')[0].scrollHeight + 'px';
        document.getElementsByTagName('body')[0].appendChild(background);

        if (!noSpin) {
            var spinnerMarginTop = ((window.innerHeight / 2) + window.scrollY);
            var spinnerOptions = {
                lines: 12, 
                length: 6, 
                width: 3, 
                radius: 10, 
                rotate: 0, 
                color: '#333', 
                speed: 1, 
                trail: 60, 
                shadow: false, 
                hwaccel: false, 
                className: 'spinner', 
                zIndex: 2e9, 
                top: spinnerMarginTop, 
                left: 'auto'
            };
            var spinner = new Spinner(spinnerOptions).spin(background);
        }
    },

    // Take preloaded elements and move to parent window
    createPage: function () {
        BCM.slide.nextPage++;
      
        var page = document.createElement('li');
        page.setAttribute('id', 'mobilePage' + BCM.slide.nextPage);
        page.setAttribute('class', 'page');
        page.style.width = BCM.slide.slideWidth + 'px';

        if (BCM.slide.direction) {
            BCM.slide.getCardSelector().style.marginLeft = '-' + (BCM.slide.slideWidth + 10) + 'px';
            BCM.slide.getParent().insertBefore(page, BCM.slide.getCurrent());
        } else {
            BCM.slide.getParent().appendChild(page);
        }
    },
   
    destroyFakePage: function () {
        BCM.slide.goTop();
        BCM.slide.getParent().style.marginLeft = '-' + (BCM.slide.slideWidth + 10) + 'px';
        setTimeout(function () {
            BCM.slide.animation.off();
            BCM.slide.getParent().removeChild(document.getElementById('fakePage'));
        }, 751);
        BCM.slide.fakePage = false;
    },
   
    createFakePage: function (title, back, help, content) {
        if (!BCM.slide.fakePage) {
            var callFakePage = function () {
                BCM.slide.goTop();

                var page = document.createElement('li');
                page.setAttribute('id', 'fakePage');
                page.setAttribute('class', 'page');
                page.style.width = BCM.slide.slideWidth + 'px';

                // BUILD THE BACK BUTTON IF NECESSARY
                if (back) {
                    var backButton = document.createElement('a');
                    backButton.setAttribute('id', 'backButton');
                    backButton.setAttribute('class', 'button green-button back');

                    backButton.onclick = function () {
                        // SLIDE OUT FAKE PAGE AND DELETE FROM DOM
                        BCM.slide.destroyFakePage();
                    }

                    var backArrow = document.createElement('div');
                    backArrow.setAttribute('class', 'sprite arrow');

                    backButton.appendChild(backArrow);
                    page.appendChild(backButton);
                }

                // BUILD THE HELP ICON IF NECESSARY
                if (help) {
                    var helpIcon = document.createElement('div');
                    helpIcon.setAttribute('id', 'helpIcon2');
                    helpIcon.setAttribute('class', 'helpIcon noselect');
                    page.appendChild(helpIcon);

                    helpIcon.onclick = function () {
                        BCM.modal.init(help, true);
                    };
                }

                // BUILD THE PAGE TITLE
                var pageTitle = document.createElement('h1');
                pageTitle.setAttribute('id', 'headerTitle');
                pageTitle.appendChild(document.createTextNode(title));
                page.appendChild(pageTitle);
                page.appendChild(document.createElement('hr'));

                if (content) {
                    page.appendChild(content);
                }
            
                // BUILD SUB NAV MENU

                // BUILD SUB NAV MENU CONTAINER
                var subNav = page.appendChild(document.createElement('nav'));
                subNav.setAttribute('id', 'subNavMenu');
                subNav.setAttribute('style', 'text-align:left; padding-left: 5px;');
                subNav.setAttribute('data-page', title);

                // BUILD MAKE PAYMENT LINK							
                var payLink = page.appendChild(document.createElement('a'));
                payLink.setAttribute('id', 'paymentLink');    
                payLink.setAttribute('class', '');  
                payLink.setAttribute('href', '/servicing/Payment.action');  
                payLink.setAttribute('style', 'margin-right: 7px;');
                payLink.appendChild(document.createTextNode('Make a payment'));
                        			
                // BUILD REPEAT PAYMENT LINK				
                var RepPayLink = page.appendChild(document.createElement('a'));
                RepPayLink.setAttribute('id', 'repeatPaymentLink');    
                RepPayLink.setAttribute('class', '');  
                RepPayLink.setAttribute('href', '/servicing/RepeatPayment.action?start=');  
                RepPayLink.setAttribute('style', 'margin-right: 7px;');
                RepPayLink.appendChild(document.createTextNode('Repeat payment'));
							
                // BUILD PAYMENT ACTIVITY LINK				
                var PayHistLink = page.appendChild(document.createElement('a'));
                PayHistLink.setAttribute('id', 'historyLink');    
                PayHistLink.setAttribute('class', 'activePage');  
                PayHistLink.setAttribute('href', '/servicing/Payment.action?history=');  
                PayHistLink.appendChild(document.createTextNode('Payment activity'));
			
                //PIPE SEPARATOR
                var pipe1 = page.appendChild(document.createTextNode('|   '));
                var pipe2 = page.appendChild(document.createTextNode('|   '));
                        
                // OUTPUT ALL LINKS
                subNav.appendChild(payLink);
                subNav.appendChild(pipe1);
                subNav.appendChild(RepPayLink);
                subNav.appendChild(pipe2);
                subNav.appendChild(PayHistLink);


                if (content) {
                    page.appendChild(content);
                }

                // ADD PAGE TO DOM AND SLIDE IN
                BCM.slide.getParent().appendChild(page);
                BCM.slide.animation.on();
                BCM.slide.getParent().style.marginLeft = '-' + ((BCM.slide.slideWidth * 2) + 20) + 'px';
                BCM.slide.fakePage = true;
            
                BCM.slide.destroyOverlay();
            
                // Create and expose event to signal 'slide-in' of overlay
                var e = new CustomEvent('overlayLoad', {
                    bubbles: false, 
                    cancelable: false
                });
                document.getElementById('wrapper').dispatchEvent(e);
            }
         
            // Required for negative margin sliding on iOS devices
            BCM.slide.createOverlay();
            setTimeout(callFakePage, 1000);
        }
    },

    // Update the page title and header text on the parent window
    createTitle: function () {
        var pageTitle = document.getElementsByTagName('title')[0];
        while (pageTitle.hasChildNodes()) {
            pageTitle.removeChild(pageTitle.firstChild);
        }

        if (document.getElementById('preload').contentWindow.document.getElementById('headerTitle')) {
            var headerTitle = document.getElementById('preload').contentWindow.document.getElementById('headerTitle').innerHTML;
            document.getElementsByTagName('title')[0].appendChild(document.createTextNode('Barclaycard Mobile: ' + headerTitle));
        }
      
        if (headerTitle == 'timeout') {
            BCM.menu.destroy();
        }
    },

    // Add the nav menu to logged in pages
    createNav: function () {
        if (BCM.execute()) {            
            if (!document.getElementById('logoutButton') && document.getElementById('preload').contentWindow.document.getElementById('logoutButton')) {
                var logoutClone = document.getElementById('preload').contentWindow.document.getElementById('logoutButton').cloneNode(true);
                if (document.getElementsByTagName('header')[0]) document.getElementsByTagName('header')[0].appendChild(logoutClone);
            }

            if (!document.getElementById('menuButton') && document.getElementById('preload').contentWindow.document.getElementById('menuButton')) {
                var menuClone = document.getElementById('preload').contentWindow.document.getElementById('menuButton').cloneNode(true);
                if (document.getElementsByTagName('header')[0]) document.getElementsByTagName('header')[0].appendChild(menuClone);
            }

            if (BCM.slide.viewSection != 'homepage') {
                BCM.slide.clearNodes('mobileMenu');
                BCM.slide.extractNodes('mobileMenu');
                BCM.slide.buildMenu = false;
            }
        }
    },

    preload: function (src) {
      
        // Delete any lagging preloaders -- there can be only one
        while (document.getElementById('preload')) {
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('preload'));
        }
      
        // Set page for back button
        if (!document.getElementById('noBack')){
            top.BCM.slide.backCache = top.BCM.slide.viewPreviousPage;
            top.BCM.slide.viewPreviousPage = window.location.href;
        }

        // Clear out the page name
        BCM.slide.viewPage = '';

        // Display the spinner
        BCM.slide.createOverlay();

        // Build iFrame to preload content
        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'preload');
        if (src.nodeName != 'FORM') {
            if (!src.href) {
                iframe.setAttribute('src', src);
            } else {
                iframe.setAttribute('src', src.href);
            }
        }
        document.getElementsByTagName('body')[0].appendChild(iframe);

        if (src.nodeName == 'FORM') {
            // Hide the keyboard on mobile devices
            document.getElementById('takeFocus').focus();
            src.target = 'preload';
            src.submit();
        }

        // Wait until preload done, then execute
        iframe.onload = function () {
            // Watch for full site frame breaker flag
            if (iframe.contentWindow.location.href.indexOf('DeskView') > 0){
                location.href = iframe.contentWindow.location.href;
                return false;
            }
  
            BCM.slide.createPage();
            BCM.slide.createNav();
            BCM.slide.createTitle();
         
            if (top.BCM.slide.viewPreviousPage == iframe.contentWindow.location.href) {
                top.BCM.slide.viewPreviousPage = top.BCM.slide.backCache;
                top.BCM.slide.backCache = BCM.slide.viewFlowDefault;
            }
      
            // Grab preloaded page content and update parent window
            var nextPageChildren = document.getElementById('preload').contentWindow.document.getElementById('mobilePage0');
            if (nextPageChildren) {            
                var clone = nextPageChildren.cloneNode(true);
                var getNext = BCM.slide.getNext();
                while (clone.hasChildNodes()) {
                    getNext.appendChild(clone.firstChild);
                }
            } else {
                BCM.slide.getNext().innerHTML = document.getElementById('preload').contentWindow.document.getElementsByTagName('body')[0].innerHTML;
            }

            // Build the card selector on first load of Account Summary
            if (BCM.slide.viewPage == 'accountSummary' && BCM.slide.getCardSelector()) {
                BCM.slide.clearNodes('cardSelector');
                BCM.slide.extractNodes('cardSelector');
            }
         
            // Update the address bar so we know where we are / allow for refresh
            top.BCM.slide.popState = 0;
            window.history.pushState("", "", document.getElementById('preload').contentWindow.location.href);
         
            // Update location comments (for DEV use only)
            if (BCM.DEBUG) {
                try {
                    document.getElementById('location').innerHTML = document.getElementById('preload').contentWindow.document.getElementById('location').innerHTML;
                } catch (e) {
                // No location comments to update. Is this using a mobile template?
                }
            }
         
            // Update the header
            if (document.getElementById('header')) {
                BCM.slide.clearNodes('header');
                BCM.slide.extractNodes('header');
            }

            // Update the footer
            if (document.getElementById('footer')) {
                BCM.slide.clearNodes('footer');
                BCM.slide.extractNodes('footer');
            }
         
            // Destroy the preloader
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('preload'));
         
            // Update the CSS
            BCM.include.cssInit();
         
            // Destroy the spinner
            BCM.slide.destroyOverlay();

            // Update anchors to use slide mechanics
            BCM.slide.updateLinks();
         
            // Update Input fields with error detection
            BCM.slide.identifyErrors();
         
            // Check for close buttons on alerts
            BCM.slide.checkForClose();
         
            // Set and perform the page transition
            BCM.slide.animation.on();

            if (BCM.slide.direction) {
                BCM.slide.getParent().style.marginLeft = '0px';
            } else {
                var mult = 2;
                if (BCM.slide.fakePage) {
                    mult = 3;
                }
                BCM.slide.getParent().style.marginLeft = '-' + ((BCM.slide.slideWidth * mult) + 10) + 'px';
            }

            // If timeout, remove the menu
            if (top.BCM.slide.viewPage == 'timeout') {
                BCM.menu.close();
                BCM.menu.destroy();
            }
                  
            // Destroy the previous page after slide transition
            setTimeout(function () {
                BCM.slide.destroyPrevious();
            }, 751);         
        }; 
    },

    move: function (src) {
        BCM.slide.goTop();
        BCM.menu.close();
        BCM.modal.close();
        BCM.slide.preload(BCM.slide.getSrc(src));
    },

    forward: function (src) {
        BCM.slide.direction = false;
        BCM.slide.move(src);
    },

    back: function (src) {
        BCM.slide.direction = true;
        BCM.slide.move(src); 
    },

    logout: function () {
        // Destroy the menu
        BCM.menu.close();
        BCM.menu.destroy();

        // Transition to logout page
        BCM.slide.back();
    }
};

/*
 * OPEN A THE LAUNCHPAD MENU
 * Will fade in from the top left
 * This is only called by the mobile template
 */
BCM.menu = {
    menuVisible: false,
    menuEnabled: true,

    container: function () {
        return document.getElementById('mobileMenu');
    },

    init: function () {
        if (BCM.execute()) {
            if (BCM.cardSelect.cardSelectState) {
                BCM.cardSelect.close();
            }
         
            if (BCM.slide.fakePage) {
                BCM.slide.destroyFakePage();
            }
         
            this.container().style.webkitTransition = 'opacity .49s linear 0s';

            if (this.menuEnabled) {
                if (this.menuVisible) {
                    this.close();
                } else {
                    this.open();
                }
            } else {
                BCM.cardSelect.init();
            }
         
            // Create and expose event to signal display of mobile menu
            BCM.moEvent = new CustomEvent('menuOpen', {
                bubbles: false, 
                cancelable: false
            });
        }
    },

    open: function () {
        if (document.getElementById('menuButton') && this.menuEnabled) {  
            BCM.slide.goTop();
            // Hide card selector if only 1 card
            if (!document.getElementById('multicard') && document.getElementById('cards')) {
                BCM.slide.clearNodes('cards');
            }

            BCM.removeClass(document.getElementById('menuButton'), 'purple-button');
            BCM.addClass(document.getElementById('menuButton'), 'blue-button');
            BCM.addClass(document.getElementById('menuGrid'), 'on');
            this.container().style.display = 'block';
                  
            setTimeout(function () {
                BCM.menu.container().style.opacity = 1;
                document.getElementById('mobileMenu').dispatchEvent(BCM.moEvent);
            }, 100);

            this.menuVisible = true;
        }
    },

    close: function () {
        if (document.getElementById('menuButton') && this.menuEnabled) {
            BCM.removeClass(document.getElementById('menuButton'), 'blue-button');
            BCM.removeClass(document.getElementById('menuGrid'), 'on');
            BCM.addClass(document.getElementById('menuButton'), 'purple-button');
            this.container().style.opacity = 0;

            setTimeout(function () {
                BCM.menu.container().style.display = 'none';
            }, 500);

            this.menuVisible = false;
        }
    },

    destroy: function () {
        BCM.slide.clearNodes('mobileMenu');
    }
};
   
/*
 * OPEN A THE CARD SELECTOR
 * Will slide in the card selector from the right
 * This is only called by the Menu
 */
BCM.cardSelect = {
    cardSelectState: false,

    init: function () {
      
        BCM.slide.animation.on();
        if (BCM.cardSelect.cardSelectState) {
            this.close();
        } else {
            this.open();
        }
    },

    open: function () {
        BCM.slide.goTop();
        BCM.menu.close();
        BCM.cardSelect.cardSelectState = true;
        BCM.slide.getParent().style.marginLeft = '0px';      
        // Create and expose event to signal 'slide-in' of overlay
        var e = new CustomEvent('cardSelectLoad', {
            bubbles: false, 
            cancelable: false
        });
        document.getElementById('wrapper').dispatchEvent(e);
    },

    close: function () {
        BCM.cardSelect.cardSelectState = false;
        BCM.slide.getParent().style.marginLeft = '-' + (BCM.slide.slideWidth + 10) + 'px';       
    }
};

/*
 * OPEN A MODAL WINDOW
 * Attach to event: BCM.modal.init(content, help);
 * @param content = element that contains content of modal (usually a div) 
 * @param help = true/false -- defines if uses help icon modal display
 */
BCM.modal = {
    // Sets visible state of MODAL, ensure only one is open at a time
    modalVisible: false,
    helpModal: false,

    move: function () {
        if (document.getElementById('modalParent')) {
            document.getElementById('modalParent').style.marginTop = (((window.innerHeight - modal.clientHeight) / 2) + window.scrollY) + 'px';
        }
    },
   
    // Initialize the MODAL (will open/close depending on state)
    init: function (content, help) {
        // Check if Help Icon modal
        if (help && help == true) {
            this.helpModal = true;
        }
        // If content is empty, no MODAL will fire
        if (content && content != '') {
            if (!this.modalVisible) {
                BCM.slide.createOverlay(true);
                BCM.addEvent(document.getElementById('overlay'), 'click', function () {
                    BCM.modal.close();
                });
            
                var modalParent = document.createElement('div');
                modalParent.setAttribute('id', 'modalParent');
            
                var modal = document.createElement('div');
                modal.setAttribute('id', 'modal');
            
                if (this.helpModal) {
                    var modalArrow = document.createElement('div');
                    modalArrow.setAttribute('id', 'modalArrow');
                    modalParent.appendChild(modalArrow);
                }
                        
                // Get MODAL Content (clone -> fill)
                var clone = content.cloneNode(true);
                while (clone.hasChildNodes()) {
                    modal.appendChild(clone.firstChild);
                }
            
                // Build the Close Link
                var close = document.createElement('span');
                close.setAttribute('id', 'modal-close');
                close.setAttribute('class', 'sprite');
                modal.appendChild(close);
            
                // Append hidden MODAL to DOM
                modalParent.appendChild(modal);
                document.getElementsByTagName('body')[0].appendChild(modalParent);
            
                // Center MODAL
                if (!this.helpModal) {
                    this.move();
                    BCM.addEvent(top.window, 'scroll', BCM.modal.move);
                } else {
                    var e = window.event;
                    modalParent.style.marginTop = ((e.target.offsetTop + e.target.clientHeight) -3) + 'px';
                }
            
                // Enable MODAL Close Link
                BCM.addEvent(document.getElementById('modal-close'), 'click', function () {
                    BCM.modal.close();
                });
            
                // Show MODAL
                modalParent.style.webkitTransition = 'opacity .49s linear 0s';
                modalParent.style.opacity = '1';
                this.modalVisible = true;
            } else {
                this.close();
            }
        }
    }, 

    // Close the MODAL
    close: function () {
        if (document.getElementById('modalParent')) {
            BCM.removeEvent(document.getElementById('overlay'), 'click', BCM.modal.close);
            BCM.slide.destroyOverlay();

            if (!this.helpModal) {
                BCM.removeEvent(top.window, 'scroll', BCM.modal.move);
            }
            modalParent.style.opacity = '0';
            setTimeout(function () {
                document.getElementsByTagName('body')[0].removeChild(document.getElementById('modalParent'));
            }, 500);
            this.helpModal = false;
            this.modalVisible = false;
        }
    }
};

BCM.sort = {
    propertyParse: function (arg, property) {
        var properties = property.split('.');
      
        if (properties.length == 1) {
            arg = arg[properties[0]];
        } else if (properties.length == 2) {
            arg = arg[properties[0]][properties[1]];
        } else if (properties.length == 3) {
            arg = arg[properties[0]][properties[1]][properties[2]]
        }
      
        return arg;
    },
   
    ascending: function (a, b) {
        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    },
   
    descending: function (a, b) {
        if (a > b) {
            return -1;
        }

        if (a < b) {
            return 1;
        }

        return 0;
    },
   
    alpha: function (data, property, descending) {
        return data.sort(function (a, b) {
            var a = BCM.sort.propertyParse(a, property);
            var b = BCM.sort.propertyParse(b, property);

            if (!descending) {
                return BCM.sort.descending(a, b); 
            } else {
                return BCM.sort.ascending(a, b);
            }
        });
    },
      
    numeric: function (data, property, descending) {
        return data.sort(function (a, b) {
            var a = BCM.sort.propertyParse(a, property);
            var b = BCM.sort.propertyParse(b, property);
         


            a = parseFloat(a.toString().replace(/\,/g, ''));
            b = parseFloat(b.toString().replace(/\,/g, ''));


            if (!descending) {
                return BCM.sort.descending(a, b);
            } else {
                return BCM.sort.ascending(a, b);
            }
        });
    },
   
    date: function (data, property, descending) {
        return data.sort(function (a, b) {
            var a = BCM.sort.propertyParse(a, property);
            var b = BCM.sort.propertyParse(b, property);

            var d1 = parseInt(Date.parse(a));
            var d2 = parseInt(Date.parse(b));
         
            if (!descending) {
                return BCM.sort.descending(d1, d2);
            } else {
                return BCM.sort.ascending(d1, d2);
            }
        });
    }
};