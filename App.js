import * as React from 'react';
import Tabstasknavigation from './src/app/navigations/navigationTask/Tabstasknavigation';
import { Provider } from 'react-redux';
import store from './src/app/redux/StoreRedux';
export default function App() {
  return (
    <Provider store={store}>
      <Tabstasknavigation>

      </Tabstasknavigation>
    </Provider>
  );
}
