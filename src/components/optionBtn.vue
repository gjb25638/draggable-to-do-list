<template>
  <div class="optionBtn">
    <el-dropdown trigger="hover">
      <i-material-symbols-more-horiz class="text-20px outline-none" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-if="type === 'delete'"
            @click="$emit('deleteItem', { id })"
          >
            刪除
          </el-dropdown-item>
          <el-dropdown-item
            v-else
            @click="toggleFinishItem"
          >
            {{ toggleTitle }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, default: '' },
  type: { type: String, default: 'delete' }
})
const emit = defineEmits(['deleteItem', 'toggleFinishItem'])

const isShowfinishedItem = ref(false)
const toggleTitle = computed(() => isShowfinishedItem.value ? '隱藏已完成任務' : '顯示已完成任務')

const toggleFinishItem = () => {
  isShowfinishedItem.value = !isShowfinishedItem.value
  emit('toggleFinishItem', isShowfinishedItem.value)
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  @apply top-[-10px] bg-white text-black px-10px py-3px rounded-1 list-none cursor-pointer whitespace-nowrap;
}
</style>
<style lang="scss">
.el-popper__arrow {
  transform: rotate(45deg);

  @apply top-[-15px] bg-white w-10px h-10px;
}
</style>