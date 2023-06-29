<template>
  <div class="home">
    <div class="home__header" />
    <div class="home__contain">
      <div class="home__contain__board-list">
        <draggable
          class="list-group"
          :list="boardStore.getList"
          group="board"
          item-key="index"
          @change="dragBoard"
        >
          <template #item="{ element, index }">
            <Board
              :board-data="element"
              :board-index="index"
              @delete-board="deleteBoard"
              @update-board="updateBoard"
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
import dragHandlerMixin from '@/mixin/dragHandlerMixin'

const boardStore = useBoardStore()
onMounted(() => {
  nextTick(() => {
    boardStore.getBoardList()
  })
})

const addBoard = async (props) => {
  await boardStore.addBoard({ title: props.title.value, index: boardStore.getLength })
  boardStore.getBoardList()
  props.clearInput()
}
const updateBoard = async (param) => {
  await boardStore.updateBoard(param)
  boardStore.getBoardList()
}
const deleteBoard = async (props) => {
  await boardStore.deleteBoard({ id: props.boardId })
  boardStore.getBoardList()
}

const { movedCalcIndex } = dragHandlerMixin()
const dragBoard = (evt) => movedCalcIndex(evt.moved.newIndex, evt.moved.oldIndex, boardStore.getList, updateBoard)
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
@/mixin/dragHandlerMixin