import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import styles from "./ContactData.module.css";
import { purchaseBurger } from "../../../redux/actions/index";
import { checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            errorMsg: "",
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            errorMsg: "",
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "ZIP Code",
            },
            value: "",
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true,
            },
            valid: false,
            touched: false,
            errorMsg: "",
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            errorMsg: "",
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your E-Mail",
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
            errorMsg: "",
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    {
                        value: "fastest",
                        displayValue: "Fastest",
                    },
                    {
                        value: "cheapest",
                        displayValue: "Cheapest",
                    },
                ],
            },
            value: "fastest",
            validation: {},
            valid: true,
            touched: true,
            errorMsg: "",
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = async (e) => {
        e.preventDefault();
        const formData = {};
        Object.keys(orderForm).forEach((key) => {
            formData[key] = orderForm[key].value;
        });

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId,
        };

        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (e, inputIdentifier) => {
        const { isValid: isValidIdentifier, errorMsg } = checkValidity(
            e.target.value,
            orderForm[inputIdentifier].validation
        );

        let formIsValid = true;
        for (let inputId in orderForm) {
            if (inputId !== inputIdentifier) {
                formIsValid = orderForm[inputId].valid && formIsValid;
            } else {
                formIsValid = isValidIdentifier && formIsValid;
            }
        }

        setOrderForm((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: {
                    ...prevState[inputIdentifier],
                    value: e.target.value,
                    valid: isValidIdentifier,
                    touched: true,
                    errorMsg,
                },
            };
        });
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map((formElement) => {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(e) => inputChangedHandler(e, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMsg}
                    />
                );
            })}
            <Button btnType="Success" disabled={!formIsValid}>
                ORDER
            </Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = {
    onOrderBurger: purchaseBurger,
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
