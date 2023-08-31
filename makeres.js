var fs = require('fs');
var path = require('path');

//要遍历的文件夹所在的路径
var filePath = path.resolve('./client/assets/resources');

//调用文件遍历方法
data = {}
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err, "读取文件夹错误！")
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            lstDir = filedir.split(".");
                            if (lstDir[lstDir.length - 1] == "meta") {
                                return
                            }
                            lstDir[0] = lstDir[0].split("assets\\resources")[1].split("\\");
                            //   console.log(lstDir);
                            lstDir[0].splice(0, 1)
                            let name = lstDir[0][lstDir[0].length - 1]
                            lstDir[0].splice(lstDir[0].length - 1, 1)
                            let type = lstDir[1];
                            let sPath = "";
                            let sKey = "";
                            for (let s of lstDir[0]) {
                                if (sPath == "") {
                                    sPath = s;
                                    sKey = s;
                                } else {
                                    sPath += "/" + s;
                                    sKey += s[0].toLocaleUpperCase() + s.substring(1);
                                }
                            }
                            // console.log(type);
                            if (data[sKey]) {
                                data[sKey].push({ sPath, name, type })
                            } else {
                                data[sKey] = [{ sPath, name, type }]
                            }
                            makeResTable();
                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}


function makeResTable() {
    let TABLE = {};
    for (let key in data) {
        for (dRes of data[key]) {
            let { sPath, name, type } = dRes;
            let sKey = key;
            if (data[key].length != 1) {
                sKey = key + type;
            }
            //    console.log(sPath, name, type)
            if (type == "anim") {
                break;
            }
            if (TABLE[sKey]) {
                if (TABLE[sKey].list.indexOf(name) == -1) {
                    TABLE[sKey].list.push(name);
                }
            } else {
                TABLE[sKey] = {
                    path: sPath,
                    type: "--" + type + "--",
                    list: [name],
                }
            }
        }
    }
    let sResult = JSON.stringify(TABLE);
    sResult = sResult.replace(/\-\-png\-\-/g, "cc.SpriteFrame")
    sResult = sResult.replace(/\-\-jpg\-\-/g, "cc.SpriteFrame")
    sResult = sResult.replace(/\-\-prefab\-\-/g, "cc.Prefab")
    sResult = sResult.replace(/\-\-plist\-\-/g, "cc.SpriteAtlas")
    sResult = sResult.replace(/\-\-json\-\-/g, "cc.JsonAsset")
    sResult = sResult.replace(/\-\-wav\-\-/g, "cc.AudioClip")
    d = JSON.parse(sResult);
    let sRes = " let TABLE = {\n";
    for (let key in d) {
        let { path, type, list } = d[key];
        sRes += `
        ${key}:{
            path:"${path}",
            type:${type},
            list:${JSON.stringify(list)},
        },
        `
    }
    sRes += "\n}"
    fs.writeFileSync(`./resresult.txt`, sRes, 'utf8');
}