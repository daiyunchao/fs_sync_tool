"use strict";

/**
 * 简单的将回调函数转换成Promise函数的方法
 */
var exp;
exp = function exp() {
  // console.log("[utils][promisify]:[Constructor]");
};
module.exports = exp;

var _promiseFunc = function _promiseFunc(resolve, reject) {
  return resolve();
};

exp.prototype.Promisify = function (f, context) {

  return function () {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) {
          return reject(err);
        } else {
          if (context) {
            return resolve.call(context, result);
          } else {
            return resolve.call(null, result);
          }
        }
      });
      if (context) {
        f.apply(context, args);
      } else {
        f.apply(null, args);
      }
    });
  };
};

exp.prototype.PromisifyArray = function (f, context) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err) {
        if (arguments.length === 0) {
          return resolve(null);
        } else if (arguments.length === 1) {
          if (err) {
            return reject(err);
          } else {
            return resolve(null);
          }
        } else {
          var argsReturn = Array.prototype.slice.call(arguments);
          argsReturn.splice(0, 1);
          if (context) {
            return resolve.call(context, argsReturn);
          } else {
            return resolve.call(null, argsReturn);
          }
        }
      });
      if (context) {
        f.apply(context, args);
      } else {
        f.apply(null, args);
      }
    });
  };
};

exp.prototype.PromiseStart = function () {
  return new Promise(_promiseFunc);
};