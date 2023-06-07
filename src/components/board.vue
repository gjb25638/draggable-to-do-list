<template>
  <div class="board">
    <div class="board__header">
      <div class="board__header__title">
        {{ `${boardData.id} ${boardData.title}` }}
      </div>
      <div class="board__header__option">
        <el-dropdown trigger="hover">
          <i-material-symbols-more-horiz class="text-20px outline-none" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$emit('deleteBoard', { boardId: boardData.id })">
                刪除
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="board__task-list">
      <draggable
        class="list-group"
        :list="taskList"
        group="people"
        item-key="id"
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
const emit = defineEmits(['addTask, deleteBoard'])
// const addTask = (props) => {

// }

const taskStore = useTaskStore()
onMounted(() => {
  nextTick(() => {
    taskStore.getTaskListByBoardId(props.boardData.id)
  })
})
const taskList = computed(() => taskStore.getTasksByBoardId(props.boardData.id))
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

.el-dropdown-menu {
  @apply top-[-10px] bg-white text-black px-10px py-3px rounded-1 list-none cursor-pointer;
}
</style>
<style lang="scss">
.el-popper__arrow {
  transform: rotate(45deg);

  @apply top-[-15px] bg-white w-10px h-10px;
}
</style>