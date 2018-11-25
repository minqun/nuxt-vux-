<template>
  <div class="history-box" v-if="loadFinsh">
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="5790644317"></ins>
      </div>
      <!-- 广告位 -->
      <!-- 历史列表 -->
      <div class="history-main-box">
        <div class="list-title">Reading Record</div>
        <historyItem @update="updateList" :hisData="historyData"></historyItem>
      </div> 
      <!-- 广告位 -->
      <div class="ads-box">
        <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:100px;"
        data-ad-client="ca-pub-3545063517335060"
        data-ad-slot="3523573623"></ins>
      </div>
      <!-- 广告位 -->   
      
  </div>

</template>

<script>
import historyItem from '@/components/historyItem.vue'
export default {
  components: {
    historyItem
  },
  mounted () {
    var date = new Date()
    this.historyData = this.getLocal('historyData') ? this.getLocal('historyData') : []
    let datenew = new Date()
    let datenum = datenew.getTime() - date.getTime()
    this.gaCount('send', '阅读记录页', '加载完成', datenum / 1000)
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
      historyData: [],
      loadFinsh: false
    }
  },
  methods: {
    updateList () {
      this.historyData = this.getLocal('historyData') ? this.getLocal('historyData') : []
    }
  }
}
</script>
<style lang="less" scoped>
@font-color: #2b2b2b;
@base-color: #1b88ee;
.history-box {
  height: 100%;
  box-sizing: border-box;
  color: @font-color;
  .history-main-box {
    .list-title {
      font-size: .5rem;
      padding: 0 .65rem .3rem;
    }
  }
}
</style>
