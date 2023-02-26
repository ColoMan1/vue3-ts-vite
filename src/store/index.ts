import { createStore, type Store, useStore as baseUseStore } from 'vuex'
import { type InjectionKey } from 'vue'

export interface State {
  count: number,
  isCollapse: boolean
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  state () {
    return {
      count: 324242,
      isCollapse: false
    }
  },
  mutations: {
    setisCollapse (state, payload) {
      state.isCollapse = payload
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}
