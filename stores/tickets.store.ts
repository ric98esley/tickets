import type { FindTickets, Ticket } from "~/types";


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
      tickets.unshift(ticket)
    }
    else {
      const index = tickets.findIndex(t => t.id === ticket.id)
      if (index !== -1) {
        tickets[index] = ticket
      }
    }
  }
  function removeTicket(ticket: Ticket) {
    const index = tickets.findIndex(t => t.id === ticket.id)
    if (index !== -1) {
      tickets.splice(index, 1)
    }
  }

  function realtimeTicketHandlers() {
    subscribeTickets((ticket, action) => {
      if (action === 'create') {
        total.value++
        addTicket(ticket)
      }
      if (action === 'update') {
        addTicket(ticket)
      }
      if (action === 'delete') {
        removeTicket(ticket)
      }
      if (ticket.isClosed) {
        removeTicket(ticket)
        return
      }
    })
  }

  async function fetchTickets(data: FindTickets) {
    return await useFindTickets(data)
  }
  return {
    tickets,
    total,
    page,
    getTicketsByStatus,
    fetchTickets,
    realtimeTicketHandlers,
    addTicket,
    addTickets,
    removeTicket,
  }
})