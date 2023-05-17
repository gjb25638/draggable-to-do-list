<template>
  <div class="board">
    <div class="board__header">
      <div class="board__header__title">
        {{ boardData.boardTitle }}
      </div>
      <div class="board__header__option">
        <i-material-symbols-more-horiz class="text-20px" />
      </div>
    </div>
    <div class="board__task-list">
      <draggable
        class="list-group"
        :list="boardData.taskList"
        group="people"
        item-key="taskTitle"
      >
        <template #item="{ element, index }">
          <Task
            :id="index"
            :task-data="element"
          />
        </template>
      </draggable>
    </div>
    <div class="board__add-task-btn">
      <AddItemBtn :item="'task'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/task.vue'
import AddItemBtn from '@/components/addItemBtn.vue'
import draggable from 'vuedraggable'
const props = defineProps({
  boardData: {
    type: Object, default: () => ({
      boardTitle: '代辦',
      taskList: [
        { taskTitle: '資源回收', id: 1 },
        { taskTitle: '資源回收', id: 2 }
      ]
    })
  }
})
</script>

<style lang="scss" scoped>
.board {
  @apply m-10px p-10px bg-white rounded-2;

  .board__header {
    @apply flex justify-between;
  }

  .board__task-list {
    @apply flex flex-col;
  }
}
</style>