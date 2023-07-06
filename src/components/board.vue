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
      <el-scrollbar>
        <draggable
          class="list-group"
          :list="taskStore.getTasksByBoardId(boardData.id)"
          group="task"
          item-key="index"
          @change="dragTask(boardData.id, $event)"
        >
          <template #item="{ element, index }">
            <task
              :is-show="element.finished ? isShowfinished : true"
              :task-data="element"
              :task-index="index"
              @delete-task="(param) => deleteTask(param)(boardData.id)"
              @update-task="updateTask"
              @checked-change="updateTask"
            />
          </template>
        </draggable>
      </el-scrollbar>
    </div>
    <div class="board__add-task-btn">
      <add-item-btn
        :item="'task'"
        @add-item="(param) => addTask({ ...param, finished: false, index: taskStore.getLength(boardData.id) })(boardData.id)"
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

const taskStore = useTaskStore()
const { isShowfinished } = storeToRefs(taskStore)
onMounted(() => {
  nextTick(() => {
    refreshTaskList(props.boardData.id)
  })
})
const addTask = (param) => async (boardId) => {
  await taskStore.addTask(boardId, { title: param.title, finished: param.finished, index: param.index })
  refreshTaskList(boardId)
  if (param.clearInput) param.clearInput()
}
const updateTask = async (param) => {
  await taskStore.updateTask(props.boardData.id, param)
  refreshTaskList(props.boardData.id)
}
const deleteTask = (param) => async (boardId) => {
  await taskStore.deleteTask(boardId, { id: param.taskId })
  refreshTaskList(boardId)
}
const refreshTaskList = async (boardId) => {
  await taskStore.getListByBoardId(boardId)
}

const { movedCalcIndex, addedCalcIndex, removedCalcIndex } = dragHandlerMixin()
const dragTask = (boardId, evt) => {
  // console.log({ boardId })
  // console.log({ evt })
  if (evt.moved) {
    movedCalcIndex(evt.moved.newIndex, evt.moved.oldIndex, taskStore.getTasksByBoardId(boardId), updateTask)
  }
  if (evt.added) {
    addedCalcIndex(evt.added.newIndex, evt.added.element, boardId, taskStore.getTasksByBoardId(boardId), addTask, updateTask)
  }
  if (evt.removed) {
    removedCalcIndex(evt.removed.oldIndex, evt.removed.element, boardId, taskStore.getTasksByBoardId(boardId), deleteTask, updateTask)
  }
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
    @apply max-h-73vh flex flex-col;
  }
}
</style>