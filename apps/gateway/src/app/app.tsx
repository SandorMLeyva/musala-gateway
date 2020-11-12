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
import NotFound from './components/not-found';


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
          <Route exact path="/">
            <Gateways />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </ BrowserRouter>

  );
}
export default App;
