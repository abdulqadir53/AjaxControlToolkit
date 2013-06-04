// (c) 2010 CodePlex Foundation
(function(){var a=null,d="ExtendedDropShadow",b=a;function c(){var c="absolute";Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.DropShadowBehavior=function(c){var b=this;Sys.Extended.UI.DropShadowBehavior.initializeBase(b,[c]);b._opacity=1;b._width=5;b._shadowDiv=a;b._trackPosition=a;b._trackPositionDelay=50;b._timer=a;b._tickHandler=a;b._roundedBehavior=a;b._shadowRoundedBehavior=a;b._rounded=false;b._radius=5;b._lastX=a;b._lastY=a;b._lastW=a;b._lastH=a};Sys.Extended.UI.DropShadowBehavior.prototype={initialize:function(){var a=this;Sys.Extended.UI.DropShadowBehavior.callBaseMethod(a,"initialize");b=a.get_element();if($common.getCurrentStyle(b,"position",b.style.position)!=c)b.style.position="relative";a._rounded&&a.setupRounded();a._trackPosition&&a.startTimer();a.setShadow()},dispose:function(){this.stopTimer();this.disposeShadowDiv();Sys.Extended.UI.DropShadowBehavior.callBaseMethod(this,"dispose")},buildShadowDiv:function(){var d=this;b=d.get_element();if(!d.get_isInitialized()||!b||!d._width)return;if(b.style.boxShadow==undefined&&b.style.MozBoxShadow==undefined&&b.style.WebkitBoxShadow==undefined){var e=document.createElement("DIV");e.style.backgroundColor="black";e.style.position=c;if(b.id)e.id=b.id+"_DropShadow";d._shadowDiv=e;b.parentNode.appendChild(e);if(d._rounded){d._shadowDiv.style.height=Math.max(0,b.offsetHeight-2*d._radius)+"px";if(!d._shadowRoundedBehavior)d._shadowRoundedBehavior=$create(Sys.Extended.UI.RoundedCornersBehavior,{Radius:d._radius},a,a,d._shadowDiv);else d._shadowRoundedBehavior.set_Radius(d._radius)}else d._shadowRoundedBehavior&&d._shadowRoundedBehavior.set_Radius(0);d._opacity!=1&&d.setupOpacity();d.setShadow(false,true);d.updateZIndex()}},disposeShadowDiv:function(){var b=this;if(b._shadowDiv){b._shadowDiv.parentNode&&b._shadowDiv.parentNode.removeChild(b._shadowDiv);b._shadowDiv=a}if(b._shadowRoundedBehavior){b._shadowRoundedBehavior.dispose();b._shadowRoundedBehavior=a}},onTimerTick:function(){this.setShadow()},startTimer:function(){var a=this;if(!a._timer){if(!a._tickHandler)a._tickHandler=Function.createDelegate(a,a.onTimerTick);a._timer=new Sys.Timer;a._timer.set_interval(a._trackPositionDelay);a._timer.add_tick(a._tickHandler);a._timer.set_enabled(true)}},stopTimer:function(){var b=this;if(b._timer){b._timer.remove_tick(b._tickHandler);b._timer.set_enabled(false);b._timer.dispose();b._timer=a}},setShadow:function(h,j){var c="px ",a=this;b=a.get_element();if(!a.get_isInitialized()||!b||!a._width&&!h)return;if(b.style.boxShadow==undefined&&b.style.MozBoxShadow==undefined&&b.style.WebkitBoxShadow==undefined){var g=a._shadowDiv;!g&&a.buildShadowDiv();var e={x:b.offsetLeft,y:b.offsetTop};if(h||a._lastX!=e.x||a._lastY!=e.y||!g){a._lastX=e.x;a._lastY=e.y;var f=a.get_Width();e.x+=f;e.y+=f;$common.setLocation(a._shadowDiv,e)}var i=b.offsetHeight,f=b.offsetWidth;if(h||i!=a._lastH||f!=a._lastW||!g){a._lastW=f;a._lastH=i;if(!a._rounded||!g||j){a._shadowDiv.style.width=f+"px";a._shadowDiv.style.height=i+"px"}else{a.disposeShadowDiv();a.setShadow()}}if(a._shadowDiv)a._shadowDiv.style.visibility=$common.getCurrentStyle(b,"visibility")}else{var d;if(a._opacity==".25")d=a._width+c+a._width+c+a._width+c+"#D3D3D3";else if(a._opacity==".5")d=a._width+c+a._width+c+a._width+c+"#778899";else if(a._opacity==".75")d=a._width+c+a._width+c+a._width+c+"#808080";else d=a._width+c+a._width+c+a._width+c+"#000";if(b.style.boxShadow!=undefined)b.style.boxShadow=d;else if(b.style.MozBoxShadow!=undefined)b.style.MozBoxShadow=d;else if(b.style.WebkitBoxShadow!=undefined)b.style.WebkitBoxShadow=d}},setupOpacity:function(){var a=this;a.get_isInitialized()&&a._shadowDiv&&$common.setElementOpacity(a._shadowDiv,a._opacity)},setupRounded:function(){var b=this;if(!b._roundedBehavior&&b._rounded)b._roundedBehavior=$create(Sys.Extended.UI.RoundedCornersBehavior,a,a,a,b.get_element());b._roundedBehavior&&b._roundedBehavior.set_Radius(b._rounded?b._radius:0)},updateZIndex:function(){var c=this;if(!c._shadowDiv)return;var d=c.get_element(),a=d.style.zIndex,b=c._shadowDiv.style.zIndex;if(b&&a&&a>b)return;else{a=Math.max(2,a);b=a-1}d.style.zIndex=a;c._shadowDiv.style.zIndex=b},updateRoundedCorners:function(){var a=this;if(a.get_isInitialized()){a.setupRounded();a.disposeShadowDiv();a.setShadow()}},get_Opacity:function(){return this._opacity},set_Opacity:function(b){var a=this;if(a._opacity!=b){a._opacity=b;a.setShadow();a.setupOpacity();a.raisePropertyChanged("Opacity")}},get_Rounded:function(){return this._rounded},set_Rounded:function(b){var a=this;if(b!=a._rounded){a._rounded=b;a.updateRoundedCorners();a.raisePropertyChanged("Rounded")}},get_Radius:function(){return this._radius},set_Radius:function(b){var a=this;if(b!=a._radius){a._radius=b;a.updateRoundedCorners();a.raisePropertyChanged("Radius")}},get_Width:function(){return this._width},set_Width:function(b){var a=this;if(b!=a._width){a._width=b;a._shadowDiv&&$common.setVisible(a._shadowDiv,b>0);a.setShadow(true);a.raisePropertyChanged("Width")}},get_TrackPositionDelay:function(){return this._trackPositionDelay},set_TrackPositionDelay:function(c){var a=this;if(c!=a._trackPositionDelay){a._trackPositionDelay=c;if(!b)b=a.get_element();if(b.style.boxShadow==undefined&&b.style.MozBoxShadow==undefined&&b.style.WebkitBoxShadow==undefined){if(a._trackPosition){a.stopTimer();a.startTimer()}a.raisePropertyChanged("TrackPositionDelay")}}},get_TrackPosition:function(){return this._trackPosition},set_TrackPosition:function(c){var a=this;if(c!=a._trackPosition){a._trackPosition=c;if(!b)b=a.get_element();if(b.style.boxShadow==undefined&&b.style.MozBoxShadow==undefined&&b.style.WebkitBoxShadow==undefined){if(a.get_element())if(c)a.startTimer();else a.stopTimer();a.raisePropertyChanged("TrackPosition")}}}};Sys.Extended.UI.DropShadowBehavior.registerClass("Sys.Extended.UI.DropShadowBehavior",Sys.Extended.UI.BehaviorBase);Sys.registerComponent(Sys.Extended.UI.DropShadowBehavior,{name:"dropShadow"})}if(window.Sys&&Sys.loader)Sys.loader.registerScript(d,["ExtendedBase","ExtendedCommon","ExtendedTimer","ExtendedRoundedCorners"],c);else c()})();