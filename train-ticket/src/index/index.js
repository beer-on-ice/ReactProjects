import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from '../serviceWorker'

import store from './store/store'

import App from './App.jsx'

import 'normalize.css/normalize.css'
import './index.css'

ReactDOM.render(
	// 全局注入store
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
