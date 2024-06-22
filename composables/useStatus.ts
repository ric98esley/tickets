import type { Status, StatusResponse } from "~/types";
import type { StatusFind } from "~/types/status";

function constructQuery(initial: string, add: string): string {
  return initial ? `${initial}&&${add}` : add
}

export async function useFindStatus(data: StatusFind): Promise<{ total: number, rows: Status[] }> {
  try {
    const { $pb } = useNuxtApp()

    let filter = ''

    if (data.name) filter += constructQuery(filter, `name~"${data.name}"`)
    if (data.color) filter += constructQuery(filter, `color~"${data.color}"`)
    if (data.id) filter += constructQuery(filter, `id~"${data.id}"`)

    const resultList = await $pb.collection<StatusResponse>('status').getList(data.page ?? 1, data.limit ?? 10, {
      sort: 'created',
      filter
    })

    return {
      total: resultList.totalPages,
      rows: resultList.items.map((item) => {
        return statusMapper(item)
      })
    }
  } catch (error) {
    console.error(error)
    return {
      total: 0,
      rows: []
    }
  }
}