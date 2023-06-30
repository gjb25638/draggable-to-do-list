<template>
  <div class="home">
    <div class="home__header">
      <div class="home__header__title">
        draggable to-do-list
      </div>
      <div class="home__header__option">
        <option-btn />
      </div>
    </div>
    <el-scrollbar>
      <div class="home__contain">
        <div class="home__contain__board-list">
          <draggable
            class="list-group"
            :list="boardStore.getList"
            group="board"
            item-key="id"
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
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import AddItemBtn from '@/components/addItemBtn.vue'
import Board from '@/components/board.vue'
import optionBtn from '@/components/optionBtn.vue'
import draggable from 'vuedraggable'
import dragHandlerMixin from '@/mixin/dragHandlerMixin'

const boardStore = useBoardStore()
onMounted(() => {
  nextTick(() => {
    boardStore.getBoardList()
  })
})

const addBoard = async (props) => {
  await boardStore.addBoard({ title: props.title, index: boardStore.getLength })
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
  @apply w-full h-screen bg-[#B5C6B5];

  .home__header {
    @apply h-[5%] flex justify-between px-20px py-10px;

    .home__header__title {
      @apply text-24px font-700;
    }
  }

  :deep(.el-scrollbar) {
    @apply h-[95%];

    .el-scrollbar__wrap {
      @apply h-full;

      overflow-y: hidden;
    }
  }

  .home__contain {
    @apply flex;

    .home__contain__board-list {
      // @apply ;

      .list-group {
        @apply flex;
      }
    }
  }
}
</style>