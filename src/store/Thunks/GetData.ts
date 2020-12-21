import {Dispatch} from 'react';
import {CatalogType} from '../Slices/catalog-slice';
import {toggleIsFetching} from '../Slices/initialize-slice';

export const getData = () => {
  return (dispatch: Dispatch<any>)=>{
    dispatch(toggleIsFetching({isFetching:true}))
    fetch('https://fakestoreapi.com/products')
      .then(res=> {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json=> {
        const storageData:CatalogType[] = json
        localStorage.setItem('catalog', JSON.stringify(storageData))
        dispatch(toggleIsFetching({isFetching: false}));
        // console.log(json);
      })
  }
}