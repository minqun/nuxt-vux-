<template>
  <div class="mainDex-box">

    <!-- 广告位 
      <div class="ads-box" style="display:none;">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="6261417603"></ins>
      </div>-->
      <!-- 广告位 -->
    <div class="mainDex-content">
      <div class="nav-select-content">
        <div class="nav-title"><span>Hot Genre</span>  <a @click="moreLabel">More <img src="../assets/more.png"></a></div>
  
        <div class="nav-item c3" :class="`c${item.id}`" @click="navRouter(item.id)" v-for="(item, index) in novelData.hotCategories">
          <img :src="require(`../assets/c${item.id}.png`)" alt="" class="nav-icon">
          <div class="nav-text">{{item.name}} </div>
        </div>
      </div>
    </div>
    <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="9981170761"></ins>
      </div>
      <!-- 广告位 -->
     <NovelItem tTitle="Hot Novels" total="home" :novelList="novelData.hotBooks" ></NovelItem>
      <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="7707141465"></ins>
      </div>
      <!-- 广告位 
     <RecommWrap total="home" :novelList="novelData.recommendBooks"></RecommWrap>-->
     <div class="recommWrap-box" >
      <div class="recom-title"><span>Recommended Novel</span> </div>
      <scroller lock-y :scrollbar-x="false">
        <div class="recommWrap-content" >
          <a class="recom-item " v-for="(item, index) in novelData.recommendBooks" @click="recomRoute(item.bookId,item.bookNameEn,'',item.totalNum)">
          <!--  <XImg class="default-img-bg recom-img" :default-src="require('../assets/default-img.png')" container=".recommWrap-content" :offset="-1000" :src="item.img"></XImg>-->
            <img v-img="item.img" class="default-img-bg recom-img" ></img> 
            <div class="content-detail">
            <div class="re-title">{{item.bookNameEn}}</div>
            </div>
            <div class="re-type">
              <span class="type-item" :class="`t${item.categories[0].id}`" v-if="item.categories">{{item.categories[0].name}}</span>
            </div>
          </a>
        </div>
      </scroller>
      </div>
  </div>

</template>

<script>
import { Scroller } from 'vux'
import NovelItem from '@/components/NovelItem.vue'
// import RecommWrap from '@/components/RecommWrap.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    NovelItem,
    // RecommWrap,
    Scroller
  },
  filters: {
  },
  mounted () {
    var date = new Date()
    this.search().then((res) => {
      console.log(res.data)
      this.novelData = res.data
      let datenew = new Date()
      let datenum = datenew.getTime() - date.getTime()
      console.log(datenum)
      this.gaCount('send', '首页', '加载完成', datenum / 1000)
    })
    this.loadFinsh = true
  },
  data () {
    return {
      loadFinsh: false,
      novelData: {}
    }
  },
  updated () {
    this.$nextTick(function () {
      try {
        let queNum = document.querySelectorAll('.adsbygoogle').length
        for (var i = 0; i < queNum; i++) {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      } catch (e) {}
    })
  },
  methods: {
    ...mapActions(['GetMain']),
    // 分类跳转
    navRouter (id) {
      this.gaCount('send', '首页', '点击分类', id)
      this.$router.push({path: `/books?type=${id}`})
    },
    moreLabel () {
      this.gaCount('send', '首页', '点击更多分类', '')
      this.$router.push({path: '/label'})
    },
    recomRoute (id, name, chapter, totalNum) {
      this.gaCount('send', '首页', '点击推荐小说', name)
      if (this.getLocal('historyData')) {
        let arr = this.getLocal('historyData')
        let obj = {
          bookId: id,
          bookName: name,
          chapter: chapter,
          chapId: '',
          time: new Date(),
          totalNum: totalNum
        }
        arr.unshift(obj)
        let dArr = this.arrayUnRepeat(arr, 'bookId')
        this.setLocal('historyData', dArr)
      } else {
        this.setLocal('historyData', [{
          bookId: id,
          bookName: name,
          chapter: chapter,
          chapId: '',
          time: new Date(),
          totalNum: totalNum
        }])
      }
      this.$router.push({path: `/introduce?bookId=${id}`})
    },
    search () {
      return this.GetMain().then(res => {
        if (res.status === 200) {
          return res
        }
        return {
          hotCategories: [],
          hotBooks: [],
          recommendBooks: []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;
.mainDex-box {
  box-sizing: border-box;
  padding-top: 0.3rem;
  .mainDex-content {
    background:#fff;
    box-shadow: 0px 2px 5px  0px #ccc;
    padding: .3rem;
    margin: 0 .3rem;
    .nav-title {
      font-size: .5rem;
      margin-bottom: .3rem;
      &:after {
        content: '';
        display:block;
        clear: both;
      }
      & > a {
        float: right;
        margin-top: .07rem;
        font-size: .36rem;
        color: #1b88ee;
        & > img {
          width: .3rem;
          height: .32rem;
        }
      }
    }
    .nav-item {
      height: 2rem;
      text-align: center;
      line-height: 1rem;
      margin-bottom: .3rem;
      &:last-child {
        margin-bottom: 0;
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
        top: .2rem;
        width: 1.34rem;
        height: .64rem;
      }
      .nav-text {
        color:#fff;
        font-size: .46rem;
        font-weight: 600;
      }
    }
  }
  .recommWrap-box {
    box-shadow: 0px 2px 5px  0px #ccc;
    background:#fff;
    padding: .3rem;
    margin: 0 .3rem .3rem .3rem;
    overflow: hidden;
    .recom-title {
      font-size: .5rem;
      margin-bottom: .1rem;
      &:after {
        content: '';
        display:block;
        clear: both;
      }
    }
  .recommWrap-content {
      position: relative;
      width: 34rem;
      .recom-item {
        width: 3.2rem;
        overflow: hidden;
        height:6.4rem;
        font-size: 0;
        margin-right: 0.2rem;
        display: inline-block;
        & > img {
          display:block;
          margin: 0 auto;
        }

        &:last-child {
          margin-right: 0;
        }
          .recom-img {
          width: 2.4rem;
          height: 3.7rem;
        }
        .content-detail {
          height: 1.2rem;
          .re-title {
            text-align: center;
            margin: .2rem 0;
            font-size: .34rem;
            color: #2b2b2b;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }          
        }
        .re-type {
          text-align: center;
          height: .3rem;
          padding-top: .2rem;
          .type-item {
            // margin: 0 .1rem;
            padding: .1rem;
            font-size: .3rem;
            border: 1px solid #ccc;
            border-radius: .08rem;
            font-size: .3rem;
            white-space: nowrap;
            &.t280406 {
              color: #9690F8;
              border-color: #9690F8;
            }
            &.t280415 {
              color: #ffa8fa;
              border-color: #ffa8fa;
            }
            &.t280408 {
              color: #7ebeff;
              border-color: #7ebeff;
            }
            &.t280419 {
              color: #CCFCA5;
              border-color: #CCFCA5;
            }
            &.t280416 {
              color: #ED9A94;
              border-color: #ED9A94;
            }
            &.t280414 {
              color: #F4D88F;
              border-color: #F4D88F;
            }
            &.t280412 {
              color: #9AE5F8;
              border-color: #9AE5F8;
            }
            &.t280417 {
              color: #F2B182;
              border-color: #F2B182;
            }
            &.t280413 {
              color: #A0997D;
              border-color: #A0997D;
            }
            &.t280407 {
              color: #879396;
              border-color: #879396;
            }
            &.t280411 {
              color: #6686A0;
              border-color: #6686A0;
            }
            &.t280418 {
              color: #8D8589;
              border-color: #8D8589;
            }
          }
        }
      }
    }
  }
}

</style>
