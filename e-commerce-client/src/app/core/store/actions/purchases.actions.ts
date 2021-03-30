import { createAction, props } from '@ngrx/store';
import { PurchaseResponse } from '../../models';

export const GetAllPurchasesRequest = createAction(
  '[Purchases] Get All Purchases Request'
);

export const GetAllPurchasesRequestSuccess = createAction(
  '[Purchases] Get All Purchases Request Success',
  props<{ response: PurchaseResponse[] }>()
);

export const GetAllPurchasesRequestFailure = createAction(
  '[Purchases] Get All Purchases Request Failure',
  props<any>()
);

export const ToggleDeliveryRequest = createAction(
  '[Purchases] Toggle Delivery Request',
  props<{ purchaseId: string }>()
);

export const ToggleDeliveryRequestSuccess = createAction(
  '[Purchases] Toggle Delivery Request Success',
  props<{ response: PurchaseResponse }>()
);

export const ToggleDeliveryRequestFailure = createAction(
  '[Purchases] Toggle Delivery Request Failure',
  props<any>()
);
