import { Action, createReducer, on } from '@ngrx/store';
import { ProductType } from '../../models';
import * as fromProductType from '../actions/product-types.actions';
export interface ProductTypesState {
  entities: { [id: string]: ProductType };
  loading: boolean;
  loaded: boolean;
}

export const initialState: ProductTypesState = {
  entities: {},
  loaded: false,
  loading: false,
};

const featureReducer = createReducer(
  initialState,

  on(
    fromProductType.CreateProductTypeRequest,
    fromProductType.UpdateProductTypeRequest,
    fromProductType.GetAllProductTypesRequest,
    (state) => ({ ...state, loading: true })
  ),

  on(
    fromProductType.GetAllProductTypesRequestSuccess,
    (state, { productTypes }) => {
      const entities = productTypes.reduce(
        (productTypeEntities, type) => {
          return { ...productTypeEntities, [type.id]: type };
        },
        { ...state.entities }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromProductType.CreateProductTypeRequestSuccess,

    (state, { productType }) => {
      const entities = { ...state.entities, [productType.id]: productType };

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromProductType.UpdateProductTypeRequestSuccess,
    (state, { productType }) => {
      const {
        [productType.id]: productToUpdate,
        ...remainingEntities
      } = state.entities;
      const entities = { ...remainingEntities, [productType.id]: productType };

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromProductType.CreateProductTypeRequestFailure,
    fromProductType.UpdateProductTypeRequestFailure,
    fromProductType.GetAllProductTypesRequestFailure,
    (state) => ({ ...state, loaded: false, loading: false })
  )
);

export function reducer(
  state: ProductTypesState | undefined,
  action: Action
): ProductTypesState {
  return featureReducer(state, action);
}

export const getProductTypesEntities = (state: ProductTypesState) =>
  state.entities;
export const getProductTypesLoading = (state: ProductTypesState) =>
  state.loading;
export const getProductTypesLoaded = (state: ProductTypesState) => state.loaded;
