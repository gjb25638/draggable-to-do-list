<template>
  <div class="board">
    <div class="board__header">
      {{ boardData.index }}
      <edit-item-plate
        :data="boardData"
        @edit-item="(param) => $emit('updateBoard', param)"
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
        group="task"
        item-key="index"
        @change="dragTask(boardData.id, $event)"
      >
        <template #item="{ element, index }">
          <task
            :task-data="element"
            :task-index="index"
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
import editItemPlate from '@/components/editItemPlate.vue'
import optionBtn from './optionBtn.vue'
import draggable from 'vuedraggable'
import dragHandlerMixin from '@/mixin/dragHandlerMixin'

const props = defineProps({
  boardData: {
    type: Object, default: () => ({
      id: 1,
      title: '代辦',
      index: -1
    })
  },
  boardIndex: { type: Number, default: -1 }
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
  await taskStore.addTask(props.boardData.id, { title: param.title.value, index: taskStore.getLength(props.boardData.id) })
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

const { movedCalcIndex } = dragHandlerMixin()
const dragTask = (boardId, evt) => {
  console.log({ boardId })
  console.log({ evt })
  if (evt.moved) {
    movedCalcIndex(evt.moved.newIndex, evt.moved.oldIndex, taskStore.getTasksByBoardId(props.boardData.id), updateTask)
  }
  // if (evt.added) {

  // }
  // if (evt.removed) {

  // }
}
const addedCalcIndex = (newIndex, element, list, addFunc, deleteFunc) => {

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