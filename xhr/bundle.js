require=function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return o(n?n:e)},u,u.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/browser/network/ajax.js":[function(e,t,n){var r,o="addEventListener",i=e("../../util"),s=(e("../ua"),0),a=t.exports=function(e,n){var l=e.url;if(!n&&l instanceof Array){e.m=function(){if(++e.r===e.n){for(var t=0,n=[],r=l.length;r>t;n.push(e.d[l[t++]]));e.complete(n)}},e.r=0,e.d={};for(var u=0,d=e.n=l.length;d>u;t.exports(e,l[u++]));}else{var f=e.data,p=e.encode,v=(e.api||"")+(n||l),m=e.headers,g=e.complete,h=e.progress,y=e.error,b=e.change,j=e.mime,w=e.user,_=e.pass,x=e.jsonp,k=e.parse,O=e.iframe,E=null,T=e.fallback,U=e._fallbackIndex,S=e.type||e.method||"GET",A=e.contentType||"json"===p?"application/json":"application/x-www-form-urlencoded",N=e.async!==!1;if(x)a.jsonp(v,g,y);else{var L=new XMLHttpRequest;if(O){s++;var C,D={},B=s;for(var I in e)"error"!==I&&"iframe"!==I&&"complete"!==I&&(D[I]=e[I]);var R=function(){var e;r[O].onload=null;var t=function(e){if(e.data){var n;try{n=JSON.parse(e.data)}catch(e){return void(y&&y(e))}if(n.id!==B)return;if(n.err)return void(y&&y(n.err));var r=n.msg;if(g){if(k!==!1)try{r=JSON.parse(r)}catch(e){}g(r,e)}removeEventListener("message",t)}};window.addEventListener&&(addEventListener("message",t,!1),e=r[O].contentWindow,D=JSON.stringify({msg:D,id:B}),e.postMessage(D,"*"))};return r||(r={}),void(r[O]?r[O].cListeners?r[O].cListeners.push(R):R():(C=r[O]=document.createElement("iframe"),C.src=O,C.cListeners=[R],C.onload=function(){for(var e in C.cListeners)C.cListeners[e]();C.cListeners=null},C.style.visibility="hidden",C.style.width="0px",C.style.height="0px",C.style.position="absolute",document.body.appendChild(C)))}if(f&&("GET"===S?v+="?"+c(f,"GET",p):E=c(f,"POST",p)),L.open(S,v,N,w,_),L.setRequestHeader("Content-Type",A),m)for(var M in m)L.setRequestHeader(M,m[M]);g&&L[o]("load",function(t){var r=(t.target||t.srcElement).response;if(k!==!1)try{r=JSON.parse(r)}catch(t){}e.m?(e.d[n]=r,e.m()):g(r,t)},!1),y&&(U||(e._fallbackIndex=0),T&&U!==T.length?(e._fallbackIndex++,e=i.merge(e,U),a(e,n)):L[o]("error",y,!1)),h&&L[o]("progress",h,!1),b&&(L.onreadystatechange=b),j&&L.overrideMimeType(j),L.send(E)}}},l=0;a.jsonp=function(e,t,n,r,o){o&&o!==!0||(o="callback");var i="_jsonp_"+l++,s=document.createElement("script");e+=e.match(/\?/)?"&"+o+"="+i:"?"+o+"="+i,s.type="text/javascript",s.src=e,n&&(s.onerror=function(e){n(e)}),window[i]=function(e){t.call(r||window,e),document.getElementsByTagName("head")[0].removeChild(s),s=null,delete window[i]},document.getElementsByTagName("head")[0].appendChild(s)};var c=a.encode=function(e,t,n){var r="";if("json"===n)r=JSON.stringify(e);else if(e instanceof Object)if(!i.isNode&&window.FormData&&e instanceof FormData&&"GET"!==t)r=e;else if(e instanceof Array)r=JSON.stringify(e[o]),"uri"===n&&(r=encodeURIComponent(r));else{for(var o in e){var s=e[o];s instanceof Object&&(s=JSON.stringify(s)),"uri"===n&&(o=encodeURIComponent(o),s=encodeURIComponent(s)),r+=o+"="+s+"&"}r=r.slice(0,-1)}else r="uri"===n?encodeURIComponent(e):e;return r}},{"../../util":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/index.js","../ua":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/browser/ua.js"}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/browser/network/iframe/index.js":[function(e,t,n){var r=e("../ajax");window.addEventListener&&addEventListener("message",function(e){var t=JSON.parse(e.data),n=t.id,o=t.msg;o.complete=function(e){top.postMessage(JSON.stringify({id:n,msg:e}),"*")},o.error=function(e){console.log("XHR-IFRAME",window.location.href,e),top.postMessage(JSON.stringify({id:n,err:e.message||!0}),"*")},o.parse=!1,r(o)},!1)},{"../ajax":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/browser/network/ajax.js"}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/browser/ua.js":[function(e,t,n){var r=e("../util"),o=n.test=function(e,t){for(var n=r.arg(arguments,1),o=n.length-1,i=n[o][0];i!==!0&&!new RegExp(i).test(e);i=n[--o][0]);(t.slice||t.call(this,i,n[o]))&&(this[t]=n[o][1])},i=n.parse=function(e,t){e||(t=n,e="undefined"!=typeof navigator?navigator.userAgent.toLowerCase():"no navigator"),e=e.toLowerCase(),t||(t={});var i="firefox",s="android",a=".+mobile",l="webkit",c="playstation",u="xbox",d="linux",f="crkey",p="chromecast",v="tablet",m="windows",g="phone";o.call(t,e,function(n,r){t.browser=r[2]||n;var o=e.match(new RegExp("((([\\/ ]version|"+r[0]+"(?!.+version))[/ ])| rv:)([0-9]{1,4}\\.[0-9]{0,2})"));t.version=o?Number(o[4]):0,t.prefix=r[1]},[!0,l],["\\(windows","ms","ie"],["safari",l],[i,"Moz"],["opera","O"],["msie","ms","ie"],["chrome|crios/",l,"chrome"]),o.call(t,e,"platform",[!0,m],[d,d],["lg.{0,3}netcast","lg"],[i+a,i],["mac os x","mac"],["iphone|ipod|ipad","ios"],[u,u],[c,c],[s,s],[m,m],[f,p],["smart-tv;|;samsung;smarttv","samsung"]),o.call(t,e,"device",[!0,"desktop"],[m+".+touch|ipad|"+s,v],["iphone|("+s+a+")|("+i+a+")|"+m+" phone|iemobile",g],[u+"|"+c,"console"],["tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos.+large","tv"],[f,p],["amazon-fireos",v]);var h=304704;return t.platform===s&&!r.isNode&&t.device===g&&window.innerWidth*window.innerHeight>h&&(t.device="tablet"),t};if(!r.isNode&&(i(),window.__ua__))for(var s in window.__ua__)n[s]=window.__ua__[s]},{"../util":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/index.js":[function(e,t,n){},{}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/index.js":[function(e,t,n){e("./object"),e("./prop"),n.isNode="undefined"==typeof window,n.add=function(e,t){return t&&e.push.apply(e,t),e},n.checkArray=function(e,t,r,o){var i=r instanceof Array;if(!e)return!1;for(var s,a=0,l=e.length;l>a;a++)if(s=e[a],void 0!==r){if(r===!0){if(s===t)return a}else if(i?n.path(s,r)===t:s[r]===t)return o?s:a}else if(s===t)return!0;return!1},n.arg=function(e,t){return Array.prototype.slice.call(e,t?t:0)},n.empty=function(e,t){for(var n in e)if(!t||!this.checkArray(t,n))return!1;return!0},n.inject=e("./inject")},{"./inject":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/inject.js","./object":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/object.js","./prop":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/prop.js"}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/inject.js":[function(e,t,n){function r(e,t){if(s&&console.log("9",t,e),t.extend)s&&console.log("9.1",e),t.extend(e);else if(t instanceof Array){var n=t.concat(),r=n[0];n[0]=e,s&&console.log("9.2"),r.extend.apply(r,n)}}function o(){s&&console.log("5");for(var e,t,n=[],o=[this],a=0,l=arguments,c=l.length;c>a;a++)if(t=l[a],"function"==typeof t){e||(e=function(){for(var e=0,t=o.length;t>e;e++)o[e].apply(this,arguments)},i(e,this)),o.push(t);for(var u in t.prototype)if({}.hasOwnProperty.call(t.prototype,u)){if("constructor"===u)continue;e.prototype[u]=t.prototype[u]}}else s&&console.log("6"),e?(s&&console.log("7"),r(e,t)):n.push(t);e||(e=this);for(var d in n)r(e,n[d]);return e}function i(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}var s,a=e("../"),l=e("./");l.isNode||(s=window.$TEST),t.exports=n=function(e){var t=arguments;if(t[0]&&t[0].$TEST&&(s=window.$TEST=!0),"function"==typeof this||a.Base&&this instanceof a.Base||"object"==typeof this){if(!a.Base||!(this===a.Base||this.prototype instanceof a.Base||this instanceof a.Base))return o.apply(this,t);t=l.arg(t),t.unshift(this),e=this}for(var n=1;n<t.length;n++)r(e,t[n]);return e}},{"../":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/index.js","./":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/object.js":[function(e,t,n){function r(e){for(;e&&4===e.__t&&!e._filter;)e=e._val;return e}var o=t.exports=n=e("./"),i=e("../"),s=".";n.lookup=Object.__lookupSetter__||function(e){for(var t,n=this;n;){if(t=Object.getOwnPropertyDescriptor(n,e),t&&t.set)return!0;n=Object.getPrototypeOf(n)}return!1},n.set=function(e,t,n,r,o,s){return i.Object&&e instanceof i.Object?e.set(t,n,r,o,s):e[t]=n},n.path=function(e,t,r,o,i,s,a,l,c,u,d){d||(d=0);var f,p,v=t[d],m=!c&&e&&4===e.__t?e.from[v]:e&&e[v],g=d<t.length-1;return!g||m instanceof Object||(m=void 0),void 0!==r&&(void 0===m||!g&&o)&&(p=!0,n.set(e,v,g?{}:r,g?!1:s,a,l),m=e[v]),g?f=m?this.path(m,t,r,o,i,s,a,l,c,u,++d):m:(f=!c&&m&&4===m.__t?m.from:m,p&&i&&i(f)),f},n.dotField=function(e,t){if(~t.indexOf(s)){var n=t.split(s),r=n.shift(),o={};this.path(o,n,e[t]),delete e[t],e[r]=o,t=r}return t},n.compareArrays=function(e,t,n){var r=n?Object.keys(t).length:t.length;if(e.length!==r)return!1;for(var o=e.length-1;o>=0;o--)if(e[o]!=t[o])return!1;return!0},n.get=function(e,t,n){if(e&&t){if(n||4!==e.__t||e._filter||(e=e.from),!(t instanceof Array)){if(!~t.indexOf(s))return!n&&e[t]&&e[t].from||e[t];t=t.split(s)}return this.path(e,t,void 0,!1,!1,!1,!1,!1,n)}},n.isObj=function(e){return!(!(e instanceof Object&&"function"!=typeof e)||i.Object&&e instanceof i.Object||i.Base&&e instanceof i.Base)},n.clone=function(e,t,n){if(this.isObj(e)){var r=new e.constructor;for(var o in e)t&&t[o]||(r[o]=n?e[o]:this.clone(e[o],t));return r}return e},n.merge=function(e,t,n,r){for(var i in t){var s=o.isObj(e[i]),a=o.isObj(t[i]);s&&a?o.merge(e[i],t[i],n,r):n&&a?(e[i]=t[i]instanceof Array?[]:{},o.merge(e[i],t[i],n,r)):void 0!==r&&i in e&&("function"!=typeof r||!r(e[i],t[i]))||(e[i]=t[i])}return e},n.resolve=function(e,t,r,o){var i=!0;if(t instanceof Object){for(var s in t)void 0!==e[s]&&n.resolve(e[s],t[s],void 0!==r&&null!==r?r[s]:t[s],s)?void 0!==r&&null!==r&&(null===r[s]?i=!1:delete r[s]):i=!1;if(i){if(!r||void 0===o)return!0;delete r[o]}return i}return e==t?(r&&void 0!==o&&delete r[o],!0):void 0},n.include=function(e,t,r,o){if(o&&t instanceof Array){for(var i=!1,s=0,a=t.length;a>s;s++)i=n.include(e,t[s],r);return i}var l,c,s=0,u=e.length;if(1===e.__t){for(;u>s;s++)if(l=c=e[s],4===c.__t&&(c=c.from),c===t||c.val===t)return r&&r(l),!1;return e.push(t),!0}if(e instanceof Array){for(;u>s;s++)if(e[s]===t)return!1;return e.push(t),!0}},n.changeType=function(e){var t;if(e instanceof Array){t={};for(var n=0,r=e.length;r>n;n++)t[n]=e[n]}else{t=[];for(var n in e)t.push(e[n])}return t},n.raw=function(e,t){if(e instanceof Object){if(e instanceof i.Object)return e.raw;var n;if(e instanceof Array){n=[];for(var r=0,o=e.length;o>r;r++)n[r]=this.raw(e[r],t)}else{n={};for(var s in e)n[s]=this.raw(e[s],t)}return n}return e},n.walk=function(e,t){for(var r in e)if(e[r]instanceof Object){if(t(r,e[r],e,!0))return!0;if(n.walk(e[r],t))return!0}else if(t(r,e[r],e))return!0},n.checkParentFactory=function(e){return function(t,r,o,s){r&&r!==!0&&(s=r,r=!1);for(var a,l=t instanceof i.Object?!1:t,c=this;c;){if(a=l===!1?c===t:n.get(c,l,!o)){if(!s)return!r&&l?c:a;if(s===a||a instanceof i.Object&&a.val===s)return!r&&l?c:a}c=c[e]}}},n.disjoin=function(e,t,n){var o="function"==typeof n;e=r(e),t=r(t),e.each(function(){var e,r=this,i=r.from;t.each(function(){var t=this,r=t.from;return e=o?n(i,r):n===!0?i===r:i[n]&&r[n]&&i[n].val===r[n].val}),e&&r.remove()})}},{"../":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/index.js","./":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/prop.js":[function(e,t,n){function r(e,t,n,r,s){if(window.$TEST&&console.log(12,e),e.extensions||(n?e.extensions=[]:i.Object&&e instanceof i.Object?o.define(e,"extensions",[]):o.define(e,"extensions",{val:[],setClass:!0})),o.checkArray(e.extensions,this)===!1){s||(e.extensions=[this].concat(e.extensions));var a=o.arg(r);n&&!s&&(a[0]=n),window.$TEST&&console.error("??xxx?",a,t,this);var l=t.apply(this,a);if(window.$TEST,l)return l}else window.$TEST&&console.error("???")}var o=t.exports=n=e("./"),i=e("../");n.setstore=function(){this.__||(this.__={})},n.getStore=function(e){return this.__?void 0!==this.__[e]?this.__[e]:this._[e]:this._&&this._[e]},n.extend=function(){var e=o.arg(arguments);return function(t){window.$TEST&&console.log("10 --->",t);var n,s;"function"==typeof t?i.Base&&t.prototype instanceof i.Base?(n=t.base,s=!0):s=t.prototype:i.Base&&t instanceof i.Base&&(s=t);for(var a,l,c,u=o.arg(arguments),d=0,f=e.length;f>d;d++)e[d]instanceof Array?(l=e[d][0],c=o.arg(e[d],1),c.unshift(t)):(c=u,l=e[d]),window.$TEST&&console.log("11",l.extend?l:this,n||s),a=r.call(l.extend?l:this,n||s||t,l.extend||l,n,c,!!l.extend)||t;return a}},n.define=function(e,t,r,i,s,a){if("string"==typeof i)for(var l=o.arg(arguments),c=1,u=l.length;u>c;c+=2)n.define(e,l[c],l[c+1]);else if(t instanceof Array)for(var c=0,u=t.length;u>c;c++)n.define(e,t[c],r);else{if("function"==typeof r||r instanceof Array)r={enumerable:!1,value:r,configurable:!0};else if(r&&r instanceof Object&&!r.setClass)r.enumerable||(o.empty(r)&&(r.value={}),r.configurable=!0,r.enumerable=!1);else{r&&r.setClass&&(r=r.val);var d=e.prototype||e;a?(d.__||(d.__={}),d.__[t]=r):(d._||(d._={}),d._[t]=r);var f=function(e){n.setstore.call(this),(e||0===e||e===!1)&&(this.__[t]=e)},p=function(e){e=i.call(this,e),f.call(this,e)},v=function(){return n.getStore.call(this,t)},m=function(){var e=v.call(this);return s.call(this,e)};r={enumerable:!1,configurable:!0,get:s?m:v,set:i?p:f}}Object.defineProperty(e.prototype||e,t,r)}}},{"../":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/index.js","./":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/util/index.js"}],"/Users/ricksmit/dev/mtv-play/xhr/index.js":[function(e,t,n){e("old-vigour-js/browser/network/iframe")},{"old-vigour-js/browser/network/iframe":"/Users/ricksmit/dev/mtv-play/node_modules/old-vigour-js/browser/network/iframe/index.js"}],"package.json":[function(e,t,n){t.exports={name:"mtv-play",version:"1.2.87",description:"mtv's multiscreen adventure",main:"index.js",scripts:{test:"test/test.js",build:"gaston build -s ./index.js -o . -i && cd xhr && gaston build -s ./index.js -o . && cp build.js bundle.js && rm build.css",bundle:"gaston bundle -s ./index.js -o . -i",ios:"npm run build && ./node_modules/.bin/wrapper build --native.selectedPlatforms ios",release:'cp build.css bundle.css && ./node_modules/.bin/ferry --release --mergeFiles \'["./package.json","./.package.json"]\''},repository:{type:"git",url:"https://github.com/vigour-io/mtv-play",branch:"staging"},keywords:["multiscreen","play","shows","smart","tv","js"],dependencies:{autolinker:"^0.18.1",jquery:"^2.2.0",lodash:"3.2.0",markdown:"^0.5.0","monotonic-timestamp":"0.0.9","old-vigour-js":"git+ssh://git@github.com:vigour-io/vigour-js.git#mtvplay","package-branch-config":"^1.2.2",promise:"6.1.0",through2:"^2.0.0","zepto-browserify":"x"},devDependencies:{"vigour-wrapper":"^2.0.1","vigour-ferry":"^3.0.0"},author:"Jim de Beer",license:"other",bugs:{url:"https://github.com/vigour-io/mtv-play/issues"},homepage:"https://github.com/vigour-io/mtv-play",vigour:{ga:"UA-43955457-3",hashUrl:!0,defaultRegion:!1,regionOverride:!1,availableRegions:["DE","NL","CH","PL","BE","NO","AT"],geo:"https://wwwmtvplay-a.akamaihd.net/geo/",development:{button:!1},cloud:"http://mtv-hub-staging.dev.vigour.io:80",othercloud:"http://localhost:10001",languages:["en","de","nl","pl","it","fr","no"],mtvmobile:["de","ch"],roles:["free","premium","mtv","trial"],countrycodes:{de:49,ch:41,nl:31},dictionary:"https://mtv-develop.vigour.io/translations/lang_$language.json",webtranslateit:{files:{de:374130,en:374126,nl:374128,pl:374129,fr:404562,it:404563},token:"-rN-CdCWmgh4IDxFRT-MEg"},epg:"https://wwwmtvplay-a.akamaihd.net/xhr/index.html",img:"https://imgmtvplay-a.akamaihd.net",imgOrigin:"http://staging.riptide.mtvnn.com/",api:{type:"staging",url:"https://utt-staging.mtvnn.com/",acceptHeader:"application/json",key:"4e99c9381b74354fbae9f468497912f0"},player:{debug:!1,web:"http://player.mtvnn.com/html5player/staging/player.js?v=2",settings:{homadURL:"/homad/config.json",ad_playpostrolls:!0,domain:"mtv",tld:"de",localization:{language:"de",country:"DE"},ads:{autoSID:!1,context:null,defaultAssetID:41349526,defaults:{interval:0},enabled:!0,engine:"Freewheel",fallbackID:41349526,midroll_intervals:{longer_than_15:null,longer_than_20:null,longer_than_30:null},networkID:174975,profileID:"174975:MTVNE_live_HTML5",server:"http://2ab7f.v.fwmrm.net/ad/p/1",viralSID:"production"},controls:!1,blankVideo:"http://player.mtvnn.com/codebase/blank.m4v",simulcastApiKey:"c153f28d950ae49a"}},chromecast:{id:"30C914C1",web:"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"},facebook:{id:"709421825777638",web:"https://connect.facebook.net/de_DE/sdk.js"},wrapper:{assets:{"build.html":!0,"build.js":!0,"build.css":!0,"bundle.css":!0,"fonts.css":!0,fonts:"*",img:"*",assets:"*",translations:"*"}},fburl:"http://play.mtvutt.com/",packer:{language:"https://wwwmtvplay-a.akamaihd.net/translations/",url:"https://wwwmtvplay-a.akamaihd.net/",domain:"https://mtv-staging.vigour.io"},ferry:{assets:{"build.html":!0,"build.js":!0,"build.css":!0,"bundle.css":!0,"fonts.css":!0,fonts:"*",img:"*",assets:"*",translations:"*",cast:"*","cast.html":!0,xhr:"*",homad:"*","googleebecff275dd42f4a.html":!0,"google2c4a46fac7686373.html":!0,"sitemap.xml":!0,"robots.txt":!0,meta:"*"},transforms:{"build.js":["inform"],"bundle.css":["rebase"],"build.css":["rebase"],"build.html":["meta"]},main:"build.js",web:"build.html",fbDefaults:{title:"MTV Play",description:"Mtv's new app to view shows on all devices",image:"http://img.mtvutt.com/image/180/180?url=http://play.mtvutt.com/apple-touch-icon-180x180.png"}},store:{ios:{monthly:"$region_subscription_monthly",yearly:"$region_subscription_annual",single:"$region_single_purchase"},android:{monthly:"mtvplay_subscription_monthly",yearly:"mtvplay_subscription_annually",single:"mtvplay_single_purchase"},windows:{monthly:"mtvplay_subscription_monthly",yearly:"mtvplay_subscription_annual",single:"mtvplay_single_purchase"}},omniture:"vianorthtestweb"},gaston:{transforms:{"package-branch-config":{section:"vigour"}},"less-options":{},"source-maps":!1,"package":!0,"index-path":"index.html",es5:!0,aliasify:{}},sha:"1.2.87"}},{}]},{},["/Users/ricksmit/dev/mtv-play/xhr/index.js"]);