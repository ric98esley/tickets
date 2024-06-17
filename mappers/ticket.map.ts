import type { TicketResponse, Ticket} from "~/types";

export const TicketMapper = (data: TicketResponse ) : Ticket => {
  return {
    id: data.id,
    customerName: data.customer_name,
    phone: data.phone,
    createdBy: data.created_by,
    assignedTo: data.assigned_to,
    status: data.status,
    agentCode: data.agent_code,
    conversationId: data.conversation_id,
    senderId: data.sender_id,
    isClosed: data.is_closed,
    closedAt: data.closed_at,
    createdAt: data.created,
    updatedAt: data.updated
  }
}
