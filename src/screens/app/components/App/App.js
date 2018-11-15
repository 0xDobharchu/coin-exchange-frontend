import React from 'react';
// redux
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';

// app
import Root from './Root';
// store
// import store from '@/stores';
// import history from 'src/services/history';

// class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <Root />
//         </ConnectedRouter>
//       </Provider>
//     );
//   }
// }
const App = () => (<Root />);
export default App;
