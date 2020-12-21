import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CatalogType} from './catalog-slice';


const initialState:CatalogType = {
  id:0,
  category:'',
  description:'',
  image:'',
  price:0,
  title:''
}

const slice = createSlice({
  name:'product',
  initialState:initialState,
  reducers:{
    setProduct(state, action:PayloadAction<{data:CatalogType}>){
     return {...action.payload.data}
    }
  }
})

export const productReducer = slice.reducer
export const {setProduct} = slice.actions