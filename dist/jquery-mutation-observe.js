!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();!function(e){e.fn.mutationObserve=function(r){return r=e.extend({observeAttr:!0,attrFilter:[],observeChild:!0,observeProgeny:!0,nodeFilter:[],callback:function(){}},r),this.each(function(){new t(e(this),r)}),this};var t=function(){function t(r,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.$target=r,this.options=n,this.observer=new MutationObserver(function(t){t.forEach(function(t){console.log(t);var r=null;if("attributes"==t.type)t.target!=o.$target[0]&&o.isMatchedWithFilter(t.target),r=new e.Event("mutation.changeAttr",{mutationRecord:t,attrName:t.attributeName,oldValue:t.oldValue,newValue:o.$target.attr("class")});else if("childList"==t.type){var n=!1;if(t.addedNodes&&t.addedNodes.length)1==(i=t.addedNodes[0]).nodeType?o.isMatchedWithFilter(i,t.target)&&(r=new e.Event("mutation.addElement",{mutationRecord:t,addedNodes:t.addedNodes})):3==i.nodeType&&(r=new e.Event("mutation.addText",{mutationRecord:t,text:i.nodeValue}),n=t.addedNodes[0].nodeValue);else if(t.removedNodes&&t.removedNodes.length){var i;1==(i=t.removedNodes[0]).nodeType?o.isMatchedWithFilter(i,t.target)&&(r=new e.Event("mutation.removeElement",{mutationRecord:t,removedNodes:t.removedNodes})):3==i.nodeType&&(r=new e.Event("mutation.removeText",{mutationRecord:t,text:i.nodeValue}),n=i.nodeValue)}!1!==n&&setTimeout(function(){o.$target.trigger(new e.Event("mutation.changeText",{mutationRecord:t,text:n}))},0)}r&&o.$target.trigger(r)})});var i={};i.attributes=n.observeAttr,i.childList=n.observeChild||n.observeProgeny,i.subtree=n.observeProgeny,i.characterData=!1,i.attributeOldValue=!0,n.attrFilter&&Array.isArray(n.attrFilter)&&n.attrFilter.length&&(i.attributeFilter=n.attrFilter),this.mutationConfig=i,this.observer.observe(r[0],i)}return n(t,[{key:"isMatchedWithFilter",value:function(t,r){var n=this,o=this.options.nodeFilter;if(!o||0==o.length)return!0;"string"==typeof o&&(o=[o]);var i=!1;this.observer.disconnect();var a=null,u=null;return void 0!==r?(a=u=e(t).clone(),e(r).append(a)):u=e(t),o.some(function(e){if(n.$target.find(e).each(function(e,t){if(t==u[0])return i=!0,!1}),i)return!0}),a&&a.remove(),this.observer.observe(this.$target[0],this.mutationConfig),i}}]),t}()}(jQuery)}]);