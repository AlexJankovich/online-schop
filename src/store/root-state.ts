import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { catalogReducer } from './Slices/catalog-slice';
import {filterReducer} from './Slices/filter-slice';
import {initReducer} from './Slices/initialize-slice';
import {productReducer} from './Slices/produkt-slice';


const RootState = combineReducers({
  init: initReducer,
  catalog: catalogReducer,
  product: productReducer,
  filter: filterReducer
});

export type RootStateType = ReturnType<typeof RootState>

export const store = configureStore({
  reducer: RootState,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});