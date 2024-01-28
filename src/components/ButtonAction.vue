<template>
  <button type="button" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps(['onClick'])

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
}
</style>
