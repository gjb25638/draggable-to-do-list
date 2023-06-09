<template>
  <div class="home">
    <div class="home__header" />
    <div class="home__contain">
      <div class="home__contain__board-list">
        <draggable
          class="list-group"
          :list="boardStore.getList"
          item-key="id"
        >
          <template #item="{ element }">
            <Board
              :board-data="element"
              @delete-board="deleteBoard"
            />
          </template>
        </draggable>
      </div>
      <div class="home__contain__add-board-btn">
        <AddItemBtn
          :item="'board'"
          @add-item="addBoard"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddItemBtn from '@/components/addItemBtn.vue'
import Board from '@/components/board.vue'
import draggable from 'vuedraggable'

const boardStore = useBoardStore()
onMounted(() => {
  nextTick(() => {
    boardStore.getBoardList()
  })
})

// const boardList = reactive([
//   {
//     id: 1,
//     title: '代辦',
//     taskList: [
//       { title: '資源回收', id: 1 },
//       { title: '掃廁所', id: 2 },
//       { title: '拖地板', id: 3 }
//     ]
//   },
//   {
//     id: 2,
//     title: '完成事項',
//     taskList: [
//       { title: '資源回收', id: 1 },
//       { title: '掃廁所', id: 2 },
//       { title: '拖地板', id: 3 }
//     ]
//   }
// ])

const addBoard = async (props) => {
  await boardStore.addBoard({ title: props.title })
  boardStore.getBoardList()
}
const deleteBoard = async (props) => {
  await boardStore.deleteBoard({ id: props.boardId })
  boardStore.getBoardList()
}
</script>

<style lang="scss" scoped>
.home {
  @apply w-full h-100vh bg-[#B5C6B5];

  .home__contain {
    @apply flex;

    .home__contain__board-list {
      @apply flex;

      .list-group {
        @apply flex;
      }
    }
  }
}
</style>
