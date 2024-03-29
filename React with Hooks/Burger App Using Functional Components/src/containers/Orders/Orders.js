import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { fetchOrders } from "../../redux/actions/index";

const Orders = (props) => {
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders = <Spinner />;

    if (!props.loading) {
        orders = (
            <div>
                {props.orders.map((order) => {
                    return (
                        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    );
                })}
            </div>
        );
    }

    return orders;
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = {
    onFetchOrders: fetchOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
