import React, { useEffect } from 'react';
import { selectCurrentUser } from "../../../store/user-store/user-seletor";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../productManager/router/header/adminHeader.component";
import AdminFooter from "../../productManager/router/footer/adminFooter.component";
import { Skeleton } from 'antd';
import { getCartALL } from '../../../utils/firebase.cart';
import { setCartDataFull } from '../../../store/cart-store/cart-action';


function AdminLoader() {
    return (
        <Skeleton />
    );
}
function ProtectedRoute() {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const fetchCartAll = async () => {
        const carts = await getCartALL();
        dispatch(setCartDataFull(carts));
    }
    useEffect(() => {
        fetchCartAll()
    }, [])
    // if (!currentUser) {

    //     return <AdminLoader></AdminLoader>;
    // }

    // if (!currentUser || currentUser.role != 'admin') {
    //     return <Navigate to={'/admin/login'}></Navigate>
    // }

    return (
        <>
            <AdminHeader></AdminHeader>
            <Outlet></Outlet>
            <AdminFooter></AdminFooter>
        </>
    );
}


export default ProtectedRoute;