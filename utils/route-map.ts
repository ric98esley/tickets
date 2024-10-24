import type { Ticket } from "~/types/tickets";
import type { Route, RouteResponse } from "~/types/routes";

export const routeMapper = (data: RouteResponse): Route => {
  let assignedTo = undefined
  let createdBy = undefined
  let zone = undefined
  if (data.expand?.assignedTo) assignedTo = userMapper(data.expand.assignedTo)
  if (data.expand?.createdBy) createdBy = userMapper(data.expand.createdBy)
  if (data.expand?.zone) zone = zoneMapper(data.expand.zone)

  return {
    id: data.id ?? 'sin-id',
    name: `${zone?.name ?? 'sin-zona'} - ${dateFormatted(data.created)}`,
    assignedTo,
    createdBy,
    zone,
    tickets: [],
    closed: data.closed,
    started: data.started,
    created: data.created,
    updated: data.updated
  }
}