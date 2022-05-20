import { unref } from 'vue'
import { computedEager, MaybeRef } from '@vueuse/core'

const secPerDay = 60 * 60 * 24
const secPerHour = 60 * 60
const secPerMinute = 60

const integerDivision = (n: number, d: number) => {
  const quotient = ~~(n / d)
  const remainder = n % d

  return [quotient, remainder]
}

const fillZero = (n: number) => n.toString().padStart(2, '0')

export const useTimeToFormat = (from: MaybeRef<number>, to: MaybeRef<number>) => {
  const days = computedEager(() => {
    const diff = Math.abs(unref(to) - unref(from))
    const [days, hoursRemainder] = integerDivision(diff, secPerDay)
    const [hours, minutesRemainder] = integerDivision(hoursRemainder, secPerHour)
    const [minutes, seconds] = integerDivision(minutesRemainder, secPerMinute)

    return `${days} day${days === 1 ? '' : 's'} ${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`
  })

  return days
}
