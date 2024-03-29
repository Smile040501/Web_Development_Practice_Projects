import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./redux/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const AsyncCheckout = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
});

const AsyncOrders = React.lazy(() => {
    return import("./containers/Orders/Orders");
});

const AsyncAuth = React.lazy(() => {
    return import("./containers/Auth/Auth");
});

const App = (props) => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <AsyncAuth {...props} />} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <AsyncCheckout {...props} />} />
                <Route path="/orders" render={(props) => <AsyncOrders {...props} />} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" render={(props) => <AsyncAuth {...props} />} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner />}>{routes}</Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = {
    onTryAutoSignup: authCheckState,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
