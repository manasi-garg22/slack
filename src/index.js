import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase';

import { connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Spinner from './Spinner';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import {createStore } from 'redux';

import rootReducer from './reducers';
import { setUser , clearUser} from './actions';

const store =createStore(rootReducer, composeWithDevTools());


export class Root extends React.Component {
    componentDidMount() {
       firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user);
                this.props.setUser(user);
                this.props.history.push("/");
    }else {
      this.props.history.push('/login');
      clearUser();}
    });
    }
    render() {
    //  return this.props.isLoading ? ( <Spinner />):(
        return(  <Switch>
            <Route exact path = "/"component = { App }/>
            <Route path = "/Login" component = { Login }/>
            <Route path = "/Register"component = { Register }/>

            </Switch>);
    }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading});

const RootWithAuth = withRouter(connect(mapStateFromProps,{setUser,clearUser})(Root));

ReactDOM.render(<Provider store ={store }>
  <React.Fragment>
  <Router>
  <RootWithAuth />
  </Router>
  </React.Fragment>
  </Provider > ,document.getElementById('root'));
    registerServiceWorker();
