<!--header-->

<template>
  <div class="header-content">
    <div class="hd-box">
      <img v-if="this.$route?this.$route.meta.isBack:false" src="../assets/left.png" alt="back" class="back-icon"  onclick="javascript:history.go(-1);">
      <div class="header-title">{{headerTitle}}</div>
      <img v-if="this.$route?this.$route.meta.isBack:false" src="../assets/home.png" alt="" class="home-icon" @click="goHome" >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nov-header',
    props: {
      headerTitle: {
        default: ''
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      goHome () {
        this.$router.push({path: '/'})
      },
      goBackTo () {
        console.log(this.$router)
        window.history.go(-1)
      }
    },
    computed: {},
    components: {},
    watch: {}
  }
</script>
<style  lang="less">
  .header-content {
    background: @base-color;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    padding: 0 1rem;
    z-index: 9;
    left: 0;
    width: 100%;
    line-height: 1.5rem;
    height: 1.5rem;
  }
  .hd-box {
    position: relative;
    .back-icon {
      display:block;
      padding: .2rem 0 .2rem .46rem;
      height: .6rem;
      width: .6rem;
      z-index: 10;
      position: absolute;
      top: .25rem;
      left: -1rem;
      & > img {
        display:block;
        height: .6rem;
        width: .6rem;
      }
    }
    .home-icon {
      display:block;
      padding: .2rem .46rem .2rem 0;
      height: .6rem;
      width: .6rem;
      z-index: 10;
      position: absolute;
      top: .25rem;
      right: -1rem;
    }
    .header-title {
      font-size: .4rem;
      width: 100%;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      box-sizing: border-box;
      color: #fff;
    }
  }
</style>
