export type PoolType = {
  name: string
  id: number
  routeName: string
  page: {
    description: string
    activeColor: string
    videoFolder: string
    icon: string
  }
}

export const POOLS_INFO: PoolType[] = [
  {
    name: 'Mercury',
    routeName: 'pool-mercury',
    id: 1,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#f00',
      videoFolder: '/planets/earth',
      icon: 'pool-mercury',
    },
  },
  {
    name: 'Venus',
    routeName: 'pool-venus',
    id: 2,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoFolder: '/planets/earth',
      icon: 'pool-venus',
    },
  },
  {
    name: 'Earth',
    routeName: 'pool-earth',
    id: 3,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#0491cf',
      videoFolder: '/planets/earth',
      icon: 'pool-earth',
    },
  },
  {
    name: 'Mars',
    routeName: 'pool-mars',
    id: 4,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#b7531f',
      videoFolder: '/planets/earth',
      icon: 'pool-mars',
    },
  },
  {
    name: 'Jupiter',
    routeName: 'pool-jupiter',
    id: 5,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoFolder: '/planets/earth',
      icon: 'pool-jupiter',
    },
  },
  {
    name: 'Saturn',
    routeName: 'pool-saturn',
    id: 6,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoFolder: '/planets/earth',
      icon: 'pool-saturn',
    },
  },
  {
    name: 'Uranus',
    routeName: 'pool-uranus',
    id: 7,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoFolder: '/planets/earth',
      icon: 'pool-uranus',
    },
  },
  {
    name: 'Neptune',
    routeName: 'pool-neptune',
    id: 8,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoFolder: '/planets/neptune',
      icon: 'pool-neptune',
    },
  },
  {
    name: 'Solar',
    routeName: 'pool-solar',
    id: 9,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#c94619',
      videoFolder: '/planets/earth',
      icon: 'pool-solar',
    },
  },
]

export const MAX_POOL_ID = 9
