<template>
  <label
    class="ui-balance-input block transition-colors duration-200 border border-white border-opacity-20 pt-18 rounded-12 bg-black"
  >
    <div class="flex justify-between items-start px-12">
      <div class="text-12 leading-none h-12 text-white text-opacity-60">{{ label }}</div>
      <div class="text-12 leading-none h-12 text-white text-right">
        Balance
        <span
          class="text-white text-opacity-60 hover:text-opacity-80 transition-colors duration-150 cursor-pointer"
          @click="handleSetMax"
        >
          {{ balanceAnimatedStr }}
        </span>
      </div>
    </div>
    <div class="flex">
      <input
        class="bg-transparent leading-140 h-48 outline-none border-0 placeholder-white placeholder-opacity-60 pt-12 pl-16 pb-18 text-18 flex-1 min-w-64"
        v-model="valueStr"
        @input="handleInput"
      />
      <div
        class="flex items-center justify-end pr-16 pl-8 relative before:content-[' '] before:block before:absolute before:h-full before:w-24 before:bg-gradient-to-r before:from-transparent before:to-black before:right-full before:top-0 before:pointer-events-none"
      >
        <transition
          name="ui-balance-input-icon"
          mode="out-in"
        >
          <ui-icon
            class="mt-2"
            prefix="icon-currency"
            size="18"
            :name="iconName"
            :key="iconName"
          />
        </transition>
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            class="text-18 uppercase leading-140 ml-6 text-white"
            :key="currencySymbol"
          >
            {{ currencySymbol }}
          </div>
        </transition>
      </div>
    </div>
  </label>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, watch, markRaw, PropType, Ref } from 'vue'
  import { useTransition, useVModel } from '@vueuse/core'
  import { get } from 'lodash'
  import BigNumber from 'bignumber.js'
  import { BIG_ZERO } from '@/utils/bigNumber'
  import { useTokenAmountFormat } from '@/hooks/formatters/useTokenAmountFormat'
  import UiIcon from './UiIcon.vue'

  const stringToBn = (value: string, defaultBn: BigNumber = BIG_ZERO) => {
    const preparedStr = value.replace(/[^\d,\.]/g, '').replace(/([\.,])(?=\d*[\.,])/g, '')

    if (preparedStr.length === 0) {
      return new BigNumber(0)
    }

    const bn = new BigNumber(preparedStr.replace(/,/g, '.'))

    if (bn.isFinite()) {
      return bn
    } else {
      return new BigNumber(defaultBn)
    }
  }

  export default defineComponent({
    name: 'ui-balance-input',
    props: {
      value: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
      iconName: {
        type: String,
        required: true,
      },
      currencySymbol: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      balance: {
        type: Object as PropType<BigNumber>,
        required: true,
      },
    },
    setup(props, { emit }) {
      const balanceNumber = computed(() => props.balance.toNumber())
      const balanceAnimated = useTransition(balanceNumber, { duration: 300 })
      const balanceAnimatedStr = useTokenAmountFormat(balanceAnimated)

      const handleInput = (event: Event) => {
        emit('input', stringToBn(get(event, ['target', 'value'], '')))
      }

      const valueBn = useVModel(props, 'value', emit, { passive: true }) as Ref<BigNumber>
      const valueStr = ref(valueBn.value.toFixed())

      watch(valueBn, (value, prevValue) => {
        if (!prevValue.eq(value)) {
          valueStr.value = value.isFinite() ? value.toFixed() : ''
        }
      })
      watch(valueStr, (str) => {
        valueBn.value = markRaw(stringToBn(str, valueBn.value))
      })

      const handleSetMax = (event: Event) => {
        event.preventDefault()
        valueBn.value = props.balance

        emit('input', props.balance)
      }

      return {
        balanceAnimatedStr,
        valueStr,
        handleInput,
        handleSetMax,
      }
    },
    emits: ['update:value', 'input'],
    components: {
      UiIcon,
    },
  })
</script>

<style>
  .ui-balance-input:hover {
    @apply border-opacity-40;
  }

  .ui-balance-input:focus-within {
    @apply border-opacity-100;
  }

  .ui-balance-input-icon-enter-active,
  .ui-balance-input-icon-leave-active {
    transition: transform 0.3s, opacity 0.3s;
    transform-origin: center center;
  }

  .ui-balance-input-icon-enter-active,
  .ui-balance-input-icon-leave-to {
    transform: scale(0);
    opacity: 0;
  }

  .ui-balance-input-icon-enter-to {
    transform: scale(1);
    opacity: 1;
  }
</style>
