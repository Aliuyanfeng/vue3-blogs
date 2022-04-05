import { mapActions, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

export function useActions(moduleName: any, mapper = undefined) {
  const mapName = 'mapActions'
  let mapperFn = mapActions
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  } else {
    mapper = moduleName
  }

  return useMapper(mapper, mapperFn, mapName)
}


