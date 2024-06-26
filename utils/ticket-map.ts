import type { TicketResponse, Ticket } from "~/types";
import { timeSince } from "./date-format";

export const ticketEntityMapper = (data: TicketResponse): Ticket => {
  let createdBy = undefined
  let assignedTo = undefined
  let status = undefined

  if (data.expand.created_by) createdBy = userMapper(data.expand.created_by)
  if (data.expand.assigned_to) assignedTo = userMapper(data.expand.assigned_to)
  if (data.expand.status) status = statusMapper(data.expand.status)

  return {
    id: data.id,
    customerName: data.customer_name,
    phone: data.phone,
    createdBy,
    assignedTo,
    status,
    agentCode: data.agent_code,
    conversationId: data.conversation_id,
    senderId: data.sender_id,
    isClosed: data.is_closed,
    closedAt: data.closed_at,
    timeSince: timeSince(data.created),
    createdAt: data.created,
    updatedAt: data.updated
  }
}
