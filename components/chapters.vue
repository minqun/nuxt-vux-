<template>
  <div class="page-charList">
    <h3>Chapter</h3>
    <div class="route-box">
    <div class="chap-item" 
    v-for="(item, index) in charList" 
    :key="index" 
    @click="linkTo(bookId, item.chapterSequence, pageBean.totalNum,bookname ,item.chapterName)">
    {{item.chapterName}}</div>
   </div>
   <div class="nochapter" v-if="charList.length < 1"> No chapter </div>
   <div class="control-box">
     <button @click="prev" class="page-prev button-item">
     <img v-show="pageBean.currentPage > 1" src="../assets/icon_01.png" alt="icon_01.png">
     <img v-show="pageBean.currentPage <= 1" src="../assets/icon_03.png" alt="icon_03.png">
     </button>
     <button @click="next" class="page-next button-item">
     <img v-show="pageBean.currentPage >= pageBean.totalPage" src="../assets/icon_02.png" alt="icon_02.png">
     <img v-show="pageBean.currentPage < pageBean.totalPage" src="../assets/icon_04.png" alt="icon_04.png">
     </button>
   </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    charList: {
      type: Array,
      default: []
    },
    bookname: {
      type: String,
      default: ''
    },
    bookId: {
      type: Number,
      default: 0
    },
    pageBean: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      filter: {
        pageSize: 10,
        page: 1,
        bookId: 0
      },
      list: []
    }
  },
  mounted () {
  },
  methods: {
    prev () {
      if (this.pageBean.currentPage > 1) {
        this.filter.page -= 1
        this.search()
        if (this.$parent.$parent.$refs.viewBoxBody) {
          this.$parent.$parent.$refs.viewBoxBody.scrollTop = 0
          this.$parent.$parent.$refs.viewBoxBody.scrollTo({top: 0})
        } else {
          this.$parent.$parent.$refs.viewBoxBody.scrollTo({top: 0})
        }
      }
    },
    next () {
      if (this.pageBean.currentPage < this.pageBean.totalPage) {
        this.filter.page += 1
        this.search()
        if (this.$parent.$parent.$refs.viewBoxBody) {
          this.$parent.$parent.$refs.viewBoxBody.scrollTop = 0
          this.$parent.$parent.$refs.viewBoxBody.scrollTo({top: 0})
        } else {
          this.$parent.$parent.$refs.viewBoxBody.scrollTo({top: 0})
        }
      }
    },
    ...mapActions(['GetBookDir']),
    search () {
      this.filter.bookId = this.bookId
      let defaultPage = this.filter.page
      return this.GetBookDir(this.filter).then(res => {
        if (res.status === 200) {
          this.filter.page = res.data.pageBean.currentPage
          this.list = res.data.chapterList
          this.$emit('changeList', this.list, res.data.pageBean)
        } else {
          this.filter.page = defaultPage
        }
        return res
      })
    },
    linkTo (bookId, chapterSequence, totalNum, name, chapName) {
      this.gaCount('send', '目录页', '章节点击', chapterSequence)
      this.chapHistory(this.bookId, chapterSequence, name, totalNum)
      this.$router.push({ path: `/read?bookId=${this.bookId}&chapterSequence=${chapterSequence}&totalNum=${totalNum}&bookName=${name}` })
    }
  }
}
</script>

<style lang="less" scoped>
.page-charList {
  h3 {
    font-size: .5rem;
    font-weight: 600;
    margin: 0;
  }
  .nochapter {
    font-size: .4rem;
    padding: .5rem 0;
    color: #7e7e7e;
    text-align: center;
  }
  .chap-item {
    font-size: .4rem;
    color: #00b6ff;
    display: block;
    padding-bottom: .3rem;
    padding-top: .3rem;
    border-bottom: 1px dashed #2b2b2b;
    &:hover {
      background: #eee;
    }
  }
  .control-box {
    line-height: 1;
    text-align: center;
    padding: .4rem 0;
  }
  .button-item {
    display: inline-block;
    &.page-prev {
      margin-right: 1.5rem;
    }

    border: 0;
    background: transparent;
    & > img {
      height: .7rem;
      width: .7rem;
    }
  }
}
</style>
