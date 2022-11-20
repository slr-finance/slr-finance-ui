import { ref } from "vue"

type AchieveGroup = {
  title: string,
  id: number,
}

export const useAchievements = () => {
  const groups = ref<AchieveGroup[]>([])

  groups.value.push(
    {
      title: 'Presale',
      id: 0,
    },
    {
      title: 'Miner',
      id: 1,
    },
    {
      title: 'Miner 2',
      id: 2,
    },
    {
      title: 'Referrer',
      id: 3,
    },
    {
      title: 'Leader',
      id: 4,
    },
    {
      title: 'Community',
      id: 5,
    },
    {
      title: 'Opinion leader',
      id: 6,
    },
  )

  return { groups }
}