<template lang="html">
	<div class="category_box">
		<h3 class="cate_title">标签</h3>
		<div class='wordcloud' v-if="worldCloudOn">
			<vue-word-cloud
				:words="words"
				:rotation=0
				:color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
				font-family="Anton"
			></vue-word-cloud>
		</div>
		<div class="cate_list">
			<ul class="clearfix">
				<li   v-for="(val,key) in tags"
              class="cate_item"
              :class="{select : selectTag == key}"
              @click="showAtcs(val,key)">
					<a :style="{fontSize : genFontSize(val.length)}">{{key}}</a>
				</li>
			</ul>

			<div v-if="showArticles.length>0">
				<hr>
				<ul>
					<li class="article" v-for="art in showArticles">
						<router-link :to="genUrl(art)" >{{genName(art)}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
var tags = require('../../../../tags.json');
var {worldCloudOn} = require('../../theme.config');
export default {
	data(){
		return {
			tags: tags,
			showArticles:[],
			selectTag:"",
			worldCloudOn: worldCloudOn
		}
	},
	computed:{
		words(){
			let words = [];
			for(var key  in tags){
				words.push([key,tags[key].length]);
			}
			return words;
		}
	},
	methods:{
    genFontSize(length){
      var size = length*0.3;
      size = Math.min(size,2);
      size = Math.max(size,1);
      return size+'rem';
    },
		showAtcs(val,key){
			this.showArticles = val;
			this.selectTag = key;
		},
		genUrl(name){
			return '/article/'+name.replace(/\.md/g,'')
		},
		genName(name){
			return name.replace(/\.md/g,'')
		}
	}
}
</script>
<style type="text/css" scoped>
.wordcloud{
	width:90%;
	margin:0 auto;
	height:23rem;
	margin-top:2rem;
}
  hr {
      border-color: #2c8898;
  }
  hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
  }
	.category_box{font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;}
	.cate_title{
		text-align: center;
		color: #555;
		margin: 1rem 0 .5rem;
	}
	.cate_list li{
		margin: 0.2rem 0.5rem;
		line-height: 2;
	}
	.cate_list li a{
		color: #555;
		border-bottom: 1px solid #ccc;
		font-size: 1rem;
		cursor: pointer;
	}
	.cate_list li span{color: #bbb;}
	.cate_item{
		display: inline-block;
	}
	.cate_item.select a{
		color: #428bca;
		font-weight: bold;
		border-color: #428bca;
	}
	.article a{
		text-decoration: none;
	}
</style>
