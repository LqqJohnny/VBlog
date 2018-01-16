<template lang="html">
	<div class="category_box">
		<h3 class="cate_title">Categories</h3>
		<div class="cate_list">
			<ul>
				<li v-for="(val,key) in categories"><a>{{key}}</a> <span>({{val}})</span></li>
			</ul>
		</div>
	</div>
</template>
<script>
var articles = require('../../../../articles.json');
export default {
	data(){
		return {
			categories:[]
		}
	},
	mounted(){
		var _this = this,categories = {};
		articles.forEach(function(val){
			if (typeof categories[val.categories] !='undefined') {
				categories[val.categories] ++;
			}else{
				categories[val.categories] = 1;
			}
		})
		this.categories = categories;
	}
}
</script>
<style type="text/css">
	.category_box{font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;}
	.cate_title{
		text-align: center;
		color: #555;
		margin: 20px 0 10px;
	}
	.cate_list li{
		margin: 5px 10px;
		line-height: 2;
	}
	.cate_list li a{
		color: #555;
		border-bottom: 1px solid #ccc;
		font-size: 1rem;
		cursor: pointer;
	}
	.cate_list li span{color: #bbb;}
</style>