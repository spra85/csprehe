(function(global){global.ShortBus={__events__:{},namespace:function(namespace,alias){alias=alias||"ShortBus";if(namespace.constructor===String){alias=namespace;namespace=global;}namespace[alias]=this;global.ShortBus=undefined;},on:function(event,handler,context){if(context){var originalHandler=handler;handler=function(){originalHandler.apply(context,arguments);};}var events=this.__events__[event]=this.__events__[event]||[];var handlerNotRegistered=true;for(var func in events){if(events[func]===handler)handlerNotRegistered=false;}if(handlerNotRegistered)events.push(handler);},off:function(event,handler){var keptHandlers=[];if(handler){for(var key in this.__events__[event]){if(this.__events__[event].hasOwnProperty(key)&&handler!==this.__events__[event][key]){keptHandlers.push(this.__events__[event][key]);}}this.__events__[event]=keptHandlers;}else{this.__events__[event].length=0;}},trigger:function(){var args=Array.prototype.slice.call(arguments);var event=args.shift();var handlers=this.__events__[event];if(handlers){for(var key in handlers){if(handlers.hasOwnProperty(key))handlers[key].apply(null,args);}}}};})(this);
