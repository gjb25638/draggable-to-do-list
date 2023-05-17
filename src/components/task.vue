<template>
  <div class="task">
    <div class="task__chk">
      <Chk />
    </div>
    <div class="task__title">
      {{ taskData.taskTitle }} {{ id }}
    </div>
    <div class="task__menu">
      <i-material-symbols-more-horiz class="text-20px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Chk from '@/components/checkbox.vue'
const props = defineProps({
  taskData: { type: Object, default: () => ({ taskTitle: '資源回收' }) },
  id: { type: Number, default: 0 }
})
const checked1 = ref(false)
</script>

<style lang="scss" scoped>
.task {
  @apply flex items-center my-5px p-5px border-1 border-solid border-black rounded-2;


  .task__title {
    @apply w-211px;
  }

  .task__menu {
    @apply center invisible;
  }

  &:hover {
    .task__menu {
      @apply center visible;
    }
  }
}
</style>