const FsSyncTool = require("../src/fs_sync_tool");

class Test {

    //创建文件
    test_outputFile() {
        FsSyncTool.outputFile('./newFile.txt', '12345');
    }

    //创建文件,如果已存在则覆盖
    test_outputFileAndCoverOld() {
        FsSyncTool.outputFileAndCoverOld('./newFile.txt', '678910');
    }

    //创建文件,如果文件已存在,则在该文件末尾添加内容
    test_outputFileOrAppendContent() {
        FsSyncTool.outputFileOrAppendContent('./newFile.txt', '678910');
    }

    //文件夹是否为空,传入文件类型
    test_dirIsEmpty_file() {
        //传入文件,判断是否为空的文件夹
        FsSyncTool.dirIsEmpty('./newFile.txt')//Error
    }

    //文件夹是否为空,传入不存在文件夹
    test_dirIsEmpty_not_exist_dir() {
        return FsSyncTool.dirIsEmpty('./sss')
    }

    //文件夹是否为空,传入空文件夹
    test_dirIsEmpty_dir() {
        return FsSyncTool.dirIsEmpty('./test_dir')
    }

    //文件夹是否为空,传入非空文件夹
    test_dirIsEmpty_notEmpty_dir() {
        return FsSyncTool.dirIsEmpty('./test_files_dir')
    }

    //判断是否是文件夹
    test_isDir_file() {
        return FsSyncTool.isDir('./newFile.txt')
    }

    //判断是否是文件夹
    test_isDir_dir() {
        return FsSyncTool.isDir('./test_dir')
    }

    //判断是否是文件夹,文件夹不存在
    test_isDirAndThrowError_dirNotExist() {
        return FsSyncTool.isDir('./sss')
    }

    //判断是否是文件夹,文件夹已存在
    test_isDirAndThrowError_dirExist() {
        return FsSyncTool.isDir('./test_dir')
    }

    //判断文件路径是否存在,不存在路径
    test_isExistPath_notExist() {
        return FsSyncTool.isExistPath('./sss')
    }

    //判断文件路径是否存在,不存在路径
    test_isExistPath_Exist() {
        return FsSyncTool.isExistPath('./test_dir')
    }

    //创建文件夹,但文件夹已存在
    test_createDir_isExist() {
        return FsSyncTool.createDir('./test_dir')
    }

    //创建文件夹,但文件夹已存在
    test_createDir_notExist() {
        return FsSyncTool.createDir('./test_dir_createDir')
    }

    //覆盖创建文件夹,文件夹已存在
    test_createDirAndCoverOld_isExist() {
        return FsSyncTool.createDirAndCoverOld('./test_dir')
    }

    //覆盖创建文件夹,文件夹已存在
    test_createDirAndCoverOld_isNotExist() {
        return FsSyncTool.createDirAndCoverOld('./test_dir_coverOld')
    }

    //获取文件内容
    test_getFileUTF8Content() {
        return FsSyncTool.getFileUTF8Content("./test_files_dir/testFile.txt");
    }

    //获取文件夹中的子文件或子文件夹
    test_getChildFileOrDir() {
        return FsSyncTool.getChildFileOrDir('./test_files_dir');
    }

    //拷贝文件或文件夹,源文件不存在
    test_copyFileOrDir_sourcePathNotExist() {
        FsSyncTool.copyFileOrDir("./dfd", "./test_new_dir");
    }

    //拷贝文件或文件夹,目标文件已存在
    test_copyFileOrDir_targetPathExist() {
        FsSyncTool.copyFileOrDir("./test_files_dir", "./test_dir");
    }

    //拷贝文件或文件夹,目标文件已存在
    test_copyFileOrDir() {
        FsSyncTool.copyFileOrDir("./test_files_dir", "./test_dir_copy");
    }

    test_copyFileOrDirCoverOld_targetPathExist() {
        FsSyncTool.copyFileOrDirCoverOld("./test_files_dir", "./test_dir_copy");
    }

    test_copyFileOrDirCoverOld_targetPathNotExist() {
        FsSyncTool.copyFileOrDirCoverOld("./test_files_dir", "./test_dir_copy_new");
    }

    //修改文件或文件夹的用户归属
    test_changeFileOrDirUser_file() {
        FsSyncTool.changeFileOrDirUser("./test_files_dir/testFile.txt", "daiyc");
    }

    //修改文件或文件夹的用户归属
    test_changeFileOrDirUser_dir() {
        FsSyncTool.changeFileOrDirUser("./test_files_dir", "daiyc");
    }

    //修改文件或文件夹的用户归属
    test_changeFileOrDirUser_not_user() {
        FsSyncTool.changeFileOrDirUser("./test_files_dir", "sdfdfdf");
    }

    //删除文件夹,传入的是文件
    test_removeDir_file() {
        FsSyncTool.removeDir("./test_files_dir/testFile.txt");
    }

    //删除文件夹
    test_removeDir() {
        FsSyncTool.removeDir('./test_dir_copy_new');
    }

    //删除文件或文件夹 文件
    test_removeFileOrDir_file() {
        FsSyncTool.removeFileOrDir("./test_dir_copy/testFile.txt");
    }

    //删除文件或文件夹 文件夹
    test_removeFileOrDir_dir() {
        FsSyncTool.removeFileOrDir("./test_dir_copy");
    }


}


let test = new Test();

// test.test_outputFile();
// test.test_outputFileAndCoverOld();
// test.test_outputFileOrAppendContent();
// test.test_dirIsEmpty_file();//Error
// test.test_dirIsEmpty_not_exist_dir();//Error
// let isEmptyDir = test.test_dirIsEmpty_dir();//true
// let isEmptyDir = test.test_dirIsEmpty_notEmpty_dir();//false
// let isDir = test.test_isDir_file();//false
// let isDir = test.test_isDir_dir();//true
// let isDir=test.test_isDirAndThrowError_dirNotExist();//Error
// let isDir=test.test_isDirAndThrowError_dirExist();//true
// let isExist = test.test_isExistPath_notExist();//false
// let isExist = test.test_isExistPath_Exist();//true
// test.test_createDir_isExist();//Error dir is exist
// test.test_createDir_notExist();//Error dir is exist
// test.test_createDirAndCoverOld_isExist();
// test.test_createDirAndCoverOld_isNotExist();
// let content = test.test_getFileUTF8Content();
// let fileOrDirs = test.test_getChildFileOrDir();
// test.test_copyFileOrDir_sourcePathNotExist();//Error
// test.test_copyFileOrDir_targetPathExist();//Error
// test.test_copyFileOrDir();
// test.test_copyFileOrDirCoverOld_targetPathExist();
// test.test_copyFileOrDirCoverOld_targetPathNotExist();
// test.test_changeFileOrDirUser_file();
// test.test_changeFileOrDirUser_dir();
// test.test_changeFileOrDirUser_not_user();//invalid user invalid group
// test.test_removeDir_file();//error path not dir
// test.test_removeDir();
// test.test_removeFileOrDir_file();
// test.test_removeFileOrDir_dir();
// console.log("file utf8 content ===>", fileOrDirs);
