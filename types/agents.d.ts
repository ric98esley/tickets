import type { Receptor } from "./receptor";
import type { Zone, ZoneResponse } from "./zones";

interface Expand {
  receptor: ReceptorResponse;
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
  inChargeOf:     string;
  receptor:       string;
  zone:           string;
  facade:         string[];
  expand?:        Expand;
}

export interface Agent {
  id:             string;
  name:           string;
  code:           string;
  phone:          string;
  inChargeOf:     string;
  receptor:       Receptor;
  zone:           Zone;
  facade:         string[];
  created:        Date;
  updated:        Date;
}
