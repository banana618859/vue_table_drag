<template>
    <div id="father-comp">
        <p>------------fatherComp start-------------</p>

        <!-- $attrs 获取到的属性为：父组件传递过来的所有属性，并且未在子组件以props申明的属性集合。 -->
        <!-- 如果当前组件什么了props: ['foo']，那么$attrs 等于 ['coo'] -->
        <!-- 如果当前组件没有申明任何props：那么$attrs 等于父组件传递过来的 ['foo', 'coo'] -->
        <p>attrs:{{$attrs}}</p>
        <p>foo:{{foo}}</p>
        <p>------------fatherComp end-------------</p>
        <child-comp v-bind="$attrs" v-on="$listeners"></child-comp>
    </div>
</template>

<script>
import childComp from './child-comp'
//父亲组件
export default {
    name: 'father-comp',
    // 如果设置 inheritAttrs=true，那么非props属性都会以“属性=属性值”的形式出现在当前组件根节点的dom元素中。
    //设置为false，表示非props属性也不会以“属性=属性值”的形式出现在当前组件根节点的dom元素中
    inheritAttrs: true, 
    props: ["foo"],
    data() {
        return {

        }
    },
    components: {
        childComp
    }

}
</script>
