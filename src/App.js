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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkUserSession } from './store/user-store/user-action';
import { getCartAndProductID } from './utils/firebase.cart';
import Checkout from './component/Checkout/checkoutDirectory/checkout.component';
import { fetchCategoriesStart } from './store/category-store/category-action';
import { selectCurrentUser, selectLoadedUser } from './store/user-store/user-seletor';
import Manager from './component/productManager/home/Manager';
import ProtectedRoute from './component/router/Admin/ProtectedRoute';
import OrderAdmin from './component/productManager/orderAdmin/orderAdmin';
import NotFound from './component/router/NotFound/NotFound';
import LoginMangager from './component/productManager/login/loginMangager.component';
import Coupon from './component/productManager/coupon/coupon.componet';




function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userIsLoaded = useSelector(selectLoadedUser);

  useEffect(() => {
    dispatch(checkUserSession());
    dispatch(fetchCategoriesStart());
    if (userIsLoaded) {
      const { email } = currentUser
      getCartAndProductID(email, dispatch);
    }
  }, [dispatch, userIsLoaded]);

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
      <Route path='/product/detail/:productID' element={<ProductDetail></ProductDetail>}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<Manager />}></Route>
        <Route path="/admin/createProduct" element={<CreateProduct></CreateProduct>}></Route>
        <Route path="/admin/order" element={<OrderAdmin></OrderAdmin>}></Route>
        <Route path="/admin/coupon" element={<Coupon></Coupon>}></Route>
      </Route>
      <Route path='/unauthorized' element={<NotFound></NotFound>}></Route>
      <Route path="/admin/login" element={<LoginMangager></LoginMangager>}></Route>

      {/* <Route element={<ProtectedRoute />}>
        
      </Route> */}
    </Routes>

  );
}
export default App;
