import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../store/root-state';
import {CatalogStateType, CatalogType, setCurrentPage, setPerPage, setTotalCount} from '../store/Slices/catalog-slice';
import {CatalogTable} from './CatalogTable';
import {CatalogPropsType} from './Filter';
import {Paginator} from './Paginator';

export const Catalog: React.FC<CatalogPropsType> = React.memo(({data}) => {

  const {perPage, totalPageCount, currentPage} = useSelector<RootStateType, CatalogStateType>(state => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTotalCount({totalCount: data.length}));
  }, [dispatch, data.length]);

  let newData:CatalogType[] = []

  if(currentPage === Math.ceil(totalPageCount/perPage)) {newData = [...data.slice((currentPage-1)*perPage)]}
    else {
    newData = [...data.slice((currentPage - 1) * perPage,
      currentPage + perPage >= totalPageCount
        ? (data.length-1)
        : (currentPage - 1) * perPage + perPage)];
  }

  const perPageChange = useCallback((value: number) => {
    dispatch(setPerPage({perPge: value}));
  }, [dispatch]);

  const changePageHandler = useCallback((value: number) => {
    dispatch(setCurrentPage({currentPage: value}));
  }, [dispatch]);

  return (
    <>
      <CatalogTable data={newData}/>
      <Paginator
        totalCount={totalPageCount}
        currentPage={currentPage}
        changePageHandler={changePageHandler}
        changePerPageHandler={perPageChange}
      />
    </>
  );
});