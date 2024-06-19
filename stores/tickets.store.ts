import type { Ticket } from "~/types";

interface TicketsState {
  tickets: Ticket[]
  page: number
  total: number
}

export const useTicketsStore = defineStore('List tickets', () => {
  const tickets = reactive<Ticket[]>([])
  const page = ref(1)
  const total = ref(0)

  const getTicketsByStatus = computed((status) => {
    return tickets.filter(ticket => ticket.status === status)
  })

  function addTickets(rows: Ticket[]) {
    for (const row of rows) {
      addTicket(row)
    }
  };
  function addTicket(ticket: Ticket) {
    if (!tickets.find(t => t.id === ticket.id)) {
      tickets.push(ticket)
    }
    else {
      tickets.map(t => t.id === ticket.id ? ticket : t)
    }
  }
  function removeTicket(ticket: Ticket) {
    tickets.splice(tickets.indexOf(ticket), 1)
  }

  async function fetchTickets() {
    return await useFindTickets({})
  }
  return {
    tickets,
    total,
    page,
    getTicketsByStatus,
    fetchTickets,
    addTicket,
    addTickets,
    removeTicket,
  }
})