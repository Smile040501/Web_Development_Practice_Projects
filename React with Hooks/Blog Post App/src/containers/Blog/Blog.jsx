import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts.jsx";
// import NewPost from "./NewPost/NewPost.jsx";
import asyncComponent from "../../hoc/asyncComponent.jsx";
import "./Blog.css";

const AsyncNewPost = asyncComponent(() => {
    return import("./NewPost/NewPost.jsx");
});

class Blog extends Component {
    state = {
        authenticated: true,
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: "#fa923f",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{
                                        pathname: "/new-post",
                                        hash: "#submit",
                                        search: "?quick-submit=true",
                                    }}
                                >
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.authenticated ? (
                        <Route path="/new-post" component={AsyncNewPost} />
                    ) : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>(404) Page Not Found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
                {/* <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>*/}
            </div>
        );
    }
}

export default Blog;
