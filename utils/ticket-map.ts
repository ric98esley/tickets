import type { TicketResponse, Ticket } from "~/types";
import { timeSince } from "./date-format";

export const ticketEntityMapper = (data: TicketResponse): Ticket => {
  let createdBy = undefined
  let assignedTo = undefined
  let status = undefined
  let route = undefined
  let department = undefined

  if (data.expand.createdBy) createdBy = userMapper(data.expand.createdBy)
  if (data.expand.assignedTo) assignedTo = userMapper(data.expand.assignedTo)
  if (data.expand.status) status = statusMapper(data.expand.status)
  if (data.expand.route) route = routeMapper(data.expand.route)
  if (data.expand.department) department = departmentMapper(data.expand.department)
  return {
    id: data.id,
    customerName: data.customerName,
    phone: data.phone,
    createdBy,
    assignedTo,
    status,
    department,
    agentCode: data.agentCode,
    conversationId: data.conversationId,
    senderId: data.senderId,
    content: data.content,
    route,
    isClosed: data.isClosed,
    closedAt: data.closedAt,
    timeSince: timeSince(data.created),
    createdAt: data.created,
    updatedAt: data.updated
  }
}
