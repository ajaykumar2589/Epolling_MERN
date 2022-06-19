import React from 'react';
import api from '../services/api';
//const App=()=><div>App Works</div>
class App extends React.Component {
    //this function runs imdiately after below render
    async componentDidMount() {
   const result =await api.call('post','auth/login',{
    username:'username',
    password:'password'
   });
   console.log(result);
    }
    render() { 
        return <div>App works</div>
    }
}
export default App;