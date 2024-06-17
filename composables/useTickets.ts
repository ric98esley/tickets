import type { Ticket, TicketResponse } from "~/types"
import { ticketEntityMapper } from "~/utils/ticket-map"

interface FindTickets {
  page: number
  limit: number
  sort: string
  customerName: string
  phone: string
  createdBy: string
  assignedTo: string
  status: string
  agentCode: string
  conversationId: number
  senderId: number
  isClosed: boolean
  closedAt: Date
  createdAt: Date
  updatedAt: Date
}

export function useTickets () {
  class TicketsService{
  private _pb = useNuxtApp().$pb
  async find() : Promise<Ticket[]> {
    try {
      console.log(this._pb)
      const resultList = await this._pb.collection<TicketResponse>('tickets').getList(1, 0, {
        
      })

      const tickets = resultList.items.map((data) => {
        return ticketEntityMapper(data)
      }) ?? []

      return tickets
    } catch (error) {
      console.log(error)
      return []
    }
  }}

  const ticketInstance = new TicketsService()

  return ticketInstance
}