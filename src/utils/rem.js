export default function install(Vue) {
  const clientWidth = document.documentElement.clientWidth
  Vue.mixin({
    data() {
      return {
        dpr: 640 * 28 / (clientWidth * 2)
      }
    }
  })
}
