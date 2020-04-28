
// 在单文件组件里面使用 render 函数，必须把 template 标签去掉。

<script>
export default {
    data() {
        return {
            msg: 'Click to see the message'
        }
    },
    methods: {
        hello() {
            alert('This is the message');
        }
    },
    ////单文件组件通过 render 函数实现
    // render (createElement) {
    //     return createElement(
    //         'span',
    //         {
    //             class: { 'my-class': true },
    //             style: { cursor: 'pointer' },
    //             on: {
    //                 click: this.hello
    //             }
    //         },
    //         [ this.msg ]
    //     );
    // },

    ////单文件组件通过 render 函数 里面用 jsx 语法实现
    render: function render(h) {
        return (
            <span
                class={{ 'my-class': true }}
                style={{ cursor: 'pointer' }}
                on-click={ this.hello }
            >
                { this.msg + ' 来自jsx语法' }
            </span>
        )
    }
}
</script>
