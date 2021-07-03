import React, { Suspense } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/authContext";
import { useAuth } from "./shared/hooks/authHook";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

const App = () => {
    const { token, login, logout, userId } = useAuth();

    let routes;
    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact component={Users} />
                <Route path="/:userId/places" exact component={UserPlaces} />
                <Route path="/places/new" exact component={NewPlace} />
                <Route path="/places/:placeId" exact component={UpdatePlace} />
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact component={Users} />
                <Route path="/:userId/places" exact component={UserPlaces} />
                <Route path="/auth" exact component={Auth} />
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
            <BrowserRouter>
                <MainNavigation />
                <main>
                    <Suspense
                        fallback={
                            <div className="center">
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        {routes}
                    </Suspense>
                </main>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
