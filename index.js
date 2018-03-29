const FsSyncTool = require("./src/fs_sync_tool");
exports.removeDir = async function (path) {
    await FsSyncTool.removeDir(path);
}
exports.removeFileOrDir = async function (path) {
    await FsSyncTool.removeFileOrDir(path);
}

exports.dirIsEmpty = function (path) {
    return FsSyncTool.dirIsEmpty(path);
}

exports.isDir = function (path) {
    return FsSyncTool.isDir(path);
}


exports.isDirAndThrowError = function (path) {
    return FsSyncTool.isDirAndThrowError(path);
}

exports.isExistPath = function (path) {
    return FsSyncTool.isExistPath(path);
}

exports.isExistPathOrThrowError = function (path) {
    return FsSyncTool.isExistPathOrThrowError(path);
}

exports.isDirOrThrowError = function (path) {
    return FsSyncTool.isDirOrThrowError(path);
}

exports.createDir = function (path) {
    return FsSyncTool.createDir(path);
}

exports.createDirAndCoverOld = async function (path) {
    await FsSyncTool.createDirAndCoverOld(path);
}


exports.getFileUTF8Content = function (path) {
    return FsSyncTool.getFileUTF8Content(path);
}


exports.getChildFileOrDir = function (path) {
    return FsSyncTool.getChildFileOrDir(path);
}

exports.outputFile = function (path,content) {
    return FsSyncTool.outputFile(path,content);
}

exports.outputFileAndCoverOld = function (path,content) {
    return FsSyncTool.outputFileAndCoverOld(path,content);
}

exports.outputFileOrAppendContent = function (path,content) {
    return FsSyncTool.outputFileOrAppendContent(path,content);
}

exports.changeFileOrDirUser = function (path,user) {
    return FsSyncTool.changeFileOrDirUser(path,user);
}

exports.copyFileOrDir = function (sourcePath, targetPath, ncpLimit) {
    return FsSyncTool.copyFileOrDir(sourcePath, targetPath, ncpLimit);
}

exports.copyFileOrDirCoverOld =async function (sourcePath, targetPath, ncpLimit) {
    await FsSyncTool.copyFileOrDirCoverOld(sourcePath, targetPath, ncpLimit);
}
