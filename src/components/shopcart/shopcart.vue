<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <!--购物车bar-->
      <div class="content" @click="toggleList">
        <div class="content-left" >
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{ totalPrice }}元</div>
          <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <!--动画小球-->
      <div class="ball-container">
        <transition-group name="drop"
                          v-on:before-enter="beforeEnterFunc"
                          v-on:enter="Enter"
                          v-on:after-enter="afterEnterFunc">
          <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" v-bind:key="index">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <!--购物车list-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--半透明遮罩-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../../components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 0,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        // 添加滚动
        if (show) {
          this.$nextTick(() => {
            // 先判断是否已经绑定了滚动事件，防止重复绑定导致不必要的麻烦
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                // 传递点击事件
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      drop (el) {
        // console.log(typeof el);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.minPrice > this.totalPrice) {
          return;
        }
        window.alert('支付' + this.totalPrice);
      },
      beforeEnterFunc (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // 调用浏览器接口，获得元素相对于视窗的位置left和top
            let rect = ball.el.getBoundingClientRect();
            // 22left值，30bottom值
            let x = rect.left - 22;
            let y = -(window.innerHeight - rect.top - 30);
            console.log(x + '~' + y);
            // 让元素显示
            el.style.display = '';
            // ball元素y轴变化
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.Transform = `translate3d(0, ${y}px, 0)`;
            // 内部元素的x轴变化
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.Transform = `translate3d(${x}px,0,0)`;
          }
        };
      },
      Enter (el) {
        // 触发浏览器重新绘制,以下注释是跳过eslint检查
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          // y轴作位置变化
           el.style.webkitTransform = 'translate3d(0,0,0)';
           el.style.transform = 'translate3d(0,0,0)';
          // x轴作位置变化
           let inner = el.getElementsByClassName('inner-hook')[0];
           inner.style.webkitTransform = 'translate3d(0,0,0)';
           inner.style.Transform = 'translate3d(0,0,0)';
           // 实现回调函数，防止动画瞬间完成
//           el.addEventListener('transitionend', done);
        });
      },
      afterEnterFunc (el) {
        // 每次执行完动画都对每个球进行状态重置
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.display = 'none';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    z-index 50
    left 0
    bottom 0
    width 100%
    height 54px
    .content
      font-size 0
      display flex
      background-color #141d27
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 2px
          padding 6px
          background-color #141d27
          width 54px
          height 54px
          box-sizing border-box
          border-radius 50%
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color #2b343c
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 42px
              font-size 24px
              color #80858a
              &.highlight
                color #ffffff
          .num
            position: absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 10px
            font-weight 700
            color #ffffff
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 15px
          line-height 24px
          box-sizing border-box
          padding-right 5px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 14px
          font-weight 700
          &.highlight
            color #ffffff
        .desc
          display inline-block
          vertical-align top
          margin 15px 0 0 5px
          line-height 24px
          font-size 12px
      .content-right
        background-color #2b333b
        flex 0 0 105px
        width 105px
        .pay
          height 54px
          line-height 54px
          text-align center
          font-size 14px
          font-weight 700
          &.not-enough
            background-color #2b333b
          &.enough
            background-color #00b43c
            color #ffffff

    .ball-container
      .ball
        /*display none*/
        position fixed
        left 22px
        bottom 30px
        z-index 200
        transition: all .2s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background-color rgb(0, 160, 220)
          transition: all .2s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active,&.fold-leave-active
        transition all .5s
      &.fold-enter,&.fold-leave-to
        transform translate3d(0, 0, 0)
      .list-header
        background-color #f3f5f7
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        height 40px
        line-height 40px
        padding 0 18px
        .title
          float left
          font-size 14px
          font-weight 700
          color rbg(7, 17, 27)
        .empty
          float right
          font-size 12px
          font-weight 400
          color rgb(0, 160, 220)
      .list-content
        background-color #ffffff
        max-height 217px
        overflow hidden
        padding 0 18px
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
          .price
            position: absolute
            right 90px
            bottom 12px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            line-height 24px
          .cartcontrol-wrapper
            position: absolute
            right 0
            bottom 6px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    opacity 1
    background-color rgba(7, 17, 27, 0.6)
    /*backdrop-filter: blur(10px)*/
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
