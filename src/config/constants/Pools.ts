export type PoolType = {
  name: string
  id: number
  routeName: string
  page: {
    description: string
    activeColor: string
    videoUrl: {
      large: string
    }
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
      videoUrl: {
        large: '/planets/neptune.webm',
      },
    },
  },
  {
    name: 'Venus',
    routeName: 'pool-venus',
    id: 2,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Earth',
    routeName: 'pool-earth',
    id: 3,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#0491cf',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Mars',
    routeName: 'pool-mars',
    id: 4,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#b7531f',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Jupiter',
    routeName: 'pool-jupiter',
    id: 5,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Saturn',
    routeName: 'pool-saturn',
    id: 6,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Uranus',
    routeName: 'pool-uranus',
    id: 7,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Neptune',
    routeName: 'pool-neptune',
    id: 8,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#00f',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
  {
    name: 'Solar',
    routeName: 'pool-solar',
    id: 9,
    page: {
      description: 'the first planet of the income path',
      activeColor: '#c94619',
      videoUrl: {
        large: '/planets/earth.webm',
      },
    },
  },
]
