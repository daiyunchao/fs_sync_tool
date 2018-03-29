/**
 * Created by dell on 2018/3/29.
 * 文件操作 sync 操作工具类
 */

const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const ncp = require('ncp').ncp;
let P = require("./promisify.js");

class FsSyncTool {
  constructor() {

  }


  //删除文件夹:
  removeDirAsync(path, callback) {
    let self = this;
    fs.readdir(path, function (err, files) {
      if (err) {
        // Pass the error on to callback
        callback(err, []);
        return;
      }
      let wait = files.length,
        count = 0,
        folderDone = function (err) {
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
  };



  /**
   * 删除文件夹的同步方法
   * @param {string} path 要删除文件夹的路径
   */
  async removeDir(path) {
    if (this.isDir(path)) {
      let PS = new P().Promisify;
      return PS(this.removeDirAsync, this)(path);
    }
    else {
      throw new Error("path not dir");
    }
  }



  /**
   * 删除文件或文件夹
   * @param {string} path 要删除文件或文件夹的路径
   */
  async removeFileOrDir(path) {
    //判断是文件还是文件夹
    if (this.isExistPathOrThrowError(path)) {
      //路径正确
      if (this.isDir(path)) {
        //删除文件夹
        return await this.removeDir(path);
      } else {
        //如果是文件,删除文件
        return new Promise((resolve, reject) => {
          fs.unlinkSync(path);
          resolve();
        })
      }
    }
  };




  /**
   * 检查路径是否为空文件夹
   * @param {string} path 要检查的文件夹路径
   */
  dirIsEmpty(path) {
    if (this.isDirOrThrowError(path)) {
      //检查是否为文件夹
      let files = fs.readdirSync(path);
      if (files.length > 0) {
        return false
      }
      return true;
    }

  }


  /**
   *  判断路径是否是文件夹,如果文件不存在,返回false,但不抛出异常
   * @param {string} path 要检查的路径
   */
  isDir(path) {
    if (this.isExistPath(path)) {
      let stat = fs.lstatSync(path);
      return stat.isDirectory();
    } else {
      return false;
    }
  }

  /**
   * 判断路径是否是文件夹,如果文件不存在,如果路径不正确,抛出异常
   * @param {string} path 
   */
  isDirAndThrowError(path) {
    if (this.isExistPathOrThrowError(path)) {
      let stat = fs.lstatSync(path);
      return stat.isDirectory();
    }
  }
  /**
   * 判断路径是否真实有效
   * @param path 要判断的路径
   */
  isExistPath(path) {
    return fs.existsSync(path);
  }

  /**
   * 判断路径是否存在,如果不存在,直接抛出异常
   * @param path 要判断的路径
   */
  isExistPathOrThrowError(path) {
    if (this.isExistPath(path)) {
      return true;
    }
    else {
      throw new Error("path not exist");
    }
  }

  /**
   * 判断路径是否是文件夹,如果不是文件夹 抛出异常
   * @param {string} path 
   */
  isDirOrThrowError(path) {
    if (this.isExistPathOrThrowError(path)) {
      if (this.isDir(path)) {
        return true;
      }
      else {
        throw new Error("path not dir");
      }
    }

  }

  /**
   * 创建文件夹,如果文件夹已存在,抛出异常
   * @param {string} path 
   */
  createDir(path) {
    if (!this.isDir(path)) {
      //文件不存在,创建文件夹
      fs.mkdirSync(path);
    } else {
      throw new Error("dir is exist")
    }
  }

  /**
   * 创建文件夹,如果文件夹已存在,覆盖文件夹
   * @param {string} path 
   */
  async createDirAndCoverOld(path) {
    if (this.isExistPath(path)) {
      //如果文件夹已存在
      //删除文件夹
      await this.removeFileOrDir(path);
      return this.createDir(path);
    } else {
      return this.createDir(path);
    }
  }


  /**
   * 获取文件内容
   * @param {string} path 文件路径
   */
  getFileUTF8Content(path) {
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
  getChildFileOrDir(path) {
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
  outputFile(path, content) {
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
  outputFileAndCoverOld(path, content) {
    if (this.isExistPath(path)) {
      if (this.isDir(path)) {
        //不是文件而是文件夹
        throw new Error("path is dir");
      }
      else {
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
  outputFileOrAppendContent(path, content) {
    if (this.isExistPath(path)) {
      if (this.isDir(path)) {
        //不是文件而是文件夹
        throw new Error("path is dir");
      }
      fs.appendFileSync(path, content, 'utf8');
    }
    else {
      fs.writeFileSync(path, content);
    }
  }

  /**
   * 修改文件或文件夹的所属用户
   * 1:只能是 liunx系统,2:要有一定的执行权限
   * @param {string} path 文件路径
   * @param {string} user 所属用户名
   */
  changeFileOrDirUser(path, user) {
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
  copyFileOrDir(sourcePath, targetPath, ncpLimit) {
    if (this.isExistPathOrThrowError(sourcePath)) {
      if (this.isExistPath(targetPath)) {
        throw new Error("target path is exist");
      }
      ncp.limit = ncpLimit ? ncpLimit : 16;
      if (sourcePath == targetPath) {
        return;
      }
      return new Promise((resolve, reject) => {
        ncp(sourcePath, targetPath, function (err) {
          if (err) {
            console.log("copyFileOrDir has error ==>", err);
            reject(err);
          }
          resolve();
        })
      })
    }

  }

  /**
   * 拷贝文件或文件夹,如果目标文件夹已存在,则覆盖原来的文件或文件夹
   * @param {*} sourcePath 源文件路径
   * @param {*} targetPath 目标文件路径
   */
  async copyFileOrDirCoverOld(sourcePath, targetPath, ncpLimit) {
    if (this.isExistPathOrThrowError(sourcePath)) {
      if (this.isExistPath(targetPath)) {
        await this.removeFileOrDir(targetPath);
      }
      return this.copyFileOrDir(sourcePath, targetPath, ncpLimit);
    }
  }
}

//返回单例
module.exports = new FsSyncTool();