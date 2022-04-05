import { computed } from 'vue'
import { Computed, Mapper, MapperWithNamespace} from 'vuex'
import { useStore } from '@/store'

export function useMapper(
  mapper: any,
  mapFn: Mapper<Computed> & MapperWithNamespace<Computed>,
  mapName:
    | 'mapMutations'
    | 'mapGetters'
    | 'mapState'
    | 'mapActions'
    | undefined = undefined
) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapFn(mapper)

  // 对数据进行转换
  const storeState:any = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    if ((mapName && mapName === 'mapMutations') || mapName === 'mapActions') {
      // storeState[fnKey] = fn
      storeState[fnKey] = computed(() => {
        return fn
      }).value
    } else {
      storeState[fnKey] = computed(fn)
    }
  })

  return storeState
}

