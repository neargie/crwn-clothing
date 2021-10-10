import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import {auth} from "./firebase/firebase.utility";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            unSubsribeFromAuth: null
        }
    }

    componentDidMount() {
        this.setState({
            unSubsribeFromAuth: auth.onAuthStateChanged(user => {
                this.setState({currentUser: user})

                console.log(user)
            })
        });
    }

    componentWillUnmount() {
        this.setState({unSubsribeFromAuth: null})
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signin' component={SignInSignUp}/>
                </Switch>
            </div>
        );
    }
}

export default App;
