import { createStore,Store,useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import RootStateTypes,{AllStateTypes} from './interface'
import createPersistedState from 'vuex-persistedstate'
// 引入测试子模块

import testModule from './modules/test'

export default createStore<RootStateTypes>({

  plugins: [createPersistedState()],
  state: {
    test:"2222",
    baseInfo: {
      id:1
    }, //基础信息
    isLoading:true,
  },
  getters: {},
  mutations: {
    changeLoadingStatus(state) {
      console.warn('改变状态',!state.isLoading)
      state.isLoading = !state.isLoading
    }
  },
  actions: {
  },
  modules: {
    testModule
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key)
}
