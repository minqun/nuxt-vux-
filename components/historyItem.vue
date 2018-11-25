<template>
  <div class="history-item-content">
    <a class="history-item" href="javascript:void(0);" v-for="(item, index) in hisData">
      <div class="item-main">
        <div class="item-title">{{item.bookName}}</div>
        <div class="item-sec">{{item.chapter}}</div>
        <div class="item-time">{{item.time|dateFilter(dtime)}}</div>
      </div>
      <div class="item-cotl">
        <a href="javascript:void(0);" @click="delChange(item.bookId)" class="delItem btn-active ">Delete record</a>
        <a href="javascript:void(0);" @click="goRead(item.bookId, item.chapId,item.totalNum,item.bookName)" class="goRead btn-active ">go on reading</a>
      </div>
    </a>
    <div class="noHistory" v-if="hisData.length < 1">No history</div>
  </div>
</template>

<script>
export default {
  name: 'history-item',
  filters: {
    dateFilter (date, times) {
      let currentTime = Date.parse(times)
      let time = currentTime - Date.parse(date)
      if (time < 0) {
        return 'Less than 1 minute'
      }
      let day = parseInt(time / (1000 * 60 * 60 * 24))
      let hour = parseInt(time / (1000 * 60 * 60))
      let min = parseInt(time / (1000 * 60))
      let month = parseInt(day / 30)
      let year = parseInt(month / 12)
      if (year) return year + 'Year age'
      if (month) return month + 'Months ago'
      if (day) return day + 'Day ago'
      if (hour) return hour + 'H ago'
      if (min) return min + ' Min ago'
      else return 'Less than 1 minute'
    }
  },
  mounted () {
    this.dtime = new Date()
  },
  data () {
    return {
      dtime: new Date()
    }
  },
  props: {
    hisData: {
      default: []
    }
  },
  methods: {
    delChange (id) {
      let arr = this.getLocal('historyData')
      let arrNew = []
      this.gaCount('send', '阅读记录页', '点击删除阅读', '')
      arr.forEach((e) => {
        if (e.bookId !== id) {
          arrNew.push(e)
        }
      })
      this.setLocal('historyData', arrNew)
      this.$emit('update')
    },
    goRead (id, chapterSequence, totalNum, name) {
      this.gaCount('send', '阅读记录页', '点击继续阅读', name)
      if (chapterSequence === 1) {
        this.$router.push({path: `/introduce?bookId=${id}`})
      } else if (chapterSequence > 1) {
        this.$router.push({ path: `/read?bookId=${id}&chapterSequence=${chapterSequence}&totalNum=${totalNum}&bookName=${name}` })
      } else {
        this.$router.push({path: `/chapterList?id=${id}`})
      }
    }
  }
}
</script>

<style lang="less">
@font-color: #2b2b2b;
@base-color: #1b88ee;
.history-item-content {
  margin: 0 .35rem;
  padding: 0 .35rem;
  background: #fff;
  box-shadow: 0px 2px 5px  0px #ccc;
  .noHistory {
    color: #7e7e7e;
    text-align: center;
    font-size: .5rem;
    padding: .3rem 0;
  }
  .history-item {
    display: block;
    padding: .4rem 0 .35rem 0;
    border-bottom: 1px solid #aaa;
    color: #2b2b2b;
  
    &:last-child {
      border:none;
    }

    &:after {
      clear: both;
      display: block;
      content: '';
    }
  }
  .item-main {
    width: 6rem;
    float: left;
    .item-title {
      font-size: .4rem;
      font-weight: 600;
    }
    .item-sec {
      font-size: .38rem;
    }
    .item-time {
      color: #818181;
      font-size: .38rem;
    }
  }
  .item-cotl {
    width: 3.2rem;
    text-align: center;
    float: left;
    box-sizing: border-box;
    padding-left: .2rem;
    .delItem {
      color: #1b88ee;
      display: block;
      font-size: .32rem;
      margin-bottom: .2rem;
    }
    .goRead {
      color:#fff;
      background: #1b88ee;
      border-radius: .05rem;
      display: block;
      padding: .15rem .16rem;
      font-size: .32rem;
    }
  }
}
  
</style>
