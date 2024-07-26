import type { Ticket } from "~/types/tickets";
import type { Route, RouteResponse } from "~/types/routes";

export const routeMapper = (data: RouteResponse): Route => {
  let assignedTo = undefined
  let createdBy = undefined
  let tickets : Ticket[] = []
  if (data.expand?.assignedTo) assignedTo = userMapper(data.expand.assignedTo)
  if (data.expand?.createdBy) createdBy = userMapper(data.expand.createdBy)
  if (data.expand?.tickets) tickets = data.expand.tickets.map(ticketEntityMapper)

  return {
    id: data.id ?? 'sin-id',
    name: data.name ?? 'Sin ruta',
    assignedTo,
    createdBy,
    tickets: tickets ?? [],
    closed: data.closed,
    started: data.started,
    created: data.created,
    updated: data.updated
  }
}