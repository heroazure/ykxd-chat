/**
 * Created by xuwei on 2017/4/20.
 */
import 'assets/css/index.less'
import './style.less'
import Vue from 'vue'
new Vue({
    el:'#app',
    methods:{
        onClose(){
            //发送消息到父窗口
            window.parent.postMessage('close','*')
        }
    }
})