<template>
    <div class="emoji-holder">
      <i class="emoji-control emoji-smile" @click="chooseEmoji(':smile:')"></i>
      <i class="emoji-control emoji-laughing" @click="chooseEmoji(':laughing:')"></i>
    </div>
</template>
<style lang="less" scoped="">

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>
