import type { User, UserFind, UserResponse } from "~/types"

interface FindUsers {
  rows: User[],
  total: number
}

export const useFindUser = async (data: UserFind) : Promise<FindUsers>=> {
  try {
    const { $pb } = useNuxtApp()

    let filter = ''

    constructQuery(filter, `id~"${data.id}"`)
    constructQuery(filter, `name~"${data.name}"`)
    constructQuery(filter, `username~"${data.username}"`)
    constructQuery(filter, `email~"${data.email}"`)
    constructQuery(filter, `role.name~"${data.role}"`)

    const resultList = await $pb.collection<UserResponse>('users').getList(1, 0, {
      expand: 'role',
      sort: 'created',
      filter
    })

    const users = resultList.items.map((data) => {
      return userMapper(data)
    }) ?? []

    return {
      rows: users,
      total: resultList.totalItems
    }
  } catch (error) {
    console.log(error)
    return {
      rows: [],
      total: 0
    }
  }
}