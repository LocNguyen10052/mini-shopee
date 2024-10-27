import './App.css';
import { Routes, Route } from 'react-router'
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
import { getListCategories } from './store/category-store/category-action';
import { CartSnapShoot, getCartSnapShoot } from './utils/firebase.cart';

import Checkout from './component/Checkout/checkoutDirectory/checkout.component';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [])
  useEffect(() => {
    const unsubscribe = onStateAuthChangeListener(async (user) => {
      if (user) {
        createUser(user);
      }
      dispatch(setCurrentUser(user));
      if (user) {
        getCartSnapShoot(user.email, dispatch)
      }
    });
    const getList = async () => {
      await getListCategories(dispatch)
    }
    getList()
    return unsubscribe;
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}>
        <Route index={true} element={<Directory></Directory>}></Route>
        <Route path="/category/:categoryid" element={<ListCategory></ListCategory>}></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
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
