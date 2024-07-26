import type { Ticket, TicketResponse } from "./tickets";
import type { User, UserResponse } from "./user";

interface Expand {
  createdBy?: UserResponse;
  assignedTo?: UserResponse;
  tickets?: TicketResponse[];
}

export interface RouteResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  updated: Date;
  name: string;
  assignedTo: string;
  createdBy: string;
  tickets: string[];
  closed: Date;
  started: Date;
  expand?: Expand;
}

export interface Route {
  id: string;
  name: string;
  assignedTo?: User;
  createdBy?: User;
  tickets: Ticket[];
  closed: Date;
  started: Date;
  created: Date;
  updated: Date;
}

export interface RouteFind {
  limit?: number;
  page?: number;
  id?: string;
  name?: string;
  assignedTo?: string;
  createdBy?: string;
  closed?: Date;
  started?: Date;
  created?: Date;
}