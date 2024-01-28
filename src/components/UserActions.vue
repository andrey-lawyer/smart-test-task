<template>
  <div class="actions">
    <ButtonAction @click="() => deleteUser(userId)">
      <IconDelete />
    </ButtonAction>
    <ButtonAction @click="showModal">
      <IconUpdate />
    </ButtonAction>
    <ModalUi v-model:isShown="modelVisible">
      <FormUser
        type="update"
        :userId="userId"
        :user="user"
        :updateUserLocally="updateUserLocally"
        :closeModal="closeModal"
      />
    </ModalUi>
    <div v-if="loading" class="loading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import IconDelete from './icons/IconDelete.vue'
import IconUpdate from './icons/IconUpdate.vue'
import ButtonAction from './ButtonAction.vue'
import ModalUi from './ModalUi.vue'
import useModal from '@/hooks/useModal'
import type { IUser } from '@/types/IUserApi'
import FormUser from './FormUser.vue'
import { useUserDEleteApi } from '@/hooks/useUserDeleteApi'

const props = defineProps({
  userId: {
    type: [Number, String],
    String,
    required: true
  },
  user: {
    type: Object as PropType<IUser>,
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

const { modelVisible, showModal, closeModal } = useModal()
const { fetchDeleteUser, responseDelete, loading } = useUserDEleteApi()

const deleteUser = async (id: string | number) => {
  await fetchDeleteUser(id)
  if (responseDelete.value) {
    props.deleteUserLocally!(id)
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  gap: 1rem;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #3498db;
  border-radius: 50%;
  border-top: 4px solid #fff;
  animation: spin 1s linear infinite;
}
</style>
