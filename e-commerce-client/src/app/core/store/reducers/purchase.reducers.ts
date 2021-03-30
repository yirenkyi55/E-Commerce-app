import { Action, createReducer, on } from '@ngrx/store';
import { PurchaseResponse } from '../../models';
import * as fromPurchaseAction from '../actions/purchases.actions';
export interface PurchaseState {
  entities: { [id: string]: PurchaseResponse };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PurchaseState = {
  entities: {},
  loading: false,
  loaded: false,
};

const featureReducer = createReducer(
  initialState,
  on(
    fromPurchaseAction.GetAllPurchasesRequest,
    fromPurchaseAction.ToggleDeliveryRequest,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(
    fromPurchaseAction.GetAllPurchasesRequestSuccess,
    (state, { response }) => {
      const entities = response.reduce((purchaseEntities, purchaseResponse) => {
        return { ...purchaseEntities, [purchaseResponse.id]: purchaseResponse };
      }, {});

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(fromPurchaseAction.ToggleDeliveryRequestSuccess, (state, { response }) => {
    const {
      [response.id]: purchaseToEdit,
      ...remainingPurchases
    } = state.entities;
    const entities = { ...remainingPurchases, [response.id]: response };

    return {
      ...state,
      entities,
      loading: false,
      loaded: true,
    };
  }),

  on(
    fromPurchaseAction.GetAllPurchasesRequestFailure,
    fromPurchaseAction.ToggleDeliveryRequestFailure,
    (state) => ({
      ...state,
      loading: false,
      loaded: false,
    })
  )
);

export function reducer(
  state: PurchaseState | undefined,
  action: Action
): PurchaseState {
  return featureReducer(state, action);
}

export const getPurchaseEntities = (state: PurchaseState) => state.entities;
export const getPurchaseLoading = (state: PurchaseState) => state.loading;
export const getPurchaseLoaded = (state: PurchaseState) => state.loaded;
