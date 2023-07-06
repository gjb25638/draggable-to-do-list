<template>
  <div
    v-show="isShow"
    class="task"
    :class="{ checked: taskData.finished }"
  >
    <div class="task__chk">
      <Chk
        :is-checked="taskData.finished"
        @checked-change="(param) => $emit('checkedChange', { id: taskData.id, title: taskData.title, finished: param, index: taskData.index })"
      />
    </div>
    {{ taskData.index }}
    <edit-item-plate
      :data="taskData"
      @edit-item="(param) => $emit('updateTask', param)"
    />
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
import editItemPlate from '@/components/editItemPlate.vue'
import optionBtn from './optionBtn.vue'
const props = defineProps({
  isShow: { type: Boolean, default: true },
  taskData: { type: Object, default: () => ({ id: '1', title: '資源回收', finished: false, index: -1 }) },
  taskIndex: { type: Number, default: -1 }
})
const emit = defineEmits(['deleteTask', 'updateTask', 'checkedChange'])
</script>

<style lang="scss" scoped>
.task {
  @apply flex items-center my-10px p-5px bg-[#FFB366] border-1 border-solid border-black rounded-2;

  .task__option {
    @apply center invisible;
  }

  &:hover {
    .task__option {
      @apply center visible;
    }
  }

  &.checked {
    @apply bg-[#C0C0C0];

    :deep(.editItemPlate) {
      .title {
        @apply line-through;
      }
    }
  }
}
</style>