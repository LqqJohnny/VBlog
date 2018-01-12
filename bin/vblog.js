#! /usr/bin/env node

'use strict';
var fs = require("fs"),
    path = process.cwd();

var run= function (opt) {
  switch(opt[0]){
    case 'add':
      if(opt[1]==="blog"){ // 添加博客
        var text = "---\r\ntitle: "+opt[2]+"\r\ndate: "+getTime()+"\r\ntags: [无标签]\r\ncategories: 未分类\r\n--- \r\n <!-- deleteAbove -->"
        fs.writeFileSync('./src/articles/'+opt[2]+'.md',text);
        //  待做  加入新文章到 三个 json  ---------------------
        
        console.log('新博客'+ opt[2] +'.md 已生成');
      }
      break;
    case "delete":
      if(opt[1]==="blog"){ // 删除博客 进入回收站
        var sourceFile = './src/articles/'+opt[2]+'.md';
        var destPath = './src/recycleBin/'+opt[2]+'.md';
         if( fs.existsSync(sourceFile) ){
           // 移动文件
            fs.rename(sourceFile, destPath, function (err) {
              if (err) throw err;
              console.log("文章已删除，可在回收站 src/recycleBin 查看已删除文章");
            });
            // 删除 三个 json文件的对应信息 ---------------------

         }else{
            console.log('没有这篇文章。')
         }
      }
      break;
    case "restore":
      if(opt[1]==="blog"){ // 恢复博客
        var sourceFile = './src/recycleBin/'+opt[2]+'.md';
        var destPath = './src/articles/'+opt[2]+'.md';
         if( fs.existsSync(sourceFile) ){
           // 移动文件
            fs.rename(sourceFile, destPath, function (err) {
              if (err) throw err;
              console.log("文章恢复成功");
            });
            // 加入 三个 json文件的对应信息 ---------------------

         }else{
            console.log('没有这篇文章。')
         }
      }
      break;
    default:
      console.log("您输入的指令未识别，请确认是否正确");
      break;
  }
};
function getTime(){
  var date = new Date();
  // 2018/1/1 11:11:11
  return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2));
