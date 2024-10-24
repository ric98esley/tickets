import type { Group, GroupResponse } from "./groups";
import type { Zone, ZoneResponse } from "./zones";

interface Expand {
  group:    GroupResponse;
  zone:     ZoneResponse;
}

export interface AgentResponse {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  name:           string;
  code:           string;
  phone:          string;
  address:        string;
  inChargeOf:     string;
  group:          string;
  zone:           string;
  facade:         string[];
  expand?:        Expand;
}

export interface Agent {
  id:             string;
  name:           string;
  code:           string;
  phone:          string;
  address:        string;
  inChargeOf:     string;
  group?:         Group;
  zone?:          Zone;
  facade:         string[];
  created:        Date;
  updated:        Date;
}

export interface AgentCreate {
  name:           string;
  code:           string;
  phone:          string;
  inChargeOf:     string;
  group:          string;
  address:        string;
  zone:           string;
  facade:         string[];
}

export interface AgentUpdate {
  name:           string;
  code:           string;
  phone:          string;
  address:        string;
  inChargeOf:     string;
  group:          string;
  zone:           string;
  facade:         string[];
}

export interface AgentFind {
  name?:          string;
  code?:          string;
  phone?:         string;
  inChargeOf?:    string;
  address?:       string;
  group?:         string;
  zone?:          string;
  facade?:        string;
  created?:       Date;
  updated?:       Date;
  limit?:         number;
  page?:          number;
}
