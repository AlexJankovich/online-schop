import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useParams} from 'react-router-dom';
import {Preloader} from '../Common/Preloader';
import {
  Button,
  Category,
  Container,
  ContentContainer,
  Description,
  DescriptionContainer, ImgContainer,
  Price,
  Wrapper
} from '../Common/Styled';
import {RootStateType} from '../store/root-state';
import {CatalogType} from '../store/Slices/catalog-slice';
import {InitializeStateType} from '../store/Slices/initialize-slice';
import {getProductData} from '../store/Thunks/GetProductData';

export const Product = () => {

  const productId: { id: string } = useParams();

  const dispatch = useDispatch();
  const productData = useSelector<RootStateType, CatalogType>(state => state.product);
  const {isFetching} = useSelector<RootStateType, InitializeStateType>(state => state.init);

  useEffect(() => {
    dispatch(getProductData(+productId.id));
  }, [dispatch, productId.id]);

  return (
    <>
      {isFetching
        ? <Preloader/>
        : <Wrapper>
          <Container style={{textAlign: 'center'}}>
            <Button style={{width: 150}}>
              <NavLink to={'/'}>
                {'<< Back to catalog'}
              </NavLink>
            </Button>
            <Button style={{width: 150}}>
              <NavLink to={`/product/${+productId.id + 1}`}>
                {'Next >>'}
              </NavLink>
            </Button>
          </Container>
          <Container>
            <h1>{productData.title}</h1>

            <ImgContainer>
              <img src={productData.image} alt='foto'/>
            </ImgContainer>

            <DescriptionContainer>
              <Category><span>Category: <b>{productData.category}</b></span></Category>
              <Price><span>Price: <b>{productData.price}</b> $</span></Price>
              <Description>{productData.description}</Description>
            </DescriptionContainer>
          </Container>
        </Wrapper>}
    </>
  );
}
;