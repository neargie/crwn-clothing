import React, {useEffect} from 'react';
import './App.css';
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-and-sign-up.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selector";
import CheckOut from "./pages/checkout/checkout.component";
import {checkUserSession} from "./redux/user/user.action";

const App = ({checkUserSession, currentUser}) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckOut}/>
                <Route
                    exact
                    path='/signin'
                    render={() => currentUser ? (<Redirect to="/"/>) : (<SignInSignUp/>)}/>
            </Switch>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
