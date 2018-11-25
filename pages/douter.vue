/* 小说介绍页 */ 
<template>
  <div class="introduce-box">
    <div class="introduce-content" v-if="loadFinsh">
      <h2> {{introData.bookNameEn}} </h2>
      <!--广告位 -->
      <div class="ads-box" style="margin-top: 0px;">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="2398194217"></ins>
      </div>
      <div class="content-box">
        <div class="content-item" v-if="introData.author">
        <strong>Author:</strong><span> {{introData.author}}  </span>
        </div>
        <div class="content-item" v-if="introData.translator">
          <strong>Translator:</strong> <span>{{introData.translator}}</span>
        </div>
        
        <div class="content-item">
          <strong>Synopsis</strong>
        </div>
        <div class="content-info" v-html="introData.description"></div>
      </div>
      <div class="ads-box">
          <ins class="adsbygoogle"
          style="display:inline-block;width:320px;height:100px"
          data-ad-client="ca-pub-3545063517335060"
          data-ad-slot="7403108886"></ins>
      </div>
      <div class="content-title">
        {{intros.chapterName}}
      </div>
      <!-- 第一章内容-->
      <article class="content-info">
      <template v-for="(item, index) in contentArr" v-key="index"> 
      <p  v-html="item" class="doc-p"></p>
      </template>
      </article>
      <!-- 广告位 -->
      <div class="ads-box">
        <div class="control-doc-box">
          <button @click="next" class="page-next button-item" :class="{disabled: introData.chapterSequence >= pageBean.totalNum}"> Next Chapter</button>
          <button @click="catlog" class="page-next button-item">Catalog</button>
        </div>
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="3229550845"></ins>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // mounted () {
  //   this.loadFinsh = true
  //   this.id = Number(this.$route.query.bookId)
  //   this.filter.bookId = Number(this.$route.query.bookId)
  //   this.search()
  //   // this.$nextTick(function () {
  //   //   let queNum = document.querySelectorAll('.adsbygoogle').length
  //   //   for (var i = 0; i < queNum; i++) {
  //   //     (window.adsbygoogle = window.adsbygoogle || []).push({})
  //   //   }
  //   // })
  //   let that = this
  //   this.$parent.$refs.viewBoxBody.addEventListener('scroll', function (e) {
  //     if (
  //       e.target.scrollHeight - that.$parent.$refs.viewBoxBody.clientHeight <=
  //       that.$parent.$refs.viewBoxBody.scrollTop && that.$route.path === '/introduce'
  //     ) {
  //       // console.log('完成阅读')
  //       that.gaCount('send', '介绍页', '完成阅读', '')
  //     }
  //   })
  // },
  // updated () {
  //   this.$nextTick(function () {
  //     try {
  //       let queNum = document.querySelectorAll('.adsbygoogle').length
  //       for (var i = 0; i < queNum; i++) {
  //         (window.adsbygoogle = window.adsbygoogle || []).push({})
  //       }
  //     } catch (e) {}
  //   })
  // },
  data () {
    return {
      loadFinsh: false,
      id: 0,
      filter: {
        chapterSequence: 1,
        bookId: 0
      },
      intros: {},
      /* 数据 */
      pageBean: {},
      contentArr: [],
      introData: {
        bookName: '',
        author: '',
        translator: '',
        chapterList: []
      }
    }
  },
  methods: {
    ...mapActions(['GetBookInfo', 'GetBookDetail']),
    search () {
      let id = this.id
      let date = new Date()
      return this.GetBookInfo({ bookId: +id }).then(res => {
        if (res.status === 200) {
          this.introData = res.data
          this.pageBean = this.introData.dir ? this.introData.dir.pageBean : {}
          this.$route.meta.title = this.introData.bookNameEn
          let datenew = new Date()
          let datenum = datenew.getTime() - date.getTime()
          this.gaCount('send', '介绍页', '加载完成', datenum / 1000)
          this.readers()
        }
        return res
      })
    },
    readers () {
      return this.GetBookDetail(this.filter).then(res => {
        if (res.status === 200) {
          this.contentArr = []
          this.intros = res.data
          let content = this.intros.content
          this.contentArr = content.split('\n')
          this.chapHistory(this.filter.bookId, 1, this.introData.bookNameEn, this.pageBean.totalNum, this.intros.chapterName)
        } else {
          this.intros.chapterSequence = this.defaultNum
        }
        return res
      })
    },
    next () {
      this.defaultNum = this.intros.chapterSequence
      if (this.intros.chapterSequence < this.pageBean.totalNum) {
        this.gaCount('send', '介绍页', '点击下一章', '')
        // let rote =
        //   '/102/charpter/2/' +
        //   this.introData.bookNameEn +
        //   '/' +
        //   this.pageBean.totalNum
        // this.$router.push({ path: rote })
        // this.chapHistory(this.filter.bookId, 1, this.introData.bookNameEn, this.pageBean.totalNum, this.intros.chapterName)
        this.$router.push({ path: `/read?bookId=${this.id}&chapterSequence=2&totalNum=${this.pageBean.totalNum}&bookName=${this.introData.bookNameEn}` })
        // this.filter.chapterSequence += 1;
        // this.readers();
      }
    },
    catlog () {
      this.gaCount('send', '介绍页', '点击目录', '')
      // this.chapHistory(this.filter.bookId, '', this.introData.bookNameEn, this.pageBean.totalNum)
      this.$router.push({ path: `/chapterList?id=${this.id}` })
    },
    /* 改变章节列表 */

    clist (e, d) {
      this.introData.dir.chapterList = e
      this.pageBean = d
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/styles/theme.less";

.introduce-box {
  background: #fff;
  box-sizing: border-box;
  .content-title {
    padding: 0 0.3rem;
    font-size: .48rem;
    line-height: .48rem;
    font-weight: 600;
    margin: 0.3rem 0;
  }
  .control-doc-box {
    padding: 0 0 .3rem 0;
    text-align: center;
    .button-item {
      &:first-child {
        margin-left: -1rem;
      }
      &.disabled {
        color: #999 !important;
      }

      font-size: .5rem;
      margin-right: 1.5rem;
      color: #1b88ee;
      border: 0;
      background: transparent;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  color: @font-color;
  .introduce-content {
    padding: 0;
    & > h2 {
      font-weight: 600;
      padding: .5rem .3rem;
      line-height: .5rem;
      font-size: .5rem;
      color: @font-color;
      &:after {
        content: "";
        margin-top: .6rem;
        display: block;
        height: 1px;
        background: #2b2b2b;
      }
    }
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
