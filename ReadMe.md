> NodeJs 文件操作 同步执行库 提供了删除文件夹 修改文件所属用户(linux系统)

> 方法说明:

| 方法名 | 参数 | 是否是Promise类型  | 返回值  | 说明 |
| ------ | ------ | ----- | ----- | ----- |
| 删除文件夹 removeDir | path 需要删除文件夹的路径 | 是 | Promise |  删除文件夹,如果参数不为有效文件夹路径,返回错误 throw Error
| 删除文件或文件夹  removeFileOrDir | path 需要删除文件夹的路径 | 是 | Promise | 该方法可删除文件或文件夹 如果文件路径无效 则会 throw Error
| 文件夹是否为空 dirIsEmpty | path 需要判断的文件夹路径 | 否 | 如果空则返回: true 如果不是空返回: false | 路径无效 throw Error
| 是否为文件夹 isDir | path 需要判断的文件夹路径 | 否 | 如果是文件夹: true 如果不是文件夹: false | 路径无效直接返回false
| 是否为文件夹,如果不是抛出异常 isDirOrThrowError | path 需要判断的文件夹路径 | 否 | 如果是文件夹: true | 路径无效 throw Error
| 是否为文件夹,如果不是则抛出异常 isDirAndThrowError | path 需要判断的文件夹路径 | 否 | 如果是文件夹: true 如果不是文件夹: false | 路径无效 throw Error
| 路径是否真实有效 isExistPath | path 需要判断的文件夹或文件路径 | 否 | 有效路径: true 无效路径: false | 无
| 路径是否真实有效,如果不存在则抛出异常 isExistPathOrThrowError | path 需要判断的文件夹或文件路径 | 否 | 有效路径: true | 如果不存在 throw Error
| 创建文件夹 createDir | path 要创建文件夹的路径 | 否 | 无 | 如果文件夹已存在,throw Error
| 创建文件夹如果文件夹已存在,覆盖该文件夹 createDirAndCoverOld | path 要创建文件夹的路径 | 是 | Promise | 无
| 获取文件UTF8内容 getFileUTF8Content | path 文件路径 | 否 | 文件内容 | 如果文件路径无效 throw Error path not exist ,如果是文件夹, throw Error path is dir
| 获取文件夹的子文件或子文件夹 getChildFileOrDir | path 文件夹路径 | 否 | Array文件和文件夹列表 | 路径无效 throw Error 
| 将文件输入到指定文件中 outputFile | path 文件路径 | 否 | 无 | 文件已存在,throw Error file is exist
| 将文件输入到指定文件中,如果文件存在则覆盖 outputFileAndCoverOld | path 文件路径 | 否 | 无 | 文件已存在则覆盖文件,如果path参数指定的是一个文件夹,则 throw Error path is dir
| 将文件输入到指定文件中,如果文件存在则追加 outputFileOrAppendContent | path 文件路径 | 否 | 无 | 文件已存在则在原文件中追加内容,如果path参数指定的是一个文件夹,则 throw Error path is dir
| 修改文件或文件夹所属用户 changeFileOrDirUser | path 文件或文件夹路径 user 所属用户的名称 | 否 | 无 | 修改文件或文件夹的所属用户,使用shell,只适用于linux
| 拷贝文件或文件夹 copyFileOrDir | sourcePath 源文件路径 targetPath 目标文件路径 ncpLimit 拷贝文件层级 默认值为:16 | 否 | 无 | 源路径不存在或目标路径已存在,都会 throw Error
| 拷贝文件或文件夹,如果目标文件或文件夹已存在则会覆盖 copyFileOrDirCoverOld | sourcePath 源文件路径 targetPath 目标文件路径 ncpLimit 拷贝文件层级 默认值为:16 | 是 | Promise | 源路径不存在 throw Error
