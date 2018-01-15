// highlight.js
import Vue from 'vue'
import Hljs from 'highlight.js'
import {highlightTheme} from '../../blog.config.js'
var a = highlightTheme;
import(`highlight.js/styles/${a}.css`)  // 动态引入 nice
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
