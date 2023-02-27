import { createStore, type Store, useStore as baseUseStore } from 'vuex'
import { type InjectionKey } from 'vue'
import { IUserInfo } from '../api/types/common'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
const state = {
  count: 324242,
  isCollapse: false,
  user: getLocalStorage<{ token: string } & IUserInfo>('user')
}
export type State = typeof state

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  state,
  mutations: {
    setisCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setLocalStorage('user', payload)
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}
