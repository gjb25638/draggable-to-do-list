<template>
  <div
    class="chk"
    :class="{ checked }"
    @click="change"
  >
    <div class="chk__border" />
    <div class="chk__circle" />
    <CheckedIcon class="chk__checked" />
  </div>
</template>

<script setup lang="ts">
import CheckedIcon from '@/components/img/checked.vue'

const emit = defineEmits(['checkedChange'])
const checked = ref(false)
const change = () => {
  checked.value = !checked.value
  emit('checkedChange', checked.value)
}
</script>

<style lang="scss" scoped>
@mixin xy_center {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
}

.chk {
  @apply relative w-24px h-24px select-none cursor-pointer;

  .chk__border {
    @include xy_center;
    @apply w-19px h-19px bg-gray border-1 border-solid border-black rounded-1/2;
  }

  .chk__circle {
    @include xy_center;
    @apply w-18px h-18px bg-white border-none rounded-1/2 overflow-hidden;
  }

  .chk__checked {
    transition: opacity .15s cubic-bezier(.4, 0, 1, 1);

    @include xy_center;
    @apply center inline-block opacity-0 pointer-events-none;
  }

  &:hover,
  &.checked {
    .chk__checked {
      @apply opacity-100;
    }
  }
}
</style>