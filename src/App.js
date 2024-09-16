import './App.css';
import { Routes, Route, Navigate } from 'react-router'
import Home from './utils/Home/home.component';
import Directory from './component/directory/directory.component';
import SignIn from './component/router/sign-in/sign-in.component';
import SignUp from './component/router/sign-up/sign-up.component';
import CategoryCreate from './component/category/create/categoryCreate.component';
import CreateProduct from './component/product/createproduct/createproduct.component';
import ListCategory from './component/category/listcategory/listcategory.compoent';

import ProductDetail from './component/product/productdetail/product-detail.component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createUser, onStateAuthChangeListener } from './utils/firebase.utils';
import { setCurrentUser } from './store/user-store/user-action';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onStateAuthChangeListener((user) => {
      if (user) {
        createUser(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home></Home>}>
        <Route index={true} element={<Directory></Directory>}></Route>
        <Route path="/category/:categoryid" element={<ListCategory></ListCategory>}></Route>
      </Route>
      <Route path='/signin' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/CreateCategory' element={<CategoryCreate></CategoryCreate>}></Route>
      <Route path='/item' element={<CreateProduct></CreateProduct>}></Route>
      <Route path='/product/detail/:productID' element={<ProductDetail></ProductDetail>}></Route>
    </Routes>

  );
}

export default App;
