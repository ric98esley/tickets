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
}
export interface User {
  id:              string;
  username:        string;
  name:            string;
  role:            string;
  avatar:          string;
  created:         Date;
  email:           string;
  updated:         Date;
  verified:        boolean;
}
