import type { Ticket, TicketResponse } from "./tickets";
import type { User, UserResponse } from "./user";

interface Expand {
  createdBy?: UserResponse;
  assignedTo?: UserResponse;
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

export interface RouteCreate {
  name: string;
  assignedTo: string;
  started: string;
  tickets: Ticket[];
}

export interface RouteUpdate {
  name?: string;
  assignedTo?: string;
  started?: string;
  closed?: string;
  tickets?: Ticket[];
}