import type { Ticket, TicketCreate, TicketResponse, TicketUpdate } from "~/types"
import { ticketEntityMapper } from "~/utils/ticket-map"

interface FindTickets {
  page?: number
  limit?: number
  sort?: string
  customerName?: string
  phone?: string
  createdBy?: string
  assignedTo?: string
  status?: string
  agentCode?: string
  conversationId?: number
  senderId?: number
  isClosed?: boolean
  closedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export async function useFindTickets(data: FindTickets): Promise<Ticket[]> {
  try {
    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<TicketResponse>('tickets').getList(1, 0, {
      expand: 'createdBy,assignedTo,status',
      sort: 'created',
    })

    const tickets = resultList.items.map((data) => {
      return ticketEntityMapper(data)
    }) ?? []

    return tickets
  } catch (error) {
    console.log(error)
    return []
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