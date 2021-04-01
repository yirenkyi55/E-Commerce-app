import { createAction, props } from '@ngrx/store';
import {
  AboutModel,
  Contact,
  CreateAboutModel,
  CreateAdminModel,
  User,
} from '../../models';

export const GetAllAdminsRequest = createAction(
  '[Admins] Get All Admins Request'
);

export const GetAllAdminsRequestSuccess = createAction(
  '[Admins] Get All Admins Request Success',
  props<{ response: User[] }>()
);

export const GetAllAdminsRequestFailure = createAction(
  '[Admins] Get All Admins Request Failure',
  props<any>()
);

export const CreateAdminRequest = createAction(
  '[Admins] Create Admin Request',
  props<CreateAdminModel>()
);

export const CreateAdminRequestSuccess = createAction(
  '[Admins] Create Admin Request Success',
  props<{ response: User }>()
);

export const CreateAdminRequestFailure = createAction(
  '[Admins] Create Admin Request Failure',
  props<any>()
);

export const GetAllContactsRequest = createAction(
  '[Admins] Get All Contacts Request'
);

export const GetAllContactsRequestSuccess = createAction(
  '[Admins] Get All Contacts Request Success',
  props<{ response: Contact[] }>()
);

export const GetAllContactsRequestFailure = createAction(
  '[Admins] Get All Contacts Request Failure',
  props<any>()
);

export const CreateAboutRequest = createAction(
  '[Admins] Create About Request',
  props<CreateAboutModel>()
);

export const CreateAboutRequestSuccess = createAction(
  '[Admins] Create About Request Success',
  props<{ response: AboutModel }>()
);

export const CreateAboutRequestFailure = createAction(
  '[Admins] Create About Request Failure',
  props<any>()
);

export const GetAboutRequest = createAction('[Admins] Get About Request');

export const GetAboutRequestSuccess = createAction(
  '[Admins] Get About Request Success',
  props<{ response: AboutModel }>()
);

export const GetAboutRequestFailure = createAction(
  '[Admins] Get About Request Failure',
  props<any>()
);
