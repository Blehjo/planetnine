import 'bootstrap/dist/css/bootstrap.css';
import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import ReactLoading from "react-loading";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { persistor, store } from './store/store';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

function AppRenderer() {

  return (
    <Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate 
          loading={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
            </div>
          }
          persistor={persistor}
        >
          <App />
          </PersistGate>
        </Provider>
    </BrowserRouter>
  </Fragment>
  );
}

root.render(<AppRenderer />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
