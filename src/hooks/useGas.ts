import { ref } from 'vue'

export const useGas = () => {
  const gasPrice = ref(1)

  return {
    gasPrice,
  }
}
