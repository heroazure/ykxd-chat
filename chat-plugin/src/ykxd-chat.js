/**
 * Created by xuwei on 2017/6/14.
 */
import './ykxd.less'
let toChatBtn=document.createElement('div')
toChatBtn.setAttribute('id','ykxd-pane-btn')
toChatBtn.innerHTML='点我聊天'
let toChatPane=document.createElement('div')
toChatPane.setAttribute('id','ykxd-pane-chat')
let clientWidth=document.documentElement.getBoundingClientRect().width
let innerText='<iframe id="iframe" src="http://172.16.10.196:9999/chat/mobile" frameborder="0" allowtransparency="no" scrolling="no"></iframe>'
toChatPane.setAttribute('class','mobile')
toChatBtn.setAttribute('class','mobile')
//假设大于640为pc端
if(clientWidth>640){
  innerText='<iframe id="iframe" src="http://172.16.10.196:9999/chat/pc" frameborder="0" allowtransparency="no" scrolling="no"></iframe>'
  toChatPane.setAttribute('class','pc')
  toChatBtn.setAttribute('class','pc')
}
toChatPane.innerHTML=innerText
document.body.appendChild(toChatBtn)
document.body.appendChild(toChatPane)
let iframe=document.getElementById('iframe')

let togglePane=function () {
  toChatPane.style.display=getComputedStyle(toChatPane).display==='block'?'none':'block'
  toChatBtn.style.display=getComputedStyle(toChatBtn).display==='block'?'none':'block'
}
//点击和我聊天
function clickToChatBtn() {
  toChatBtn.addEventListener('click',function () {
    togglePane()
  },false)
}
clickToChatBtn()

let companyId=ykxd.obj.c
if(companyId){

}

//隐藏点我聊天按钮
ykxd.hideBtn=function () {
  toChatBtn.style.display='none'
}

//来自聊天子窗口的消息监听
window.addEventListener('message',function (e) {
  if(e.data==='close'){
    togglePane()
  }
},false)
