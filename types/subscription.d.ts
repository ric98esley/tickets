export interface SubscriptionResponse {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  token:          string;
  user:           string;
}

export interface Subscription {
  created:        Date;
  updated:        Date;
  token:          string;
  user:           string;
}