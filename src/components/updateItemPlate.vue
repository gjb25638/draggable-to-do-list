<template>
  <div class="updateItemPlate">
    <div
      v-if="!showUpdatePanel"
      class="title"
      @click="openUpdatePanel"
    >
      {{ data.title }}
    </div>
    <div
      v-if="showUpdatePanel"
      class="update-panel"
    >
      <input
        v-model="inputText"
        class="update-panel__input"
        type="text"
      >
      <div class="update-panel__btn-group">
        <btn
          :title="'確認'"
          :size="'small'"
          @click="updateItem"
        />
        <btn
          :title="'取消'"
          :size="'small'"
          @click="closeUpdatePanel"
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
const emit = defineEmits(['updateItem'])
const showUpdatePanel = ref(false)
const inputText = ref('')
onMounted(() => {
  inputText.value = props.data.title
})

const openUpdatePanel = () => showUpdatePanel.value = true
const closeUpdatePanel = () => {
  showUpdatePanel.value = false
  inputText.value = props.data.title
}
const updateItem = async () => {
  await emit('updateItem', { id: props.data.id, title: inputText.value })
  showUpdatePanel.value = false
}
</script>

<style lang="scss" scoped>
.updateItemPlate {
  @apply w-211px flex overflow-hidden;

  .title {
    @apply text-18px leading-18px;
  }

  .update-panel {
    @apply flex flex-col;

    .update-panel__input {
      @apply bg-[#C6E7C9] text-18px leading-18px w-200px rounded-5px;
    }

    .update-panel__btn-group {
      @apply flex;

      .btn {
        @apply mx-5px my-6px;
      }
    }
  }
}
</style>