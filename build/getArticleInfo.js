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
      console.log("正在打包 ："+val);
        let fPath=join(path,val); // 用于分析是否是 文件夹 返回的数据用的是 val
        let stats=fs.statSync(fPath);
        // if(stats.isDirectory()) {result.unshift({type:"directory",name:val,path:pa})};
        if(stats.isFile()){
          // 解析出 文章的参数 信息
          var data=fs.readFileSync(fPath,"utf-8");
          result.push(Object.assign({},{type:"file", name:val},getHeader(data,fPath)));
        }
    });
    return result;
}

function getHeader(data,path){
  var start = data.indexOf("---");
  var end = data.indexOf("---",start+3);
  var mdHead = data.substring(start+3,end);

  var headArr = mdHead.split(/\n/).filter(function(val){
      return val!==""&&val!=="\r";
  });
  var headJSON = {};
  headArr.map(function(val){
    var arr = val.split(":");
    headJSON[arr[0]] = arr[1].replace(/\r/g,"").replace(/\[/g,"").replace(/\]/g,"");
  })
  // 处理文件 没有则插入dleteAbove 标识
  if(data.indexOf("<!-- deleteAbove -->")<0){
    var newData = insertStr(data,end+3,"\r\n <!-- deleteAbove -->");
    fs.writeFileSync(path ,newData);
  }
  return headJSON;
}

function insertStr(target,start,add){
  var newStr = target.substring(0,start) + add +target.substring(start);
  return newStr;
}

//
// module.exports = {
//   'stats': stats
// }
