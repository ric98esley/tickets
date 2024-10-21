import type { User, UserResponse } from "./user";

interface Expand {
  manager: UserResponse;
}

export interface ReceptorResponse {
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

export interface Receptor {
  id:             string;
  name:           string;
  code:           string;
  phone:          string;
  manager:        User;
  created:        Date;
  updated:        Date;
}
