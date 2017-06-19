<template>
  <div id="app">
    <div class="chatting">
      <!-- 聊天界面头部 -->
      <div class="chatting-header">
        <div class="chatting-title">
          <h2><i class="icon-group"></i>云蝌兄弟</h2>
        </div>
      </div>

      <!-- 聊天内容区域 -->
      <div ref="chattingContent" class="chatting-content">

        <div v-for="item in msgs">
          <div v-if="item.self" class="chatting-item self clearfix">
            <div class="msg-date">
              2018-01-01 12:56:00
            </div>
            <div class="msg-from">
              <span class="loc">[{{item.loc}}]</span>
              <span class="msg-author">我</span>
              <img :src="item.avatarUrl" alt="">
            </div>
            <div class="msg-content" v-html="item.text_filter "></div>
          </div>

          <div v-else class="chatting-item other clearfix">
            <div class="msg-date">
              {{ item.date }}
            </div>
            <div class="msg-from">
              <img :src="item.avatarUrl" alt="">
              <span class="loc">[{{item.loc}}]</span>
              <span class="msg-author">服务器</span>
            </div>
            <div class="msg-content" v-html="item.text_filter "></div>
          </div>

        </div>


      </div>

      <!-- 输入区域 -->
      <div class="chatting-input">

        <textarea @keyup.enter="send" ref="textarea" v-model.trim="inputContent" placeholder="输入聊天内容"></textarea>

      </div>
      <div class="chatting-holder">
        <div class="holder-left" id="uploadImgP">
          <a @click="toggleEmoji">表情</a>
          <a id="uploadImg">图片</a>
        </div>
        <div class="holder-right">
          <button @click="send">发送</button>
        </div>
        <emoji-selector v-model="showEmoji" @selected="onSelected"></emoji-selector>
      </div>

    </div>

  </div>
</template>

<style lang="less" scoped>
  @blue: #2196f3;
  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .chatting {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .chatting-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      width: 100%;
      background-color: @blue;
      color: white;
      /*padding-left: 10px;*/
      /*padding-right: 15px;*/

      .chatting-back {
        width: 32px;
        height: 32px;
        .icon-back {
          background: url('./assets/images/icons/icon-ai.svg') no-repeat;
          background-size: contain;
        }
        .icon-back2 {
          background: url('./assets/images/icons/icon-ai2.svg') no-repeat;
          background-size: contain;
        }
      }

      .chatting-title {
        i.icon-group {
          vertical-align: top;
          width: 30px;
          height: 30px;
          background: url('./assets/images/icons/icon-group.svg') no-repeat;
          background-size: contain;
          margin-right: 3px;
        }
      }

      .chatting-menu {
        width: 30px;
        height: 30px;
        i.icon-menu {
          background: url('./assets/images/icons/icon-index.svg') no-repeat;
          background-size: contain;
        }
      }
    }

    .chatting-content {
      flex: 1;
      width: 100%;
      background-color: rgba(0, 0, 0, .1);
      overflow: auto;
      .chatting-item {
        padding: 10px;
        width: 100%;
        .msg-date {
          text-align: center;
          color: gray;
          font-size: 80%;
        }
        .msg-from {
          display: flex;
          align-items: center;
          span.loc {
            color: gray;
            font-size: 60%;
            margin-right: 5px;
          }
          .msg-author {
            font-size: 1.2rem;
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
          }
        }
        .msg-content {
          margin-top: 5px;
          background-color: white;
          width: 200px;
          padding: 6px 10px;
          border-radius: 10px;
        }
      }

      .chatting-item + .chatting-item {
        margin-top: 10px;
      }
      .self {
        .msg-from {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          img {
            margin-left: 10px;
          }
        }

        .msg-content {
          float: right;
          word-wrap: break-word;
          word-break: break-all;
          margin-right: 10px;
        }

      }

      .other {
        .msg-from {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span.loc {
            color: gray;
            font-size: 60%;
            margin-right: 5px;
          }
          img {
            margin-right: 10px;
          }
        }

        .msg-content {
          float: left;
          margin-left: 10px;
          word-wrap: break-word;
          word-break: break-all;
        }

      }

    }

    .chatting-input {
      position: relative;
      display: flex;
      height: 100px;
      width: 100%;

      textarea {
        flex: 1;
        resize: none;
        padding-left: 3px;
        padding-top: 7px;
        padding-right: 3px;
        height: 100%;
        font-size: 1.4rem;
      }

    }

    .chatting-holder{
      position: relative;
      display: flex;
      justify-content: space-between;
      height: 20px;
      width: 100%;
      button {
        width: 60px;
        height: 100%;
        background-color: @blue;
        color: white;
        font-size: 16px;
      }
    }
  }
</style>
<script>
  import upload from './util/upload'
  import emojiSelector from './components/EmojiSelector.vue'
  import twemoji from 'twemoji'
  export default {
    name: 'app',
    data(){
      return {
        msgs: [],
        inputContent: '',
        websocket: null,
        oContent:null,
        showEmoji:false,
      }
    },
    mounted(){
      var _this = this
      this.oContent = document.querySelector('.chatting-content');
      this.websocket = new WebSocket('ws://127.0.0.1:8001');
      const websocket = this.websocket
      websocket.onopen = function (evt) {

        console.log('onopen', JSON.stringify(evt))
      };
      websocket.onclose = function (evt) {
        console.log('onclose', JSON.stringify(evt))
      };

      websocket.onmessage = (({data}) => {
        this.msgs.push({
          self:false,
          text:data,
          text_filter:twemoji.parse(data)
        })
        setTimeout(()=>{
          this.oContent.scrollTop = this.oContent.scrollHeight;
        },0)
      } )

      websocket.onerror = function (evt) {
        console.log('onerror', JSON.stringify(evt))
      };
      this.oContent.scrollTop = this.oContent.scrollHeight;

      //初始化七牛上传logo组件
      upload('uploadImg', 'uploadImgP',
        function () {
          console.log('callback 1');
        },
        //获得上传进度的回调
        function (persent) {
          console.log('callback 2');
          console.log(persent);
        },
        //获得上传成功后url的回调
        function (source) {
          console.log(source)

        })

    },
    filters:{
      textFilter(text){
        let val = twemoji.parse(text)
        return val
//        let val = twemoji.parse('I \u2764\uFE0F emoji!')
//        return val
      }

    },
    methods: {
      send(){

        if (this.inputContent === '') {
          return;
        } else {
          this.websocket.send(this.inputContent);
          this.msgs.push({
            self: true,
            text: this.inputContent,
            text_filter:twemoji.parse(this.inputContent)
          })
          this.inputContent = '';
          setTimeout(() => this.oContent.scrollTop = this.oContent.scrollHeight, 0);
        };

      },
      toggleEmoji(){
          this.showEmoji = ! this.showEmoji
      },
      onSelected(val){
          console.log(val)
        this.inputContent= this.inputContent + val
      }
    },
    components: {
      emojiSelector
    }
  }
</script>
