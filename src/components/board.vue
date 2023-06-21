<template>
  <div class="board">
    <div class="board__header">
      <update-item-plate
        :data="boardData"
        @update-item="(param) => $emit('updateBoard', param)"
      />
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
        :list="taskStore.getTasksByBoardId(boardData.id)"
        group="people"
        item-key="id"
      >
        <template #item="{ element }">
          <task
            :task-data="element"
            @delete-task="deleteTask"
            @update-task="updateTask"
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
import updateItemPlate from '@/components/updateItemPlate.vue'
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
const emit = defineEmits(['updateBoard', 'deleteBoard'])

// const taskList: any = ref([])
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
const updateTask = async (param) => {
  await taskStore.updateTask(props.boardData.id, param)
  refreshTaskList()
}
const deleteTask = async (param) => {
  await taskStore.deleteTask(props.boardData.id, { id: param.taskId })
  refreshTaskList()
}
const refreshTaskList = async () => {
  await taskStore.getListByBoardId(props.boardData.id)
  // taskList.value = await taskStore.getTasksByBoardId(props.boardData.id)
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