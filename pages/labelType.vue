<template>
  <div class="label-content-box" v-if="loadFinsh">
      <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="8956643957"></ins>
      </div>
      <!-- 广告位 -->
      <div class="mainDex-content">
        <div class="nav-select-content">
          <div class="nav-title"><span>All Genre</span></div>

          <div class="nav-item" :class="`c${item.id}`" @click="navRouter(item.id)" v-for="(item,index) in labelData">
            <img :src="require(`../assets/c${item.id}.png`)" alt="" class="nav-icon">
            <div class="nav-text">{{item.name}}</div>
          </div>
        </div>
      </div>
       <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="9486346744"></ins>
      </div>
      <!-- 广告位 -->
  </div>

</template>

<script>
import historyItem from '@/components/historyItem.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    historyItem
  },
  mounted () {
    var date = new Date()
    this.search().then((res) => {
      this.labelData = res.data.categories
      let datenew = new Date()
      let datenum = datenew.getTime() - date.getTime()
      this.gaCount('send', '标签页', '加载完成', datenum / 1000)
    })
    this.$nextTick(function () {
      let queNum = document.querySelectorAll('.adsbygoogle').length
      for (var i = 0; i < queNum; i++) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    })
    this.loadFinsh = true
  },
  data () {
    return {
      loadFinsh: false,
      labelData: []
    }
  },
  methods: {
    ...mapActions(['GetTypeList']),
    // 分类跳转
    navRouter (id) {
      this.gaCount('send', '标签页', '点击分类', id)
      this.$router.push({path: `/books?type=${id}`})
    },
    search () {
      return this.GetTypeList().then(res => {
        if (res.status === 200) {
          console.log(res)
          return res
        }
        return []
      })
    }
  }
}
</script>
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;
.label-content-box {
  box-sizing: border-box;
  color: @font-color;
  .mainDex-content {
    background:#fff;
    padding: .3rem;
    box-shadow: 0px 2px 5px  0px #ccc;
    margin: 0 .3rem;

    .nav-select-content {
      &:after {
        content: '';
        display:block;
        clear: both;
      }
    }
    .nav-title {
      font-size: .5rem;
      margin-bottom: .3rem;
      &:after {
        content: '';
        display:block;
        clear: both;
      }
    }
    .nav-item {
      width: 4.6rem;
      height: 1.7rem;
      float: left;
      text-align: center;
      line-height: 1rem;
      margin-bottom: .3rem;
      &:nth-child(2n+1) {
        margin-left: .4rem;
      }
      &.c280406 {
        background: url('http://cdn.batmobi.net/novel/category/img/Adventure.png') no-repeat center;
        background-size: 100%;
      }
      &.c280415 {
        background: url('http://cdn.batmobi.net/novel/category/img/Romance.png') no-repeat center;
        background-size: 100%;
      }
      &.c280408 {
        background: url('http://cdn.batmobi.net/novel/category/img/Fantasy.png') no-repeat center;
        background-size: 100%;
      }
      &.c280416 {
        background: url('http://cdn.batmobi.net/novel/category/img/Science.png') no-repeat center;
        background-size: 100%;
      }
      &.c280414 {
        background: url('http://cdn.batmobi.net/novel/category/img/Mystery.png') no-repeat center;
        background-size: 100%;
      }
      &.c280412 {
        background: url('http://cdn.batmobi.net/novel/category/img/Horror.png') no-repeat center;
        background-size: 100%;
      }
      &.c280411 {
        background: url('http://cdn.batmobi.net/novel/category/img/Historical.png') no-repeat center;
        background-size: 100%;
      }
      &.c280413 {
        background: url('http://cdn.batmobi.net/novel/category/img/Humorous.png') no-repeat center;
        background-size: 100%;
      }
      &.c280407 {
        background: url('http://cdn.batmobi.net/novel/category/img/Christian.png') no-repeat center;
        background-size: 100%;
      }
      &.c280417 {
        background: url('http://cdn.batmobi.net/novel/category/img/Thriller.png') no-repeat center;
        background-size: 100%;
      }
      &.c280418 {
        background: url('http://cdn.batmobi.net/novel/category/img/Western.png') no-repeat center;
        background-size: 100%;
      }
      &.c280419 {
        background: url('http://cdn.batmobi.net/novel/category/img/YoungAdults.png') no-repeat center;
        background-size: 100%;
      }
      .nav-icon {
        position: relative;
        top: .12rem;
        width: 1.3rem;
        height: .63rem;
      }
      .nav-text {
        line-height: 1;
        margin-top: .12rem;
        color:#fff;
        font-size: .38rem;
        font-weight: 600;
      }
    }
  }
}
</style>
