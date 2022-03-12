<template>
  <label class="ui-input-range -size-64 flex items-stretch">
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
  import { defineComponent } from 'vue'
  import { useVModel } from '@vueuse/core'

  export default defineComponent({
    name: 'ui-input-range',
    props: {
      value: [String, Number],
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
      const value = useVModel(props, 'value', emit)

      return {
        value,
      }
    },
  })
</script>

<style lang="postcss">
  .ui-input-range > input {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
  }
  .ui-input-range > input:focus {
    outline: none;
  }
  .ui-input-range > input::-webkit-slider-runnable-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #ac51b5;
    border-radius: 25px;
    border: 0px solid #000101;
  }
  .ui-input-range > input::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.6px;
  }
  .ui-input-range > input:focus::-webkit-slider-runnable-track {
    background: #ac51b5;
  }
  .ui-input-range > input::-moz-range-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #ac51b5;
    border-radius: 25px;
    border: 0px solid #000101;
  }
  .ui-input-range > input::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
  }
  .ui-input-range > input::-ms-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }
  .ui-input-range > input::-ms-fill-lower {
    background: #ac51b5;
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  .ui-input-range > input::-ms-fill-upper {
    background: #ac51b5;
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  .ui-input-range > input::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
  }
  .ui-input-range > input:focus::-ms-fill-lower {
    background: #ac51b5;
  }
  .ui-input-range > input:focus::-ms-fill-upper {
    background: #ac51b5;
  }
</style>
