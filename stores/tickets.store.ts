import type { Ticket } from "~/types";

const ticketsService = useTickets()

interface TicketsState {
  tickets: Ticket[]
  page: number
  total: number
}

export const useTicketsStore = defineStore('tickets', {
  state: (): TicketsState => ({ tickets: [], page: 1, total: 0 }),
  actions: {
    addTicket(ticket: Ticket) {
      if (!this.tickets.find(t => t.id === ticket.id)) {
        this.tickets.push(ticket)
      }
      else {
        this.tickets = this.tickets.map(t => t.id === ticket.id ? ticket : t)
      }
    },
    removeTicket(ticket: Ticket) {
      this.tickets.splice(this.tickets.indexOf(ticket), 1)
    },
  },
  getters: {
    getTicketById: (state) => (id: string): Ticket | undefined => {
      return state.tickets.find(ticket => ticket.id === id)
    },
    getTicketsByStatus: (state) => (status: string): Ticket[] => {
      return state.tickets.filter(ticket => ticket.status === status)
    },
    fetchTickets: (state) => async () => {
      const tickets = await ticketsService.find()
      state.tickets = tickets
    }
  }
})