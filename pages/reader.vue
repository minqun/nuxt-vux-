<!-- 小说阅读页 -->
<template>
  <div class="reader-box" :data-title="this.$route.params.bookname+ '_charpter'+this.$route.params.id">
    <!-- 标题 -->
    <div class="header-box" id="header-box">
    <h2>{{bookName}}</h2>
    <div class="control-box">
     <button @click="prev" class="page-prev button-item" :class="{disabled: introData.chapterSequence <= 1}">Last Chapter</button>
     <button @click="next" class="page-next button-item" :class="{disabled: introData.chapterSequence >= totalNum}"> Next Chapter</button>
     <button @click="catlog" class="page-next button-item">Catalog</button>
   </div>
   </div>
   
    <!-- 小说信息 -->
    <div class="content-box">
      <div class="ads-box ">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="2598995454"></ins>
      </div>
      <div class="content-title">
        {{introData.chapterName}}
      </div>
      <div class="content-info" style="position:absolute;top:-100%;left:-100%;">
        <span id="text-height" style="display:block;">x</span>
      </div>
      <article class="content-info" v-if="showCheck">
        <!-- 广告位 -->
        <template v-for="(item, index) in contentArr" v-key="index"> 
          <p  v-html="item"></p>
          <!--<div class="ads-box" v-if="index < (contentArr.length-1) && tnums >= (contentArr[index].length - 12)">
            <ins class="adsbygoogle"
              style="display:inline-block;width:320px;height:100px;"
              data-ad-client="ca-pub-3545063517335060"
              data-ad-slot="4337071851"></ins>
          </div>-->
          <div class="ads-box no-tomargin"  v-if="index == (contentArr.length-1)">
            <div class="control-box" style="padding-top:.4rem; text-align:left;">
              <button @click="prev" class="page-prev button-item" :class="{disabled: introData.chapterSequence <= 1}">Last Chapter</button>
              <button @click="next" class="page-next button-item" :class="{disabled: introData.chapterSequence >= totalNum}"> Next Chapter</button>
              <button @click="catlog" class="page-next button-item">Catalog</button>
            </div>
              <ins class="adsbygoogle"
                style="display:inline-block;width:320px;height:100px;"
                data-ad-client="ca-pub-3545063517335060"
                data-ad-slot="2471126655" ></ins>
          </div>
        </template>
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
var date = new Date()

export default {
  mounted () {
    this.filter.bookId = Number(this.$route.query.bookId)
    this.filter.chapterSequence = Number(this.$route.query.chapterSequence)
    this.bookName = this.$route.query.bookName
    // document.title = this.bookName
    this.totalNum = Number(this.$route.query.totalNum)
    this.$route.meta.title = this.bookName
    let that = this
    this.readers().then(() => {
      let datenew = new Date()
      let datenum = datenew.getTime() - date.getTime()
      this.gaCount('send', '阅读页', '加载完成', datenum / 1000)
      this.chapHistory(this.filter.bookId, this.filter.chapterSequence, this.bookName, this.totalNum, this.introData.chapterName)
      this.$parent.$refs.viewBoxBody.addEventListener('scroll', function (e) {
        if (
          e.target.scrollHeight - that.$parent.$refs.viewBoxBody.clientHeight <=
          that.$parent.$refs.viewBoxBody.scrollTop && that.$route.path === '/read') {
          that.gaCount('send', '阅读页', '完成阅读', that.id)
        }
      })
    })
    this.showCheck = true
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
  data () {
    return {
      check: 1,
      showCheck: false,
      bookName: '',
      defaultNum: 1,
      totalNum: 0,
      tnums: 0,
      filter: {
        chapterSequence: 0,
        bookId: 0
      },
      introData: {},
      contentArr: []
    }
  },
  methods: {
    ...mapActions(['GetBookDetail']),
    readers () {
      return this.GetBookDetail(this.filter).then(res => {
        if (res.status === 200) {
          this.contentArr = []
          this.introData = res.data
          console.log(res.data)
          // 20行高度
          // let lh = document.getElementById('text-height').clientHeight * 21
          // let sh = document.getElementById('text-height').clientHeight
          // 取所有内容
          let content = this.introData.content
          // this.$refs.viewBox.scrollTo(0);
          // 1行39字符
          // let size = document.getElementById('text-height').clientWidth
          // let wh = document.getElementsByTagName('body')[0].clientWidth
          // let wf = wh - size * 4
          // let n = Math.ceil(wf / size)
          // // 总行数
          // // 取 字符数
          // let tnum = n * 20

          // this.tnums = tnum
          // // 总行数

          // let tn = Math.ceil(content.length / tnum)
          // let that = this
          // for (let i = 1; i <= tn; i++) {
          //   if (i === 1) {
          //     that.contentArr.push(content.slice(0, tnum * i))
          //   } else {
          //     that.contentArr.push(content.slice(tnum * (i - 1), tnum * i))
          //   }
          // }
          // for (let j in that.contentArr) {
          //   // 取第当前之后一个
          //   let k = +j + 1
          //   if (k < that.contentArr.length) {
          //     // 如果取到的最后一位是字母
          //     if (
          //       /^[a-z]/i.test(
          //         that.contentArr[j].charAt(that.contentArr[j].length - 1)
          //       )
          //     ) {
          //       that.contentArr[j] =
          //         that.contentArr[j] +
          //         that.contentArr[k].slice(0, that.contentArr[k].indexOf(' '))
          //       that.contentArr[k] = that.contentArr[k].slice(
          //         that.contentArr[k].indexOf(' ')
          //       )
          //     }
          //   }
          // }

          // that.contentArr = that.contentArr.filter(function (e) {
          //   return e.length > 1
          // })
          // for (let j in that.contentArr) {
          //   that.contentArr[j] = that.contentArr[j].split('\n')
          // }
          // 102去掉隔行插广告行
          this.contentArr = content.split('\n')
        } else {
          this.introData.chapterSequence = this.defaultNum
        }
        return res
      })
    },
    catlog () {
      this.gaCount('send', '阅读页', '点击目录', '', this.bookName, this.totalNum)
      // this.chapHistory(this.filter.bookId, '', this.bookName, this.totalNum)
      this.$router.push({ path: `/chapterList?id=${this.filter.bookId}` })
    },
    next () {
      this.defaultNum = this.introData.chapterSequence
      if (this.introData.chapterSequence < this.totalNum) {
        this.filter.chapterSequence += 1
        this.gaCount('send', '阅读页', '点击下一章', '')
        this.readers().then((res) => {
          let datenew = new Date()
          let datenum = datenew.getTime() - date.getTime()
          this.chapHistory(this.filter.bookId, this.filter.chapterSequence, this.bookName, this.totalNum, this.introData.chapterName)
          this.gaCount('send', '阅读页', '加载完成', datenum / 1000)
          if (this.$parent.$refs.viewBoxBody) {
            this.$parent.$refs.viewBoxBody.scrollTop = 0
            this.$parent.$refs.viewBoxBody.scrollTo({top: 0})
          } else {
            this.$parent.$parent.$refs.viewBoxBody.scrollTo({top: 0})
          }
        })
      }
    },
    prev () {
      this.defaultNum = this.introData.chapterSequence
      if (this.introData.chapterSequence > 1) {
        this.filter.chapterSequence -= 1
        this.readers().then(() => {
          let datenew = new Date()
          this.chapHistory(this.filter.bookId, this.filter.chapterSequence, this.bookName, this.totalNum, this.introData.chapterName)
          let datenum = datenew.getTime() - date.getTime()
          this.gaCount('send', '阅读页', '加载完成', datenum / 1000)
          if (this.$parent.$refs.viewBoxBody) {
            this.$parent.$refs.viewBoxBody.scrollTop = 0
            this.$parent.$refs.viewBoxBody.scrollTo({top: 0})
          } else {
            this.$parent.$parent.$refs.viewBoxBody.scrollTo({top: 0})
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;
.reader-box {
  background: #fff;
  box-sizing: border-box;
  padding: 0;
  padding-bottom: .3rem;
  color: #2b2b2b;

  .header-box {
    z-index: 2;
    padding: 0 .3rem;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    & > h2 {
      font-weight: 600;
      padding: .5rem .3rem;
      line-height: .5rem;
      font-size: .5rem;
      color: #2b2b2b;
      &:after {
        content: "";
        margin-top: .6rem;
        display: block;
        height: 1px;
        background: #2b2b2b;
      }
    }
  }
  .control-box {
    padding: 0 0 .3rem 0;
    text-align: center;
    line-height: 1rem;
    .button-item {
      &:first-child {
        margin-left: 0;
      }
      &.disabled {
        color: #999 !important;
      }

      font-size: .5rem;
      margin-left: .5rem;
      color: #1b88ee;
      border: 0;
      background: transparent;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .content-box {
    padding: 0;
  }
  .content-title {
    padding: 0 0.3rem;
    font-size: .48rem;
    line-height: .48rem;
    font-weight: 600;
    margin: 0.3rem 0;
  }
   .content-item {
    padding: 0 .3rem;
    font-size: .4rem;
    line-height: .4rem;
    margin-bottom: .25rem;
    .info-title {
      font-size: .4rem;
    }
  }
  .content-info {
    font-size: .4rem;
    padding: 0 .3rem;
    line-height: .6rem;
    p {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
