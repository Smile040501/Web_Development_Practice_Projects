// reach this file at domain/
// Automatically implemented routing and lazy loading for us by strictly following the folder structure especially 'pages'
import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
class IndexPage extends Component {
    static async getInitialProps(context) {
        console.log(context);
        // Can be used to do initial data loading as it runs on server first
        return { appName: "Next App [Main Index]" };
    }

    render() {
        return (
            <div>
                <h1>The Main Page of {this.props.appName}</h1>
                <p>
                    Go to{" "}
                    <Link href="/auth">
                        <a>Auth</a>
                    </Link>
                </p>
                <button onClick={() => Router.push("/auth")}>Go to Auth</button>
            </div>
        );
    }
}

export default IndexPage;
