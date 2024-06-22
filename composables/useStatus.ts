import type { Status, StatusResponse } from "~/types";
import type { StatusCreate, StatusFind, StatusUpdate } from "~/types/status";

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
      sort: '-created',
      filter
    })

    return {
      total: resultList.totalItems,
      rows: resultList.items.map((item) => {
        return statusMapper(item)
      })
    }
  } catch (error) {
    return {
      total: 0,
      rows: []
    }
  }
}

export async function useSaveStatus(data: StatusCreate): Promise<Status | undefined> {
  try {
    const { $pb } = useNuxtApp()

    const result = await $pb.collection<StatusResponse>('status').create(data)
    useToast().add({
      title: 'Estado guardado',
      color: 'green'
    })
    return statusMapper(result)
  } catch (error) {
    useToast().add({
      title: 'No se pudo guardar el estado',
      color: 'red'
    })

    return undefined
  }
}

export async function useUpdateStatus(data: StatusUpdate): Promise<Status | undefined> {
  const toast = useToast()
  try {
    const { $pb } = useNuxtApp()

    const result = await $pb.collection<StatusResponse>('status').update(data.id, data)
    toast.add({
      title: 'Estado actualizado',
      color: 'green'
    })
    return statusMapper(result)
  } catch (error) {
    toast.add({
      title: 'No se pudo actualizar el estado',
      color: 'red'
    })

    return undefined
  }
}

export async function useDeleteStatus(id: string): Promise<boolean> {
  const toast = useToast()
  try {
    const { $pb } = useNuxtApp()

    await $pb.collection<StatusResponse>('status').delete(id)
    toast.add({
      title: 'Estado eliminado',
      color: 'green'
    })
    return true
  } catch (error) {
    toast.add({
      title: 'No se pudo eliminar el estado',
      color: 'red'
    })

    return false
  }
}