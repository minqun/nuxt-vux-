<template>
  <div class="chapterlist-box" v-if="loadFinsh">
    <div class="introduce-content">
      <!-- 介绍标题 -->
      <h2>{{introData.bookNameEn}}</h2>
      <!-- 广告位 -->
      <div class="ads-box" style="margin-top: 0px;">
        <ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:100px"
     data-ad-client="ca-pub-3545063517335060"
     data-ad-slot="5239979975"></ins>
      </div>

      <chapters 
      :bookId="id" 
      :pageBean="pageBean" 
      :bookname="introData.bookNameEn" 
      :charList="introData.dir?introData.dir.chapterList:[]" 
      @changeList = 'clist'>
      </chapters>
      <!-- 广告位 -->
      <div class="ads-box no-marginbottom">
        <ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:100px"
     data-ad-client="ca-pub-3545063517335060"
     data-ad-slot="1807167275"></ins>
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
    this.id = Number(this.$route.query.id)
    this.search().then(() => {
      let datenew = new Date()
      let datenum = datenew.getTime() - date.getTime()
      this.gaCount('send', '目录页', '加载完成', datenum / 1000)
      console.log(this.id)
      this.chapHistory(this.id, '', this.introData.bookNameEn, this.pageBean.totalNum)
      if (this.introData.bookName) {
        // document.title = this.introData.bookNameEn
        this.$route.meta.title = this.introData.bookNameEn
      }
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
      id: 0,
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
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;
.chapterlist-box {
  background: #fff;
  padding-bottom: .3rem;
  box-sizing: border-box;

  color: @font-color;
  .introduce-content {
    padding: 0 .3rem;
    & > h2 {
      font-weight: 600;
      padding: .5rem 0;
      line-height: .42rem;
      font-size: .42rem;
      color: @font-color;
      &:after {
        content: "";
        margin-top: .5rem;
        display: block;
        height: 1px;
        background: #2b2b2b;
      }
    }
  }
}
</style>
