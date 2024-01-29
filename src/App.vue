<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import useModal from '@/hooks/useModal'
import ModalUi from '@/components/ModalUi.vue'
import FormUser from '@/components/FormUser.vue'
import Loader from '@/components/LoaderUi.vue'
import UserList from '@/components/UserList.vue'
import UserFilter from '@/components/UserFilter.vue'
import { useUsersList } from '@/hooks/useUsersList'

const { modelVisible, showModal, closeModal } = useModal()

const {
  users,
  totalUsers,
  loading,
  fetchUsers,
  deleteUserLocally,
  updateUserLocally,
  addUserLocally
} = useUsersList()

const localFilterName = ref('')
const localFilterLastName = ref('')
const localFilterEmail = ref('')

onMounted(() => {
  fetchUsers()
})

const showMore = () => {
  if (users.value.length < totalUsers.value) {
    fetchUsers()
  }
}

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      user.first_name.includes(localFilterName.value.toLowerCase()) &&
      user.last_name.toLowerCase().includes(localFilterLastName.value.toLowerCase()) &&
      user.email.toLowerCase().includes(localFilterEmail.value.toLowerCase())
    )
  })
})

const isShowMoreActive = computed(() => {
  return !loading.value && users.value.length < totalUsers.value
})
</script>

<template>
  <main class="container main">
    <h1 class="title">Users</h1>

    <UserFilter
      :users="filteredUsers"
      v-model:filterName="localFilterName"
      v-model:filterLastName="localFilterLastName"
      v-model:filterEmail="localFilterEmail"
    />

    <button type="button" class="button add-button" @click="showModal">add User</button>

    <UserList
      :users="filteredUsers"
      :deleteUserLocally="deleteUserLocally"
      :updateUserLocally="updateUserLocally"
    />

    <button type="button" class="button button-show-more" @click="showMore" v-if="isShowMoreActive">
      Show more
    </button>

    <ModalUi v-model:isShown="modelVisible">
      <FormUser type="add" :addUserLocally="addUserLocally" :closeModal="closeModal" />
    </ModalUi>

    <Loader v-if="loading" />
  </main>
</template>

<style scoped>
.main {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.button {
  display: block;
  margin: 0 auto;
  width: 100%;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  transition: 0s;
  text-align: center;
}
.add-button {
  background-color: var(--button-color);
  color: var(--white-color);
  border: 1px solid var(--button-color);
  margin-bottom: 1rem;
  outline: none;
  transition: background-color 0.1s linear;
}

.add-button:hover,
.add-button:focus {
  background-color: var(--button-hover-color);
}
.button-show-more {
  margin-top: 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.button-show-more:hover,
.button-show-more:focus {
  background-color: #2980b9;
}
</style>
