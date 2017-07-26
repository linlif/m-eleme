<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--<div class="tab-item">-->
      <!--<a v-link :to="{path:'/goods'}">商品</a>-->
      <!--</div>-->
      <!--<div class="tab-item">-->
      <!--<a v-link to="{path:'/ratings'}">评论</a>-->
      <!--</div>-->
      <!--<div class="tab-item">-->
      <!--<a v-link :to="{path:'/seller'}">商家</a>-->
      <!--</div>-->
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评价</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/util.js';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {
          // 创建自动执行函数，动态添加商家ID
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      vHeader: header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))

  .tab-item
    flex: 1
    text-align: center
    display block
    color rgb(77, 85, 93)
    font-size 14px

  .active
    color: rgb(240, 20, 20)


</style>
