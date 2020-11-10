import React from 'react';
import Layout from './layout';
import { Gateways } from './views/gateways';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import GatewayDetail from './views/detail-gateway';


function App() {
  return (

    <Layout children={
      <BrowserRouter>
        <Switch>
          <Route path="/gateway/:id" component={GatewayDetail}/>          
          <Route path="/">
            <Gateways />
          </Route>
        </Switch>
      </BrowserRouter>
    }></Layout>

  );
}
export default App;
