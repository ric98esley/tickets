import type { Thread, ThreadResponse, CreateThread } from "~/types"

export const useListThread = async (ticketId: string): Promise<Thread[]> => {
  try {
    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<ThreadResponse>('ticket_thread').getFullList({
      expand: 'created_by,ticket,in_response_to',
      sort: 'created',
      filter: `ticket = '${ticketId}'`
    })

    const threads = resultList.map((data) => {
      return threadEntityMapper(data)
    }) ?? []

    return threads
  } catch (error) {
    console.log(error)
    return []
  }
}

export const useCreateThread = async (thread: CreateThread): Promise<Thread | undefined> => {
  try {
    const { $pb } = useNuxtApp()
    const userStore = useUserStore();

    if (!userStore.user?.id) {
      throw new Error('No hay un usuario')
    }

    const data = await $pb.collection<ThreadResponse>('ticket_thread').create(
      {
        ...thread,
        created_by: userStore.user.id
      },
      {
        expand: 'created_by,ticket,in_response_to',
      }
    )
    return threadEntityMapper(data)
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'No se pudo responder al ticket',
      color: 'red',
    })
    return undefined
  }
}