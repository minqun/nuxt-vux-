<template>
<div> 
  <button @click="$store.commit('increment')">{{num}}</button>
  <section >
      <card :header="{title: ('My wallet')}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          {{ ('Point') }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          {{ ('Coupon') }}
        </div>
        <div class="vux-1px-r">
        
          <br/>
          {{ ('Gift card') }}
        </div>
        <div>
          <span>88</span>
          <br/>
          {{ ('Cash') }}
        </div>
      </div>
    </card>
  </section>
</div>
</template>

<script>
import { Card } from "vux";
// import axios from "axios";
export default {
  async asyncData(context) {
    // called every time before loading the component\

    // let data = await axios.get(`https://m.novelcamp.net/book/chapter`, {
    //   chapterSequence: 1,
    //   bookId: 11279
    // });
    console.log(context.store);
    // context.store.commit("increment", data.data.data.chapterSequence);

    return { num: context.store.state.counter };
  },
  components: {
    Card
  },
  methods: {}
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
@font-color: #2b2b2b;
@base-color: #1b88ee;

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>
