import type { FindTickets, Ticket, TicketCreate, TicketResponse, TicketUpdate } from "~/types"
import { ticketEntityMapper } from "~/utils/ticket-map"

function makeFilter(data: FindTickets): string {
  let filter = ''
  if (data.id) filter += constructQuery(filter, `id~"${data.id}"`)
  if (data.agentCode) filter += constructQuery(filter, `agentCode~"${data.agentCode}"`)
  if (data.customerName) filter += constructQuery(filter, `customerName~"${data.customerName}"`)
  if (data.createdBy) filter += constructQuery(filter, `createdBy.username~"${data.createdBy}"`)
  if (data.assignedTo) filter += constructQuery(filter, `assignedTo.username~"${data.assignedTo}"`)
  if (data.status) filter += constructQuery(filter, `status.name~"${data.status}"`)
  if (data.createdStart && data.createdEnd) filter += constructQuery(filter, `created>"${data.createdStart}" && created<"${data.createdEnd}"`)
  if (data.isClosed !== undefined) filter += constructQuery(filter, `isClosed=${data.isClosed}`)
  if (data.closedAtStart && data.closedAtEnd) filter += constructQuery(filter, `closedAt>"${data.closedAtStart}" && closedAt<"${data.closedAtEnd}"`)
  if (data.conversationId) filter += constructQuery(filter, `conversationId="${data.conversationId}"`)
  if (data.senderId) filter += constructQuery(filter, `senderId="${data.senderId}"`)
  if (data.phone) filter += constructQuery(filter, `phone~"${data.phone}"`)

  return filter
}

export async function useFindTickets(data: FindTickets): Promise<{ total: number, rows: Ticket[] }> {
  try {
    let filter = makeFilter(data)

    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<TicketResponse>('tickets').getList(data.page ?? 1, data.limit ?? 100, {
      expand: 'createdBy,assignedTo,status',
      sort: '-created',
      filter
    })

    const tickets = resultList.items.map((data) => {
      return ticketEntityMapper(data)
    }) ?? []

    return {
      total: resultList.totalItems,
      rows: tickets
    }
  } catch (error) {
    console.log(error)
    return {
      total: 0,
      rows: []
    }
  }
}

export async function useFindOneTicket(id: string): Promise<Ticket | null> {
  try {
    const { $pb } = useNuxtApp()
    const ticket = await $pb.collection<TicketResponse>('tickets').getOne(id, {
      expand: 'createdBy,assignedTo,status',
    })

    return ticketEntityMapper(ticket)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function useCreateTicket(data: TicketCreate): Promise<Ticket | null> {
  try {
    const { $pb } = useNuxtApp()
    const userStore = useUserStore()
    const ticket = await $pb.collection<TicketResponse>('tickets').create({
      ...data,
      agentCode: data.agentCode,
      customerName: data.customerName,
      createdBy: userStore.user?.id,
    }, {
      expand: 'createdBy,assignedTo,status',
    })

    return ticketEntityMapper(ticket)
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al crear el ticket intenta de nuevo',
      color: 'red',
    })
    console.log(error)
    return null
  }
}

export async function useUpdateTicket(id: string, data: TicketUpdate): Promise<Ticket | null> {
  try {
    const { $pb } = useNuxtApp()
    const ticket = await $pb.collection<TicketResponse>('tickets').update(id,
      data, {
      expand: 'createdBy,assignedTo,status',
    })

    return ticketEntityMapper(ticket)
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al actualizar el ticket intenta de nuevo',
      color: 'red',
    })
    console.log(error)
    return null
  }
}

export async function useDeleteTicket(id: string): Promise<boolean> {
  const toast = useToast()
  try {
    const { $pb } = useNuxtApp()
    await $pb.collection<TicketResponse>('tickets').delete(id)

    toast.add({
      title: 'Ticket eliminado correctamente',
      color: 'green',
    })

    return true
  } catch (error) {
    console.log(error)
    toast.add({
      title: 'Error al eliminar el ticket intenta de nuevo',
      color: 'red',
    })
    return false
  }
}

export async function subscribeTickets(callback: (ticket: Ticket, action: string) => void) {
  const { $pb } = useNuxtApp()
  $pb.collection<TicketResponse>('tickets').subscribe('*', (e) => {
    callback(ticketEntityMapper(e.record), e.action)
  },
    {
      expand: 'createdBy,assignedTo,status',
    }
  )
}