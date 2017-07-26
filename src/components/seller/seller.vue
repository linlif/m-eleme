<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favoriate" @click="toggleFavoriate($event)">
            <span class="icon-favorite" :class="{'active':favoriate}"></span>
            <span class="text">{{favoriateText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper border-1px">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item border-1px" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" width="120px" height="90px" alt="">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
            <li class="info-item" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star';
  import split from '../../components/split/split';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFormLocal} from './../../common/js/store';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favoriate: (() => {
          return loadFormLocal(this.seller.id, 'favoriate', false);
        })()
      };
    },
    computed: {
      favoriateText () {
        return this.favoriate ? '已收藏' : '收藏';
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted () {
      this._initScroll();
      this._initPics();
    },
    watch: {
      'seller' () { // 坑爹，忘记加$nextTick()导致无法滚动...
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    methods: {
      toggleFavoriate (event) {
        // 使用better-scroll 默认的click事件无效，先使用better-scroll的click事件（此时PC将产生两个click事件，所以点击收藏商家状态不会改变）
//        if (event._constructed) {
//          return;
//        }
        console.log(event);
        this.favoriate = !this.favoriate;
        saveToLocal(this.seller.id, 'favoriate', this.favoriate);
      },
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics () {
        if (this.seller.pics) {
          let picList = this.$refs.picList;
          let picWidth = 120;
          let margin = 6;
          let picNum = this.$refs.picList.getElementsByClassName('pic-item').length;
          // 设置picList的宽度
          picList.style.width = (picWidth + margin) * picNum - margin + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      position relative
      padding 18px
      .title
        margin-bottom 8px
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .desc
        padding-bottom 18px
        line-height 18px
        border-1px(rgba(7,17,27,0.1))
        font-size 0
        .star
          display inline-block
          vertical-align top
        .text
          display inline-block
          vertical-align top
          margin-right 8px
          font-size 10px
          line-height 18px
          color rgb(77,85,93)

      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right none
          h2
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
            margin-bottom 18px
          .content
            line-height 10px
            font-size 10px
            color rgb(7,17,27)
            .stress
              font-weight 200
              color rgb(7,17,27)
              font-size 24px
              line-height 24px

      .favoriate
        position absolute
        width 40px
        top 18px
        right 18px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          &.active
            color rgb(240,20,20)
        .text
          font-size 10px
          line-height 10px
          color rgb(77,85,93)

    .bulletin
      padding 18px 18px 0 18px
      font-size 14px
      .title
        font-size 14px
        line-height 16px
        color rgb(7,17,27)
      .content-wrapper
        padding 0 12px 16px 0
        border-1px(rgba(7,17,27,0.1))
        .content
          margin-left 12px
          line-height 24px
          font-size 12px
          color rgb(240,20,20)
      .supports
        .support-item
          padding 16px 12px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          font-size 0
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            font-size 12px
            font-weight 200
            line-height 16px
            color rgb(7,17,27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .pic-wrapper
        width 100%
        overflow hidden
        /*不折行*/
        white-space nowrap
        .pic-item
          display inline-block
          margin-right 6px
          width 120px
          height 90px

    .info
      color rgb(7,17,27)
      padding 18px 18px 0 18px
      .title
        padding-bottom 12px
        font-size 14px
        line-height 14px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        font-weight 200
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
</style>
