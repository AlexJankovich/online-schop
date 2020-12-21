import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterStateType = {
  searchValue: string,
  sortPriceValue: any,
  sortCategory: string,
  categoryArr: Array<string>
}

const initialState: FilterStateType = {
  categoryArr: [''],
  searchValue: '',
  sortCategory: '',
  sortPriceValue: ''
};

const slice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryArr(state, action: PayloadAction<{ arr: Array<string> }>) {
      return {...state, categoryArr: ['', ...action.payload.arr]};
    },
    setSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
      state.searchValue = action.payload.searchValue;
    },
    setSortCategory(state, action: PayloadAction<{ sortCategory: string }>) {
      state.sortCategory = action.payload.sortCategory;
    },
    setSortPriceValue(state, action: PayloadAction<{ sortPriceValue: number }>) {
      state.sortPriceValue = action.payload.sortPriceValue;
    },
  }
});

export const {setCategoryArr, setSearchValue, setSortCategory, setSortPriceValue} = slice.actions;
export const filterReducer = slice.reducer;