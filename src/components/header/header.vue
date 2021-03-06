<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{ seller.supports[index].description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      showDetail () {
        this.detailShow = !this.detailShow;
      },
      hideDetail () {
        this.detailShow = false;
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    color #ffffff
    overflow hidden
    background-color rgba(7, 17, 27, 0.5)
  .content-wrapper
    position relative
    padding 24px 12px 18px 24px
    font-size 0
    .avatar
      display: inline-block
      vertical-align top
      img
        border-radius 2px
    .content
      display inline-block
      margin-left 16px
      .title
        margin 2px 0 8px 0
        line-height 16px
        .brand
          display inline-block
          width 30px
          height 18px
          vertical-align middle
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          vertical-align middle
          display inline-block
          font-size 16px
          line-height 18px
          font-weight bold
          margin-left 6px
      .description
        margin-bottom 10px
        line-height 12px
        font-size 12px
      .support
        .icon
          display inline-block
          background-size 12px 12px
          background-repeat no-repeat
          width 12px
          height 12px
          margin-right 4px
          vertical-align top
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          line-height 12px
          font-size 10px
    .support-count
      position absolute
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background-color rgba(0, 0, 0, 0.2)
      text-align center
      right 12px
      bottom 16px
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        margin-left 2px
        line-height 24px
        font-size 10px

  .bulletin-wrapper
    position relative
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    -ms-text-overflow: ellipsis
    text-overflow: ellipsis
    height 28px
    line-height 28px
    background-color rgba(7, 17, 27 0.2)
    .bulletin-title
      vertical-align: top
      margin-top 8px
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      display inline-block
    .bulletin-text
      vertical-align top
      font-size 10px
      margin 0 4px
      font-weight 200
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      top 8px
      right 10px

  .background
    position absolute
    top: 0
    left 0
    width 100%
    z-index -1
    filter blur(10px)

  .fade-enter-active, .fade-leave-active
   transition: opacity .5s
  .fade-enter, .fade-leave-to /* .fade-leave-active 在 <2.1.8 中 */
    opacity: 0
  .detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    background-color rgba(7, 17, 27, 0.8)
    z-index 100
    backdrop-filter blur(10px) /*背景模糊效果,iPhone手机特有的效果*/
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          text-align center
          font-size 18px
          font-weight 700
          line-height 16px
      .star-wrapper
        margin-top 16px
        margin-bottom 28px
        text-align center
      .title
        display: flex
        width 80%
        margin 30px auto
        .line
          flex 1
          position relative
          top -6px
          border-bottom 1px solid rgba(255,255,255,0.2)
        .text
          font-weight bold
          padding 0 12px
          font-size 14px

      .supports
        margin 0 auto
        width 80%
        .support-item
          padding 0 12px
          margin-bottom 12px
          font-size 0
          &.last-child
            margin-bottom 0
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')
          .text
            line-height 12px
            font-size 12px

      .bulletin
        width 80%
        margin 0 auto
        line-height 24px

    .detail-close
      position relative
      height 32px
      width 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px

</style>
