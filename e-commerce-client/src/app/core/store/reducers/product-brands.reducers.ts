import { Action, createReducer, on } from '@ngrx/store';
import { ProductBrand } from '../../models';
import * as fromBrandAction from '../actions/product-brands.actions';

export interface ProductBrandState {
  entities: { [id: string]: ProductBrand[] };
  loading: boolean;
  loaded: boolean;
}

export const initialState: ProductBrandState = {
  entities: {},
  loaded: false,
  loading: false,
};

const featureReducer = createReducer(
  initialState,
  on(
    fromBrandAction.CreateProductBrandRequest,
    fromBrandAction.GetAllBrandsForTypeRequest,
    fromBrandAction.UpdateProductBrandRequest,
    (state) => ({ ...state, loading: true })
  ),

  on(
    fromBrandAction.GetAllBrandsForTypeRequestSuccess,
    (state, { typeId, brands }) => {
      const entities = { ...state.entities, [typeId]: brands };
      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromBrandAction.UpdateProductBrandRequestSuccess,
    (state, { typeId, brand }) => {
      const { [typeId]: brandsToUpdate, ...remainingBrands } = state.entities;

      const filteredBrands = brandsToUpdate.filter((b) => b.id !== brand.id);
      const updatedBrands = [...filteredBrands, brand];
      const entities = { ...remainingBrands, [typeId]: updatedBrands };

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromBrandAction.CreateProductBrandRequestSuccess,
    (state, { typeId, brand }) => {
      const { [typeId]: brandsToUpdate, ...remainingBrands } = state.entities;
      const updatedBrands = [...brandsToUpdate, brand];
      const entities = { ...remainingBrands, [typeId]: updatedBrands };
      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromBrandAction.CreateProductBrandRequestFailure,
    fromBrandAction.GetAllBrandsForTypeRequestFailure,
    fromBrandAction.UpdateProductBrandRequestFailure,
    (state) => ({ ...state, loading: false, loaded: false })
  )
);

export function reducer(
  state: ProductBrandState | undefined,
  action: Action
): ProductBrandState {
  return featureReducer(state, action);
}

export const getBrandsEntities = (state: ProductBrandState) => state.entities;
export const getBrandsLoading = (state: ProductBrandState) => state.loading;
export const getBrandsLoaded = (state: ProductBrandState) => state.loaded;
