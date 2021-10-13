import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utility";
import {setCurrentUser} from "./redux/user/user.action";

class App extends React.Component {

    unSubsribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unSubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data() // stucture data from database
                        }
                    });
                });
            }
            setCurrentUser(userAuth); // null if user not log in
        })
    };

    componentWillUnmount() {
        this.unSubsribeFromAuth = null;
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signin' component={SignInSignUp}/>
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    null,
    mapDispatchToProps
)(App);
