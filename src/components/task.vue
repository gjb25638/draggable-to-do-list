<template>
  <div class="task">
    <div class="task__chk">
      <Chk />
    </div>
    <div class="task__title">
      {{ taskData.title }} {{ taskData.id }}
    </div>
    <div class="task__option">
      <option-btn
        :id="taskData.id"
        @delete-item="() => $emit('deleteTask', { taskId: taskData.id })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Chk from '@/components/checkbox.vue'
import optionBtn from './optionBtn.vue'
const props = defineProps({
  taskData: { type: Object, default: () => ({ id: '1', title: '資源回收' }) },
})
const emit = defineEmits(['deleteTask'])
const checked = ref(false)
</script>

<style lang="scss" scoped>
.task {
  @apply flex items-center my-10px p-5px border-1 border-solid border-black rounded-2;


  .task__title {
    @apply w-211px;
  }

  .task__option {
    @apply center invisible;
  }

  &:hover {
    .task__option {
      @apply center visible;
    }
  }
}
</style>