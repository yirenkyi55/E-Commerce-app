import { Action, createReducer, on } from '@ngrx/store';
import { Pagination, Product } from '../../models';
import * as fromProductAction from '../actions/products.actions';
export interface ProductsState {
  entities: { [id: string]: Product };
  homePageProducts: Product[];
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
}

export const initialState: ProductsState = {
  entities: {},
  loading: false,
  loaded: false,
  pagination: null,
  homePageProducts: [],
};

const featureReducer = createReducer(
  initialState,

  on(
    fromProductAction.CreateProductRequest,
    fromProductAction.GetProductRequest,
    fromProductAction.GetProductsRequest,
    fromProductAction.UpdateProductRequest,
    fromProductAction.DeleteProductRequest,
    fromProductAction.GetHomePageProductsRequest,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(fromProductAction.GetProductsRequestSuccess, (state, { response }) => {
    const entities = response.results.reduce((productEntities, product) => {
      return { ...productEntities, [product.id]: product };
    }, {});

    const pagination: Pagination = {
      currentPage: response.currentPage,
      totalCount: response.totalCount,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
      hasNext: response.hasNext,
      hasPrevious: response.hasPrevious,
    };

    return {
      ...state,
      entities,
      pagination,
      loading: false,
      loaded: true,
    };
  }),

  on(
    fromProductAction.GetHomePageProductsRequestSuccess,
    (state, { response }) => {
      const homePageProducts = response.results;

      return {
        ...state,
        homePageProducts,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(
    fromProductAction.GetProductRequestSuccess,
    fromProductAction.UpdateProductRequestSuccess,
    fromProductAction.CreateProductRequestSuccess,
    (state, { product }) => {
      const entities = { ...state.entities, [product.id]: product };
      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }
  ),

  on(fromProductAction.DeleteProductRequestSuccess, (state, { productId }) => {
    const { [productId]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities,
      loaded: true,
      loading: false,
    };
  }),

  on(
    fromProductAction.CreateProductRequestFailure,
    fromProductAction.GetProductRequestFailure,
    fromProductAction.GetProductsRequestFailure,
    fromProductAction.UpdateProductRequestFailure,
    fromProductAction.DeleteProductRequestFailure,
    fromProductAction.GetHomePageProductsRequestFailure,
    (state) => ({
      ...state,
      loading: false,
      loaded: false,
    })
  )
);

export function reducer(
  state: ProductsState | undefined,
  action: Action
): ProductsState {
  return featureReducer(state, action);
}

export const getProductsEntities = (state: ProductsState) => state.entities;
export const getProductsLoading = (state: ProductsState) => state.loading;
export const getProductsLoaded = (state: ProductsState) => state.loaded;
export const getProductsPagination = (state: ProductsState) => state.pagination;
export const getHomePageProducts = (state: ProductsState) =>
  state.homePageProducts;
