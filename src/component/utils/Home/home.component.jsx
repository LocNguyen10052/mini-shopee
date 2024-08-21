import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../router/navigation/navigation.component';
import { Outlet } from 'react-router-dom';


function Home() {
    return (
        <div>
            <Navigation></Navigation>
            <Outlet></Outlet>
        </div>
    );
}

export default Home;