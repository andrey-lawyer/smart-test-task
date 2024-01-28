import { ref } from 'vue'

import { deleteUser } from '@/services/api'
import { useToast } from 'vue-toastification'

export function useUserDEleteApi() {
  const responseDelete = ref(false)
  const loading = ref(false)
  const toast = useToast()

  async function fetchDeleteUser(userId: number | string) {
    try {
      loading.value = true
      await deleteUser(userId)
      responseDelete.value = true
      toast.success('user deleted', {
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
    fetchDeleteUser,
    responseDelete,
    loading
  }
}
