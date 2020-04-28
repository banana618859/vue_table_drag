<template>
    <div>
        childComp
        <button @click="closeDialog">关闭子组件</button>
        <input type="text" v-model="username">
    </div>
</template>

<script>
export default {
    name: 'childComp',
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            username: ''
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        }
    },
    mounted() {
        console.log('子组件mounted事件执行')
        if(this.id) {
            console.log('id不为空，获取详细信息')
            this.username = this.id
        }else{
            console.log('id不为空，input 为空')
        } 
    },
    destroyed() {
        console.log('子组件destroyed事件执行')
    }
}
</script>

