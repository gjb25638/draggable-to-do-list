<template>
  <div class="board">
    <div class="board__header">
      <div class="board__header__title">
        {{ `${boardData.id} ${boardData.title}` }}
      </div>
      <div class="board__header__option">
        <el-dropdown trigger="click">
          <i-material-symbols-more-horiz class="text-20px" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>刪除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="board__task-list">
      <!-- <draggable
        class="list-group"
        :list="boardData.taskList"
        group="people"
        item-key="id"
      >
        <template #item="{ element, index }">
          <Task
            :id="index"
            :task-data="element"
          />
        </template>
      </draggable> -->
    </div>
    <div class="board__add-task-btn">
      <AddItemBtn
        :item="'task'"
        @add-item="(props) => $emit('addTask', { boardId: boardData.id, newTaskTitle: props })"
      />
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
      id: 1,
      title: '代辦',
      // taskList: [
      //   { title: '資源回收', id: 1 },
      //   { title: '資源回收', id: 2 }
      // ]
    })
  }
})
const emit = defineEmits(['addTask'])
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