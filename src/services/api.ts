import axios from 'axios'
import type { IDataAll, IUser } from '@/types/IUserApi'
import type { IDataSubmit } from '@/types/IDataSubmit'

axios.defaults.baseURL = import.meta.env.VITE_BACK_URL

export async function getAllUsers(page: number = 1): Promise<IDataAll> {
  const { data } = await axios.get(`users?page=${page}`)
  return data
}

export async function getUser(userId: number | string): Promise<IUser> {
  const { data } = await axios.get(`users/${userId}`)
  return data.data
}

export async function updateUser(
  userId: number | string,
  updatedUserData: IDataSubmit
): Promise<any> {
  const { data } = await axios.put(`users/${userId}`, updatedUserData)
  return data
}

export async function deleteUser(userId: number | string): Promise<void> {
  await axios.delete(`users/${userId}`)
}

export async function addUser(userData: IDataSubmit): Promise<any> {
  const { data } = await axios.post('users', userData)
  return data
}
