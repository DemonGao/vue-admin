<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar ref="navbar"></navbar>
      <tags-view ref="tagsView"></tags-view>
      <app-main :mainHeight.sync="mainHeight"></app-main>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain, TagsView } from './components'
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView
    },
    mixins: [ResizeMixin],
    data() {
      return {
        mainHeight: '100%'
      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('closeSideBar', {withoutAnimation: false})
      }
    },
    mounted() {
      this.mainHeight = document.body.clientHeight - this.$refs.navbar.$el.clientHeight - this.$refs.tagsView.$el.clientHeight + 'px'
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
