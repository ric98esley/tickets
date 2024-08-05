export interface DepartmentResponse {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  name:           string;
}

export interface Department {
  id:             string;
  name:           string;
  createdAt:      Date;
  updatedAt:      Date;
}

export interface DepartmentCreate {
  name:           string;
}

export interface DepartmentUpdate {
  name?:          string | null;
}

export interface FindDepartment {
  limit?:          number;
  page?:         number;
  name?:          string;
}


