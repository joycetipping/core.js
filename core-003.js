// Utilities
//   Helpful utilities for javascript development.
//
// Joyce Tipping
// Date: 21 Dec 2010
// Version: 0.0.3

if (typeof c !== 'undefined') var c = {original:c}
else                          var c = {};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// DOM Maniuplation
//

// New (nw)
//   A shortcut for document.createElement:
// c.nw = function (type) { return document.createElement (type); };
c.nw = function (type) { var result = document.createElement (type);
                         result.fancy = function () { return c.cr (result); };
                         return result; };


// Get
//   A shortcut for document.getElementById, with the option to promote into a 'fancy' :
// c.get = function (id) { var resreturn document.getElementById (id); };
c.getId = function (id) { var result = document.getElementById (id);
                        result.fancy = function () { return c.cr (result); };
                        return result; };


// Create (cr)
//   The first argument is either 
//     a string specifying a type (in which case it creates a new DOM element) or
//     an existing dom element    (in which case it simply uses the existing element).
//
//   It also takes any number of the following: 
//     object containing attributes:        { name:'name', type:'text' }
//     string:                              'Hello World'
//     array specifying a child element     ['div', { id:'foo', class:'bar' }, 'Hello World']
//     DOM node to be appended              myDiv
//     initializer functions:               function () { this.addText ('Hello World');
//                                                        var myDiv = this.cr ('div');
//                                                        this.append (myDiv);         }
//  
//   It adds several useful methods for
//     attributes                           addAttr
//     classes                              addClass, setClass
//     css                                  clearCss, addCss, setCss
//     text                                 addText
//     adding children                      append, prepend, cr
//     misc                                 empty, html

c.cr = function (arg) {
  // If it's an existing dom element, make it "fancy". If not, create it as usual.
  var result = arg instanceof HTMLElement ? arg : c.nw (arg);
  if (! result) { throw new Error ('Error!!'); };

  // METHODS:
  //
  // Attributes
  result.addAttr  = function (arg) {       if (arg.constructor === Object) for (var k in arg) result[k] = arg[k];
                                      else if (arg.constructor === String) result.setAttribute (arg, arguments[1]);
                                      return result; };

  // Classes
  result.setClass = function () { result.className = Array.prototype.slice.call (arguments).join (' '); return result; };
  result.addClass = function () { result.className += ' ' + Array.prototype.slice.call (arguments).join (' '); return result; };

  // CSS
  result.clearCss = function ()    { result.setAttribute ('style', ''); return result; };
  result.addCss   = function (arg) {      if (arg.constructor === Object) for (var k in arg) result.style[k] = arg[k];
                                      else if (arg.constructor === String) result.setAttribute ('style', result.getAttribute ('style') + ';' + arg);
                                      return result; };
  result.setCss   = function (arg) { result.clearCss (); 
                                           if (arg.constructor === Object) result.addCss (arg);
                                      else if (arg.constructor === String) result.setAttribute ('style', arg);
                                      return result; };

  // Text
  result.addText  = function (str) { result.append (document.createTextNode (str)); return result; };

  // Adding children
  result.cr        = function () { return result.append (c.cr.apply (result, arguments)); };
  result.append    = function () { for (var i = 0, len = arguments.length; i < len; i++) {
                                          if (arguments[i].constructor === Array) result.append.apply (result, arguments[i])
                                     else if (arguments[i] instanceof Node)       result.appendChild (arguments[i]); }
                                   return result; };
  result.prepend   = function () { for (var i = 0, len = arguments.length; i < len; i++) {
                                          if (arguments[i].constructor === Array) result.prepend.apply (result, arguments[i])
                                     else if (arguments[i] instanceof Node)       result.insertBefore (arguments[i], result.firstChild); }
                                   return result; };

  // Miscellaneous
  result.empty     = function ()    { result.innerHTML = ''; return result; };
  result.html      = function (str) { result.innerHTML = str; return result; };


  // Process command line arguments.
  for (var i = 1, len = arguments.length; i < len; i++) {
    var arg = arguments[i];
         if (arg.constructor === Object)   result.addAttr (arg);
    else if (arg.constructor === String)   result.addText (arg);
    else if (arg.constructor === Array)    result.cr.apply (result, arg);
    else if (arg instanceof Node)          result.append (arg);
    else if (arg.constructor === Function) arg.call (result);
  }

  return result;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Ajax
//   A library for dealing with ajax requests.

c.ajax = function (type, url, handler) {

  // Try to initialize the XHR, first with XMLHttpRequest, and then with various versions of ActiveXObject.
  var request = window.XMLHttpRequest ? new XMLHttpRequest ()
                                      : new ActiveXObject ('Msxml2.XMLHTTP') || new ActiveXObject ('Microsoft.XMLHTTP');

  // If it's still not initialized, there's nothing more we can do for you! Have a nice day.
  if (! request) { throw new Error ("Your browser doesn't support the full use of this application's features."); }

  // If we're still around, it must be initialized. :D
  request.onreadystatechange = function () { if (request.readyState == 4 && request.status == 200) handler.call (request); };
  request.open (type, url, true);
  request.send (type.toLowerCase () == 'post' ? (request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
                                                 arguments [4])
                                              : null);

  return request;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Useful Functions
//

// Trim
//   Useful functions for trimming whitespace.

var c.trim  = function (str) { return str.replace (/^\s+|\s+$/g, '').valueOf (); };
var c.ltrim = function (str) { return str.replace (/^\s+/g, '').valueOf (); };
var c.rtrim = function (str) { return str.replace (/\s+$/g, '').valueOf (); };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// No conflict
var c.noConflict = function () {
  var myC = c;
  c = c.original;
  return myC;
}

