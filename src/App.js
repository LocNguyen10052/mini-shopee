import logo from './logo.svg';
import './App.css';
import Navigation from './component/router/navigation/navigation.component';
import { Routes, Route } from 'react-router'
import Home from './component/utils/Home/home.component';
import Category from './component/category/category.component';
import Directory from './component/directory/directory.component';
import { Col, Container, Row } from 'react-bootstrap';

const Shop = () => {
  return <div> Shop </div>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}>
        <Route index={true} element={<Directory></Directory>}></Route>
      </Route>
    </Routes>


  );
}

export default App;
