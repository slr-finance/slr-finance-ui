export type PoolType = {
  name: string
  id: number
  routeName: string
  page: {
    description: string
    objectTypeName: string
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
      description: 'The first planet of the income path',
      objectTypeName: 'planet',
      videoFolder: '/planets/neptune',
      icon: 'pool-neptune',
    },
  },
  {
    name: 'Uranus',
    routeName: 'pool-uranus',
    id: 2,
    page: {
      description: 'The seventh planet from the Sun',
      objectTypeName: 'planet',
      videoFolder: '/planets/uranus',
      icon: 'pool-uranus',
    },
  },
  {
    name: 'Saturn',
    routeName: 'pool-saturn',
    id: 3,
    page: {
      description: 'The sixth planet from the Sun and the second-largest in the Solar System',
      objectTypeName: 'planet',
      videoFolder: '/planets/saturn',
      icon: 'pool-saturn',
    },
  },
  {
    name: 'Jupiter',
    routeName: 'pool-jupiter',
    id: 4,
    page: {
      description: 'The fifth planet from the Sun and the largest in the Solar System',
      objectTypeName: 'planet',
      videoFolder: '/planets/jupiter',
      icon: 'pool-jupiter',
    },
  },
  {
    name: 'Mars',
    routeName: 'pool-mars',
    id: 5,
    page: {
      description: 'The fourth planet from the Sun and is often called the "Red Planet"',
      objectTypeName: 'planet',
      videoFolder: '/planets/mars',
      icon: 'pool-mars',
    },
  },
  {
    name: 'Earth',
    routeName: 'pool-earth',
    id: 6,
    page: {
      description: 'The third planet from the Sun',
      objectTypeName: 'planet',
      videoFolder: '/planets/earth',
      icon: 'pool-earth',
    },
  },
  {
    name: 'Venus',
    routeName: 'pool-venus',
    id: 7,
    page: {
      description: 'The second planet from the Sun',
      objectTypeName: 'planet',
      videoFolder: '/planets/venus',
      icon: 'pool-venus',
    },
  },
  {
    name: 'Mercury',
    routeName: 'pool-mercury',
    id: 8,
    page: {
      description: 'The smallest planet in the Solar System',
      objectTypeName: 'planet',
      videoFolder: '/planets/mercury',
      icon: 'pool-mercury',
    },
  },
  {
    name: 'Sun',
    routeName: 'pool-sun',
    id: 9,
    page: {
      description: 'The star at the center of the Solar System',
      objectTypeName: 'star',
      videoFolder: '/planets/sun',
      icon: 'pool-sun',
    },
  },
]

export const MAX_POOL_ID = 9
