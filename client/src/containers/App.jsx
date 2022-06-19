import React from 'react';
import { Provider } from 'react-redux';
import {store} from '../store';
import decode from 'jwt-decode';
import { setToken, setCurrentUser, addError } from '../store/actions';
import api from '../services/api';
if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}
const App = () => (
    <Provider store={store}>
    <div>App works</div>
      {/* <Router>
        <Fragment>
          <NavBar />
          <RouteViews />
        </Fragment>
      </Router> */}
    </Provider>
  );
// class App extends React.Component {
//     //this function runs imdiately after below render
//     async componentDidMount() {
//    const result =await api.call('post','auth/login',{
//     username:'username',
//     password:'password'
//    });
//    console.log(result);
//     }
//     render() { 
//         return <div>App works</div>
//     }
// }
export default App;