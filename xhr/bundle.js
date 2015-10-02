(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/browser/network/ajax.js": [function (require, module, exports) {
    /*!
     * @license Copyright (c) 2012-2014, Vigour. All rights reserved.
     * @author: Jim de Beer, jim@vigour.io
     */
    var _a = 'addEventListener',
      util = require('../../util'),
      ua = require('../ua'),
      cnt = 0

    /**
     * xhr wrapper, adds some nice extras such as multiple requests to a single api call
     * xhr wrapper will include jsonp in a later stage
     * @method extend
     * @param   {String|Array} params.url         Specifiy the url, array fetches multiple url's
     * @param   {String}   [params.api]           Repeat this string for the url that needs to be called
     * @param   {Function} [params.complete]      Specify a callback when an array is passed to url complete is called when all items are complete
     * @param   {Function} [params.error]         On error callback
     * @param   {Function} [params.change]        Function called on xhr.onreadystatechange
     * @param   {Boolean}  [params.async]         If set to false will call an syncronous request (not recommended!)
     * @param   {String}   [params.user]          User parameter
     * @param   {String}   [params.pass]          Password parameter
     * @param   {Boolean}  [params.parse]         If set to false will not try to parse response to JSON
     * @param   {String}   [params.type|.method]  POST or GET, default is get;
     * @param   {String}   [params.contentType]   request content type default id "application/x-www-form-urlencoded"
     * @param   {String}   [params.mime]          defines mime type
     * @param   {Function} [params.progress]      Progress callback
     * @param   {Object}   [params.header]        Sets request headers
     * @param   {*}        [params.data]          Pass data to the request, defaults to ? on get;
     */

    var iframes, ajax = module.exports = function (params, urlset) {
      var _url = params.url;
      if (!urlset && _url instanceof Array) {
        params.m = function () {
          if ((++params.r) === params.n) {
            for (var i = 0, arr = [], l = _url.length; i < l; arr.push(params.d[_url[i++]]));
            params.complete(arr);
          }
        };
        params.r = 0;
        params.d = {};
        for (var i = 0, l = params.n = _url.length; i < l; module.exports(params, _url[i++]));
      } else {
        var data = params.data,
          encode = params.encode,
          url = (params.api || '') + (urlset || _url),
          headers = params.headers,
          success = params.complete,
          progress = params.progress,
          error = params.error,
          change = params.change,
          mime = params.mime,
          user = params.user,
          pass = params.pass,
          parse = params.parse,
          iframe = params.iframe,
          reqdata = null,
          fallback = params.fallback,
          fallbackIndex = params._fallbackIndex,
          method = params.type || params.method || 'GET',
          contentType = params.contentType || encode === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
          async = (params.async === false) ? false : true,
          xhr = new XMLHttpRequest()

        // ------------------------------------------------------------ DATA
        if (iframe) {
          cnt++
          var elem, msg = {},
            reqid = cnt

          for (var field in params) {
            if (field !== 'error' && field !== 'iframe' && field !== 'complete') {
              msg[field] = params[field]
            }
          }
          // msg = JSON.stringify(msg)
          console.error(iframe)
          console.log(msg)

          if (!iframes) iframes = {}
          if (!iframes[iframe]) {
            elem = iframes[iframe] = document.createElement('iframe')
            elem.src = iframe
            elem.cListeners = [
              setmsg
            ]
            elem.onload = function () {
              for (var h in elem.cListeners) {
                elem.cListeners[h]()
              }
              elem.cListeners = null
            }
            elem.style.visibility = 'hidden'
            elem.style.width = '0px'
            elem.style.height = '0px'
            document.body.appendChild(elem)
          } else if (iframes[iframe].cListeners) {
            iframes[iframe].cListeners.push(setmsg)
              //elem.cListeners[i]
          } else {
            setmsg()
          }

          function setmsg() {
            var elem
            iframes[iframe].onload = null
            var msgcomplete = function (e) {
              var d = JSON.parse(e.data)
              if (d.id !== reqid) return

              if (d.err) {
                if (error) {
                  error(d.err)
                }
                return
              }

              var resp = d.msg
              if (success) {
                if (parse !== false) {
                  try {
                    resp = JSON.parse(resp)
                  } catch (e) {}
                }
                success(resp)
              }
              removeEventListener('message', msgcomplete)
            }

            if (window.addEventListener) {
              addEventListener("message", msgcomplete, false)
              elem = iframes[iframe].contentWindow
              msg = JSON.stringify({
                msg: msg,
                id: reqid
              })
              elem.postMessage(msg, '*')
            }
          }

          return;
        }

        if (data) {
          if (method === 'GET') {
            url += '?' + enCode(data, 'GET', encode)
          } else {
            reqdata = enCode(data, 'POST', encode)
          }
        }

        // ------------------------------------------------------------ METHOD, URL, ASYNC, USER & PASS
        xhr.open(method, url, async, user, pass)
          // ------------------------------------------------------------ HEADERS
        xhr.setRequestHeader('Content-Type', contentType)
        if (headers) {
          for (var f in headers) {
            xhr.setRequestHeader(f, headers[f]);
          }
        }

        // ------------------------------------------------------------ EVENTS
        if (success) {
          xhr[_a]("load", function (e) {
            var resp = (e.target || e.srcElement).response;
            if (parse !== false) {
              try {
                resp = JSON.parse(resp)
              } catch (e) {}
            }
            if (params.m) {
              params.d[urlset] = resp
              params.m()
            } else {
              success(resp, e)
            }
          }, false)
        }
        if (error) {
          if (!fallbackIndex) params._fallbackIndex = 0
          if (fallback && fallbackIndex !== fallback.length) {
            params._fallbackIndex++
              params = util.merge(params, fallbackIndex)
            ajax(params, urlset)
          } else {
            xhr[_a]("error", error, false)
          }
        }
        if (progress) {
          xhr[_a]("progress", progress, false)
        }
        if (change) {
          xhr.onreadystatechange = change
        }
        // ------------------------------------------------------------ MIME
        if (mime) {
          xhr.overrideMimeType(mime)
        }
        // ------------------------------------------------------------ SEND
        xhr.send(reqdata)
      }
    }

    var enCode = ajax.encode = function (data, method, encode) {
      var result = ''

      if (encode === 'json') {
        result = JSON.stringify(data)
      } else if (data instanceof Object) {
        if ((window.FormData && data instanceof FormData) && method !== 'GET') {
          result = data
        } else if (data instanceof Array) {
          result = JSON.stringify(data[f])
          if (encode === 'uri') result = encodeURIComponent(result)
        } else {
          for (var f in data) {
            var val = data[f]
            if (val instanceof Object) val = JSON.stringify(val)
            if (encode === 'uri') {
              f = encodeURIComponent(f)
              val = encodeURIComponent(val)
            }
            result += f + '=' + val + '&'
          }
          result = result.slice(0, -1)

        }
      } else {
        result = (encode === 'uri') ? encodeURIComponent(data) : data
      }
      console.log(result)
      return result
    }

  }, {
    "../../util": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/index.js",
    "../ua": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/browser/ua.js"
  }],
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/browser/network/iframe/index.js": [function (require, module, exports) {
    var ajax = require('../ajax')
    if (window.addEventListener) {
      // console.log('init iframe -',window.location.href)
      addEventListener("message", function (e) {
        // console.log('MSG!',e.data)
        var d = JSON.parse(e.data),
          id = d.id

        var params = d.msg
        params.complete = function (data) {
          // console.log('DONE!')
          // alert(top.location.href)
          top.postMessage(JSON.stringify({
            id: id,
            msg: data
          }), '*')
        }
        params.error = function (err) {
          console.log('ERROR!', err)
          top.postMessage(JSON.stringify({
            id: id,
            err: err.message || true
          }), '*')
        }
        params.parse = false
        ajax(params)
      }, false)
    }
  }, {
    "../ajax": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/browser/network/ajax.js"
  }],
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/browser/ua.js": [function (require, module, exports) {
    /*
     * @license Copyright (c) 2012-2014, Vigour. All rights reserved.
     * @author: Jim de Beer, jim@vigour.io
     */
    /*
    /*
      useragent sniffing is never used for feature detection, for a multi-screen app you do need information about the device also when running in the browser
      has fields V.ua.platform, device, browser and version. This implementation when compiled, is only 700 bytes
    */

    var util = require('../util')

    /**
     * test
     * search for regexps in the userAgent
     * fn is a on succes callback
     * check http://www.useragentstring.com/ to test for userAgents
     * @method
     */
    exports.test = function (_ua, fn) {
      for (var array = util.arg(arguments, 1), i = array.length - 1, query = array[i][0]; query !== true && !new RegExp(query).test(_ua); query = array[--i][0]);
      if (fn.slice || fn.call(this, query, array[i])) {
        this[fn] = array[i][1];
      }
    };

    exports.parse = function (_ua, obj) {
      if (!_ua) {
        obj = exports
        _ua = (typeof navigator !== 'undefined') ? navigator.userAgent.toLowerCase() : 'no navigator'
      }

      var _ff = 'firefox',
        _a = 'android',
        _m = '.+mobile',
        _w = 'webkit',
        _ps = 'playstation',
        _xbox = 'xbox',
        _linux = 'linux',
        _castDetect = 'crkey.+tv',
        _chromecast = 'chromecast',
        _tablet = 'tablet',
        _windows = 'windows',
        _iphoneVersion

      exports.test.call(obj, _ua, function (query, arr) {
        obj.browser = arr[2] || query;
        var _v = _ua.match(new RegExp('((([\\/ ]version|' + arr[0] + '(?!.+version))[\/ ])| rv:)([0-9]{1,4}\\.[0-9]{0,2})'));
        obj.version = _v ? Number(_v[4]) : 0;
        obj.prefix = arr[1]; //add prefix for opera v>12.15;
        //windows check for ie 11 may be too general;
      }, [true, _w], ['\\(windows', 'ms', 'ie'], ['safari', _w], [_ff, 'Moz'], ['opera', 'O'], ['msie', 'ms', 'ie'], ['chrome', _w] /*, ['cordova', _w]*/ ); //cordova && !iemobile|ms
      /**
       * platform detection
       */
      exports.test.call(obj, _ua, 'platform', [true, _windows], [_linux, _linux], [_ff + _m, _ff], ['mac os x', 'mac'], ['iphone|ipod|ipad', 'ios'], [_xbox, _xbox], [_ps, _ps], [_castDetect, _chromecast], [_a, _a], ['smart-tv;', 'samsung']);
      /**
       * device detection
       */
      exports.test.call(obj, _ua, 'device', [true, 'desktop'], [_windows + '.+touch|ipad|' + _a, _tablet], ['iphone|(' + _a + _m + ')|(' + _ff + _m + ')|' + _windows + ' phone|iemobile', 'phone'], [_xbox + '|' + _ps, 'console'], ['tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv', 'tv'], [_castDetect, _chromecast], ['amazon-fireos', _tablet]);

      return obj
    }

    if (!util.isNode) exports.parse()


    //get one for windows phone/tablet as well;
    //iemobile for windows phone
    //iPhone OS 4_0
    // alert(exports.app)

    /*
    var language = window.navigator.userLanguage || window.navigator.language;
    alert(language); //works IE/SAFARI/CHROME/FF


    browser language --- could work in crodova (make same)
    */


    //SMART-TV

    /**
     * prop
     * re-writes js properties to their css counterpart
     * e.g. webkitTransform --> -webkit-transform
     * now its commented since its not nessecary yet
     * @method
     */
    // this.prop = function(str) {
    //  return str.replace(this.prefix,'-'+this.prefix+'-').toLowerCase();
    // };
    /**
      browser detection
    */

  }, {
    "../util": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/index.js"
  }],
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/index.js": [function (require, module, exports) {
    //V only used as a reference now...

  }, {}],
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/index.js": [function (require, module, exports) {
    /*!
     * @license Copyright (c) 2012-2014, Vigour. All rights reserved.
     * @author: Jim de Beer, jim@vigour.io
     */
    require('./object') //these things add extra methods to util for readability in a seperate module
    require('./prop')

    exports.isNode = (typeof window === 'undefined') ? true : false

    /**
     * Add is similar to .push it returns the array instead of length
     * Can be extended to support more types e.g. add an object to another
     * @method add
     * @param  {Array}  obj Target
     * @param  {Object} add Object to add
     * @deprecated
     */
    exports.add = function (obj, add) {
      if (add) obj.push.apply(obj, add);
      return obj
    }

    /**
     * Finds items in an array
     * @method checkArray
     * @param  {Object|Array}                 list  Defines the list where you want to search through, only uses .length field
     * @param  {Object}                       val   Defines the value you want to search for
     * @param  {Boolean|String|Number}        [index] When index is true return the index instead of true or false, when index and index !== true index is used as a field in objects in the array
     * @param  {String}                       [field] When field return field instead of index or true
     * @return {*}
     */
    exports.checkArray = function (list, val, index, field) {
      var arr = index instanceof Array
      if (!list) return false
      for (var i = 0, l = list.length, t; i < l; i++) {
        t = list[i]
        if (index !== void 0) {
          if (index === true) {
            if (t === val) return i
          } else if (arr ? exports.path(t, index) === val : t[index] === val) return field ? t : i
        } else {
          if (t === val) return true
        }
      }
      return false
    }

    /**
     * Pass arguments (arguments) and return a new array, when index return a new array sliced from index
     * @method arg
     * @param  {Arguments} args        Arguments
     * @param  {Number}    [index = 0] When index return a new array sliced from index
     * @return {Array}
     */
    exports.arg = function (args, index) {
      return Array.prototype.slice.call(args, !index ? 0 : index)
    }

    /**
     * Check if obj is empty exclude field names passed to list
     * @method empty
     * @param  {Object}       obj  Object
     * @param  {Object|Array} list Takes any object with .length
     * @return {Boolean}           True/false
     */
    exports.empty = function (obj, list) {
      for (var i in obj) {
        if (!list || !this.checkArray(list, i)) return false
      }
      return true
    }




  }, {
    "./object": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/object.js",
    "./prop": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/prop.js"
  }],
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/object.js": [function (require, module, exports) {
    /*!
     * @license Copyright (c) 2012-2014, Vigour. All rights reserved.
     * @author: Jim de Beer, jim@vigour.io
     */
    var util = module.exports = exports = require('./'),
      vigour = require('../') //only here to be able to use util without vigour.Object maybe refactor this away?
      ,
      DOT = '.'

    /**
     * lookup
     * polyfill if __lookupSetter__ does not exist;
     */
    exports.lookup = Object.__lookupSetter__ || function (i) {
      var t = this,
        a
      while (t) {
        a = Object.getOwnPropertyDescriptor(t, i)
        if (a && a.set) return true
        t = Object.getPrototypeOf(t)
      }
      return false
    }

    /**
     * Used to set a val to an field on a object, whether it is a vigour.Object or a regular object
     * @method set
     * @param {Object} obj   Defines target Object
     * @param {String} field Target field
     * @param {*}      val   Value to set
     * @todo                 Move this function to a different module (e.g. 'convenience' module)
     */
    exports.set = function (obj, field, val, vobj, stamp, noupdate) {
      return (vigour.Object && (obj instanceof vigour.Object)) ? obj.set(field, val, vobj, stamp, noupdate) : (obj[field] = val)
    }


    /**
     * Returns object on the end of a defined path
     * @method path
     * @example
     * // returns obj.a.b.c
     * var obj = { a: { b: { c: 1 }}}
     * V.util.object.path(obj,['a','b','c'])
     * @param  {Object}    obj            Object to search
     * @param  {Array}     path           Array of fields in path
     * @param  {*}         [val]          When defined, val will be set on endpoint of path if not already defined
     * @param  {Boolean}   [overwrite]    If true, val WILL overwrite existing value on endpoint of path when already defined
     * @param  {Function}  [writeHandler] Callback on write
     * @param  {Boolean}   [noupdate]     When true, updates will be skipped on write
     * @param  {Number}    [i = 0]        Starting point for searching through path
     * @return {*}                        Object on the end of a defined path
     */
    exports.path = function (obj, path, val, overwrite, writeHandler, vobj, stamp, noupdate, self, uid, i) {
      if (!i) i = 0

      // if(path.length === 0) return obj

      var field = path[i],
        result, c, target = (!self && obj && obj.__t === 4) ? obj.from[field] : obj && obj[field],
        l = i < path.length - 1

      if (l && !(target instanceof Object)) target = void 0 //better to set to null

      if ((val !== void 0) && (target === void 0 || (!l && overwrite))) {
        c = true
        exports.set(obj, field, l ? {} : val, l ? false : vobj, stamp, noupdate)
        target = obj[field]
      }

      if (l) {
        result = target ? this.path(target, path, val, overwrite, writeHandler, vobj, stamp, noupdate, self, uid, ++i) : target
      } else {
        result = (!self && target && target.__t === 4) ? target.from : target;
        if (c && writeHandler) writeHandler(result)
      }
      return result
    }

    /**
     * Adds path using 'dot-notation'
     * @method dotField
     * @example
     * // returns blur:{d:{a:{s:{}}}}
     * var blur = {};
     * V.util.object.dotField(blur,'d.a.s');
     * @param  {Object} obj   Object where field will be added
     * @param  {String} field String using 'dot-notation'
     * @return {Object}       Returns field
     */
    exports.dotField = function (obj, field) {
      if (~field.indexOf(DOT)) {
        var path = field.split(DOT),
          first = path.shift(),
          val = {}
        this.path(val, path, obj[field])
        delete obj[field]
        obj[first] = val
        field = first
      }
      return field
    }

    /**
     * Checks if two lists contain identical content
     * @method compareArrays
     * @param  {Array|Object} a Takes any object with .length
     * @param  {Array|Object} b Takes any object with .length
     * @return {Boolean}        True/false
     * @todo                    Maybe change title => compareLists
     */
    exports.compareArrays = function (a, b) {
      if (a.length !== b.length) return false
      for (var i = b.length - 1; i >= 0; i--) {
        if (a[i] != b[i]) return false
      }
      return true
    }

    /**
     * Gets object from specified path. When path is a string checks for 'dotnotation'.
     * @method get
     * @example
     * // returns 'foo'
     * var a = {b:{c:'foo'}}
     * V.util.object.get(a,'b.c')
     * @param  {Object}       obj  Defines object or V.Value
     * @param  {String|Array} path Defines field {string} or path {array|'dot-notation'}
     * @return {*}                 obj[path]|nested object/value
     */
    exports.get = function (obj, path, self) {
      if (!obj || !path) return
      if (!self && obj.__t === 4 && !obj._filter) obj = obj.from
      if (!(path instanceof Array)) {
        if (~path.indexOf(DOT)) {
          path = path.split(DOT)
        } else {
          return (!self && obj[path] && obj[path].from) || obj[path]
        }
      }
      //self is too far away in the arguments
      return this.path(obj, path, void 0, false, false, false, false, false, self)
    }

    /**
     * Returns true if an object is an instance of an object and not a function , V.Object or V.Base
     * @method isObj
     * @param  {Object}  obj Object to inspect
     * @return {Boolean}     True/False
     */
    exports.isObj = function (obj) {
      return (obj instanceof Object && typeof obj !== 'function' && (!vigour.Object || !(obj instanceof vigour.Object)) && (!vigour.Base || !(obj instanceof vigour.Base)))
    }

    /**
     * Creates new object with the same value , takes custom objects into account (new obj.constructor())
     * @method clone
     * @param  {Object} obj Object to clone
     * @return {Object}     Returns clone
     */
    exports.clone = function (obj, exclude, shallow) {
      if (this.isObj(obj)) {
        var copy = new obj.constructor()
        for (var i in obj) {
          if (!exclude || !exclude[i])
            copy[i] = !shallow ? this.clone(obj[i], exclude) : obj[i]
        }
        return copy
      }
      return obj
    };

    /**
     * Merges object b into object a and returns object a
     * @method merge
     * @param  {Object} a Object a
     * @param  {Object} b Object b
     * @return {Object}   Object a
     */
    exports.merge = function (a, b, norefs) {
      for (var i in b) {
        var aisobj = util.isObj(a[i]),
          bisobj = util.isObj(b[i])

        if (aisobj && bisobj) {
          util.merge(a[i], b[i], norefs)
        } else if (!norefs || !bisobj) {
          a[i] = b[i]
        } else {
          a[i] = b[i] instanceof Array ? [] : {}
          util.merge(a[i], b[i], norefs)
        }
      }
      return a
    }

    // exports.resolve = function(a, b, bFrom, j) {
    //   var same = true;
    //   if(b instanceof Object) {
    //     for(var i in b) {
    //       if(a[i]!==void 0) {
    //         if(exports.resolve(a[i],b[i],bFrom ? bFrom[i] : b[i],i)) {
    //           if(bFrom) {
    //             delete bFrom[i]
    //           }
    //         } else {
    //           same = false
    //         }
    //       } else {
    //         same = false
    //       }
    //     }
    //     if(same) {
    //       if(!(bFrom&&j!==void 0)) return true
    //       delete bFrom[j]
    //     }
    //     return same;
    //   } else {
    //     if(a==b) {
    //       if(bFrom&&j!==void 0) {
    //         delete bFrom[j]
    //       }
    //       return true
    //     }
    //   }
    // }

    exports.resolve = function (a, b, bFrom, j) {
      // console.log('lolresolve\n',bFrom)
      var same = true;
      if (b instanceof Object) {
        for (var i in b) {
          if (a[i] !== void 0) {
            if (exports.resolve(a[i], b[i], (bFrom !== void 0 && bFrom !== null) ? bFrom[i] : b[i], i)) {
              if (bFrom !== void 0 && bFrom !== null) {
                if (bFrom[i] === null) {
                  same = false
                } else {
                  delete bFrom[i]
                }
              }
            } else {
              same = false
            }
          } else {
            same = false
          }
        }
        if (same) {
          if (!(bFrom && j !== void 0)) return true
          delete bFrom[j]
        }
        return same;
      } else {
        if (a == b) {
          if (bFrom && j !== void 0) {
            delete bFrom[j]
          }
          return true
        }
      }
    }

    /**
     * Adds value to array if it is not contained in array, executes handler on encountering val in array
     * @method include
     * @param  {Object|Array}   obj       Takes any object with .length
     * @param  {*}              val       Value to add
     * @param  {Function}       [handler] Function to execute on encountering val in array
     * @param  {Boolean}        arr       Include elements of val separately rather than including val itself
     * @return {Boolean}                  True/false
     */
    exports.include = function (obj, val, handler, arr) {
      //can become shorter!;
      if (arr && val instanceof Array) {
        var ret = false
        for (var i = 0, len = val.length; i < len; i++) {
          ret = exports.include(obj, val[i], handler)
        }
        return ret
      }

      var i = 0,
        l = obj.length,
        field, check;

      if (obj.__t === 1) {
        for (; i < l; i++) {
          field = check = obj[i]
          if (check.__t === 4) check = check.from
          if (check === val || check.val === val) {
            if (handler) handler(field)
            return false
          }
        }
        obj.push(val)
        return true
      } else if (obj instanceof Array) {
        for (; i < l; i++) {
          if (obj[i] === val) {
            return false
          }
        }
        obj.push(val)
        return true
      }
    }

    exports.changeType = function (obj) {
      var result
      if (obj instanceof Array) {
        result = {}
        for (var i = 0, len = obj.length; i < len; i++) {
          result[i] = obj[i]
        }
      } else {
        result = []
        for (var i in obj) {
          result.push(obj[i])
        }
      }
      return result
    }

    /**
     * Ensures a value is not or contains no V.Objects, only their "raw" versions
     * This needs to be unified with convert, or at least get a better name.
     * @method raw
     * @param  {*}   val   the value to be processed
     * @return {*}         the processed value
     */
    exports.raw = function (val, rparams) {
      if (val instanceof Object) {
        if (val instanceof vigour.Object) {
          return val.raw
        } else {
          var result
          if (val instanceof Array) {
            result = []
            for (var i = 0, l = val.length; i < l; i++) {
              result[i] = this.raw(val[i], rparams)
            }
          } else {
            result = {}
            for (var f in val) {
              result[f] = this.raw(val[f], rparams)
            }
          }
          return result
        }
      } else {
        return val
      }
    }

    exports.checkParentFactory = function (parentField) {
      return function (field, get, links, match) {
        if (get && get !== true) {
          match = get
          get = false
        }
        var fields = field instanceof vigour.Object ? false : field,
          curr = this,
          found;
        while (curr) {
          found = fields === false ? curr === field : exports.get(curr, fields, !links);
          if (found) {
            if (match) {
              if (match === found || (found instanceof vigour.Object) && found.val === match) {
                return !get && fields ? curr : found;
              }
            } else {
              return !get && fields ? curr : found;
            }
          }
          curr = curr[parentField];
        }
      }
    }



  }, {
    "../": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/index.js",
    "./": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/index.js"
  }],
  "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/prop.js": [function (require, module, exports) {
    /*!
     * @license Copyright (c) 2012-2014, Vigour. All rights reserved.
     * @author: Jim de Beer, jim@vigour.io
     */
    var util = module.exports = exports = require('./'),
      V = require('../')
      /**
       * Setstores are used to avoid updates troughout prototype chains for changes of fields on objects
       * It uses two fields
       *   .__ to indicate own values for pieces of an object inherited trough the prototype chain
       *   ._ is the refence back to the objects as ste in the prototype
       * @constructor setstore
       */
    exports.setstore = function () {
      if (!this.__) this.__ = {}
    }

    exports.getStore = function (name) {
      return this.__ ? (this.__[name] !== void 0 ? this.__[name] : this._[name]) : this._ && this._[name]
    }

    function extensions(extend, fn, base, args, extended) {
      if (!extend.extensions) {
        if (base) {
          extend.extensions = []
        } else {
          util.define(extend, 'extensions', [])
        }
      }
      if (util.checkArray(extend.extensions, this) === false) {
        if (!extended) extend.extensions = [this].concat(extend.extensions)
        var myArgs = util.arg(args)
        if (base && !extended) {
          myArgs[0] = base
        }
        return fn.apply(this, myArgs)
      }
    }

    exports.extend = function () {
      var extendArray = util.arg(arguments)
      return function (extend) {
        var base, proto
        if (typeof extend === 'function') {
          if (V.Base && ((extend.prototype instanceof V.Base))) {
            base = extend.base
            proto = true
          } else {
            proto = extend.prototype
          }
        } else if (V.Base && (extend instanceof V.Base)) {
          proto = extend
        }
        for (var fn, ret, args = util.arg(arguments), extendArr, xArg, i = 0, len = extendArray.length; i < len; i++) {
          if (extendArray[i] instanceof Array) {
            extendArr = extendArray[i][0]
            xArg = util.arg(extendArray[i], 1)
            xArg.unshift(extend)
          } else {
            xArg = args
            extendArr = extendArray[i]
          }
          ret = extensions.call(
            extendArr.extend ? extendArr : this, base || proto, extendArr.extend || extendArr, base, xArg, extendArr.extend ? true : false) || extend
        }
        return ret
      }
    }

    /**
     * Add is used as a shortcut method for Object.defineProperty and extends setstore functionality to normal prototypes
     * @method add
     * @param  {Object}          obj  When obj is a constructor it selects obj.prototype, when obj is a normal object this is used instead
     * @param  {String|Array}    name When name is a string it adds the name for the object, when name is a array do the same setting for each name
     * @param  {Object|Function} val  When val is an object , use this object for Object.defineProperty with default for enummerable:false, when object is empty adds {value:{},ennumerable:false}, when val is a function it automatically wraps a property definition object with {value: val , enummerable:false}, when val is not a function and not an object (boolean, string, number) adds special setstore value
     * @param  {Function}        [set]  Adds custom setters to a setstore object, when set is a string the add functions interprets the arguments as name : property definition pairs
     * @param  {Function}        [get]  Adds custom getters to a setstore object
     * @
     */
    exports.define = function (obj, name, val, set, get) {
      if (typeof set === 'string') {
        var _args = util.arg(arguments)
        for (var i = 1, l = _args.length; i < l; i += 2) {
          exports.define(obj, _args[i], _args[i + 1])
        }
      } else {
        if (name instanceof Array) {
          for (var i = 0, l = name.length; i < l; i++) {
            exports.define(obj, name[i], val)
          }
        } else {
          if (typeof val === 'function' || val instanceof Array) {
            val = {
              enumerable: false,
              value: val,
              configurable: true
            }
          } else if (!val || !(val instanceof Object)) {
            if (!obj.prototype._) obj.prototype._ = {}
            obj.prototype._[name] = val
            var setter = function (val) {
                exports.setstore.call(this)
                if (val || val === 0 || val === false) this.__[name] = val
              },
              wset = function (val) {
                val = set.call(this, val);
                setter.call(this, val);
              },
              getter = function () {
                return exports.getStore.call(this, name);
              },
              wget = function () {
                var prop = getter.call(this);
                return get.call(this, prop);
              }
            val = {
              enumerable: false,
              configurable: true,
              get: get ? wget : getter,
              set: set ? wset : setter
            }
          } else if (!val.enumerable) {
            if (util.empty(val)) val.value = {}
            val.configurable = true
            val.enumerable = false
          }
          Object.defineProperty(obj.prototype || obj, name, val)
        }
      }
    }
  }, {
    "../": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/index.js",
    "./": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/util/index.js"
  }],
  "/Users/marcus/dev/mtv-play/xhr/index.js": [function (require, module, exports) {
    var iframe = require('vigour-js/browser/network/iframe')

  }, {
    "vigour-js/browser/network/iframe": "/Users/marcus/dev/mtv-play/node_modules/vigour-js/browser/network/iframe/index.js"
  }]
}, {}, ["/Users/marcus/dev/mtv-play/xhr/index.js"]);
