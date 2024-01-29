<template>
  <div class="block">
    <div v-if="loading" class="loader"></div>
    <div v-else-if="userDetails" class="user-details-modal">
      <div class="user-info">
        <img
          :src="userDetails.avatar"
          :alt="userDetails.first_name + ' ' + userDetails.last_name"
          class="user-image"
        />
      </div>
      <h2 class="title">{{ userDetails.first_name }} {{ userDetails.last_name }}</h2>
      <p class="text">{{ userDetails.email }}</p>
      <p v-if="userDetails?.address" class="text">address: {{ userDetails?.address }}</p>
      <p v-if="userDetails?.phone" class="text">phone: {{ userDetails?.phone }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useToast } from 'vue-toastification'
import { getUser } from '@/services/api'
import type { IUser } from '@/types/IUserApi'
import type { PropType } from 'vue'

const props = defineProps({
  userId: {
    type: [Number, String],
    required: true
  },
  user: {
    type: Object as PropType<IUser>,
    required: true
  }
})

const loading = ref(false)
const userDetails = ref<IUser | null>(null)
const toast = useToast()
onMounted(async () => {
  try {
    console.log(props.user)
    loading.value = true
    await getUser(props.userId)
    userDetails.value = props.user
  } catch (error) {
    toast.error('Error fetching users', {
      timeout: 2000
    })
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.block {
  width: 250px;
  height: 400px;
}
.user-details-modal {
  background-color: var(--font-color);
  border-radius: 8px;
  height: 100%;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  background-color: rgba(255, 255, 255, 0.8);
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% -50%);
  width: 40px;
  height: 40px;
  border: 4px solid #3498db;
  border-radius: 50%;
  border-top: 4px solid #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.user-info {
  margin: 0 auto;
}

.user-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.title {
  margin-bottom: 0.5rem;
  color: #333;
}

.text {
  margin: 0.5rem 0;
  color: #777;
}
</style>
