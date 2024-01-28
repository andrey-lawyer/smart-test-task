<template>
  <div class="user-block">
    <h2 class="user-title">User List</h2>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="user-card">
        <div class="user-info">
          <img
            :src="user.avatar"
            :alt="user.first_name + ' ' + user.last_name"
            class="user-image"
          />
        </div>
        <button class="user-name-button" type="button" @click="handleUserClick(user.id!, user)">
          {{ user.first_name }} {{ user.last_name }}
        </button>
        <p class="user-email">{{ user.email }}</p>
        <UserActions
          :userId="user.id!"
          :user="user"
          :deleteUserLocally="deleteUserLocally"
          :updateUserLocally="updateUserLocally"
        />
      </li>
    </ul>
  </div>
  <ModalUi v-model:isShown="modelVisible">
    <UserDetailsModal :userId="idUser" :user="oneUser!" />
  </ModalUi>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import UserActions from './UserActions.vue'
import type { IUser } from '@/types/IUserApi'
import type { PropType } from 'vue'
import useModal from '@/hooks/useModal'
import ModalUi from './ModalUi.vue'
import UserDetailsModal from './UserDetailsModal.vue'
const { modelVisible, showModal } = useModal()

const idUser = ref<number | string>('')
const oneUser = ref<IUser | null>()

defineProps({
  users: {
    type: Array as PropType<IUser[]>,
    required: true
  },
  deleteUserLocally: {
    type: Function,
    required: true
  },
  updateUserLocally: {
    type: Function,
    required: true
  }
})

const handleUserClick = (userId: number | string, user: IUser) => {
  console.log(`Show details for user with ID: ${userId}`)
  idUser.value = userId
  oneUser.value = user
  showModal()
}
</script>

<style scoped>
.user-block {
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
}
.user-title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
}
.user-list {
  list-style: none;
  padding: 0;
  display: flex;

  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
}

.user-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 1.5rem);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.user-name-button {
  background-color: transparent;
  border: none;
  font-weight: bold;
}

.user-email {
  margin: 0;
}

@media (max-width: 768px) {
  .user-list {
    flex-direction: column;
  }

  .user-card {
    text-align: center;
    width: 100%;
  }
}
</style>
