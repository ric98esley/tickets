export interface StatusResponse {
  id: string;
  name: string;
  color: string;
  updated: Date;
  created: Date;
  collectionName: string;
  collectionId: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  updated: Date;
  created: Date;
}

export interface StatusCreate {
  name: string;
  color: string;
}

export interface StatusUpdate {
  id: string;
  name?: string;
  color?: string;
}

export interface StatusDelete {
  id: string;
}

export interface StatusFind {
  id?: string;
  name?: string;
  color?: string;
  page?: number;
  limit?: number;
}
