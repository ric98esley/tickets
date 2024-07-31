import type { Ticket } from "~/types/tickets";
import type { Route, RouteResponse } from "~/types/routes";

export const routeMapper = (data: RouteResponse): Route => {
  let assignedTo = undefined
  let createdBy = undefined
  if (data.expand?.assignedTo) assignedTo = userMapper(data.expand.assignedTo)
  if (data.expand?.createdBy) createdBy = userMapper(data.expand.createdBy)

  return {
    id: data.id ?? 'sin-id',
    name: data.name ?? 'Sin ruta',
    assignedTo,
    createdBy,
    tickets: [],
    closed: data.closed,
    started: data.started,
    created: data.created,
    updated: data.updated
  }
}