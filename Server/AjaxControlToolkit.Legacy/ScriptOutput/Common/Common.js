// (c) 2010 CodePlex Foundation
(function(){var b="ExtendedCommon";function a(){var p="WatermarkChanged",l="hiddenInputToUpdateATBuffer_CommonToolkitScripts",g="HTMLEvents",r="mousemove",k="MouseEvents",m="UIEvents",o="display",q="DXImageTransform.Microsoft.Alpha",i="value",h="hidden",n="none",f="px",e="element",d="undefined",c=null,a=false,j="Sys.Extended.UI.BoxSide",b=true,s=Sys.version;if(!s&&!Sys._versionChecked){Sys._versionChecked=b;throw new Error("AjaxControlToolkit requires ASP.NET Ajax 4.0 scripts. Ensure the correct version of the scripts are referenced. If you are using an ASP.NET ScriptManager, switch to the ToolkitScriptManager in AjaxControlToolkit.dll.");}Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.BoxSide=function(){};Sys.Extended.UI.BoxSide.prototype={Top:0,Right:1,Bottom:2,Left:3};Sys.Extended.UI.BoxSide.registerEnum(j,a);Sys.Extended.UI._CommonToolkitScripts=function(){};Sys.Extended.UI._CommonToolkitScripts.prototype={_borderStyleNames:["borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle"],_borderWidthNames:["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"],_paddingWidthNames:["paddingTop","paddingRight","paddingBottom","paddingLeft"],_marginWidthNames:["marginTop","marginRight","marginBottom","marginLeft"],getCurrentStyle:function(b,e,f){var a=c;if(b){if(b.currentStyle)a=b.currentStyle[e];else if(document.defaultView&&document.defaultView.getComputedStyle){var g=document.defaultView.getComputedStyle(b,c);if(g)a=g[e]}if(!a&&b.style.getPropertyValue)a=b.style.getPropertyValue(e);else if(!a&&b.style.getAttribute)a=b.style.getAttribute(e)}if(!a||a==""||typeof a===d)if(typeof f!=d)a=f;else a=c;return a},getInheritedBackgroundColor:function(d){var c="backgroundColor",a="#FFFFFF";if(!d)return a;var b=this.getCurrentStyle(d,c);try{while(!b||b==""||b=="transparent"||b=="rgba(0, 0, 0, 0)"){d=d.parentNode;if(!d)b=a;else b=this.getCurrentStyle(d,c)}}catch(e){b=a}return b},getLocation:function(a){return Sys.UI.DomElement.getLocation(a)},setLocation:function(b,a){Sys.UI.DomElement.setLocation(b,a.x,a.y)},getContentSize:function(a){if(!a)throw Error.argumentNull(e);var d=this.getSize(a),c=this.getBorderBox(a),b=this.getPaddingBox(a);return{width:d.width-c.horizontal-b.horizontal,height:d.height-c.vertical-b.vertical}},getSize:function(a){if(!a)throw Error.argumentNull(e);return{width:a.offsetWidth,height:a.offsetHeight}},setContentSize:function(a,c){var b="border-box",d=this;if(!a)throw Error.argumentNull(e);if(!c)throw Error.argumentNull("size");if(d.getCurrentStyle(a,"MozBoxSizing")==b||d.getCurrentStyle(a,"BoxSizing")==b){var h=d.getBorderBox(a),g=d.getPaddingBox(a);c={width:c.width+h.horizontal+g.horizontal,height:c.height+h.vertical+g.vertical}}a.style.width=c.width.toString()+f;a.style.height=c.height.toString()+f},setSize:function(a,b){if(!a)throw Error.argumentNull(e);if(!b)throw Error.argumentNull("size");var d=this.getBorderBox(a),c=this.getPaddingBox(a),f={width:b.width-d.horizontal-c.horizontal,height:b.height-d.vertical-c.vertical};this.setContentSize(a,f)},getBounds:function(a){return Sys.UI.DomElement.getBounds(a)},setBounds:function(a,b){if(!a)throw Error.argumentNull(e);if(!b)throw Error.argumentNull("bounds");this.setSize(a,b);$common.setLocation(a,b)},getClientBounds:function(){var b,a;if(document.compatMode=="CSS1Compat"){b=document.documentElement.clientWidth;a=document.documentElement.clientHeight}else{b=document.body.clientWidth;a=document.body.clientHeight}return new Sys.UI.Bounds(0,0,b,a)},getMarginBox:function(b){var c=this;if(!b)throw Error.argumentNull(e);var a={top:c.getMargin(b,Sys.Extended.UI.BoxSide.Top),right:c.getMargin(b,Sys.Extended.UI.BoxSide.Right),bottom:c.getMargin(b,Sys.Extended.UI.BoxSide.Bottom),left:c.getMargin(b,Sys.Extended.UI.BoxSide.Left)};a.horizontal=a.left+a.right;a.vertical=a.top+a.bottom;return a},getBorderBox:function(b){var c=this;if(!b)throw Error.argumentNull(e);var a={top:c.getBorderWidth(b,Sys.Extended.UI.BoxSide.Top),right:c.getBorderWidth(b,Sys.Extended.UI.BoxSide.Right),bottom:c.getBorderWidth(b,Sys.Extended.UI.BoxSide.Bottom),left:c.getBorderWidth(b,Sys.Extended.UI.BoxSide.Left)};a.horizontal=a.left+a.right;a.vertical=a.top+a.bottom;return a},getPaddingBox:function(b){var c=this;if(!b)throw Error.argumentNull(e);var a={top:c.getPadding(b,Sys.Extended.UI.BoxSide.Top),right:c.getPadding(b,Sys.Extended.UI.BoxSide.Right),bottom:c.getPadding(b,Sys.Extended.UI.BoxSide.Bottom),left:c.getPadding(b,Sys.Extended.UI.BoxSide.Left)};a.horizontal=a.left+a.right;a.vertical=a.top+a.bottom;return a},isBorderVisible:function(b,a){if(!b)throw Error.argumentNull(e);if(a<Sys.Extended.UI.BoxSide.Top||a>Sys.Extended.UI.BoxSide.Left)throw Error.argumentOutOfRange(String.format(Sys.Res.enumInvalidValue,a,j));var d=this._borderStyleNames[a],c=this.getCurrentStyle(b,d);return c!=n},getMargin:function(b,a){if(!b)throw Error.argumentNull(e);if(a<Sys.Extended.UI.BoxSide.Top||a>Sys.Extended.UI.BoxSide.Left)throw Error.argumentOutOfRange(String.format(Sys.Res.enumInvalidValue,a,j));var d=this._marginWidthNames[a],c=this.getCurrentStyle(b,d);try{return this.parsePadding(c)}catch(f){return 0}},getBorderWidth:function(c,a){var b=this;if(!c)throw Error.argumentNull(e);if(a<Sys.Extended.UI.BoxSide.Top||a>Sys.Extended.UI.BoxSide.Left)throw Error.argumentOutOfRange(String.format(Sys.Res.enumInvalidValue,a,j));if(!b.isBorderVisible(c,a))return 0;var f=b._borderWidthNames[a],d=b.getCurrentStyle(c,f);return b.parseBorderWidth(d)},getPadding:function(b,a){if(!b)throw Error.argumentNull(e);if(a<Sys.Extended.UI.BoxSide.Top||a>Sys.Extended.UI.BoxSide.Left)throw Error.argumentOutOfRange(String.format(Sys.Res.enumInvalidValue,a,j));var d=this._paddingWidthNames[a],c=this.getCurrentStyle(b,d);return this.parsePadding(c)},parseBorderWidth:function(d){var e=this;if(!e._borderThicknesses){var c={},a=document.createElement("div");a.style.visibility=h;a.style.position="absolute";a.style.fontSize="1px";document.body.appendChild(a);var b=document.createElement("div");b.style.height="0px";b.style.overflow=h;a.appendChild(b);var g=a.offsetHeight;b.style.borderTop="solid black";b.style.borderTopWidth="thin";c.thin=a.offsetHeight-g;b.style.borderTopWidth="medium";c.medium=a.offsetHeight-g;b.style.borderTopWidth="thick";c.thick=a.offsetHeight-g;a.removeChild(b);document.body.removeChild(a);e._borderThicknesses=c}if(d){switch(d){case"thin":case"medium":case"thick":return e._borderThicknesses[d];case"inherit":return 0}var i=e.parseUnit(d);Sys.Debug.assert(i.type==f,String.format(Sys.Extended.UI.Resources.Common_InvalidBorderWidthUnit,i.type));return i.size}return 0},parsePadding:function(a){if(a){if(a=="inherit")return 0;var b=this.parseUnit(a);b.type!==f&&Sys.Debug.fail(String.format(Sys.Extended.UI.Resources.Common_InvalidPaddingUnit,b.type));return b.size}return 0},parseUnit:function(a){if(!a)throw Error.argumentNull(i);a=a.trim().toLowerCase();for(var h=a.length,c=-1,g=0;g<h;g++){var b=a.substr(g,1);if((b<"0"||b>"9")&&b!="-"&&b!="."&&b!=",")break;c=g}if(c==-1)throw Error.create(Sys.Extended.UI.Resources.Common_UnitHasNoDigits);var e,d;if(c<h-1)e=a.substring(c+1).trim();else e=f;d=parseFloat(a.substr(0,c+1));if(e==f)d=Math.floor(d);return{size:d,type:e}},getElementOpacity:function(c){if(!c)throw Error.argumentNull(e);var d=a,f;if(c.filters){var h=c.filters;if(h.length!==0){var g=h[q];if(g){f=g.opacity/100;d=b}}}else{f=this.getCurrentStyle(c,"opacity",1);d=b}return d===a?1:parseFloat(f)},setElementOpacity:function(c,d){if(!c)throw Error.argumentNull(e);if(c.filters){var h=c.filters,f=b;if(h.length!==0){var g=h[q];if(g){f=a;g.opacity=d*100}}if(f)c.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+d*100+")"}else c.style.opacity=d},getVisible:function(a){return a&&n!=$common.getCurrentStyle(a,o)&&h!=$common.getCurrentStyle(a,"visibility")},setVisible:function(a,b){if(a&&b!=$common.getVisible(a)){if(b)if(a.style.removeAttribute)a.style.removeAttribute(o);else a.style.removeProperty(o);else a.style.display=n;a.style.visibility=b?"visible":h}},resolveFunction:function(a){if(a)if(a instanceof Function)return a;else if(String.isInstanceOfType(a)&&a.length>0){var b;if((b=window[a])instanceof Function)return b;else if((b=eval(a))instanceof Function)return b}return c},addCssClasses:function(c,b){for(var a=0;a<b.length;a++)Sys.UI.DomElement.addCssClass(c,b[a])},removeCssClasses:function(c,b){for(var a=0;a<b.length;a++)Sys.UI.DomElement.removeCssClass(c,b[a])},setStyle:function(a,b){$common.applyProperties(a.style,b)},removeHandlers:function(c,a){for(var b in a)$removeHandler(c,b,a[b])},overlaps:function(a,b){return a.x<b.x+b.width&&b.x<a.x+a.width&&a.y<b.y+b.height&&b.y<a.y+a.height},containsPoint:function(a,b,c){return b>=a.x&&b<a.x+a.width&&c>=a.y&&c<a.y+a.height},isKeyDigit:function(a){return 48<=a&&a<=57},isKeyNavigation:function(a){return Sys.UI.Key.left<=a&&a<=Sys.UI.Key.down},padLeft:function(d,c,e,b){return $common._pad(d,c||2,e||" ","l",b||a)},padRight:function(d,c,e,b){return $common._pad(d,c||2,e||" ","r",b||a)},_pad:function(c,b,h,e,g){c=c.toString();var f=c.length,d=new Sys.StringBuilder;e=="r"&&d.append(c);while(f<b){d.append(h);f++}e=="l"&&d.append(c);var a=d.toString();if(g&&a.length>b)if(e=="l")a=a.substr(a.length-b,b);else a=a.substr(0,b);return a},__DOMEvents:{focusin:{eventGroup:m,init:function(c){c.initUIEvent("focusin",b,a,window,1)}},focusout:{eventGroup:m,init:function(c){c.initUIEvent("focusout",b,a,window,1)}},activate:{eventGroup:m,init:function(a){a.initUIEvent("activate",b,b,window,1)}},focus:{eventGroup:m,init:function(b){b.initUIEvent("focus",a,a,window,1)}},blur:{eventGroup:m,init:function(b){b.initUIEvent("blur",a,a,window,1)}},click:{eventGroup:k,init:function(e,d){e.initMouseEvent("click",b,b,window,1,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},dblclick:{eventGroup:k,init:function(e,d){e.initMouseEvent("click",b,b,window,2,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},mousedown:{eventGroup:k,init:function(e,d){e.initMouseEvent("mousedown",b,b,window,1,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},mouseup:{eventGroup:k,init:function(e,d){e.initMouseEvent("mouseup",b,b,window,1,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},mouseover:{eventGroup:k,init:function(e,d){e.initMouseEvent("mouseover",b,b,window,1,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},mousemove:{eventGroup:k,init:function(e,d){e.initMouseEvent(r,b,b,window,1,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},mouseout:{eventGroup:k,init:function(e,d){e.initMouseEvent(r,b,b,window,1,d.screenX||0,d.screenY||0,d.clientX||0,d.clientY||0,d.ctrlKey||a,d.altKey||a,d.shiftKey||a,d.metaKey||a,d.button||0,d.relatedTarget||c)}},load:{eventGroup:g,init:function(b){b.initEvent("load",a,a)}},unload:{eventGroup:g,init:function(b){b.initEvent("unload",a,a)}},select:{eventGroup:g,init:function(c){c.initEvent("select",b,a)}},change:{eventGroup:g,init:function(c){c.initEvent("change",b,a)}},submit:{eventGroup:g,init:function(a){a.initEvent("submit",b,b)}},reset:{eventGroup:g,init:function(c){c.initEvent("reset",b,a)}},resize:{eventGroup:g,init:function(c){c.initEvent("resize",b,a)}},scroll:{eventGroup:g,init:function(c){c.initEvent("scroll",b,a)}}},tryFireRawEvent:function(c,d){try{if(c.fireEvent){c.fireEvent("on"+d.type,d);return b}else if(c.dispatchEvent){c.dispatchEvent(d);return b}}catch(e){}return a},tryFireEvent:function(g,f,e){try{if(document.createEventObject){var c=document.createEventObject();$common.applyProperties(c,e||{});g.fireEvent("on"+f,c);return b}else if(document.createEvent){var d=$common.__DOMEvents[f];if(d){var c=document.createEvent(d.eventGroup);d.init(c,e||{});g.dispatchEvent(c);return b}}}catch(c){}return a},wrapElement:function(a,b,c){var d=a.parentNode;d.replaceChild(b,a);(c||b).appendChild(a)},unwrapElement:function(b,a){var d=a.parentNode;if(d!=c){$common.removeElement(b);d.replaceChild(b,a)}},removeElement:function(a){var b=a.parentNode;b!=c&&b.removeChild(a)},applyProperties:function(e,d){for(var b in d){var a=d[b];if(a!=c&&Object.getType(a)===Object){var f=e[b];$common.applyProperties(f,a)}else e[b]=a}},createElementFromTemplate:function(a,j,e){if(typeof a.nameTable!=d){var g=a.nameTable;if(String.isInstanceOfType(g))g=e[g];if(g!=c)e=g}var l=c;if(typeof a.name!==d)l=a.name;var b=document.createElement(a.nodeName);if(typeof a.name!==d&&e)e[a.name]=b;if(typeof a.parent!==d&&j==c){var h=a.parent;if(String.isInstanceOfType(h))h=e[h];if(h!=c)j=h}typeof a.properties!==d&&a.properties!=c&&$common.applyProperties(b,a.properties);typeof a.cssClasses!==d&&a.cssClasses!=c&&$common.addCssClasses(b,a.cssClasses);typeof a.events!==d&&a.events!=c&&$addHandlers(b,a.events);typeof a.visible!==d&&a.visible!=c&&this.setVisible(b,a.visible);j&&j.appendChild(b);typeof a.opacity!==d&&a.opacity!=c&&$common.setElementOpacity(b,a.opacity);if(typeof a.children!==d&&a.children!=c)for(var k=0;k<a.children.length;k++){var m=a.children[k];$common.createElementFromTemplate(m,b,e)}var i=b;if(typeof a.contentPresenter!==d&&a.contentPresenter!=c)i=e[i];if(typeof a.content!==d&&a.content!=c){var f=a.content;if(String.isInstanceOfType(f))f=e[f];if(f.parentNode)$common.wrapElement(f,b,i);else i.appendChild(f)}return b},prepareHiddenElementForATDeviceUpdate:function(){var a=document.getElementById(l);if(!a){var a=document.createElement("input");a.setAttribute("type",h);a.setAttribute(i,"1");a.setAttribute("id",l);a.setAttribute("name",l);document.forms[0]&&document.forms[0].appendChild(a)}},updateFormToRefreshATDeviceBuffer:function(){var a=document.getElementById(l);if(a)if(a.getAttribute(i)=="1")a.setAttribute(i,"0");else a.setAttribute(i,"1")},appendElementToFormOrBody:function(a){if(document.forms&&document.forms[0])document.forms[0].appendChild(a);else document.body.appendChild(a)},setText:function(a,b){if(document.all)a.innerText=b;else a.textContent=b}};CommonToolkitScripts=Sys.Extended.UI.CommonToolkitScripts=new Sys.Extended.UI._CommonToolkitScripts;$common=CommonToolkitScripts;Sys.UI.DomElement.getVisible=$common.getVisible;Sys.UI.DomElement.setVisible=$common.setVisible;Sys.UI.Control.overlaps=$common.overlaps;Sys.Extended.UI._DomUtility=function(){};Sys.Extended.UI._DomUtility.prototype={isDescendant:function(f,e){for(var d=e.parentNode;d!=c;d=d.parentNode)if(d==f)return b;return a},isDescendantOrSelf:function(c,a){return c===a?b:Sys.Extended.UI.DomUtility.isDescendant(c,a)},isAncestor:function(a,b){return Sys.Extended.UI.DomUtility.isDescendant(b,a)},isAncestorOrSelf:function(a,c){return a===c?b:Sys.Extended.UI.DomUtility.isDescendant(c,a)},isSibling:function(f,e){for(var d=f.parentNode,c=0;c<d.childNodes.length;c++)if(d.childNodes[c]==e)return b;return a}};Sys.Extended.UI._DomUtility.registerClass("Sys.Extended.UI._DomUtility");Sys.Extended.UI.DomUtility=new Sys.Extended.UI._DomUtility;Sys.Extended.UI.TextBoxWrapper=function(d){var b=this;Sys.Extended.UI.TextBoxWrapper.initializeBase(b,[d]);b._current=d.value;b._watermark=c;b._isWatermarked=a};Sys.Extended.UI.TextBoxWrapper.prototype={dispose:function(){this.get_element().TextBoxWrapper=c;Sys.Extended.UI.TextBoxWrapper.callBaseMethod(this,"dispose")},get_Current:function(){this._current=this.get_element().value;return this._current},set_Current:function(a){this._current=a;this._updateElement()},get_Value:function(){return this.get_IsWatermarked()?"":this.get_Current()},set_Value:function(e){var d=this;d.set_Current(e);if(!e||0==e.length)c!=d._watermark&&d.set_IsWatermarked(b);else d.set_IsWatermarked(a)},get_Watermark:function(){return this._watermark},set_Watermark:function(a){this._watermark=a;this._updateElement()},get_IsWatermarked:function(){return this._isWatermarked},set_IsWatermarked:function(b){var a=this;if(a._isWatermarked!=b){a._isWatermarked=b;a._updateElement();a._raiseWatermarkChanged()}},_updateElement:function(){var a=this,b=a.get_element();if(a._isWatermarked){if(b.value!=a._watermark)b.value=a._watermark}else if(b.value!=a._current)b.value=a._current},add_WatermarkChanged:function(a){this.get_events().addHandler(p,a)},remove_WatermarkChanged:function(a){this.get_events().removeHandler(p,a)},_raiseWatermarkChanged:function(){var a=this.get_events().getHandler(p);a&&a(this,Sys.EventArgs.Empty)}};Sys.Extended.UI.TextBoxWrapper.get_Wrapper=function(a){if(c==a.TextBoxWrapper)a.TextBoxWrapper=new Sys.Extended.UI.TextBoxWrapper(a);return a.TextBoxWrapper};Sys.Extended.UI.TextBoxWrapper.registerClass("Sys.Extended.UI.TextBoxWrapper",Sys.UI.Behavior);Sys.Extended.UI.TextBoxWrapper.validatorGetValue=function(b){var a=$get(b);return a&&a.TextBoxWrapper?a.TextBoxWrapper.get_Value():Sys.Extended.UI.TextBoxWrapper._originalValidatorGetValue(b)};if(typeof ValidatorGetValue=="function"){Sys.Extended.UI.TextBoxWrapper._originalValidatorGetValue=ValidatorGetValue;ValidatorGetValue=Sys.Extended.UI.TextBoxWrapper.validatorGetValue}if(Sys.CultureInfo&&Sys.CultureInfo.prototype._getAbbrMonthIndex){Sys.CultureInfo.prototype._getAbbrMonthIndex=function(b){var a=this;if(!a._upperAbbrMonths)a._upperAbbrMonths=a._toUpperArray(a.dateTimeFormat.AbbreviatedMonthNames);return Array.indexOf(a._upperAbbrMonths,a._toUpper(b))};Sys.CultureInfo.CurrentCulture._getAbbrMonthIndex=Sys.CultureInfo.prototype._getAbbrMonthIndex;Sys.CultureInfo.InvariantCulture._getAbbrMonthIndex=Sys.CultureInfo.prototype._getAbbrMonthIndex}Sys.Extended.UI.ScrollBars=function(){throw Error.invalidOperation();};Sys.Extended.UI.ScrollBars.prototype={None:0,Horizontal:1,Vertical:2,Both:3,Auto:4};Sys.Extended.UI.ScrollBars.registerEnum("Sys.Extended.UI.ScrollBars",a)}if(window.Sys&&Sys.loader)Sys.loader.registerScript(b,["ComponentModel"],a);else a()})();var $common,CommonToolkitScripts;