<template>
  <div class="addItemBtn">
    <div
      v-show="!isShowAddItem"
      class="addItemBtn__btn"
    >
      <Btn
        :title="btnTitle"
        @click="showAddItem()"
      />
    </div>
    <div
      v-show="isShowAddItem"
      class="addItemBtn__input-form"
    >
      <AddItemPlate
        :input-place-holder="inputPlaceHolder"
        :submit-btn-title="btnTitle"
        @add-item="(props) => $emit('addItem', props)"
        @cancel-add-item="hideAddItem()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from '@/components/btn.vue'
import AddItemPlate from '@/components/addItemPlate.vue'

const props = defineProps({
  item: { type: String, default: 'board' }
})
const btnTitle = computed(() => props.item === 'board' ? '添加板塊' : '添加任務')
const inputPlaceHolder = computed(() => props.item === 'board' ? '命名這個板塊' : '任務名稱')

const emit = defineEmits(['addItem'])
let isShowAddItem = ref(false)
const showAddItem = () => isShowAddItem.value = true
const hideAddItem = () => isShowAddItem.value = false
</script>

<style lang="scss" scoped>
.addItemBtn {
  @apply ;

  .addItemBtn__btn {
    @apply ;
  }

  .addItemBtn__input-form {
    @apply ;
  }
}
</style>