<template>
  <label class="ui-input-range -size-64">
    <div class="range-wrapper">
      <div
        class="range"
        :style="rangeStyleList"
      >
        <div
          class="value"
          :class="`-${valueSide}`"
        >
          <slot
            name="value"
            :value="value"
            >{{ value }}</slot
          >
        </div>
      </div>
    </div>
    <input
      class="input flex-1"
      v-model="value"
      :min="min"
      :max="max"
      :step="step"
      type="range"
    />
  </label>
</template>

<script lang="ts">
  import { computed, defineComponent, vModelCheckbox } from 'vue'
  import { useVModel } from '@vueuse/core'

  export default defineComponent({
    name: 'ui-input-range',
    props: {
      value: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER,
      },
      step: {
        type: Number,
        default: 1,
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const value = computed({
        set: (value) => (vModel.value = Number(value)),
        get: () => vModel.value,
      })
      const vModel = useVModel(props, 'value', emit, { passive: true })
      const percent = computed(() => (value.value - props.min) / (props.max - props.min))
      const rangeStyleList = computed(() => ({
        transform: `translateX(${(percent.value - 1) * 100}%)`,
      }))
      const valueSide = computed(() => (percent.value > 0.5 ? 'left' : 'right'))

      return {
        value,
        rangeStyleList,
        valueSide,
      }
    },
  })
</script>

<style lang="postcss">
  .ui-input-range {
    @apply block relative rounded-full top-0 w-full;

    --ui-input-range-height: 16px;
    height: var(--ui-input-range-height);
    background: rgb(64 231 255 / 20%);
  }

  .ui-input-range > .range-wrapper {
    @apply overflow-hidden rounded-l-full absolute top-0 pointer-events-none select-none;
    height: var(--ui-input-range-height);
    width: calc(100% - 8px);
  }

  .ui-input-range > .range-wrapper > .range {
    @apply w-full relative pointer-events-none select-none;
    transform-origin: left center;
    height: var(--ui-input-range-height);
    background: #40e7ff;
  }

  .ui-input-range > .range-wrapper > .range > .value {
    @apply absolute top-0 font-title leading-none text-12 flex justify-center items-center pointer-events-none select-none whitespace-nowrap;
    height: var(--ui-input-range-height);
  }

  .ui-input-range > .range-wrapper > .range > .value.-left {
    @apply right-0 mr-8 text-black;
  }

  .ui-input-range > .range-wrapper > .range > .value.-right {
    @apply left-full ml-16 text-white;
  }

  .ui-input-range > .input {
    @apply absolute w-full;
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }
  .ui-input-range > .input:focus {
    outline: none;
  }

  .ui-input-range > .input::-webkit-slider-thumb {
    @apply border-2 block w-8 left-full -top-4 rounded-full bg-black;
    height: calc(var(--ui-input-range-height) + 8px);

    box-shadow: inset 0px 0px 0 2px #fefefe;
    border: none;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.6px;
  }
  .ui-input-range > .input:focus::-webkit-slider-runnable-track {
    background: transparent;
  }
  .ui-input-range > .input::-moz-range-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: transparent;
    border-radius: 25px;
    border: 0px solid #000101;
  }
  .ui-input-range > .input::-moz-range-thumb {
    @apply border-2 block w-8 left-full -top-4 rounded-full bg-black;
    height: calc(var(--ui-input-range-height) + 8px);
    box-shadow: inset 0px 0px 0 2px #fefefe;

    border: 0px solid #000000;
    cursor: pointer;
  }
  .ui-input-range > .input::-ms-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }
  .ui-input-range > .input::-ms-fill-lower {
    background: transparent;
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  .ui-input-range > .input::-ms-fill-upper {
    background: transparent;
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  .ui-input-range > .input::-ms-thumb {
    @apply border-2 block w-8 left-full -top-4 rounded-full bg-black;
    height: calc(var(--ui-input-range-height) + 8px);
    box-shadow: inset 0px 0px 0 2px #fefefe;

    border: 0px solid #000000;
    cursor: pointer;
  }
  .ui-input-range > .input:focus::-ms-fill-lower {
    background: transparent;
  }
  .ui-input-range > .input:focus::-ms-fill-upper {
    background: transparent;
  }
</style>
