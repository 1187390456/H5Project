<!--
 * @Page: 
 * @Version: 1.0.0
 * @Autor: xumeng
 * @Date: 2021-09-01 20:48:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-06 18:43:03
-->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    iconSize:{
      type: [String, Number],
      default: 28
    },
  },
  render(h, context) {
    const { icon, title, iconSize } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(<img src={icon} alt="" width={iconSize} height={iconSize}/>)
    }

    if (title) {
      vnodes.push(
        <span slot="title" class="title-text">
          {title}
        </span>
      )
    }
    return vnodes
  }
}
</script>
