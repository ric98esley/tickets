import type { Ticket, TicketResponse } from "./tickets";
import type { User } from "./user";

interface Expand {
  createdBy?:  UserResponse;
  ticket:      TicketResponse;
  inResponseTo?: ThreadResponse;
}

export interface ThreadResponse {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  content:        string;
  inResponseTo: string;
  ticket:         string;
  expand:         Expand;
  createdBy:     string;
}

export interface Thread {
  id:             string;
  created:        Date;
  updated:        Date;
  content:        string;
  inResponseTo?:   Thread;
  ticket:         string;
  createdBy?:     User;
}

export interface CreateThread {
  content: string;
  ticket: string;
  inResponseTo?: string;
}
