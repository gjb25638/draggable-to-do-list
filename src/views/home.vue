<template>
  <div class="home">
    <div class="home__container">
      <div class="home__container__text">
        哈哈哈哈哈
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.home {
  &__container {
    @apply w-full h-300px bg-blue-500;

    &__text {
      @apply text-red-500;
    }
  }
}
</style>