import React from 'react';
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

class App extends React.Component {

    unSubsribeFromAuth = null;

    componentDidMount() {
        const {checkUserSession} = this.props;
        checkUserSession();

        // this.unSubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //     if (userAuth) {
        //         const userRef = await createUserProfileDocument(userAuth);
        //         userRef.onSnapshot(snapshot => {
        //             setCurrentUser({
        //                 currentUser: {
        //                     id: snapshot.id,
        //                     ...snapshot.data() // stucture data from database
        //                 }
        //             });
        //         });
        //     }
        //     setCurrentUser(userAuth); // null if user not log in
        // })
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
                    <Route exact path='/checkout' component={CheckOut}/>
                    <Route
                        exact
                        path='/signin'
                        render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInSignUp/>)}/>
                </Switch>
            </div>
        );
    }
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
