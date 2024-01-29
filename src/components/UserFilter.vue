<template>
  <div class="user-filter">
    <div class="filter-header">
      <h2 class="filter-title">Filter Users</h2>
    </div>
    <div class="filter-inputs">
      <input
        class="filter-input"
        v-model="filterName"
        placeholder="Filter by Name"
        @input="emitFilterName"
      />
      <input
        class="filter-input"
        v-model="filterLastName"
        placeholder="Filter by Last Name"
        @input="emitFilterLastName"
      />
      <input
        class="filter-input"
        v-model="filterEmail"
        placeholder="Filter by Email"
        @input="emitFilterEmail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'

import { useDebounceFn } from '@vueuse/core'
import type { IUser } from '@/types/IUserApi'

const props = defineProps({
  users: {
    type: Array as PropType<IUser[]>,
    required: true
  }
})

const emit = defineEmits(['update:filterName', 'update:filterLastName', 'update:filterEmail'])

const filterName = ref('')
const filterLastName = ref('')
const filterEmail = ref('')

const emitFilterName = () => {
  emit('update:filterName', filterName.value)
}

const emitFilterLastName = () => {
  emit('update:filterLastName', filterLastName.value)
}

const emitFilterEmail = () => {
  emit('update:filterEmail', filterEmail.value)
}

const debouncedEmitFilterName = useDebounceFn(emitFilterName, 500)
const debouncedEmitFilterLastName = useDebounceFn(emitFilterLastName, 500)
const debouncedEmitFilterEmail = useDebounceFn(emitFilterEmail, 500)

watch(
  () => props.users,
  () => {
    debouncedEmitFilterName()
    debouncedEmitFilterLastName()
    debouncedEmitFilterEmail()
  }
)
</script>

<style scoped>
.user-filter {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
}
@media (max-width: 768px) {
  .filter-inputs {
    flex-direction: column;
  }
}
.filter-header {
  text-align: center;
  margin-bottom: 10px;
}

.filter-title {
  font-size: 18px;
}

.filter-inputs {
  display: flex;
  gap: 10px;
}

.filter-input {
  margin-top: 5px;
  align-items: center;
  background: #fff;
  border: 1px solid var(--border-input-color);
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(40, 46, 51, 0.2);
  box-shadow: inset 0 1px 2px rgba(40, 46, 51, 0.2);
  color: var(--color-font);
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  height: 44px;
  padding: 12px 16px;
}

.filter-input:focus {
  outline: none;
  border: 1px solid var(--border-input-color-focus);
}
</style>
