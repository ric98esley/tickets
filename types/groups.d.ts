import type { User, UserResponse } from "./user";

interface Expand {
  manager: UserResponse;
}

export interface GroupResponse {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  name:           string;
  code:           string;
  phone:          string;
  manager:        string;
  expand?:        Expand;
}


export interface Group {
  id:             string;
  name:           string;
  code:           string;
  phone:          string;
  manager?:       User;
  created:        Date;
  updated:        Date;
}

export interface GroupCreate {
  name:           string;
  code:           string;
  phone:          string;
  manager:        string;
}

export interface GroupUpdate {
  name?:          string | null;
}

export interface FindGroup {
  limit?:          number;
  page?:         number;
  name?:          string;
}


