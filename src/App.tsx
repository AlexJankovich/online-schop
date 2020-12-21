import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Preloader} from './Common/Preloader';
import {Div} from './Common/Styled';
import {Filter} from './components/Filter';
import {Product} from './components/Product';
import {RootStateType} from './store/root-state';
import {CatalogType, setCatalog} from './store/Slices/catalog-slice';
import {InitializeStateType, setInitialize} from './store/Slices/initialize-slice';
import {getData} from './store/Thunks/GetData';

function App() {

  const dispatch = useDispatch();

  const initData = useSelector<RootStateType, InitializeStateType>(state => state.init);

  const dataFromStorage = localStorage.getItem('catalog');
  const parsedData: CatalogType[] = dataFromStorage && JSON.parse(dataFromStorage);

  useEffect(() => {
    if (!parsedData && !initData.isInitialized) {
      dispatch(getData());
    } else {
      dispatch(setCatalog({data: parsedData}));
      dispatch(setInitialize({isInitialize: true}));
    }
  }, [dispatch, parsedData]);


  return (
    <BrowserRouter>
      <Div>
        {!initData.isInitialized
          ? <Preloader/>
          : <Switch>
            <Route exact path={'/'} render={() => <Filter data={parsedData}/>}/>
            <Route path={'/product/:id?'} render={() => <Product/>}/>
          </Switch>
        }
      </Div>
    </BrowserRouter>
  );
}

export default App;
