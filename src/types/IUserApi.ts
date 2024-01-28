export interface IUser {
  id?: number | string
  email: string
  first_name: string
  last_name: string
  avatar: string
  address?: string
  phone?: string
}

export interface IDataAll {
  data: IUser[]
  total: number
  [key: string]: any
}

export interface INewUserData {
  email: string
  first_name: string
  last_name: string
  avatar?: string
}
