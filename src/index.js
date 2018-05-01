import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './containers/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
// import Layouts from './layouts';

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
