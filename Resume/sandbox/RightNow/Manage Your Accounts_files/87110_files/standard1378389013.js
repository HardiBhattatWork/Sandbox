
RightNow.Widget.changeHeight=function(data,instanceID){this.data=data;this.instanceID=instanceID;this.docHeight=0;RightNow.Event.create("evt_pageResize",this);RightNow.Event.subscribe("evt_pageResize",this.changeHeight,this);this.initializeIframe();};RightNow.Widget.changeHeight.prototype={changeHeight:function(){var iframeObj=YAHOO.util.Dom.get(this.data.attrs['iframeid']);var currentDocHeight=this.getDocHeight();if(currentDocHeight!=this.docHeight){var iframeUrl=this.getIframeURL();if(isLegacy){iframeObj.src=iframeUrl+"?h="+currentDocHeight;}
else{iframeObj.src=iframeUrl+"#"+currentDocHeight;}
this.docHeight=currentDocHeight;}},getDocHeight:function(){var dialogueRegion=YAHOO.util.Dom.getRegion('rnDialog1_c');var dialogueHeight=0;var docRegion=YAHOO.util.Dom.getRegion('rn_body');var bodyHeight=docRegion.bottom-docRegion.top;if(dialogueRegion){dialogueHeight=dialogueRegion.bottom-dialogueRegion.top+20;if((dialogueHeight<bodyHeight)&&(dialogueRegion.bottom>bodyHeight)){dialogueHeight=bodyHeight+1;}}
if(dialogueHeight>bodyHeight){return dialogueHeight;}else{return bodyHeight;}},initializeIframe:function(){setInterval((function(self){return function(){self.changeHeight();}})(this),this.data.attrs['pollingFreq']);},getIframeURL:function(){if(this.data.attrs['iframedomain']==null){this.data.attrs['iframedomain']=top.location.host;}
if(this.data.attrs['iframedoc']==null){this.data.attrs['iframedoc']="";}
return this.data.attrs['iframedomain']+this.data.attrs['iframedoc'];}};