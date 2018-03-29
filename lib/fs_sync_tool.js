"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by dell on 2018/3/29.
 * 文件操作 sync 操作工具类
 */

var fs = require("fs");
var path = require("path");
var shell = require("shelljs");
var ncp = require('ncp').ncp;
var P = require("./promisify.js");

var FsSyncTool = function () {
  function FsSyncTool() {
    _classCallCheck(this, FsSyncTool);
  }

  //删除文件夹:


  _createClass(FsSyncTool, [{
    key: "removeDirAsync",
    value: function removeDirAsync(path, callback) {
      var self = this;
      fs.readdir(path, function (err, files) {
        if (err) {
          // Pass the error on to callback
          callback(err, []);
          return;
        }
        var wait = files.length,
            count = 0,
            folderDone = function folderDone(err) {
          count++;
          // If we cleaned out all the files, continue
          if (count >= wait || err) {
            fs.rmdir(path, callback);
          }
        };
        // Empty directory to bail early
        if (!wait) {
          folderDone();
          return;
        }

        // Remove one or more trailing slash to keep from doubling up
        path = path.replace(/\/+$/, "");
        files.forEach(function (file) {
          var curPath = path + "/" + file;
          fs.lstat(curPath, function (err, stats) {
            if (err) {
              callback(err, []);
              return;
            }
            if (stats.isDirectory()) {
              self.removeDirAsync(curPath, folderDone);
            } else {
              fs.unlink(curPath, folderDone);
            }
          });
        });
      });
    }
  }, {
    key: "removeDir",


    /**
     * 删除文件夹的同步方法
     * @param {string} path 要删除文件夹的路径
     */
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path) {
        var PS;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isDir(path)) {
                  _context.next = 5;
                  break;
                }

                PS = new P().Promisify;
                return _context.abrupt("return", PS(this.removeDirAsync, this)(path));

              case 5:
                throw new Error("path not dir");

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function removeDir(_x) {
        return _ref.apply(this, arguments);
      }

      return removeDir;
    }()

    /**
     * 删除文件或文件夹
     * @param {string} path 要删除文件或文件夹的路径
     */

  }, {
    key: "removeFileOrDir",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(path) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isExistPathOrThrowError(path)) {
                  _context2.next = 8;
                  break;
                }

                if (!this.isDir(path)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.removeDir(path);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 7:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  fs.unlinkSync(path);
                  resolve();
                }));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeFileOrDir(_x2) {
        return _ref2.apply(this, arguments);
      }

      return removeFileOrDir;
    }()
  }, {
    key: "dirIsEmpty",


    /**
     * 检查路径是否为空文件夹
     * @param {string} path 要检查的文件夹路径
     */
    value: function dirIsEmpty(path) {
      if (this.isDirOrThrowError(path)) {
        //检查是否为文件夹
        var files = fs.readdirSync(path);
        if (files.length > 0) {
          return false;
        }
        console.log("in dirIsEmpty !if");
        return true;
      }
    }

    /**
     *  判断路径是否是文件夹,如果文件不存在,返回false,但不抛出异常
     * @param {string} path 要检查的路径
     */

  }, {
    key: "isDir",
    value: function isDir(path) {
      if (this.isExistPath(path)) {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
      } else {
        return false;
      }
    }

    /**
     * 判断路径是否是文件夹,如果文件不存在,如果路径不正确,抛出异常
     * @param {string} path 
     */

  }, {
    key: "isDirAndThrowError",
    value: function isDirAndThrowError(path) {
      if (this.isExistPathOrThrowError(path)) {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
      }
    }
    /**
     * 判断路径是否真实有效
     * @param path 要判断的路径
     */

  }, {
    key: "isExistPath",
    value: function isExistPath(path) {
      return fs.existsSync(path);
    }

    /**
     * 判断路径是否存在,如果不存在,直接抛出异常
     * @param path 要判断的路径
     */

  }, {
    key: "isExistPathOrThrowError",
    value: function isExistPathOrThrowError(path) {
      if (this.isExistPath(path)) {
        return true;
      } else {
        throw new Error("path not exist");
      }
    }

    /**
     * 判断路径是否是文件夹,如果不是文件夹 抛出异常
     * @param {string} path 
     */

  }, {
    key: "isDirOrThrowError",
    value: function isDirOrThrowError(path) {
      if (this.isExistPathOrThrowError(path)) {
        if (this.isDir(path)) {
          return true;
        } else {
          throw new Error("path not dir");
        }
      }
    }

    /**
     * 创建文件夹,如果文件夹已存在,抛出异常
     * @param {string} path 
     */

  }, {
    key: "createDir",
    value: function createDir(path) {
      if (!this.isDir(path)) {
        //文件不存在,创建文件夹
        fs.mkdirSync(path);
      } else {
        throw new Error("dir is exist");
      }
    }

    /**
     * 创建文件夹,如果文件夹已存在,覆盖文件夹
     * @param {string} path 
     */

  }, {
    key: "createDirAndCoverOld",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(path) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isExistPath(path)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.removeFileOrDir(path);

              case 3:
                return _context3.abrupt("return", this.createDir(path));

              case 6:
                return _context3.abrupt("return", this.createDir(path));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createDirAndCoverOld(_x3) {
        return _ref3.apply(this, arguments);
      }

      return createDirAndCoverOld;
    }()

    /**
     * 获取文件内容
     * @param {string} path 文件路径
     */

  }, {
    key: "getFileUTF8Content",
    value: function getFileUTF8Content(path) {
      if (this.isExistPathOrThrowError(path)) {
        //路径存在
        if (!this.isDir(path)) {
          return fs.readFileSync(path, "utf8");
        } else {
          throw new Error("path is dir");
        }
      }
    }

    /**
     * 获取指定路径下的文件或是文件夹
     * @param {string} path 
     */

  }, {
    key: "getChildFileOrDir",
    value: function getChildFileOrDir(path) {
      if (this.isDirOrThrowError(path)) {
        //判断当前是否是文件夹
        return fs.readdirSync(path);
      }
    }

    /**
     * 将内容输出到指定文件
     * @param {string} path 文件路径
     * @param {string } content 文件内容
     */

  }, {
    key: "outputFile",
    value: function outputFile(path, content) {
      if (this.isExistPath(path)) {
        //如果文件以存在
        throw new Error("file is exist");
      }

      //写入文件
      fs.writeFileSync(path, content);
    }

    /**
     * 将内容输出到指定文件,如果文件已存在,覆盖该文件
     * @param {string} path 文件路径
     * @param {string} content 文件内容
     */

  }, {
    key: "outputFileAndCoverOld",
    value: function outputFileAndCoverOld(path, content) {
      if (this.isExistPath(path)) {
        if (this.isDir(path)) {
          //不是文件而是文件夹
          throw new Error("path is dir");
        } else {
          fs.unlinkSync(path);
        }
      }
      fs.writeFileSync(path, content);
    }

    /**
     * 将内容输入到指定文件,如果文件已存在,将内容追加到文件中
     * @param {string} path 文件路径
     * @param {string} content 文件内容
     */

  }, {
    key: "outputFileOrAppendContent",
    value: function outputFileOrAppendContent(path, content) {
      if (this.isExistPath(path)) {
        if (this.isDir(path)) {
          //不是文件而是文件夹
          throw new Error("path is dir");
        }
        fs.appendFileSync(path, content, 'utf8');
      } else {
        fs.writeFileSync(path, content);
      }
    }

    /**
     * 修改文件或文件夹的所属用户
     * 1:只能是 liunx系统,2:要有一定的执行权限
     * @param {string} path 文件路径
     * @param {string} user 所属用户名
     */

  }, {
    key: "changeFileOrDirUser",
    value: function changeFileOrDirUser(path, user) {
      if (this.isExistPathOrThrowError(path)) {
        if (!this.isDir(path)) {
          path = path.substring(0, path.lastIndexOf("/"));
        }
        if (path.endsWith("/")) {
          path = path.substring(0, path.length - 1);
        }
        try {
          shell.exec("chown -R " + user + " " + path + "/");
          shell.exec("chgrp -R " + user + " " + path + "/");
        } catch (e) {
          throw e;
        }
      }
    }

    /**
     * 拷贝文件或文件夹
     * @param {string} sourcePath 源文件路径
     * @param {string} targetPath 目标文件路径
     * @param {number} ncpLimit 拷贝文件层级 default value 16
     */

  }, {
    key: "copyFileOrDir",
    value: function copyFileOrDir(sourcePath, targetPath, ncpLimit) {
      if (this.isExistPathOrThrowError(sourcePath)) {
        if (this.isExistPath(targetPath)) {
          throw new Error("target path is exist");
        }
        ncp.limit = ncpLimit ? ncpLimit : 16;
        if (sourcePath == targetPath) {
          return;
        }
        return new Promise(function (resolve, reject) {
          ncp(sourcePath, targetPath, function (err) {
            if (err) {
              console.log("copyFileOrDir has error ==>", err);
              reject(err);
            }
            resolve();
          });
        });
      }
    }

    /**
     * 拷贝文件或文件夹,如果目标文件夹已存在,则覆盖原来的文件或文件夹
     * @param {*} sourcePath 源文件路径
     * @param {*} targetPath 目标文件路径
     */

  }, {
    key: "copyFileOrDirCoverOld",
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(sourcePath, targetPath, ncpLimit) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.isExistPathOrThrowError(sourcePath)) {
                  _context4.next = 5;
                  break;
                }

                if (!this.isExistPath(targetPath)) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 4;
                return this.removeFileOrDir(targetPath);

              case 4:
                return _context4.abrupt("return", this.copyFileOrDir(sourcePath, targetPath, ncpLimit));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function copyFileOrDirCoverOld(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return copyFileOrDirCoverOld;
    }()
  }]);

  return FsSyncTool;
}();

//返回单例


module.exports = new FsSyncTool();