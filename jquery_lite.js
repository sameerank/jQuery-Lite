(function() {

window.$l = function (arg) {
  if (typeof arg === "string") {
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


})();
