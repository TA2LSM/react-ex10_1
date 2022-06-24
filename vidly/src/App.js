import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/navbar';
// import Home from './components/home';
// import Products from './components/products';
// import Dashboard from './components/admin/dashboard';
// import Posts from './components/posts';
// import ProductDetails from './components/productDetails';
import NotFound from './components/notFound';

import Customers from './components/customers';
import Rentals from './components/rentals';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

// import Users from './components/admin/users';
// import UserPosts from './components/admin/posts';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className='container position-absolute'>
        <div
          className='row-sm mb-2'
          style={{
            height: '30px',
            backgroundColor: 'aqua',
            border: '3px solid green',
            fontSize: '15px',
            textAlign: 'center',
          }}
        >
          <p style={{ marginTop: '1px' }}>
            <strong>
              <i>Vidly </i>
            </strong>
            Application (Modified by:{' '}
            <strong>
              <a
                target='_blank'
                href='https://github.com/TA2LSM'
              >
                TA2LSM
              </a>
            </strong>
            )
          </p>
        </div>

        <Navbar />
        <div>
          <Routes>
            {/* <Route
              index // path='/' da olur
              element={<Home />}
            />
            <Route
              path='products/:id'
              element={<ProductDetails />}
            />
            <Route
              path='products'
              element={<Products sortBy='newest' />}
            />
            <Route
              path='posts'
              element={<Posts />}
            />
            <Route
              path='posts/:year/:month'
              element={<Posts />}
            />
            <Route
              path='/admin/*'
              element={<Dashboard />}
            /> */}
            <Route
              path='/customers'
              element={<Customers />}
            />
            <Route
              path='/rentals'
              element={<Rentals />}
            />
            <Route
              path='/login'
              element={<LoginForm />}
            />
            <Route
              path='/register'
              element={<RegisterForm />}
            />
            <Route
              path='/movies/:id'
              element={<MovieForm />}
            />
            <Route
              path='/movies'
              element={<Movies />}
            />
            {/* "/messages" yazılmazsa yeni route "/messages/posts" oluyor o da not-found'a gidiyor !!! */}
            <Route
              path='/'
              element={
                <Navigate
                  replace
                  to='/movies'
                />
              }
            />
            <Route
              path='/not-found'
              element={<NotFound />}
            />
            <Route
              path='*'
              element={
                <Navigate
                  replace
                  to='/not-found'
                />
              }
            />
          </Routes>
        </div>
      </main>
    );
  }
}

export default App;
