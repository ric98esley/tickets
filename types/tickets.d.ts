import type { Agent, AgentResponse } from "./agents";
import type { Department, DepartmentResponse } from "./groups";
import type { Route, RouteResponse } from "./routes";
import type { Status, StatusResponse } from "./status";
import type { User, UserResponse } from "./user";

interface Expand {
  assignedTo: UserResponse;
  createdBy: UserResponse;
  status: StatusResponse;
  route: RouteResponse;
  department: DepartmentResponse;
  agent: AgentResponse;
}
export interface TicketResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  updated: Date;
  phone: string;
  agent: string;
  createdBy: string;
  status: string;
  conversationId: number;
  senderId: number;
  isClosed: boolean;
  closedAt: Date;
  route: string;
  assignedTo: string;
  department: string;
  content: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  senderId: number;
  conversationId: number;
  phone: string;
  createdBy?: User;
  assignedTo?: User;
  agent?: Agent;
  department?: Department;
  content: string;
  status?: Status;
  agentCode: string;
  isClosed: boolean;
  timeSince?: string;
  route?: Route;
  closedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTicket {
  phone: string;
  agent: string;
  createdBy: string;
  status: string;
  conversationId: number;
  senderId: number;
  isClosed?: boolean;
  closedAt?: Date;
  route: string;
  assignedTo?: string;
  department?: string;
  content: string;
}

export interface TicketUpdate {
  phone?: string | null;
  agent?: string | null;
  senderId?: number | null;
  conversationId?: number | null;
  route?: string | null;
  department?: string | null;
  isClosed?: boolean | null;
  assignedTo?: string | null;
  status?: string | null;
  content?: string | null;
  closedAt?: Date | null;
}

export interface TicketResolve {
  content: string
}

export interface FindTickets {
  id?: string;
  page?: number;
  limit?: number;
  sort?: string;
  customerName?: string;
  phone?: string;
  email?: string;
  createdBy?: string;
  assignedTo?: string;
  department?: string;
  content?: string;
  status?: string;
  agentCode?: string;
  conversationId?: number;
  senderId?: number;
  isClosed?: boolean | string;
  closedAtStart?: string;
  closedAtEnd?: string;
  createdStart?: Date;
  createdEnd?: Date;
}

export type FindTicketsKeys = keyof FindTickets

