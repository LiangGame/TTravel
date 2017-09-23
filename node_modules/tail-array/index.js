if(!Array.prototype.tail) {
  Array.prototype.tail = function (n) {
    var innerTail = function (array) {
      if(array.length <= n) return array;
      array.shift(1);
      return innerTail(array);
    };
    return innerTail([].concat(this));
  }
}