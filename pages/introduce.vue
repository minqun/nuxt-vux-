/* 小说介绍页 */ 
<template>

  <div class="introduce-box">
    <div class="introduce-content">
      <!-- 介绍标题 -->
      <h2>{{introData.bookNameEn}}</h2>
      <!-- 广告位 -->
      <div v-if="showCheck" class="ads-box" style="margin-top: 0px;">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="8486525264"
        data-ad-format="auto" v-if="id == 101"></ins>
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="7210463421" v-if="id == 102"></ins>
      </div>
      <!-- 小说信息 -->
      <div class="content-box">
        <div class="content-item">
          <strong>Author:</strong> {{introData.author}}  
        </div>
        <div class="content-item">
          <strong>Translator:</strong> {{introData.translator}}  
        </div>
        <div class="content-item">
          <strong >Synopsis</strong>
        </div>
        <div class="content-info">
          {{introData.description}}
        </div>
      </div>

      <!-- 广告位 -->
      <div v-if="showCheck" class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="7165704733" v-if="id == 101"></ins>
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="9018369112" v-if="id == 102"></ins>
      </div>
      <chapters 
      :bookId="id" 
      :pageBean="pageBean" 
      :bookname="introData.bookNameEn" 
      :charList="introData.dir?introData.dir.chapterList:[]" 
      @changeList = 'clist'>
      </chapters>

      <!-- 广告位 -->

      <div v-if="showCheck" class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="3667999775" v-if="id == 101"></ins>
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="1474210573" v-if="id == 102"></ins>
      </div>

    </div>
  </div>

</template>

<script>
import chapters from '../components/chapters.vue'
import { mapActions } from 'vuex'
var date = new Date()
export default {
  components: {
    chapters
  },
  mounted () {
    this.search().then(() => {
      let datenew = new Date()
      let datenum = datenew.getTime() - date.getTime()
      if (this.id === 102) {
        this.gaCount('a.send', '介绍页', '加载完成', datenum / 1000)
      } else if (this.id === 101) {
        this.gaCount('b.send', '介绍页', '加载完成', datenum / 1000)
      }

      // if (this.introData.bookName) {
      //   document.title = this.introData.bookNameEn
      // }
    })
    this.showCheck = true
    this.$nextTick(function () {
      let queNum = document.querySelectorAll('.adsbygoogle').length
      for (var i = 0; i < queNum; i++) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    })
  },
  data () {
    return {
      // id: this.$route.params.id.toString().replace(/[^0-9]/gi, ""),
      id: 101,
      insClient: {
        width: 0,
        height: 0
      },
      showCheck: false,
      // 滚动状态
      status: true,
      firstLoad: true,
      /* 数据 */
      pageBean: {},
      introData: {
        bookName: '',
        author: '',
        translator: '',
        chapterList: []
      }
    }
  },
  methods: {
    ...mapActions(['GetBookInfo']),
    search () {
      let id = this.id
      return this.GetBookInfo({ bookId: +id }).then(res => {
        if (res.status === 200) {
          this.introData = res.data
          this.pageBean = this.introData.dir ? this.introData.dir.pageBean : {}
        }
        return res
      })
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
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;

.introduce-box {
  background: #fff;
  height: 100%;
  box-sizing: border-box;

  color: @font-color;
  .introduce-content {
    padding: 0 1rem;
    & > h2 {
      font-weight: 600;
      padding: 1.5rem 0;
      font-size: 1.3rem;
      color: @font-color;
      &:after {
        content: "";
        margin-top: 1.5rem;
        display: block;
        height: 1px;
        background: #2b2b2b;
      }
    }
  }

  .ads-box {
    margin: 1rem 0;
  }
  .adsbygoogle {
  }
  .content-item {
    font-size: 1.2rem;
    line-height: 1.8rem;
    .info-title {
      font-size: 1.3rem;
    }
  }
  .content-info {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
}
</style>
