import { mapMutations, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

export function useMutations(moduleName: any, mapper = undefined) {
  const mapName = 'mapMutations'
  let mapperFn = mapMutations
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
  } else {
    mapper = moduleName
  }

  return useMapper(mapper, mapperFn, mapName)
}

