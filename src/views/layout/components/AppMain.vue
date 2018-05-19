<style lang="less" scoped="scoped">
  .app-main{
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #f2f2f2;
  }
</style>
<template>
  <section class="app-main" :style="{'height': mainHeight}">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    props: ['mainHeight'],
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    }
  }
</script>
