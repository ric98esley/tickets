import type { Ticket } from "~/types";

export const useUserStore = defineStore('tickets', {
  state: (): { tickets: Ticket[] } => ({ tickets: [] }),
  actions: {
    addTicket(ticket: Ticket) {
      this.tickets.push(ticket)
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
  }
})