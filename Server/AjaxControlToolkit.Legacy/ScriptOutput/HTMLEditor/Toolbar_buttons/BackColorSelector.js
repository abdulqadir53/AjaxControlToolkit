Type.registerNamespace("Sys.Extended.UI.HTMLEditor.ToolbarButton");Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector=function(a){Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector.initializeBase(this,[a])};Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector.prototype={callMethod:function(){if(!Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector.callBaseMethod(this,"callMethod"))return false},setColor:function(a){Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector.callBaseMethod(this,"setColor",[a]);this._designPanel._execCommand("backcolor",false,a)}};Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector.registerClass("Sys.Extended.UI.HTMLEditor.ToolbarButton.BackColorSelector",Sys.Extended.UI.HTMLEditor.ToolbarButton.ColorSelector);