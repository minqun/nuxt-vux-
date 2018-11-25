<template>
    <div class="recommWrap-box">
    <div id="checkMargin" style="width:.4rem;position: absolute; z-index:-1"></div>
    <div class="recom-title"><span>Recommended Novel</span> </div>
     <scroller lock-y :scrollbar-x="false">
      <div class="recommWrap-content" >
        <a class="recom-item " v-for="(item, index) in novelList" @click="recomRoute(item.bookId,item.bookNameEn,'',item.totalNum)">
          <XImg class="default-img-bg recom-img" :default-src="require('../assets/default-img.png')" container=".recommWrap-content" :offset="-1000" :src="item.img"></XImg> 
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
</template>

<script>
import { Scroller } from 'vux'
export default {
  components: {
    Scroller
  },
  filters: {
    typeFilter (val) {
      switch (val) {
        case 0:
          return 'Adventure'
        case 1:
          return 'Romace'
        case 2:
          return 'Fantasy'
        case 3:
          return 'Young Adults'
        case 4:
          return 'Science'
        case 5:
          return 'Mystery'
        case 6:
          return 'Horror'
        case 7:
          return 'Thriller'
        case 8:
          return 'Houorous'
        case 9:
          return 'Christian'
        case 10:
          return 'Historical'
        case 11:
          return 'Western'
        default:
          return ''
      }
    }
  },
  watch: {
    // '$store.state.scrollTop'  () {
    //   // this.scroll = this.$store.state.scrollTop * 10
    //   // console.log(this.scroll)
    // }
  },
  data () {
    return {
      scroll: -2000,
      pm: 0,
      ph: 0
    }
  },
  computed: {
  },
  props: {
    total: {
      default: ''
    },
    novelList: {
      default: ''
    }
  },
  methods: {
    recomRoute (id, name, chapter, totalNum) {
      if (this.total === 'home') {
        this.gaCount('send', '首页', '点击推荐小说', name)
      }
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
      this.$router.push({path: `/introduce.html?bookId=${id}`})
    }
  }
}
</script>

<style lang="less">
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
</style>
