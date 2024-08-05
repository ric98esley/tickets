import type { Department, DepartmentResponse } from "./department";
import type { Route, RouteResponse } from "./routes";
import type { Status, StatusResponse } from "./status";
import type { User, UserResponse } from "./user";

interface Expand {
  assignedTo: UserResponse;
  createdBy:  UserResponse;
  status:     StatusResponse;
  route:     RouteResponse;
  department: DepartmentResponse;
}
export interface TicketResponse {
  id:             string;
  created:        Date;
  updated:        Date;
  customerName:   string;
  phone:          string;
  createdBy:      string;
  assignedTo:     string;
  status:         string;
  agentCode:      string;
  conversationId: number;
  senderId:       number;
  content:        string;
  route:          string;
  isClosed:       boolean;
  closedAt:       Date;
  expand:          Expand;
}

export interface Ticket {
  id:             string;
  customerName:   string;
  senderId:       number;
  conversationId: number;
  phone:          string;
  createdBy?:     User;
  assignedTo?:    User;
  department?:    Department;
  content:        string;
  status?:        Status;
  agentCode:      string;
  isClosed:       boolean;
  timeSince?:     string;
  route?:          Route;
  closedAt:       Date;
  createdAt:      Date;
  updatedAt:      Date;
}

export interface TicketCreate {
  id?:            string;
  customerName:   string;
  phone:          string;
  agentCode:      string;
  senderId?:      number;
  route?:         string;
  department:     string;
  conversationId?:number;
  isClosed?:      boolean;
  assignedTo?:    string;
  status:         string;
  content:        string;
}

export interface TicketUpdate {
  customerName?:   string | null;
  phone?:          string | null;
  agentCode?:      string | null;
  senderId?:       number | null;
  conversationId?: number | null;
  route?:          string | null;
  department?:     string | null;
  isClosed?:       boolean | null;
  assignedTo?:     string | null;
  status?:         string | null;
  content?:        string | null;
  closedAt?:       Date | null;
}

export interface TicketResolve {
  content: string
}

export interface FindTickets {
  id?:             string;
  page?:           number;
  limit?:          number;
  sort?:           string;
  customerName?:   string;
  phone?:          string;
  email?:          string;
  createdBy?:      string;
  assignedTo?:     string;
  department?:     string;
  content?:        string;
  status?:         string;
  agentCode?:      string;
  conversationId?: number;
  senderId?:       number;
  isClosed?:       boolean | string;
  closedAtStart?:  string;
  closedAtEnd?:    string;
  createdStart?:   Date;
  createdEnd?:     Date;
}

export type FindTicketsKeys = keyof FindTickets

