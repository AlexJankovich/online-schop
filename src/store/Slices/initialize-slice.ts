import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from 'react';
import { CatalogType } from './catalog-slice';


const initialState = {
  isInitialized:false,
  isFetching: false
}

export type InitializeStateType = typeof initialState

const slice = createSlice ({
  name: 'initialize',
  initialState:initialState,
  reducers:{
    setInitialize(state, action:PayloadAction<{isInitialize:boolean}>){
      state.isInitialized = action.payload.isInitialize
    },
    toggleIsFetching(state, action:PayloadAction<{ isFetching: boolean }>){
      state.isFetching = action.payload.isFetching
    }
  }
})

export const {setInitialize,toggleIsFetching}=slice.actions
export const initReducer = slice.reducer