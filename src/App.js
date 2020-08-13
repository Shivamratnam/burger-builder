import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

// Lazy Loading Components
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/orders" component={asyncOrders}/>
        <Route path="/login" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder}/>
      </Switch>
    </Layout>
  );
}

export default App;
