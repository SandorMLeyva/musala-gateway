import React from 'react';
import Layout from './layout';
import { Gateways } from './views/gateways';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import GatewayDetail from './views/detailGateway';
import { PeripheralContextProvider } from './context';


function App() {
  return (

    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/gateway/:id" >
            <PeripheralContextProvider>
              <GatewayDetail />
            </PeripheralContextProvider>
          </Route>
          <Route path="/">
            <Gateways />
          </Route>
        </Switch>
      </Layout>
    </ BrowserRouter>

  );
}
export default App;
