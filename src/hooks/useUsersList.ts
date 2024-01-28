import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getAllUsers } from '@/services/api'
import type { IUser } from '@/types/IUserApi'
import { useToast } from 'vue-toastification'

export function useUsersList() {
  const users = ref<IUser[]>([])
  const totalUsers = ref<number>(0)
  const page = ref(1)
  const loading = ref(false)
  const toast = useToast()

  async function fetchUsers() {
    try {
      loading.value = true
      const data = await getAllUsers(page.value)
      users.value = [...users.value, ...data.data]
      totalUsers.value = data.total
      page.value += 1
    } catch (error) {
      toast.error('Error fetching users', {
        timeout: 2000
      })
    } finally {
      loading.value = false
    }
  }

  function deleteUserLocally(userId: number) {
    users.value = users.value.filter((user) => user.id !== userId)
    totalUsers.value -= 1
  }

  function updateUserLocally(userId: number, updatedUserData: IUser) {
    users.value = users.value.map((user) =>
      user.id === userId ? { ...user, ...updatedUserData } : user
    )
  }

  function addUserLocally(newUser: IUser) {
    newUser.id = uuidv4()
    newUser.avatar = '/avatar.jpg'
    users.value = [...users.value, newUser]
    totalUsers.value += 1
  }

  return {
    users,
    totalUsers,
    loading,
    fetchUsers,
    deleteUserLocally,
    updateUserLocally,
    addUserLocally
  }
}
