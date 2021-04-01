export interface CreateAdminModel {
  email: string;
  firstName: string;
  otherName: string;
  lastName: string;
  password: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
}

export interface CreateAboutModel {
  nameOfCompany: string;
  aboutTitle: string;
  aboutMessage: string;
}

export interface AboutModel {
  id: string;
  nameOfCompany: string;
  aboutTitle: string;
  aboutMessage: string;
}
