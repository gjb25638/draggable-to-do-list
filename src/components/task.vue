<template>
  <div
    v-if="isShow"
    class="task"
    :class="{ checked }"
  >
    <div class="task__chk">
      <Chk
        :is-checked="checked"
        @checked-change="checkedChange"
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
  taskData: { type: Object, default: () => ({ id: '1', title: '資源回收', index: -1 }) },
  taskIndex: { type: Number, default: -1 }
})
const emit = defineEmits(['deleteTask', 'updateTask'])
const checked = ref(false)
onMounted(() => {
  nextTick(() => {
    checked.value = props.taskData.finished
  })
})
const taskStore = useTaskStore()
const checkedChange = (param) => {
  checked.value = param
  taskStore.updateTask(props.taskData.boardId, { id: props.taskData.id, title: props.taskData.title, finished: checked.value, index: props.taskData.index })
}

const { isShowfinished } = storeToRefs(taskStore)
const isShow = computed(() => checked.value ? isShowfinished.value : true)
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