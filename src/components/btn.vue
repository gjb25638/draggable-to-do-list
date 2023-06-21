<template>
  <div
    class="btn"
    :style="{ 'background-color': bgColor }"
    :class="btnSize"
  >
    <div
      class="btn__title"
      :style="{ 'color': fontColor }"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: 'btn' },
  bgColor: { type: String, default: '#22c55e' },
  fontColor: { type: String, default: 'white' },
  size: { type: String, default: 'large' }
})
const emit = defineEmits(['btnClick'])

onMounted(() => {
  nextTick(() => {
    addClickEvent()
  })
})
onBeforeUnmount(() => {
  removeClickEvent()
})

const emitClickEvent = () => {
  emit('btnClick')
}
const addClickEvent = () => {
  const btn = document.querySelector('.btn')
  btn?.addEventListener('click', emitClickEvent)
}
const removeClickEvent = () => {
  const btn = document.querySelector('.btn')
  btn?.removeEventListener('click', emitClickEvent)
}

const btnSize = computed(() => {
  return {
    large: props.size === 'large',
    small: props.size === 'small',
  }
})
</script>

<style lang="scss" scoped>
.btn {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: all .3s;

  @apply center bg-green-500 b-1 b-solid b-green-500 rounded-2 whitespace-nowrap cursor-pointer;

  &:hover {
    box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.03);
  }

  &:active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(.98);
  }

  .btn__title {
    @apply text-18px font-600 c-white;
  }

  &.small {
    @apply px-10px py-2px;
  }

  // .medium {

  // }

  &.large {
    @apply px-20px py-5px my-10px;
  }
}
</style>