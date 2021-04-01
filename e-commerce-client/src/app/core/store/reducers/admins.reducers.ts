import { Action, createReducer, on } from '@ngrx/store';
import { AboutModel, Contact, User } from '../../models';
import * as fromAdmins from '../actions/admins.actions';

export interface AdminState {
  adminEntities: { [id: string]: User };
  contactEntities: { [id: string]: Contact };
  about: AboutModel;
  loading: boolean;
  loaded: boolean;
}

export const initialState: AdminState = {
  adminEntities: {},
  contactEntities: {},
  about: null,
  loading: false,
  loaded: false,
};

const featureReducer = createReducer(
  initialState,
  on(
    fromAdmins.GetAllAdminsRequest,
    fromAdmins.CreateAdminRequest,
    fromAdmins.CreateAboutRequest,
    fromAdmins.GetAboutRequest,
    (state) => ({ ...state, loading: true })
  ),

  on(fromAdmins.GetAllAdminsRequestSuccess, (state, { response }) => {
    const adminEntities = response.reduce((userEntities, user) => {
      return { ...userEntities, [user.id]: user };
    }, {});

    return {
      ...state,
      adminEntities,
      loading: false,
      loaded: true,
    };
  }),

  on(fromAdmins.CreateAdminRequestSuccess, (state, { response }) => {
    const adminEntities = { ...state.adminEntities, [response.id]: response };
    return {
      ...state,
      adminEntities,
      loading: false,
      loaded: true,
    };
  }),

  on(fromAdmins.GetAboutRequestSuccess, (state, { response }) => {
    return {
      ...state,
      loading: false,
      about: response,
      loaded: true,
    };
  }),

  on(fromAdmins.CreateAboutRequestSuccess, (state, { response }) => {
    return {
      ...state,
      loading: false,
      about: response,
      loaded: true,
    };
  }),

  on(fromAdmins.GetAllContactsRequestSuccess, (state, { response }) => {
    const contactEntities = response.reduce((entities, user) => {
      return { ...entities, [user.id]: user };
    }, {});

    return {
      ...state,
      loading: false,
      contactEntities,
      loaded: true,
    };
  }),

  on(
    fromAdmins.GetAllAdminsRequestFailure,
    fromAdmins.CreateAdminRequestFailure,
    fromAdmins.CreateAboutRequestFailure,
    fromAdmins.GetAboutRequestFailure,
    (state) => ({
      ...state,
      loaded: false,
      loading: false,
    })
  )
);

export function reducer(
  state: AdminState | undefined,
  action: Action
): AdminState {
  return featureReducer(state, action);
}

export const getAdminEntities = (state: AdminState) => state.adminEntities;
export const getContactEntities = (state: AdminState) => state.contactEntities;
export const getAboutModel = (state: AdminState) => state.about;
export const getAdminLoading = (state: AdminState) => state.loading;
export const getAdminLoaded = (state: AdminState) => state.loading;
