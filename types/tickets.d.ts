export interface TicketResponse {
  id:              string;
  created:         Date;
  updated:         Date;
  customer_name:   string;
  phone:           string;
  created_by:      string;
  assigned_to:     string;
  status:          string;
  agent_code:      string;
  conversation_id: number;
  sender_id:       number;
  is_closed:       boolean;
  closed_at:       Date;
}

export interface Ticket {
  id:             string;
  customerName:   string;
  phone:          string;
  createdBy:      string;
  assignedTo:     string;
  status:         string;
  agentCode:      string;
  conversationId: number;
  senderId:       number;
  isClosed:       boolean;
  closedAt:       Date;
  createdAt:      Date;
  updatedAt:      Date;
}

