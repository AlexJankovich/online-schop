import React from 'react';
import {NavLink} from 'react-router-dom';
import {
  Category,
  Container,
  ContentContainer,
  Description,
  DescriptionContainer,
  LinkContainer,
  Price,
  Wrapper
} from '../Common/Styled';
import {CatalogType} from '../store/Slices/catalog-slice';
import {CatalogPropsType} from './Filter';

export const CatalogTable = (props:CatalogPropsType) => {
  return (
    <>
      <Wrapper>
        {props.data.map((i:CatalogType) => {
          return (
            <Container key={i.id}>
              <h1>{i.title}</h1>

              <ContentContainer>
                <LinkContainer>
                  <NavLink to={`/product/${i.id}`}>
                    <img src={i.image} alt="it`s foto"/>
                  </NavLink>
                </LinkContainer>
                <DescriptionContainer>
                  <Category><span>Category: <b>{i.category}</b></span></Category>
                  <Price><span>Price: <b>{i.price}</b> $</span></Price>
                  <Description>{i.description}</Description>
                </DescriptionContainer>
              </ContentContainer>
            </Container>
          );
        })}
      </Wrapper>
    </>
  );
};