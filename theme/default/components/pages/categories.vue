<template lang="html">
	<div class="category_box">
		<h3 class="cate_title">分类</h3>
		<div class="cate_list">
			<ul class="clearfix">
				<li  v-for="(val,key) in categories" class="cate_item" :class="{select : selectCate == key}" @click="showAtcs(val,key)">
					<a>{{key}}</a><span class="artNum">({{val.length}})</span>
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
var categories = require('../../../../categories.json');
export default {
	data(){
		return {
			categories: categories,
			showArticles:[],
			selectCate:""
		}
	},
	methods:{
		showAtcs(val,key){
			this.showArticles = val;
			this.selectCate = key;
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
	.artNum{
		color:rgb(177, 177, 177);
	}
</style>
