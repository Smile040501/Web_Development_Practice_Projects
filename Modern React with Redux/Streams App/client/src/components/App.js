import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";

export default function App() {
    return (
        <div className="ui container">
            <Header />
            <Switch>
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit/:id" exact component={StreamEdit} />
                <Route path="/streams/delete/:id" exact component={StreamDelete} />
                <Route path="/streams/:id" exact component={StreamShow} />
            </Switch>
        </div>
    );
}
