import type { Status, StatusCreate, StatusFind } from "~/types"

export const useStatusStore = defineStore('List Status', () => {
  const status = reactive<Status[]>([])
  const totalPages = ref(1)

  async function setStatus(data: Status[]) {
    status.splice(0)
    data.forEach((item) => {
      status.push(item)
    })
  }


  async function getStatus(data: StatusFind) {
    const { rows, total } = await useFindStatus({ ...data })

    totalPages.value = total
    await setStatus(rows)
    return rows
  }

  async function createStatus(data: StatusCreate) {
    const result = await useSaveStatus(data)
    return result
  }
  return {
    status,
    totalPages,
    getStatus,
    createStatus
  }
})