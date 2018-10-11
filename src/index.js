import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { Router, Route, browserHistory } from "react-router";

import "./main.css";
import reducers from "reducers";
import Layout from "containers/Layout";
import Phones from "containers/Phones";
import Phone from "containers/Phone";
import Basket from "containers/Basket";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Layout}>
        <Route path="/" component={Phones} />
        <Route path="/categories/:id" component={Phones} />
      </Route>
      <Route path="/phones/:id" component={Phone} />
      <Route path="/basket" component={Basket} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
