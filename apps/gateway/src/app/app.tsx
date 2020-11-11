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

    <Layout children={
      <BrowserRouter>
        <PeripheralContextProvider>
          <Switch>
            <Route path="/gateway/:id" component={GatewayDetail} />
            <Route path="/">
              <Gateways />
            </Route>
          </Switch>
        </PeripheralContextProvider>
      </BrowserRouter>
    }></Layout>

  );
}
export default App;
