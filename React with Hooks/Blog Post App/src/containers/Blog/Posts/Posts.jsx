import React, { Component } from "react";
import axios from "../../../axios.js";
import { Route } from "react-router-dom";
import Post from "../../../components/Post/Post.jsx";
import FullPost from "../FullPost/FullPost.jsx";
import "./Posts.css";

export default class Posts extends Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        axios
            .get("/posts")
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: "Max",
                    };
                });
                this.setState({ posts: updatedPosts });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: `${this.props.match.url}/${id}` });
    };

    render() {
        let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map((post) => {
                return (
                    // <Link to=`${this.props.match.url}/${props.id}` key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">{posts}</section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}
