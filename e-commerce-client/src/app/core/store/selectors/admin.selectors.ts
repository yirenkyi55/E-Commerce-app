import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';
import * as fromAdmins from '../reducers/admins.reducers';
import * as fromRoot from 'src/app/store';

export const getAdminState = createSelector(
  fromReducers.getApplicationState,
  (state) => state.admins
);

export const getAdminsEntities = createSelector(
  getAdminState,
  fromAdmins.getAdminEntities
);

export const getAdmins = createSelector(getAdminsEntities, (entities) =>
  Object.keys(entities).map((id) => entities[id])
);

export const getSelectedAdmin = createSelector(
  getAdminsEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router?.state && entities[router.state.params.adminId];
  }
);

// Get Contacts Entities
export const getContactsEntities = createSelector(
  getAdminState,
  fromAdmins.getContactEntities
);

export const getContacts = createSelector(getContactsEntities, (entities) =>
  Object.keys(entities).map((id) => entities[id])
);

export const getSelectedContact = createSelector(
  getContactsEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router?.state && entities[router.state.params.contactId];
  }
);

export const getAbout = createSelector(getAdminState, fromAdmins.getAboutModel);

export const getAdminsLoading = createSelector(
  getAdminState,
  fromAdmins.getAdminLoading
);

export const getAdminsLoaded = createSelector(
  getAdminState,
  fromAdmins.getAdminLoaded
);
