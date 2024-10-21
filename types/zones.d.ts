export interface ZoneResponse {
  id: string;
  name: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  updated: Date;
}

export interface Zone {
  id: string;
  name: string;
  created: Date;
  updated: Date;
}


export interface ZoneCreate {
  name: string;
}