require=function e(t,n,o){function r(i,a){if(!n[i]){if(!t[i]){var l="function"==typeof require&&require;if(!a&&l)return l(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[i]={exports:{}};t[i][0].call(c.exports,function(e){var n=t[i][1][e];return r(n?n:e)},c,c.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/browser/network/ajax.js":[function(e,t,n){var o,r="addEventListener",s=e("../../util"),i=(e("../ua"),0),a=t.exports=function(e,n){var l=e.url;if(!n&&l instanceof Array){e.m=function(){if(++e.r===e.n){for(var t=0,n=[],o=l.length;o>t;n.push(e.d[l[t++]]));e.complete(n)}},e.r=0,e.d={};for(var c=0,d=e.n=l.length;d>c;t.exports(e,l[c++]));}else{var f=e.data,p=e.encode,v=(e.api||"")+(n||l),m=e.headers,h=e.complete,g=e.progress,y=e.error,w=e.change,b=e.mime,j=e.user,_=e.pass,x=e.jsonp,k=e.parse,O=e.iframe,E=null,T=e.fallback,U=e._fallbackIndex,W=e.type||e.method||"GET",S=e.contentType||"json"===p?"application/json":"application/x-www-form-urlencoded",A=e.async!==!1;if(x)a.jsonp(v,h,y);else{var N=new XMLHttpRequest;if(O){i++;var C,L={},D=i;for(var B in e)"error"!==B&&"iframe"!==B&&"complete"!==B&&(L[B]=e[B]);var I=function(){var e;o[O].onload=null;var t=function(e){if(e.data){var n;try{n=JSON.parse(e.data)}catch(e){return void(y&&y(e))}if(n.id!==D)return;if(n.err)return void(y&&y(n.err));var o=n.msg;if(h){if(k!==!1)try{o=JSON.parse(o)}catch(e){}h(o,e)}removeEventListener("message",t)}};window.addEventListener&&(addEventListener("message",t,!1),e=o[O].contentWindow,L=JSON.stringify({msg:L,id:D}),e.postMessage(L,"*"))};return o||(o={}),void(o[O]?o[O].cListeners?o[O].cListeners.push(I):I():(C=o[O]=document.createElement("iframe"),C.src=O,C.cListeners=[I],C.onload=function(){for(var e in C.cListeners)C.cListeners[e]();C.cListeners=null},C.style.visibility="hidden",C.style.width="0px",C.style.height="0px",C.style.position="absolute",document.body.appendChild(C)))}if(f&&("GET"===W?v+="?"+u(f,"GET",p):E=u(f,"POST",p)),N.open(W,v,A,j,_),N.setRequestHeader("Content-Type",S),m)for(var R in m)N.setRequestHeader(R,m[R]);h&&N[r]("load",function(t){var o=(t.target||t.srcElement).response;if(k!==!1)try{o=JSON.parse(o)}catch(t){}e.m?(e.d[n]=o,e.m()):h(o,t)},!1),y&&(U||(e._fallbackIndex=0),T&&U!==T.length?(e._fallbackIndex++,e=s.merge(e,U),a(e,n)):N[r]("error",y,!1)),g&&N[r]("progress",g,!1),w&&(N.onreadystatechange=w),b&&N.overrideMimeType(b),N.send(E)}}},l=0;a.jsonp=function(e,t,n,o,r){r&&r!==!0||(r="callback");var s="_jsonp_"+l++,i=document.createElement("script");e+=e.match(/\?/)?"&"+r+"="+s:"?"+r+"="+s,i.type="text/javascript",i.src=e,n&&(i.onerror=function(e){n(e)}),window[s]=function(e){t.call(o||window,e),document.getElementsByTagName("head")[0].removeChild(i),i=null,delete window[s]},document.getElementsByTagName("head")[0].appendChild(i)};var u=a.encode=function(e,t,n){var o="";if("json"===n)o=JSON.stringify(e);else if(e instanceof Object)if(!s.isNode&&window.FormData&&e instanceof FormData&&"GET"!==t)o=e;else if(e instanceof Array)o=JSON.stringify(e[r]),"uri"===n&&(o=encodeURIComponent(o));else{for(var r in e){var i=e[r];i instanceof Object&&(i=JSON.stringify(i)),"uri"===n&&(r=encodeURIComponent(r),i=encodeURIComponent(i)),o+=r+"="+i+"&"}o=o.slice(0,-1)}else o="uri"===n?encodeURIComponent(e):e;return o}},{"../../util":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/index.js","../ua":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/browser/ua.js"}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/browser/network/iframe/index.js":[function(e,t,n){var o=e("../ajax");window.addEventListener&&addEventListener("message",function(e){var t=JSON.parse(e.data),n=t.id,r=t.msg;r.complete=function(e){top.postMessage(JSON.stringify({id:n,msg:e}),"*")},r.error=function(e){console.log("XHR-IFRAME",window.location.href,e),top.postMessage(JSON.stringify({id:n,err:e.message||!0}),"*")},r.parse=!1,o(r)},!1)},{"../ajax":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/browser/network/ajax.js"}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/browser/ua.js":[function(e,t,n){var o=e("../util"),r=n.test=function(e,t){for(var n=o.arg(arguments,1),r=n.length-1,s=n[r][0];s!==!0&&!new RegExp(s).test(e);s=n[--r][0]);(t.slice||t.call(this,s,n[r]))&&(this[t]=n[r][1])},s=n.parse=function(e,t){e||(t=n,e="undefined"!=typeof navigator?navigator.userAgent.toLowerCase():"no navigator"),e=e.toLowerCase(),t||(t={});var s="firefox",i="android",a=".+mobile",l="webkit",u="playstation",c="xbox",d="linux",f="crkey",p="chromecast",v="tablet",m="windows",h="phone";r.call(t,e,function(n,o){t.browser=o[2]||n;var r=e.match(new RegExp("((([\\/ ]version|"+o[0]+"(?!.+version))[/ ])| rv:)([0-9]{1,4}\\.[0-9]{0,2})"));t.version=r?Number(r[4]):0,t.prefix=o[1]},[!0,l],["\\(windows","ms","ie"],["safari",l],[s,"Moz"],["opera","O"],["msie","ms","ie"],["chrome|crios/",l,"chrome"]),r.call(t,e,"platform",[!0,m],[d,d],["lg.{0,3}netcast","lg"],[s+a,s],["mac os x","mac"],["iphone|ipod|ipad","ios"],[c,c],[u,u],[i,i],[m,m],[f,p],["smart-tv;|;samsung;smarttv","samsung"]),r.call(t,e,"device",[!0,"desktop"],[m+".+touch|ipad|"+i,v],["iphone|("+i+a+")|("+s+a+")|"+m+" phone|iemobile",h],[c+"|"+u,"console"],["tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos.+large","tv"],[f,p],["amazon-fireos",v]);var g=304704;return t.platform===i&&!o.isNode&&t.device===h&&window.innerWidth*window.innerHeight>g&&(t.device="tablet"),t};if(!o.isNode&&(s(),window.__ua__))for(var i in window.__ua__)n[i]=window.__ua__[i]},{"../util":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/index.js":[function(e,t,n){},{}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/index.js":[function(e,t,n){e("./object"),e("./prop"),n.isNode="undefined"==typeof window,n.add=function(e,t){return t&&e.push.apply(e,t),e},n.checkArray=function(e,t,o,r){var s=o instanceof Array;if(!e)return!1;for(var i,a=0,l=e.length;l>a;a++)if(i=e[a],void 0!==o){if(o===!0){if(i===t)return a}else if(s?n.path(i,o)===t:i[o]===t)return r?i:a}else if(i===t)return!0;return!1},n.arg=function(e,t){return Array.prototype.slice.call(e,t?t:0)},n.empty=function(e,t){for(var n in e)if(!t||!this.checkArray(t,n))return!1;return!0},n.inject=e("./inject")},{"./inject":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/inject.js","./object":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/object.js","./prop":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/prop.js"}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/inject.js":[function(e,t,n){function o(e,t){if(i&&console.log("9",t,e),t.extend)i&&console.log("9.1",e),t.extend(e);else if(t instanceof Array){var n=t.concat(),o=n[0];n[0]=e,i&&console.log("9.2"),o.extend.apply(o,n)}}function r(){i&&console.log("5");for(var e,t,n=[],r=[this],a=0,l=arguments,u=l.length;u>a;a++)if(t=l[a],"function"==typeof t){e||(e=function(){for(var e=0,t=r.length;t>e;e++)r[e].apply(this,arguments)},s(e,this)),r.push(t);for(var c in t.prototype)if({}.hasOwnProperty.call(t.prototype,c)){if("constructor"===c)continue;e.prototype[c]=t.prototype[c]}}else i&&console.log("6"),e?(i&&console.log("7"),o(e,t)):n.push(t);e||(e=this);for(var d in n)o(e,n[d]);return e}function s(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}var i,a=e("../"),l=e("./");l.isNode||(i=window.$TEST),t.exports=n=function(e){var t=arguments;if(t[0]&&t[0].$TEST&&(i=window.$TEST=!0),"function"==typeof this||a.Base&&this instanceof a.Base||"object"==typeof this){if(!a.Base||!(this===a.Base||this.prototype instanceof a.Base||this instanceof a.Base))return r.apply(this,t);t=l.arg(t),t.unshift(this),e=this}for(var n=1;n<t.length;n++)o(e,t[n]);return e}},{"../":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/index.js","./":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/object.js":[function(e,t,n){function o(e){for(;e&&4===e.__t&&!e._filter;)e=e._val;return e}var r=t.exports=n=e("./"),s=e("../"),i=".";n.lookup=Object.__lookupSetter__||function(e){for(var t,n=this;n;){if(t=Object.getOwnPropertyDescriptor(n,e),t&&t.set)return!0;n=Object.getPrototypeOf(n)}return!1},n.set=function(e,t,n,o,r,i){return s.Object&&e instanceof s.Object?e.set(t,n,o,r,i):e[t]=n},n.path=function(e,t,o,r,s,i,a,l,u,c,d){d||(d=0);var f,p,v=t[d],m=!u&&e&&4===e.__t?e.from[v]:e&&e[v],h=d<t.length-1;return!h||m instanceof Object||(m=void 0),void 0!==o&&(void 0===m||!h&&r)&&(p=!0,n.set(e,v,h?{}:o,h?!1:i,a,l),m=e[v]),h?f=m?this.path(m,t,o,r,s,i,a,l,u,c,++d):m:(f=!u&&m&&4===m.__t?m.from:m,p&&s&&s(f)),f},n.dotField=function(e,t){if(~t.indexOf(i)){var n=t.split(i),o=n.shift(),r={};this.path(r,n,e[t]),delete e[t],e[o]=r,t=o}return t},n.compareArrays=function(e,t,n){var o=n?Object.keys(t).length:t.length;if(e.length!==o)return!1;for(var r=e.length-1;r>=0;r--)if(e[r]!=t[r])return!1;return!0},n.get=function(e,t,n){if(e&&t){if(n||4!==e.__t||e._filter||(e=e.from),!(t instanceof Array)){if(!~t.indexOf(i))return!n&&e[t]&&e[t].from||e[t];t=t.split(i)}return this.path(e,t,void 0,!1,!1,!1,!1,!1,n)}},n.isObj=function(e){return!(!(e instanceof Object&&"function"!=typeof e)||s.Object&&e instanceof s.Object||s.Base&&e instanceof s.Base)},n.clone=function(e,t,n){if(this.isObj(e)){var o=new e.constructor;for(var r in e)t&&t[r]||(o[r]=n?e[r]:this.clone(e[r],t));return o}return e},n.merge=function(e,t,n,o){for(var s in t){var i=r.isObj(e[s]),a=r.isObj(t[s]);i&&a?r.merge(e[s],t[s],n,o):n&&a?(e[s]=t[s]instanceof Array?[]:{},r.merge(e[s],t[s],n,o)):void 0!==o&&s in e&&("function"!=typeof o||!o(e[s],t[s]))||(e[s]=t[s])}return e},n.resolve=function(e,t,o,r){var s=!0;if(t instanceof Object){for(var i in t)void 0!==e[i]&&n.resolve(e[i],t[i],void 0!==o&&null!==o?o[i]:t[i],i)?void 0!==o&&null!==o&&(null===o[i]?s=!1:delete o[i]):s=!1;if(s){if(!o||void 0===r)return!0;delete o[r]}return s}return e==t?(o&&void 0!==r&&delete o[r],!0):void 0},n.include=function(e,t,o,r){if(r&&t instanceof Array){for(var s=!1,i=0,a=t.length;a>i;i++)s=n.include(e,t[i],o);return s}var l,u,i=0,c=e.length;if(1===e.__t){for(;c>i;i++)if(l=u=e[i],4===u.__t&&(u=u.from),u===t||u.val===t)return o&&o(l),!1;return e.push(t),!0}if(e instanceof Array){for(;c>i;i++)if(e[i]===t)return!1;return e.push(t),!0}},n.changeType=function(e){var t;if(e instanceof Array){t={};for(var n=0,o=e.length;o>n;n++)t[n]=e[n]}else{t=[];for(var n in e)t.push(e[n])}return t},n.raw=function(e,t){if(e instanceof Object){if(e instanceof s.Object)return e.raw;var n;if(e instanceof Array){n=[];for(var o=0,r=e.length;r>o;o++)n[o]=this.raw(e[o],t)}else{n={};for(var i in e)n[i]=this.raw(e[i],t)}return n}return e},n.walk=function(e,t){for(var o in e)if(e[o]instanceof Object){if(t(o,e[o],e,!0))return!0;if(n.walk(e[o],t))return!0}else if(t(o,e[o],e))return!0},n.checkParentFactory=function(e){return function(t,o,r,i){o&&o!==!0&&(i=o,o=!1);for(var a,l=t instanceof s.Object?!1:t,u=this;u;){if(a=l===!1?u===t:n.get(u,l,!r)){if(!i)return!o&&l?u:a;if(i===a||a instanceof s.Object&&a.val===i)return!o&&l?u:a}u=u[e]}}},n.disjoin=function(e,t,n){var r="function"==typeof n;e=o(e),t=o(t),e.each(function(){var e,o=this,s=o.from;t.each(function(){var t=this,o=t.from;return e=r?n(s,o):n===!0?s===o:s[n]&&o[n]&&s[n].val===o[n].val}),e&&o.remove()})}},{"../":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/index.js","./":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/prop.js":[function(e,t,n){function o(e,t,n,o,i){if(window.$TEST&&console.log(12,e),e.extensions||(n?e.extensions=[]:s.Object&&e instanceof s.Object?r.define(e,"extensions",[]):r.define(e,"extensions",{val:[],setClass:!0})),r.checkArray(e.extensions,this)===!1){i||(e.extensions=[this].concat(e.extensions));var a=r.arg(o);n&&!i&&(a[0]=n),window.$TEST&&console.error("??xxx?",a,t,this);var l=t.apply(this,a);if(window.$TEST,l)return l}else window.$TEST&&console.error("???")}var r=t.exports=n=e("./"),s=e("../");n.setstore=function(){this.__||(this.__={})},n.getStore=function(e){return this.__?void 0!==this.__[e]?this.__[e]:this._[e]:this._&&this._[e]},n.extend=function(){var e=r.arg(arguments);return function(t){window.$TEST&&console.log("10 --->",t);var n,i;"function"==typeof t?s.Base&&t.prototype instanceof s.Base?(n=t.base,i=!0):i=t.prototype:s.Base&&t instanceof s.Base&&(i=t);for(var a,l,u,c=r.arg(arguments),d=0,f=e.length;f>d;d++)e[d]instanceof Array?(l=e[d][0],u=r.arg(e[d],1),u.unshift(t)):(u=c,l=e[d]),window.$TEST&&console.log("11",l.extend?l:this,n||i),a=o.call(l.extend?l:this,n||i||t,l.extend||l,n,u,!!l.extend)||t;return a}},n.define=function(e,t,o,s,i,a){if("string"==typeof s)for(var l=r.arg(arguments),u=1,c=l.length;c>u;u+=2)n.define(e,l[u],l[u+1]);else if(t instanceof Array)for(var u=0,c=t.length;c>u;u++)n.define(e,t[u],o);else{if("function"==typeof o||o instanceof Array)o={enumerable:!1,value:o,configurable:!0};else if(o&&o instanceof Object&&!o.setClass)o.enumerable||(r.empty(o)&&(o.value={}),o.configurable=!0,o.enumerable=!1);else{o&&o.setClass&&(o=o.val);var d=e.prototype||e;a?(d.__||(d.__={}),d.__[t]=o):(d._||(d._={}),d._[t]=o);var f=function(e){n.setstore.call(this),(e||0===e||e===!1)&&(this.__[t]=e)},p=function(e){e=s.call(this,e),f.call(this,e)},v=function(){return n.getStore.call(this,t)},m=function(){var e=v.call(this);return i.call(this,e)};o={enumerable:!1,configurable:!0,get:i?m:v,set:s?p:f}}Object.defineProperty(e.prototype||e,t,o)}}},{"../":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/index.js","./":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/shawn/Work/mtv-play/xhr/index.js":[function(e,t,n){e("old-vigour-js/browser/network/iframe")},{"old-vigour-js/browser/network/iframe":"/Users/shawn/Work/mtv-play/node_modules/old-vigour-js/browser/network/iframe/index.js"}],"package.json":[function(e,t,n){t.exports={name:"mtv-play",version:"1.2.83",description:"mtv's multiscreen adventure",main:"index.js",scripts:{test:"test/test.js",build:"gaston build -s ./index.js -o . -i && cd xhr && gaston build -s ./index.js -o . && cp build.js bundle.js",ios:"npm run build && ./node_modules/.bin/wrapper build --native.selectedPlatforms ios",release:'cp build.css bundle.css && ./node_modules/.bin/ferry --release --mergeFiles \'["./package.json","./.package.json"]\''},repository:{type:"git",url:"https://github.com/vigour-io/mtv-play",branch:"production"},keywords:["multiscreen","play","shows","smart","tv","js"],dependencies:{autolinker:"^0.18.1",jquery:"^2.2.0",lodash:"3.2.0",markdown:"^0.5.0","monotonic-timestamp":"0.0.9","old-vigour-js":"git+ssh://git@github.com:vigour-io/vigour-js.git#mtvplay","package-branch-config":"^1.2.2",promise:"6.1.0",through2:"^2.0.0","zepto-browserify":"x"},devDependencies:{"vigour-wrapper":"^2.0.1","vigour-ferry":"^3.0.0"},author:"Jim de Beer",license:"other",bugs:{url:"https://github.com/vigour-io/mtv-play/issues"},homepage:"https://github.com/vigour-io/mtv-play",vigour:{ga:"UA-43955457-3",hashUrl:!0,defaultRegion:!1,regionOverride:!1,availableRegions:["DE","NL","CH","PL","BE","NO","AT"],geo:"https://wwwmtvplay-a.akamaihd.net/geo/",development:{button:!1},cloud:"production",othercloud:"http://localhost:10001",languages:["en","de","nl","pl","it","fr","no"],mtvmobile:["de","ch"],roles:["free","premium","mtv","trial"],countrycodes:{de:49,ch:41,nl:31},dictionary:"https://wwwmtvplay-a.akamaihd.net/translations/lang_$language.json",webtranslateit:{files:{de:374130,en:374126,nl:374128,pl:374129,fr:404562,it:404563},token:"-rN-CdCWmgh4IDxFRT-MEg"},epg:"https://wwwmtvplay-a.akamaihd.net/xhr/index.html",img:"https://imgmtvplay-a.akamaihd.net",imgOrigin:"http://images.mtvnn.com/",api:{type:"production",url:"https://utt.mtvnn.com/",acceptHeader:"application/json",key:"4e99c9381b74354fbae9f468497912f0"},player:{debug:!1,web:"http://player.mtvnn.com/html5player/production/player.js?3",settings:{ad_playpostrolls:!0,domain:"mtv",tld:"de",localization:{language:"de",country:"DE"},ads:{autoSID:!1,context:null,defaultAssetID:41349526,defaults:{interval:0},enabled:!0,engine:"Freewheel",fallbackID:41349526,midroll_intervals:{longer_than_15:null,longer_than_20:null,longer_than_30:null},networkID:174975,profileID:"174975:MTVNE_live_HTML5",server:"http://2ab7f.v.fwmrm.net/ad/p/1",viralSID:"production"},controls:!1,blankVideo:"http://player.mtvnn.com/codebase/blank.m4v",simulcastApiKey:"c153f28d950ae49a"}},chromecast:{id:"30C914C1",web:"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"},facebook:{id:"709421825777638",web:"https://connect.facebook.net/de_DE/sdk.js"},wrapper:{assets:{"build.html":!0,"build.js":!0,"build.css":!0,"bundle.css":!0,"fonts.css":!0,fonts:"*",img:"*",assets:"*",translations:"*"}},fburl:"http://play.mtvutt.com/",packer:{language:"https://wwwmtvplay-a.akamaihd.net/translations/",url:"https://wwwmtvplay-a.akamaihd.net/",domain:"http://mtvplay.tv"},ferry:{assets:{"build.html":!0,"build.js":!0,"build.css":!0,"bundle.css":!0,"fonts.css":!0,fonts:"*",img:"*",assets:"*",translations:"*",cast:"*","cast.html":!0,xhr:"*","googleebecff275dd42f4a.html":!0,"google2c4a46fac7686373.html":!0,"sitemap.xml":!0,"robots.txt":!0,meta:"*"},transforms:{"build.js":["inform"],"bundle.css":["rebase"],"build.css":["rebase"],"build.html":["meta"]},main:"build.js",web:"build.html",fbDefaults:{title:"MTV Play",description:"Mtv's new app to view shows on all devices",image:"http://img.mtvutt.com/image/180/180?url=http://play.mtvutt.com/apple-touch-icon-180x180.png"}},store:{ios:{monthly:"$region_subscription_monthly",yearly:"$region_subscription_annual",single:"$region_single_purchase"},android:{monthly:"mtvplay_subscription_monthly",yearly:"mtvplay_subscription_annually",single:"mtvplay_single_purchase"},windows:{monthly:"mtvplay_subscription_monthly",yearly:"mtvplay_subscription_annual",single:"mtvplay_single_purchase"}},omniture:"viaviamtvplay"},gaston:{transforms:{"package-branch-config":{section:"vigour"}},"less-options":{},"source-maps":!1,"package":!0,"index-path":"index.html",es5:!0,aliasify:{}},sha:"1.2.83"}},{}]},{},["/Users/shawn/Work/mtv-play/xhr/index.js"]);