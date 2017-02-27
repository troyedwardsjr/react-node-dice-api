import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../css/main.css';
import 'bootstrap-grid/dist/grid.css'

injectTapEventPlugin();

const AppWrapper = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
