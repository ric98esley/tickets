import type { FindTickets, Ticket, TicketCreate, TicketResponse, TicketUpdate } from "~/types"
import { ticketEntityMapper } from "~/utils/ticket-map"

const expand = 'createdBy,assignedTo,status,department,route,route.zone,agent,agent.zone'

function makeFilter(data: FindTickets): string {
  let filter = ''
  if (data.id) filter = constructQuery(filter, `id~"${data.id}"`)
  if (data.agent) filter = constructQuery(filter, `(agent.code~"${data.agent}" || agent.name~"${data.agent}")`)
  if (data.zone) filter = constructQuery(filter, `agent.zone.name~"${data.zone}"`)
  if (data.createdBy) filter = constructQuery(filter, `createdBy.username~"${data.createdBy}"`)
  if (data.assignedTo) filter = constructQuery(filter, `assignedTo.username~"${data.assignedTo}"`)
  if (data.department) filter = constructQuery(filter, `department.name~"${data.department}"`)
  if (data.content) filter = constructQuery(filter, `content~"${data.content}"`)
  if (data.status) filter = constructQuery(filter, `status.name~"${data.status}"`)
  if (data.createdStart) filter = constructQuery(filter, `created>"${dateForFilterFormatted(data.createdStart)}"`)
  if (data.createdEnd) filter = constructQuery(filter, `created<"${dateForFilterFormatted(data.createdEnd)}"`)
  if (data.isClosed !== undefined) filter = constructQuery(filter, `isClosed=${data.isClosed}`)
  if (data.closedAtStart) filter = constructQuery(filter, `closedAt>"${dateForFilterFormatted(data.closedAtStart)}"`)
  if (data.closedAtEnd) filter = constructQuery(filter, `closedAt<"${dateForFilterFormatted(data.closedAtEnd)}"`)
  if (data.conversationId) filter = constructQuery(filter, `conversationId="${data.conversationId}"`)
  if (data.senderId) filter = constructQuery(filter, `senderId="${data.senderId}"`)
  if (data.phone) filter = constructQuery(filter, `phone~"${data.phone}"`)

  return filter
}

export async function useFindTickets(data: FindTickets): Promise<{ total: number, rows: Ticket[] }> {
  try {
    let filter = makeFilter(data)

    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<TicketResponse>('tickets').getList(data.page ?? 1, data.limit ?? 100, {
      expand: expand,
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

export async function useFindTicketsByAssignedTo(assignedTo: string, data: FindTickets): Promise<{ total: number, rows: Ticket[] }> {
  try {
    let filter = makeFilter(data)
    filter = constructQuery(filter, `assignedTo="${assignedTo}"`)

    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<TicketResponse>('tickets').getList(data.page ?? 1, data.limit ?? 100, {
      expand: expand,
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

export async function useFindTicketsByRoute(route: string, data: FindTickets): Promise<{ total: number, rows: Ticket[] }> {
  try {
    let filter = makeFilter(data)
    filter = constructQuery(filter, `route="${route}"`)

    const { $pb } = useNuxtApp()
    const resultList = await $pb.collection<TicketResponse>('tickets').getList(data.page ?? 1, data.limit ?? 100, {
      expand: expand,
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

export async function useFindAllTicketByRoute(routeId: string): Promise<Ticket[]> {
  try {
    const { $pb } = useNuxtApp()
    const tickets = await $pb.collection<TicketResponse>('tickets').getFullList({
      filter: `route="${routeId}"`,
      expand
    })

    return tickets.map(ticketEntityMapper)
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function useFindOneTicket(id: string): Promise<Ticket | null> {
  try {
    const { $pb } = useNuxtApp()
    const ticket = await $pb.collection<TicketResponse>('tickets').getOne(id, {
      expand: expand,
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
      createdBy: userStore.user?.id,
    }, {
      expand: expand,
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
      expand: expand,
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

export async function useUpdateTicketWhere(filter: string, data: TicketUpdate): Promise<boolean> {
  try {
    const { $pb } = useNuxtApp()
    const tickets = await $pb.collection<TicketResponse>('tickets').getFullList({
      filter
    })

    for (const ticket of tickets) {
      await $pb.collection<TicketResponse>('tickets').update(ticket.id, data)
    }

    return true
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al actualizar el ticket intenta de nuevo',
      color: 'red',
    })
    console.log(error)
    return false
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
      expand: expand,
    }
  )
}

export async function useFindAllByZoneId({ zoneId = '', isClosed = false }): Promise<Ticket[]> {
  const { $pb } = useNuxtApp()

  const result = await $pb.collection<TicketResponse>('tickets').getFullList({
    filter: `agent.zone.id="${zoneId}" && isClosed=${isClosed}`,
    expand
  })

  return result.map(ticketEntityMapper)
}