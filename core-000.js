// Utilities
//   Helpful utilities for javascript development.
//
// Joyce Tipping
// Date: 25 Mar 2010
// Version: 0.0

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Useful building block functions
//

// Create:
//   Takes the type of element to create ('div', 'input', 'span', etc.) and any number of the following:
//     property objects:                    {name:'name', type:'text'}
//     css function call:                   css ({margin:'0', padding:'0', border:'1px solid gray'});
//     text function call:                  text ('Hello World')
//     initializer functions:               function () {
//                                            this.add_text ('Hello World');
//                                            this.add_css  ({margin:'0', padding:'0', border:'1px solid gray'});
//                                            this.append   (this.create ('div'));
//                                          }

var create = function (type) {
  var result = document.createElement (type);

  result.add_css  = function (style) {
    if (style && style.constructor === Object) for (var k in style) result.style[k] = style[k];
    return result;
  }
  result.add_text = function (txt) {
    result.appendChild (result.text = document.createTextNode (txt));
    return result;
  }
  result.append   = function () {
    for (var i = 0, len = arguments.length; i < len; i++) {result.appendChild (arguments[i]);}
    return result;
  }
  result.create   = function () {return result.appendChild (create.apply (result, arguments));}

  for (var i = 1, len = arguments.length; i < len; i++) {
    var arg = arguments[i];
    if (arg.constructor === Object)   for (var k in arg) {result[k] = arg[k];}
    if (arg.constructor === Function) arg.call (result);
  }
  return result;
};

var text = function (txt) {
  return function () {return this.add_text (txt);};
};

var css = function (style) {
  return function () {return this.add_css (style);};
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Error Console
//   A debugging utility that prints text to a new window. Only works in Google Chrome 5.

var error_console = null;

var print = function (text) {
  error_console || (error_console = window.open ().document.body);
  error_console.appendChild (create ('div', function () {
    this.add_text (text);
  }));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// XMLHttpRequest
//   A library for dealing with all ajax requests.

var xmlhttp = function (type, url, asynch, handler) {

  // Try to initialize the XHR, first with XMLHttpRequest, and then with various versions of ActiveXObject.
  var request = window.XMLHttpRequest ? new XMLHttpRequest ()
                                      : new ActiveXObject ('Msxml2.XMLHTTP') || new ActiveXObject ('Microsoft.XMLHTTP');

  // If it's still not initialized, there's nothing more we can do for you! Have a nice day.
  if (! request) {
    alert ("Your browser doesn't support the full use of this application's features.");
    return;
  }

  // If we're still around, it must be initialized. :D
  try {
    request.onreadystatechange = function () {
      if (request.readyState == 4) request.status == 200 ? handler.call (request)
                                                         : alert ('Something went wrong communicating with the server!');
    };
    request.open (type, url, asynch);
    request.send (type.toLowerCase () == 'post' ? (request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
                                                   arguments [4])
                                                : null);

    return request;

  } catch (error) {
    alert ('The application failed to contact the server. Try again in a moment.\n' + 
           'Error detail: ' + error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
