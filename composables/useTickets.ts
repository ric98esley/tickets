import type { Ticket, TicketResponse } from "~/types"
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
      expand: 'created_by,assigned_to,status',
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