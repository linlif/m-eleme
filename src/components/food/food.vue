<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="foodImage">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="food-detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span
                  class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="buy">
            <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info">
          <h1 class="title" v-show="food.info">商品信息</h1>
          <p class="text" v-show="food.info">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect v-show="food.ratings && food.ratings.length" v-on:selectType-change="onSelectTypeChange" v-on:onlyContent-change="onOnlyContentChange" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" alt="" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | fomatDate}}</div>
                <p class="text">
                  <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                  <span>{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol';
  import Vue from 'vue';
  import split from '../../components/split/split';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import {fomatDate} from '../../common/js/date';

//  const POSITIVE = 0;
//  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    filters: {
      fomatDate (time) {
        let date = new Date(time);
        return fomatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    methods: {
      show () {
        // 初始化数据
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst () {
        if (!event._constructed) {
          return;
        }
        // 使用Vue设置count的值为1
        Vue.set(this.food, 'count', 1);
      },
      // 父组件调用子组件的方法，将组件内的数据变更，同步到组件外的数据状态中
      onSelectTypeChange (val) {
        this.selectType = val;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      // 父组件调用子组件的方法，将组件内的数据变更，同步到组件外的数据状态中
      onOnlyContentChange (val) {
        this.onlyContent = val;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .move-enter-active, .move-leave-active
    transition all .2s linear
  .move-enter, .move-leave-to
    transform translate3d(-100%, 0, 0)

  .food
    position fixed
    left 0
    top 0
    bottom 54px
    z-index 30
    background-color #ffffff
    width 100%
    .image-header
      position relative
      height 0
      width 100%
      /* 设置padding-top为100%时，根据width来计算高度的，此时将产生一个宽度为width的正方形 */
      padding-top 100%
      img
        position absolute
        left 0
        top 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          color #ffffff
          font-size 20px
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        color rgb(7, 17, 27)
        font-size 14px
        font-weight 700
      .food-detail
        height 10px
        margin-bottom 18px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size: 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          line-height 24px
          color rgb(147, 153, 159)
          text-decoration line-through
          font-size 10px
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        line-height 24px
        padding 0 12px
        border-radius 12px
        color #ffffff
        background-color rgb(0, 160, 220)
        box-sizing border-box
        font-size 10px
        font-weight 700
        &.buy-enter-active, &.buy-leave-active
          transition all .4s
        &.buy-enter, &.buy-leave-to
          opacity 0
    .info
      padding 18px
      .title
        margin-bottom 6px
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77,85,93)

    .rating
      padding-top 18px
      .title
        margin-left 18px
        margin-bottom 6px
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              vertical-align top
              margin-right 6px
              font-size 10px
              color rgb(147,153,159)
            .avatar
              border-radius 50%

          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147,153,159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right 4px
              line-height 16px
              font-size 12px
            .icon-thumb_up
              color rgb(0,160,220)
            .icon-thumb_down
              color rgb(147,153,159)



        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147,153,159)
</style>
