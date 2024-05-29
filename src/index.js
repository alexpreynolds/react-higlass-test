import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const App = React.lazy(async () => (await import ('./App')));

ReactDOM.render(<React.Suspense fallback={<>...</>}><App /></React.Suspense>, document.getElementById('root'));

reportWebVitals();
