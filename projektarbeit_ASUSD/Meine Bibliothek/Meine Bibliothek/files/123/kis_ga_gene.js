!function(t){var o={};function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)i.d(t,o,function(e){return n[e]}.bind(null,o));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/core/assets/kis/dist/",i(i.s=33)}({0:function(e,n,t){"use strict";window.addEventListener("load",function(e){var n,o=jQuery("#term");o.length&&(setTimeout(t,200),(n=jQuery("#database")).length&&n.on("change",function(e){setTimeout(function(){console.info("Database changed: "+n.val()),t(n.val())},100)}));function t(){var e=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:"")||document.getElementById("p$st").value,n="";if(""!==e){if(console.log("app found: "+e),"gene"===e)n="gene";else if("assembly"===e)n="assembly";else if("genome"===e)n="genome";else if("protein"===e)n="protein";else{if("nuccore"!==e&&"nucleotide"!==e)return void console.log("unknown app. do not initialize dictionary");n="nuccore"}console.info("initializeDictionary"),console.info("setting autocomplete dictionary on app:"+e+" to "+n);var t={dictionary:n};o.ncbiautocomplete(t).ncbiautocomplete("destroy"),o.ncbiautocomplete(t),o.length&&o.on("ncbiautocompletechange",function(e,n){console.info("ncbiautocompletechange");var t=n.optionSelected;void 0!==t&&(ncbi.sg.ping(e.currentTarget,"suggestion-selected","text="+t),ncbi.sg.getGa()("send","event","Search bar","suggestion-selected",t))})}else console.log("unknown app. do not initialize dictionary")}})},33:function(e,n,t){"use strict";t(0)}});