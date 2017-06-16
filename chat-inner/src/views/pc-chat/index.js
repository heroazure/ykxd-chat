/**
 * Created by xuwei on 2017/4/20.
 */
import 'assets/css/index.less'
import './style.less'
import Vue from 'vue'
import Pane from './Pane.vue'
Vue.component(Pane.name,Pane)
new Vue({
    el:'#app',
    data:{
        kk:''
    },
    methods:{
        onClose(){
            //发送消息到父窗口
            window.parent.postMessage('close','*')
        }
    }
})