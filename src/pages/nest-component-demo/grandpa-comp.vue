<template>
    <div style="text-align: left;" id="grandpa-comp">
        <h3>多层组件嵌套demo——inheritAttrs、attrs和listeners使用</h3>
        
        <h3>说明：</h3>

        <ul>
            <li>该demo使用三层组件嵌套，关系如下：grandpa-comp——》father-comp——》child-comp 依次引用</li>
        </ul>

        <h4>“props属性”和“非props属性”表现出来的特点：</h4>
        <pre>
            在父子组件传参的时候，通常以 props 来接收参数；
            如果父组件在用子组件传递的参数未在子组件中以props属性申明，那么这就是“非props属性”，将以“属性key=属性值”的方式出现在子组件的跟节点（dom节点，f12查看）上。
        </pre>

        <hr/>

        <!-- 调用子组件，并传递参数 foo、coo -->
        <father-comp
            :foo="foo"
            :coo="coo"
            v-on:upRocket="reciveRocket"
        >
        </father-comp>
    </div>
</template>

<script>
import fatherComp from './father-comp'
export default {
    name: 'grandpa-comp',
    data() {
        return {
            foo:"Hello, world",
            coo:"Hello, aaaa"
        }
    },
    methods:{
        reciveRocket(){
            console.log('火箭发射成功！')
        }
     },
    components: {
        fatherComp
    }
}
</script>
