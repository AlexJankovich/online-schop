import {Dispatch} from 'react';
import {toggleIsFetching} from '../Slices/initialize-slice';
import {setProduct} from '../Slices/produkt-slice';

export const getProductData = (id:number) => {
  return (dispatch: Dispatch<any>)=>{
    dispatch(toggleIsFetching({isFetching:true}))
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res=> {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json=> {
        dispatch(setProduct({data:json}));
        dispatch(toggleIsFetching({isFetching:false}))
      })
  }
}