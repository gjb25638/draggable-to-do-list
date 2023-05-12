<template>
  <div class="home">
    <div class="menu">
      <div
        v-for="item in menu"
        :key="item.name"
        class="item"
      >
        <div class="btn">
          <div class="title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = [{ name: 'new', title: '新遊戲' }, { name: 'read', title: '讀取存檔' }, { name: 'option', title: '遊戲選項' }
]
</script>

<style lang="scss" scoped>
.home {
  @apply w-full h-100vh center bg-black;

  .menu {
    @apply flex flex-col;

    .item {
      .btn {
        @apply center p-10px b-1 b-solid b-blue-500 rounded-2;

        .title {
          @apply c-red-500;
        }
      }
    }
  }
}
</style>
