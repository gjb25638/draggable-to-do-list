<template>
  <div class="board">
    <div class="board__header">
      <div class="board__header__title">
        {{ `${boardData.id} ${boardData.title}` }}
      </div>
      <div class="board__header__option">
        <option-btn
          :id="boardData.id"
          @delete-item="() => $emit('deleteBoard', { boardId: boardData.id })"
        />
      </div>
    </div>
    <div class="board__task-list">
      <draggable
        class="list-group"
        :list="taskList"
        group="people"
        item-key="id"
      >
        <template #item="{ element }">
          <task
            :task-data="element"
            @delete-task="deleteTask"
          />
        </template>
      </draggable>
    </div>
    <div class="board__add-task-btn">
      <add-item-btn
        :item="'task'"
        @add-item="addTask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/task.vue'
import AddItemBtn from '@/components/addItemBtn.vue'
import optionBtn from './optionBtn.vue'
import draggable from 'vuedraggable'
const props = defineProps({
  boardData: {
    type: Object, default: () => ({
      id: 1,
      title: '代辦'
    })
  }
})
const emit = defineEmits(['deleteBoard'])

const taskList: any = ref([])
const taskStore = useTaskStore()
onMounted(() => {
  nextTick(() => {
    refreshTaskList()
  })
})
const addTask = async (param) => {
  await taskStore.addTask(props.boardData.id, { title: param.title.value })
  refreshTaskList()
  param.clearInput()
}
const deleteTask = async (param) => {
  await taskStore.deleteTask(props.boardData.id, { id: param.taskId })
  refreshTaskList()
}
const refreshTaskList = async () => {
  await taskStore.getListByBoardId(props.boardData.id)
  taskList.value = await taskStore.getTasksByBoardId(props.boardData.id)
}
</script>

<style lang="scss" scoped>
.board {
  height: fit-content;

  @apply m-10px p-10px bg-[#C6E7C9] rounded-2;

  .board__header {
    @apply flex justify-between;

  }

  .board__task-list {
    @apply flex flex-col;
  }
}
</style>