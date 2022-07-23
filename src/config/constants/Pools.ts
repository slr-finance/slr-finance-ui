import d from '../../../config/poolsConfig.json'

export type PoolType = {
  name: string
  id: number
  routeName: string
  page: {
    description: string
    objectTypeName: string
    videoFolder: string
    mobileBgPath: string
    icon: string
    aboutPool: string
  }
}

export const POOLS_INFO: PoolType[] = d.pools

export const MAX_POOL_ID = d.maxPoolId
