import React, {ChangeEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Select, SimpleWrapper, SomeItem, Wrapper} from '../Common/Styled';
import {RootStateType} from '../store/root-state';
import {CatalogType} from '../store/Slices/catalog-slice';
import {
  FilterStateType,
  setCategoryArr,
  setSearchValue,
  setSortCategory,
  setSortPriceValue
} from '../store/Slices/filter-slice';
import {Catalog} from './Сatalog';


export type CatalogPropsType = {
  data: CatalogType[]
}

export const Filter = React.memo((props: CatalogPropsType) => {

  const dispatch = useDispatch();
  const {
    sortPriceValue,
    sortCategory,
    searchValue,
    categoryArr
  } = useSelector<RootStateType, FilterStateType>(state => state.filter);

  const sortArr: Array<string> = props.data.map((i, index) => {
    if (index === 0) {
      return i.category;
    } else if (i.category !== props.data[index - 1].category) {
      return i.category;
    } else {
      return '';
    }
  }).filter(i => i !== '' || i);

  useEffect(() => {
    dispatch(setCategoryArr({arr: sortArr}));
  }, [dispatch]);

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue({searchValue: e.currentTarget.value}));
  };

  const changePriceHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortPriceValue({sortPriceValue: +e.currentTarget.value}));
  };

  const changeCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch((setSortCategory({sortCategory: e.currentTarget.value})));
  };

  let searchData = [...props.data];

  const sortPrice = (value: Array<CatalogType>, params: any) => {
    searchData = value.sort(function (a, b) {
      if (a.price > b.price) {
        return params;
      }
      if (a.price < b.price) {
        return -params;
      }
      return 0;
    });
  };

  const filterCategory = (value: Array<CatalogType>, params: string) => {
    searchData = value.filter(i => i.category === params);
  };

  searchData = props.data.filter(i => i.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);

  if (sortPriceValue !== '') {
    sortPrice(searchData, sortPriceValue);
  }

  if (sortCategory !== '') {
    filterCategory(searchData, sortCategory);
  }

  return (
    <>
      <Wrapper>
        <Container style={{display: 'flex', flexWrap: 'wrap'}}>
          <SimpleWrapper>
            <SomeItem>search</SomeItem>
            <input
              value={searchValue}
              onChange={changeInputHandler}
              style={{fontSize: '1.3rem'}}
            />
          </SimpleWrapper>

          <SimpleWrapper>
            <SomeItem>sort by price</SomeItem>
            <Select value={sortPriceValue} onChange={changePriceHandler}>
              <option value={''}></option>
              <option value={-1}>price +</option>
              <option value={1}>price -</option>
            </Select>
          </SimpleWrapper>

          <SimpleWrapper>
            <SomeItem>sort by category</SomeItem>
            <Select value={sortCategory} onChange={changeCategoryHandler}>
              {categoryArr.map((i, index) => {
                return <option value={i} key={index}>{i}</option>;
              })}
            </Select>
          </SimpleWrapper>
        </Container>
      </Wrapper>
      <Catalog data={searchData}/>
    </>
  );
});