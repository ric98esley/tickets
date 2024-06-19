import type { TicketResponse, Ticket} from "~/types";

export const ticketEntityMapper = (data: TicketResponse ) : Ticket => {
  let createdBy = userMapper(data.expand.created_by)
  let assignedTo = userMapper(data.expand.assigned_to)
  let status = statusMapper(data.expand.status)

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
    createdAt: data.created,
    updatedAt: data.updated
  }
}
