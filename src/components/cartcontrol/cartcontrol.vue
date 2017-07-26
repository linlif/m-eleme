<template>
  <div class="cartcontrol" >
    <transition name="fade">
      <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
          <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      addCart (event) {
        // 防止PC端点击一次响应两次
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // 调用vue的set方法，注册一个变量
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count++;
        }
        // 组件间传递事件
        this.$emit('addCart', event.target);
        // console.log(event.target);
      },
      decreaseCart (event) {
        // 防止PC端点击一次响应两次
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
    .cart-count
      display inline-block
      font-size 10px
      line-height 24px
      width 12px
      vertical-align top
      padding-top 6px
      color rgb(147,153,159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
    .fade-enter-active, .fade-leave-active
      transition all .5s
      transform translate3d(0,0,0)
      .inner
        transition all .5s
        transform rotate(0)
    .fade-enter, .fade-leave-to /* .fade-leave-active 在 <2.1.8 中 */
      opacity: 0
      transform translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
</style>
