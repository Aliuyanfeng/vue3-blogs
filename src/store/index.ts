import { createStore,Store,useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import RootStateTypes,{AllStateTypes} from './interface'
import createPersistedState from 'vuex-persistedstate'

import {getAllTag} from '@/api/index'

// 引入测试子模块
import testModule from './modules/test'

export default createStore<RootStateTypes>({

  plugins: [createPersistedState()],
  state: {
    test:"2222",
    baseInfo: {
      id:1
    }, //基础信息
    isLoading: true,
    allTag:[]
  },
  getters: {},
  mutations: {
    // 修改loading 状态
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading
    },
    // 标签接口存储
    setAllTag(state, list) {
      state.allTag = list
    }
  },
  actions: {
    // 获取分组接口
    getAllTag(context) {
      return new Promise((resolve, reject) => {
        getAllTag().then((res: any) => {
          if (res.code === 200) {
            context.commit('setAllTag',res.data)
            resolve(res.data)
          }
        })
      })
    }
  },
  modules: {
    testModule
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key)
}
