(function() {

var queue = [];

document.addEventListener( 'DOMContentLoaded', function () {
  while (queue[0]) {
    queue.shift()();
  }
});


window.$l = function (arg) {

  if (typeof arg === "function") {
    if (document.readyState === 'complete') {
      arg();
    } else {
      queue.push(arg);
    }
  } else if (typeof arg === "string") {
    var nodeList = document.querySelectorAll(arg);
    return new DOMNodeCollection([].slice.call(nodeList));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }
};

function DOMNodeCollection (htmlArray) {
  this.htmlArray = htmlArray;
}

DOMNodeCollection.prototype.html = function (string) {
  if (typeof string === "string") {
    for (var i = 0; i < this.htmlArray.length; i++) {
      this.htmlArray[i].innerHTML = string;
    }
    return this;
  } else {
    return this.htmlArray[0].innerHTML;
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.html("");
  return this;
};

DOMNodeCollection.prototype.append = function (arg) {
  if (arg instanceof DOMNodeCollection) {
    for (var i = 0; i < this.htmlArray.length; i++) {
      for (var j = 0; j < arg.htmlArray.length; j++) {
        this.htmlArray[i].innerHTML += arg.htmlArray[j];
      }
    }
    return this;
  } else if (arg instanceof HTMLElement || typeof arg === "string") {
      for (i = 0; i < this.htmlArray.length; i++) {
        this.htmlArray[i].innerHTML += arg;
      }
    return this;
  }
};

DOMNodeCollection.prototype.addClass = function (string) {
  if (typeof string === "string") {
    string = string.replace(/\s/g, "-");
    for (var i = 0; i < this.htmlArray.length; i++) {
      if (this.htmlArray[i].className.indexOf(" "+ string + " ") === -1) {
        this.htmlArray[i].className += " " + string + " ";
      }

    }
  }
  return this;
};

DOMNodeCollection.prototype.attr = function (key, value) {
  // key must be string! FIX
  var i;
  if (value === null) {
    for (i = 0; i < this.htmlArray.length; i++) {
      this.htmlArray[i].removeAttribute(key);
    }
    return this;
  } else if (value === undefined) {
    return this.htmlArray[0].getAttribute(key);
  } else {
    for (i = 0; i < this.htmlArray.length; i++) {
      this.htmlArray[i].setAttribute(key, value);
    }
  }
};

DOMNodeCollection.prototype.removeClass = function (string) {
  if (typeof string === "string") {
    string = string.replace(/\s/g, "-");
    for (var i = 0; i < this.htmlArray.length; i++) {
      this.htmlArray[i].className.replace( " " + string +  " ", "");
    }
  }
  return this;
};


DOMNodeCollection.prototype.children = function () {
  var childrenArray = [];
  for (var i = 0; i < this.htmlArray.length; i++) {
    var children = this.htmlArray[i].children;
    for (var j = 0; j < children.length; j++) {
      childrenArray.push(children[j]);
    }
  }
  return new DOMNodeCollection(childrenArray);
};


DOMNodeCollection.prototype.parent = function() {
  var parentArray = [];
  for (var i = 0; i < this.htmlArray.length; i++) {
    if (this.htmlArray[i].parentNode) {
      parentArray(this.htmlArray[i].parentNode);
    }
  }
  return new DOMNodeCollection(parentArray);
};

DOMNodeCollection.prototype.find = function (selector) {
  var matchArray = [];
  var matches = document.querySelectorAll(selector);

  matches.forEach(function (match) {
    matchArray.push(match);
  });

  return new DOMNodeCollection(matchArray);
};

DOMNodeCollection.prototype.remove = function () {
  this.empty();
  this.htmlArray = [];
};

DOMNodeCollection.prototype.on = function (inputEvent, callback) {
  for (var i = 0; i < this.htmlArray.length; i++) {
    this.htmlArray[i].addEventListener(inputEvent, callback);
  }
  return this;
};

DOMNodeCollection.prototype.off = function (inputEvent, callback) {
  for (var i = 0; i < this.htmlArray.length; i++) {
    this.htmlArray[i].removeEventListener(inputEvent, callback);
  }
  return this;
};





window.$l.extend = function() {
  var args = [].slice.call(arguments);
  var merged = {};

  args.forEach(function (arg) {
    for (var key in arg) {
      merged[key] = arg[key];
    }
  });

  return merged;
};













window.$l.ajax = function(options) {
  var defaults = {
    success: function () { console.log("success"); },
    error: function () { console.log("error"); },
    url: window.location.href,
    method: 'GET',
    data: {},
    contentType:'application/x-www-form-urlencoded; charset=UTF-8'
  };
  options = window.$l.extend(defaults, options);

  var ajaxReq = new XMLHttpRequest();
  ajaxReq.setRequestHeader("Content-type", options['contentType']);
  ajaxReq.onreadystatechange = function() {
    if(ajaxReq.readyState === 4 && ajaxReq.status === 200) {
        options['success']();
    } else {
      options['error']();
    }
  };
  // do this: change query string if GET request
  //
  // var params = "";
  // if (options['method'] === 'GET') {
  //   params;// = some kind of query added to url?
  // } else if (options['method'] === 'GET')
  //
  ajaxReq.open(options['method'], options['url']);
  // do this: encode data with JSON.stringify
  ajaxReq.send(JSON.stringify(options['data']));
};
// ajaxReq.addEventListener("load", function () {
//   if (ajaxReq.status === 200) {
//     options['success']();
//   } else {
//     options['error']();
//   }
// });


// $.ajax({
//       type: 'GET',
//       url: "http://api.openweathermap.org/data/2.5/weather?",
//       success: function(data) {
//         console.log("We have your weather!")
//         console.log(data);
//       },
//       error: function() {
//         console.error("An error occured.");
//       },
//    });

// question: are we doing queue right?










})();
