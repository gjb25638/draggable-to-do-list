import { nextTick  } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'

export default {
  //刷新標籤
  refresh() {
    NProgress.start()
    const route = router.currentRoute.value
    store.commit('removeKeepLive', route.name)
    store.commit('setRouteShow', false)
    nextTick(() => {
      store.commit('pushKeepLive', route.name)
      store.commit('setRouteShow', true)
      NProgress.done()
    })
  },
  //關閉標籤
  close(tag) {
    const route = tag || router.currentRoute.value
    store.commit('removeViewTags', route)
    store.commit('removeIframeList', route)
    store.commit('removeKeepLive', route.name)
    const tagList = store.state.viewTags.viewTags
    const latestView = tagList.slice(-1)[0]
    if (latestView) {
      router.push(latestView)
    } else {
      router.push('/')
    }
  },
  //關閉標籤後處理
  closeNext(next) {
    const route = router.currentRoute.value
    store.commit('removeViewTags', route)
    store.commit('removeIframeList', route)
    store.commit('removeKeepLive', route.name)
    if(next) {
      const tagList = store.state.viewTags.viewTags
      next(tagList)
    }
  },
  //關閉其他
  closeOther() {
    const route = router.currentRoute.value
    const tagList = [...store.state.viewTags.viewTags]
    tagList.forEach(tag => {
      if(tag.meta&&tag.meta.affix || route.fullPath==tag.fullPath) {
        return true
      }else{
        this.close(tag)
      }
    })
  },
  //設置標題
  setTitle(title) {
    store.commit('updateViewTagsTitle', title)
  }
}
