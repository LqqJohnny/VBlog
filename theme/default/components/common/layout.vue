<template lang="html">
<div>
    <header></header>
    <side></side>
    <section id ="app">
        <!-- 这里放内容 -->
    </section>
    <footer></footer>
</div>

</template>

<script>
import header from './header.vue'
import footer from './footer.vue'
import side from './side.vue'
export default {
    components:{
        header,footer,side
    },
    data(){
        return{}
    },



}
</script>

<style lang="css">
</style>
