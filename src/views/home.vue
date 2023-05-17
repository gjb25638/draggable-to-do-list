<template>
  <div class="home">
    <div class="home__header">
      <AddItemBtn
        :item="'board'"
        @add-item="addBoard"
      />
    </div>
    <div class="home__body">
      <div class="board-list">
        <draggable
          class="list-group"
          :list="boardList"
          item-key="boardTitle"
        >
          <template #item="{ element }">
            <Board
              :board-data="element"
            />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddItemBtn from '@/components/addItemBtn.vue'
import Board from '@/components/board.vue'
import draggable from 'vuedraggable'

const boardList = reactive([
  {
    boardTitle: '代辦',
    taskList: [
      { taskTitle: '資源回收', id: 1 },
      { taskTitle: '掃廁所', id: 2 },
      { taskTitle: '拖地板', id: 3 }
    ]
  },
  {
    boardTitle: '完成事項',
    taskList: [
      { taskTitle: '資源回收', id: 1 },
      { taskTitle: '掃廁所', id: 2 },
      { taskTitle: '拖地板', id: 3 }
    ]
  }
])

const addBoard = (props) => {
  boardList.push({
    boardTitle: props,
    taskList: []
  })
}
</script>

<style lang="scss" scoped>
.home {
  @apply w-full h-100vh bg-[#B5C6B5];

  .home__header {
    @apply flex;
  }

  .home__body {
    .board-list {
      @apply w-full flex;

      .list-group {
        @apply flex;
      }
    }
  }
}
</style>
