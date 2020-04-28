<template>
    <div>
        <button @click="openDialog">openDialog</button>
        <button @click="add">新增</button>
        <button @click="edit">编辑</button>
        <div v-if="isShow">
            <child-comp :id='id' @closeDialog='closeDialog'></child-comp>
        </div>
    </div>
</template>

<script>
import childComp from './childComp'
export default {
    name: 'compDemo',
    components: {
        childComp
    },
    data() {
        return {
            isShow: false,
            id: ''
        }
    },
    methods: {
        openDialog() {
            this.isShow = true
        },
        closeDialog() {
            this.isShow = false
        },
        add() {
            this.id = 'xxx'
            this.openDialog()
        },
        edit() {
            this.id = ''
            this.openDialog()
        }
    }
}
</script>

