<template>
    <div id="child-comp">
        <p>------------childComp start-------------</p>
        <p>coo:{{coo}}</p>
        <button @click="startUpRocket">我要发射火箭</button>
        <p>------------childComp end-------------</p>
    </div>
</template>

<script>
// 爷爷组件
export default {
    name: 'child-comp',
    data() {
        return {}
    },
    props: ["coo"],
    methods: {
        startUpRocket() {
            console.log('我要发射火箭了。')
            this.$emit("upRocket");
        }
    }
}
</script>
