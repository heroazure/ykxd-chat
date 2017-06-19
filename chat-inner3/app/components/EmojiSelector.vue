<template>
  <div class="emoji-holder" v-show="show">
    <i class="emoji-control emoji-smile" @click="chooseEmoji('smile')"></i>
    <i class="emoji-control emoji-laughing" @click="chooseEmoji('laughing')"></i>
  </div>
</template>
<style lang="less" scoped>

  .emoji-holder {
    position: absolute;
    bottom: 121px;
    left: 0;
    right: 0;
    z-index: 2;
    width: 100%;
    height: 120px;
    background-color: rgba(255, 255, 255, .96);
    border-top: 1px solid #ddd;
    .emoji-control {
      background-image: url(//static.meiqia.com/dist/images/emoji.png?v=2oynzutx8t1emi);
      background-size: 25px auto;
      background-repeat: no-repeat;
      display: block;
      float: left;
      width: 25px;
      height: 25px;
      margin: 10px 0 0 10px;
      cursor: pointer;
    }
    .emoji-smile {
      background-position: 0 0;
    }
    .emoji-laughing {
      background-position: 0 -25px;
    }
  }

</style>
<script>
  import emojiMap from './emoji'
  export default{
    data(){
      return {
        show: false,
      }
    },
    props: {
      value: {
        type: Boolean,
        default:false
      }
    },
    watch:{
      value(val){
        this.show = val
      },
      show(){
          console.log('这里通知父组件实现双向通行')
      }

    },
    methods: {
      chooseEmoji(key){
        let val = emojiMap[key]
        this.$emit('selected',val)
        this.show = false

      }
    },
    components: {}
  }
</script>
