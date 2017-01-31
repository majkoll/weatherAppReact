import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './components/SearchPage'


import './index.css';

class App extends Component {
	render() {
		return (
			<SearchPage />
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
