var fs = require('fs');
let  join = require('path').join;

var startPath = "src/articles";
var stats = findSync(startPath);
fs.writeFileSync('./articles.json',JSON.stringify(stats));

function findSync(startPath) {
    let result=[];
    var path = startPath;
    let files=fs.readdirSync(path);
    files.forEach((val,index) => {
        let fPath=join(path,val); // 用于分析是否是 文件夹 返回的数据用的是 val
        let stats=fs.statSync(fPath);
        // if(stats.isDirectory()) {result.unshift({type:"directory",name:val,path:pa})};
        if(stats.isFile()){
            result.push({type:"file", name:val});
        }
    });
    return result;
}
//
// module.exports = {
//   'stats': stats
// }
