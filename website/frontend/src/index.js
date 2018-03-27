import React 							from "react";
import ReactDOM 						from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } 					from "react-redux";
import thunk 							from "redux-thunk";
import { composeWithDevTools }			from "redux-devtools-extension";
import { BrowserRouter } 				from "react-router-dom";
import HttpsRedirect 					from "react-https-redirect";
import App 								from "./App";
import rootReducer 						from "./rootReducer";
import registerServiceWorker 			from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css"
import "./index.css";


const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);


ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<HttpsRedirect>
				<App />
			</HttpsRedirect>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);


registerServiceWorker();
