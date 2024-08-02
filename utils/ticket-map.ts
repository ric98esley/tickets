import type { TicketResponse, Ticket } from "~/types";
import { timeSince } from "./date-format";

export const ticketEntityMapper = (data: TicketResponse): Ticket => {
  let createdBy = undefined
  let assignedTo = undefined
  let status = undefined
  let thread = undefined
  let route = undefined

  if (data.expand.createdBy) createdBy = userMapper(data.expand.createdBy)
  if (data.expand.assignedTo) assignedTo = userMapper(data.expand.assignedTo)
  if (data.expand.status) status = statusMapper(data.expand.status)
  if (data.expand.thread) thread = threadEntityMapper(data.expand.thread)
  if (data.expand.route) route = routeMapper(data.expand.route)

  return {
    id: data.id,
    customerName: data.customerName,
    phone: data.phone,
    createdBy,
    assignedTo,
    status,
    agentCode: data.agentCode,
    conversationId: data.conversationId,
    senderId: data.senderId,
    thread,
    route,
    isClosed: data.isClosed,
    closedAt: data.closedAt,
    timeSince: timeSince(data.created),
    createdAt: data.created,
    updatedAt: data.updated
  }
}
