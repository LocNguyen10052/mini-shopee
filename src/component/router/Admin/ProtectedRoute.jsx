import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminHeader from "../../productManager/router/header/adminHeader.component";
import AdminFooter from "../../productManager/router/footer/adminFooter.component";
import { Skeleton } from 'antd';
import { getCartALL, unSnapshotCartAdmin } from '../../../utils/firebase.cart';
import { getAllOrder, unSnapShotOrderAdmin } from '../../../utils/firebase.order';
import { findAllProduct } from '../../../utils/firebase.createproduct';
import { getAllStockOut, stockInAll, unSnapShotStockOut } from '../../../utils/firebase.stock';
import { fetchStockOutSusscess } from '../../../store/stock-out-store/stock-out-action';
import { fetchStockInSusscess } from '../../../store/stock-in-store/stock-in-action';



function AdminLoader() {
    return (
        <Skeleton />
    );
}
function ProtectedRoute() {
    const dispatch = useDispatch();

    //lấy cart all
    const fetchCartAll = async () => {
        await getCartALL(dispatch);
    }

    //lấy stockOut all
    const fetchStockOutAll = async () => {
        await getAllStockOut(dispatch);
    }

    //lấy order all
    const fetchOrderAll = async () => {
        await getAllOrder(dispatch);
    }

    //lấy product all
    const fetchProductAll = async () => {
        await findAllProduct(dispatch);
    }
    const fetchStockInAll = async () => {
        const stockins = await stockInAll();
        dispatch(fetchStockInSusscess(stockins));
    }
    useEffect(() => {
        fetchCartAll();
        fetchOrderAll();
        fetchProductAll();
        fetchStockOutAll();
        fetchStockInAll();
        return () => {
            unSnapshotCartAdmin();
            unSnapShotOrderAdmin();
        }
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