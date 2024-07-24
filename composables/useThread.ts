import type { Thread, ThreadResponse, CreateThread } from "~/types"

export const useListThread = async (ticketId: string): Promise<Thread[]> => {
  try {
    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<ThreadResponse>('ticket_thread').getFullList({
      expand: 'createdBy,ticket,inResponseTo',
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
        createdBy: userStore.user.id
      },
      {
        expand: 'createdBy,ticket,inResponseTo',
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