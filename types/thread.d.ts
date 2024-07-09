import type { Ticket, TicketResponse } from "./tickets";
import type { User } from "./user";

interface Expand {
  created_by?:  UserResponse;
  ticket:      TicketResponse;
  in_response_to?: ThreadResponse;
}

export interface ThreadResponse {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  content:        string;
  in_response_to: string;
  ticket:         string;
  expand:         Expand;
  created_by:     string;
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
