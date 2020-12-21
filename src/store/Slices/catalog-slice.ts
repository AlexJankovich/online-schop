import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type CatalogType = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export type CatalogStateType = {
  catalog: CatalogType [],
  currentPage: number
  perPage:number
  totalPageCount: number
}

const initialState: CatalogStateType = {
  catalog: [],
  currentPage: 1,
  perPage: 0,
  totalPageCount: 1
};

const slice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    setCatalog(state, action: PayloadAction<{ data: CatalogType[] }>) {
      return {...state, catalog: [...action.payload.data]};
    },
    setTotalCount(state, action: PayloadAction<{ totalCount: number }>) {
      state.totalPageCount = action.payload.totalCount;
    },
    setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      state.currentPage = action.payload.currentPage;
    },
    setPerPage(state, action: PayloadAction<{ perPge: number }>) {
      state.perPage = action.payload.perPge;
    },
  },

});

export const {setCatalog, setTotalCount, setCurrentPage, setPerPage} = slice.actions;
export const catalogReducer = slice.reducer;