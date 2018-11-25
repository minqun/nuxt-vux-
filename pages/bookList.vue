<template>
  <div class="books-box" v-if="loadFinsh">

    <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="3213238971"></ins>
      </div>
      <!-- 广告位 -->
     <NovelItem :tMore="false" total="label" :tTitle="titles" :novelList="novelList"></NovelItem>
     <div class="control-box">
        <button @click="prev" class="page-prev button-item">
        <img v-show="filter.page > 1" src="../assets/icon_01.png" alt="icon_01.png">
        <img v-show="filter.page <= 1" src="../assets/icon_03.png" alt="icon_03.png">
        </button>
        <span class="page-text">{{filter.page}}</span>
        <button @click="next" class="page-next button-item">
        <img v-show="filter.page >= pageBean.totalPage" src="../assets/icon_02.png" alt="icon_02.png">
        <img v-show="filter.page < pageBean.totalPage" src="../assets/icon_04.png" alt="icon_04.png">
        </button>
      </div>
     <div class="page"></div>
      <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="7873882178"></ins>
      </div>
      <!-- 广告位 -->
     
  </div>

</template>

<script>
import NovelItem from '@/components/NovelItem.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    NovelItem
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
  mounted () {
    if (!this.$route.query.type) {
      this.checkMORE = true
    }
    console.log(this.checkMORE)
    this.filter.categoryId = Number(this.$route.query.type)
    let titles = ''
    switch (this.filter.categoryId) {
      case 280406:
        titles = 'Adventure'
        break
      case 280415:
        titles = 'Romace'
        break
      case 280408:
        titles = 'Fantasy'
        break
      case 280419:
        titles = 'Young Adults'
        break
      case 280416:
        titles = 'Science'
        break
      case 280414:
        titles = 'Mystery'
        break
      case 280412:
        titles = 'Horror'
        break
      case 280417:
        titles = 'Thriller'
        break
      case 280413:
        titles = 'Houorous'
        break
      case 280407:
        titles = 'Christian'
        break
      case 280411:
        titles = 'Historical'
        break
      case 280418:
        titles = 'Western'
        break
      default:
        titles = 'All Novels'
        break
    }
    this.titles = titles
    this.$route.meta.title = titles
    var date = new Date()
    this.search().then((res) => {
      let datenew = new Date()
      let datenum = datenew.getTime() - date.getTime()
      this.gaCount('send', '小说分类页', '加载完成', datenum / 1000)
    })
    this.loadFinsh = true
  },
  data () {
    return {
      loadFinsh: false,
      // 是否为热门MORE
      titles: '',
      checkMORE: false,
      filter: {
        pageSize: 5,
        page: 1,
        categoryId: 0
      },
      pageBean: {
        currentPage: 1,
        pageSize: 5,
        page: 0,
        totalNum: 0,
        totalPage: 0
      },
      novelList: []
    }
  },
  methods: {
    // 分类跳转
    navRouter () {
    },
    prev () {
      if (this.filter.page > 1) {
        this.gaCount('send', '小说分类页', '点击上一页', '')
        this.filter.page -= 1
        this.$parent.$parent.$refs.viewBoxMain.scrollTo({top: 0})
        this.search()
      }
    },
    next () {
      if (this.filter.page < this.pageBean.totalPage) {
        this.gaCount('send', '小说分类页', '点击下一页', '')
        this.filter.page += 1
        this.$parent.$parent.$refs.viewBoxMain.scrollTo({top: 0})
        this.search()
      }
    },
    ...mapActions(['GetTypeBookList', 'GetHotList']),
    search () {
      let defaultPage = this.filter.page
      if (this.checkMORE) {
        return this.GetHotList(this.filter).then(res => {
          if (res.status === 200) {
            this.novelList = res.data.hotBooks
            this.pageBean = res.data.pageBean
            return res
          } else {
            this.filter.page = defaultPage
          }
          return []
        })
      } else {
        return this.GetTypeBookList(this.filter).then(res => {
          if (res.status === 200) {
            this.novelList = res.data.bookList
            this.pageBean = res.data.pageBean
            return res
          } else {
            this.filter.page = defaultPage
          }
          return []
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;
.books-box{
  background-color: #ebebeb;
  box-sizing: border-box;
  .mainDex-content {
    background:#fff;
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
        color: @base-color;
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
      .nav-icon {
        position: relative;
        top: .2rem;
        width: .75rem;
        height: .75rem;
      }
      .nav-text {
        color:#fff;
        font-size: .46rem;
        font-weight: 600;
      }
    }
  }
  .control-box {
    text-align: center;
    line-height: 1;
    padding: .68rem 0 0 0;
    .page-text {
      position: relative;
      top: -0.1rem;
      color: #9e9e9e;
      font-size: .45rem;
      margin: 0 1.1rem;
    }
  }
  .button-item {

    border: 0;
    background: transparent;
    & > img {
      height: .64rem;
      width: .64rem;
    }
  }
 
  
}
</style>
