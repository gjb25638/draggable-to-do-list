<template>
  <div class="editItemPlate">
    <div
      v-if="!showEditPanel"
      class="title"
      @click="openEditPanel"
    >
      {{ data.title }}
    </div>
    <div
      v-if="showEditPanel"
      class="edit-panel"
    >
      <input
        ref="inputRef"
        v-model="inputText"
        class="edit-panel__input"
        type="text"
        onfocus="this.select()"
      >
      <div class="edit-panel__btn-group">
        <btn
          :title="'確認'"
          :size="'small'"
          @click="editItem"
        />
        <btn
          :title="'取消'"
          :size="'small'"
          @click="closeEditPanel"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from '@/components/btn.vue'
const props = defineProps({
  data: { type: Object, default: () => ({ id: '1', title: '資源回收' }) },
})
const emit = defineEmits(['editItem'])
const showEditPanel = ref(false)
const inputText = ref('')
const inputRef = ref()
onMounted(() => {
  inputText.value = props.data.title
})

const openEditPanel = () => {
  showEditPanel.value = true
  nextTick(() => inputRef.value.focus())
}
const closeEditPanel = () => {
  showEditPanel.value = false
  inputText.value = props.data.title
}
const editItem = async () => {
  await emit('editItem', { id: props.data.id, title: inputText.value })
  showEditPanel.value = false
}
</script>

<style lang="scss" scoped>
.editItemPlate {
  @apply w-211px flex overflow-hidden;

  .title {
    @apply text-18px leading-18px;
  }

  .edit-panel {
    @apply flex flex-col;

    .edit-panel__input {
      @apply bg-[#C6E7C9] text-18px leading-18px w-200px rounded-5px;
    }

    .edit-panel__btn-group {
      @apply flex;

      .btn {
        @apply mx-5px my-6px;
      }
    }
  }
}
</style>