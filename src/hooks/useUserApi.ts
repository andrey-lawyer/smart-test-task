import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { addUser, updateUser } from '@/services/api'

import type { IDataSubmit } from '@/types/IDataSubmit'

export function useUsersApi() {
  const responseUpdate = ref(false)
  const responseAdd = ref(false)
  const loading = ref(false)
  const toast = useToast()

  async function fetchUpdateUsers(userId: number | string, updatedUserData: IDataSubmit) {
    try {
      loading.value = true
      await updateUser(userId, updatedUserData)
      responseUpdate.value = true
      toast.success('data update', {
        timeout: 2000
      })
    } catch (error) {
        toast.error('Error fetching users', {
          timeout: 2000
        })
      
    } finally {
      loading.value = false
    }
  }

  async function fetchAddUsers(userData: IDataSubmit) {
    try {
      loading.value = true
      await addUser(userData)
      responseAdd.value = true
      toast.success('user added', {
        timeout: 2000
      })
    } catch (error) {
       toast.error('Error fetching users', {
         timeout: 2000
       })
    } finally {
      loading.value = false
    }
  }

  return {
    fetchUpdateUsers,
    fetchAddUsers,
    responseUpdate,
    responseAdd,
    loading
  }
}
