export type PoolType = {
  name: string
  id: number
  routeName: string
  page: {
    description: string
    videoFolder: string
    icon: string
  }
}

export const POOLS_INFO: PoolType[] = [
  {
    name: 'Neptune',
    routeName: 'pool-neptune',
    id: 1,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/neptune',
      icon: 'pool-neptune',
    },
  },
  {
    name: 'Uranus',
    routeName: 'pool-uranus',
    id: 2,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-uranus',
    },
  },
  {
    name: 'Saturn',
    routeName: 'pool-saturn',
    id: 3,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-saturn',
    },
  },
  {
    name: 'Jupiter',
    routeName: 'pool-jupiter',
    id: 4,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-jupiter',
    },
  },
  {
    name: 'Mars',
    routeName: 'pool-mars',
    id: 5,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-mars',
    },
  },
  {
    name: 'Earth',
    routeName: 'pool-earth',
    id: 6,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-earth',
    },
  },
  {
    name: 'Venus',
    routeName: 'pool-venus',
    id: 7,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-venus',
    },
  },
  {
    name: 'Mercury',
    routeName: 'pool-mercury',
    id: 8,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-mercury',
    },
  },
  {
    name: 'Solar',
    routeName: 'pool-solar',
    id: 9,
    page: {
      description: 'the first planet of the income path',
      videoFolder: '/planets/earth',
      icon: 'pool-solar',
    },
  },
]

export const MAX_POOL_ID = 9
