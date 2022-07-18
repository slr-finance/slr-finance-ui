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

export const POOLS_INFO: PoolType[] = [
  {
    name: 'Neptune',
    routeName: 'pool-neptune',
    id: 1,
    page: {
      description: 'The first planet of the income path',
      objectTypeName: 'planet',
      videoFolder: '/planets/neptune',
      mobileBgPath: '/images/pools/mobileBg/neptune',
      icon: 'neptune',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/uranus',
      icon: 'uranus',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/saturn',
      icon: 'saturn',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/jupiter',
      icon: 'jupiter',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/mars',
      icon: 'mars',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/earth',
      icon: 'earth',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/venus',
      icon: 'venus',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/mercury',
      icon: 'mercury',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
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
      mobileBgPath: '/images/pools/mobileBg/sun',
      icon: 'sun',
      aboutPool:
        'The first planet of the solar farming system, the first step of your earnings, start your flight from it to the golden sun and high APY',
    },
  },
]

export const MAX_POOL_ID = 9
