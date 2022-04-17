import { ref } from 'vue'

const gasPrice = ref(5)

export const useGas = () => {
  return {
    gasPrice,
  }
}
