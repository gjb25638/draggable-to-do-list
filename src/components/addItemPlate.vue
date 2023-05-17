<template>
  <div class="addItemPlate">
    <div class="addItemPlate__input">
      <el-input
        v-model="newItemTitle"
        :clearable="true"
        :placeholder="`${inputPlaceHolder}`"
      />
    </div>
    <div class="addItemPlate__btn">
      <Btn
        :title="`${submitBtnTitle}`"
        :bg-color="'red'"
        class="mr-10px"
        @click="$emit('addItem', newItemTitle)"
      />
      <Btn
        :title="'取消'"
        :bg-color="'white'"
        :font-color="'black'"
        @click="$emit('cancelAddItem')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from '@/components/btn.vue'
const props = defineProps({
  submitBtnTitle: { type: String, default: '添加項目' },
  inputPlaceHolder: { type: String, default: '命名這個項目' }
})
const emit = defineEmits(['addItem', 'cancelAddItem'])
const newItemTitle = ref('')
</script>

<style lang="scss" scoped>
.addItemPlate {
  @apply flex flex-col bg-amber rounded-2 my-5px p-10px;

  .addItemPlate__input {
    @apply ;

    :deep(.el-input) {
      @apply w-full;
    }

    :deep(.el-input__wrapper) {
      @apply relative;
    }

    :deep(.el-input__inner) {
      @apply text-20px rounded-2;
    }

    :deep(.el-input__suffix) {
      @apply w-23px absolute right-15px top-13px;
    }
  }

  .addItemPlate__btn {
    @apply flex;
  }
}
</style>