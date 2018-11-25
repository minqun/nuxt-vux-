<template>
  <div class="novel-box-content">
    <div class="novel-title"><span>{{tTitle}}</span>  <a v-if="tMore" @click="moreNovel" >More <img src="../assets/more.png"></a></div>
    <div class="novel-item" @click="novelRoute(item.bookId,item.bookNameEn,'',item.totalNum)" v-for="(item, index) in novelList">
      <!--<XImg class="default-img-bg novel-img" :default-src="require('../assets/default-img.png')" container="#viewBoxMain" :offset="-1000" :src="item.img"></XImg>-->
      <img v-img="item.img" class="default-img-bg novel-img" ></img>
      <div class="novel-detail-box">
        <h4 class="novel-title">{{item.bookNameEn}}</h4>
        <div class="nov-type">
          <span class="score">{{total == 'home' ? Number(Math.random()*1+4).toFixed(1): Number(Math.random()*2+3).toFixed(1)}}</span>
          <img src="../assets/score.png" class="score-icon">
          <span class="type-item" :class="'t'+ stem.id" v-for="(stem, j) in item.categories">{{stem.name}}</span>
        </div>
        <div class="novel-info" v-html="htmlFilter(item.description)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navel-item',
  mounted () {
    console.log(this)
  },
  watch: {
    // '$store.state.scrollTop'  () {
    //   this.scroll = -this.$store.state.scrollTop * 5
    // }
  },
  data () {
    return {
      scroll: -100 * 10
    }
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
    },
    infoFilter (val) {
      return val.slice(0, 80) ? val.slice(0, 80) + '...' : ''
    }
  },
  props: {
    tTitle: {
      default: ''
    },
    tMore: {
      default: true
    },
    total: {
      default: ''
    },
    tType: {
      default: 1
    },
    novelList: {
      default: ''
    }
  },
  methods: {
    novelRoute (id, name, chapter, totalNum) {
      if (this.total === 'home') {
        this.gaCount('send', '首页', '点击小说', name)
      }
      if (this.total === 'label') {
        this.gaCount('send', '小说分类页', '点击小说', name)
      }
      if (this.getLocal('historyData')) {
        let arr = this.getLocal('historyData')
        let obj = {
          bookId: id,
          bookName: name,
          chapter: chapter,
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
          time: new Date(),
          totalNum: totalNum
        }])
      }
      this.$router.push({path: `/introduce?bookId=${id}`})
    },
    moreNovel () {
      if (this.total === 'home') {
        this.gaCount('send', '首页', '点击更多小说', '')
      }
      this.$router.push({path: '/books'})
    },
    success (src, ele) {
      console.log('success load', src)
    },
    error (src, ele, msg) {
      console.log('error load', msg, src)
    }

  }
}
</script>

<style lang="less">
@font-color: #2b2b2b;
@base-color: #1b88ee;
.novel-box-content {
    background:#fff;
    box-shadow: 0px 2px 5px  0px #ccc;
    padding: .3rem;
    margin: 0 .3rem;
    .novel-title {
      font-size: .5rem;
      margin-bottom: .1rem;
      &:after {
        content: '';
        display:block;
        clear: both;
      }
      & > a {
        float: right;
        margin-top: .07rem;
        font-size: .36rem;
        color: @base-color;
        & > img {
          width: .3rem;
          height: .32rem;
        }
      }
    }
    .novel-item {
      display: block;
      padding: .3rem 0;
      position: relative;
      border-bottom: 1px solid #cfcfcf;
      &:last-child {
        border: none;
      }
      .novel-img {
        width: 2.4rem;
        height: 3.7rem;
        position: absolute;
        top: .3rem; 
        left: 0;
      }
      .novel-detail-box {
         min-height: 3.7rem;
         box-sizing: border-box;
         padding-left: 3rem;

         .novel-title {
           font-weight: 500;
           text-overflow: ellipsis;
           white-space: nowrap;
           overflow: hidden;
           line-height: .8rem;
           font-size: .48rem;
         }
      
        .nov-type {
          margin-top: .3rem;
          line-height: 2;
          font-size: 0;
          margin-bottom: .3rem;
          .score{
            display: inline-block;
            font-size: .34rem;
          }
          .score-icon {
            display: inline-block;
            margin: 0 .1rem;
            width: .28rem;
            height: .28rem;
          }
          .type-item {
            margin: 0 .1rem;
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
         
         .novel-info {
           font-size: .38rem;
           color: #a7a7a7;

         }
      }

    }
  
  }
</style>
