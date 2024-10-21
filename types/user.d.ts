import type { DepartmentResponse } from "./department";

export interface Ability {
  id:       string;
  name:     string;
  created:  Date;
  updated:  Date;
}

export interface RoleResponse {
  id:       string;
  name:     string;
  created:  Date;
  updated:  Date;
  expand?: {
    abilities: Ability[]
  }
}

export interface Role {
  id:       string;
  name:     string;
  created:  Date;
  updated:  Date;
  abilities?: Ability[]
}

export interface UserResponse {
  id:              string;
  name:            string;
  role:            string;
  avatar:          string;
  collectionId:    string;
  collectionName:  string;
  created:         Date;
  email:           string;
  emailVisibility: boolean;
  updated:         Date;
  username:        string;
  verified:        boolean;
  expand?: {
    role: RoleResponse
    departments: DepartmentResponse[]
  }
}
export interface User {
  id:              string;
  username:        string;
  name:            string;
  role?:           Role;
  departments?:     Department[];
  avatar:          string;
  email:           string;
  verified:        boolean;
  updated:         Date;
  created:         Date;
}

export interface UserFind {
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}
