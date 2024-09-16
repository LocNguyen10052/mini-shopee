import React from 'react';
import PropTypes from 'prop-types';

import { Outlet } from 'react-router-dom';
import Footer from '../../component/router/footer/footer.component';
import Navigation from '../../component/router/navigation/navigation.component.jsx'


function Home() {
    return (
        <div>
            <Navigation></Navigation>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}

export default Home;