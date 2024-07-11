import type { Status, StatusResponse } from "./status";
import type { User, UserResponse } from "./user";

interface Expand {
  assigned_to: UserResponse;
  created_by:  UserResponse;
  status:      StatusResponse;
}
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
  expand:          Expand;
}

export interface Ticket {
  id:             string;
  customerName:   string;
  senderId:       number;
  conversationId: number;
  phone:          string;
  createdBy?:      User;
  assignedTo?:     User;
  status?:         Status;
  agentCode:      string;
  isClosed:       boolean;
  timeSince?:      string;
  closedAt:       Date;
  createdAt:      Date;
  updatedAt:      Date;
}

export interface TicketCreate {
  customerName: string;
  phone:        string;
  agentCode:    string;
  senderId?:     number;
  conversationId?: number;
  assignedTo?:   string;
  status:       string;
  content:     string;
}

