import type { TicketResponse, Ticket } from "~/types";
import { timeSince } from "./date-format";

export const ticketEntityMapper = (data: TicketResponse): Ticket => {
  let createdBy = undefined
  let assignedTo = undefined
  let status = undefined

  if (data.expand.createdBy) createdBy = userMapper(data.expand.createdBy)
  if (data.expand.assignedTo) assignedTo = userMapper(data.expand.assignedTo)
  if (data.expand.status) status = statusMapper(data.expand.status)

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
    isClosed: data.isClosed,
    closedAt: data.closedAt,
    timeSince: timeSince(data.created),
    createdAt: data.created,
    updatedAt: data.updated
  }
}
