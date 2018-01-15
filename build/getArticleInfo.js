var fs = require('fs');
let  join = require('path').join;

var startPath = "articles";
var stats = findSync(startPath);
// 对文章按时间排序
var articles = stats.result.sort(function(a,b){
  return b.timestamp - a.timestamp;
})
fs.writeFileSync('./articles.json',JSON.stringify(articles));
fs.writeFileSync('./tags.json',JSON.stringify(stats.tags));
fs.writeFileSync('./categories.json',JSON.stringify(stats.categories));

function findSync(startPath) {
    let ret = {
      result: [],
      tags : {},  //  用于 标签页
      categories : {}  // 用于 分类页
    }
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
          var headInfo = getHeader(data,fPath,val,ret.tags,ret.categories);

          ret.result.push(Object.assign({},{type:"file", name:val},headInfo.headJSON));
          ret.tags =  Object.assign({},ret.tags,headInfo.tags);
          ret.categories =  Object.assign({},ret.categories,headInfo.cates);
        }
    });
    return ret;
}
//  获取文章的 头部信息。
function getHeader(data,path,filename,tags,cates){
  var start = data.indexOf("---");
  var end = data.indexOf("---",start+3);
  if(start===-1 || end===-1 || start===end){ // 没有文字信息头
    return {};
  }

  var mdHead = data.substring(start+3,end);

  var headArr = mdHead.split(/\n/).filter(function(val){
      return val!==""&&val!=="\r";
  });
  var headJSON = {};
  headArr.map(function(val){
    var arr = val.split(":");
    var key = arr[0];
    if(key==="date"){
      var val = arr.slice(1).join(":").replace(/\r/g,"").trim();
    }else{
      var val = arr[1].replace(/\r/g,"").replace(/\[/g,"").replace(/\]/g,"").trim();

    }
    if(key ==="date"){ headJSON["timestamp"] = new Date(val).getTime();}// 将时间转为 long 有助于排序
    if(key === "categories"){cates = Object.assign({},cates,addTagsOrCates(key,val,filename,cates)) }
    if(key === "tags"){tags = Object.assign({},tags,addTagsOrCates(key,val,filename,tags))}

    headJSON[key] = val;
  })
  // 处理文件 没有则插入dleteAbove 标识
  if(data.indexOf("<!-- deleteAbove -->")<0){
    var newData = insertStr(data,end+3,"\r\n <!-- deleteAbove -->");
    fs.writeFileSync(path ,newData);
  }

  return {headJSON,tags,cates};
}
//  在字符串的某个位置 插入 一段新字符串
function insertStr(target,start,add){
  var newStr = target.substring(0,start) + add +target.substring(start);
  return newStr;
}
// 将类别或标签保存
function  addTagsOrCates(key,val, filename,result){
  // val 可能为数组 ，先对 val 进行处理 无论个数 都转成 数组。
  let val_arr = val.split(",").filter(function(val){return val!==""});
    val_arr.map(function(tagname){
      if(typeof(result[tagname]) !=="undefined"){
        result[tagname].push(filename);
      }else{
        result[tagname] = [filename];
      }
    })
    return result;
}

//
// module.exports = {
//   'stats': stats
// }
