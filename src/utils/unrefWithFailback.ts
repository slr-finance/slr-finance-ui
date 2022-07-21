import { Ref } from 'vue'

type UnrefWithFailbackReturn<A, B> = A extends null ? B : A

export const unrefWithFailback = <V, F>(ref: Ref<V>, failback: F): UnrefWithFailbackReturn<V, F> => {
  const val = ref.value

  if (val === null) {
    return failback as UnrefWithFailbackReturn<V, F>
  }

  return val as UnrefWithFailbackReturn<V, F>
}
