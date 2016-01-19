import '../stylesheets/styleguide.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('app')); // We configured 'app' in the webpack.config.js: plugins.appMountId