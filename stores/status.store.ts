import type { Status, StatusFind } from "~/types"

export const useStatusStore = defineStore('List Status', () => {
  const status = reactive<Status[]>([])
  const page = ref(1)
  const limit = ref(10)
  const totalPages = ref(1)

  async function setStatus(data: Status[]) {
    status.splice(0)
    data.forEach((item) => {
      status.push(item)
    })
  }


  async function getStatus(data: StatusFind) {
    const { rows, total} = await useFindStatus({...data, page: page.value, limit: limit.value})

    totalPages.value = total
    await setStatus(rows)
    return rows
  }
  return {
    status,
    totalPages,
    limit,
    page,
    getStatus
  }
})