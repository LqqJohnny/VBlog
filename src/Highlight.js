// highlight.js
import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/gruvbox-light.css'  //  选择 颜色 主题 
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight
