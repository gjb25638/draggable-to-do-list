<template>
  <div
    v-if="isShow"
    class="addItemPlate"
  >
    <div class="addItemPlate__input">
      <el-input
        ref="inputRef"
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
        @click="addItem"
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
  inputPlaceHolder: { type: String, default: '命名這個項目' },
  isShow: { type: Boolean, default: false }
})
const emit = defineEmits(['addItem', 'cancelAddItem'])
const { proxy }: any = getCurrentInstance()
const newItemTitle = ref('')
const inputRef = ref()
const addItem = async () => {
  const param = {
    title: newItemTitle,
    clearInput: () => newItemTitle.value = ''
  }
  await emit('addItem', param)
  inputRef.value.focus()
}

watchEffect(() => {
  if (props.isShow && inputRef.value) {
    inputRef.value.focus()
  }
})
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
      @apply w-23px absolute right-5px top-3px;
    }
  }

  .addItemPlate__btn {
    @apply flex;
  }
}
</style>