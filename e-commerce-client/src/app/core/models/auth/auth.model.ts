export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface AuthUserRequestResponse {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  otherName: string;
  lastName: string;
  bio: string;
  photo: string;
  accessToken: string;
  roles: string[];
}
