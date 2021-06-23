import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
        return null;
    };

    // it receive props of the component and should return some JSX
    // meta will contain all the error-info associated to each field generated from validation
    // 'input' object contains methods and properties like 'onChange', 'onBlur', 'onFocus', value etc. which are used by 'redux-form' to updated state inside form in redux store
    // Props not known to Field will be passed to the component as props, Ex: label
    renderInput = ({ input, label, meta }) => {
        return (
            <div className={["field", meta.touched && meta.error ? "error" : ""].join(" ")}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    // this.props.handleSubmit automatically triggers e.preventDefault()
    // It passes formValues to the submit function as object with keys as 'name' given to Fields
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {/* Field don't know anything about DOM, we need to pass component prop to tell it what to render */}
                {/* Props not known to Field will be passed to the component as props, Ex: label */}
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

// Receives formValues as object with keys as 'name' given to Fields
// Runs when Form is initially rendered OR user interacts with form
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }
    if (!formValues.description) {
        errors.description = "You must enter a description";
    }
    // If there are no errors, return an empty object
    // Else return object with key as 'name' given to Fields and value as the error message
    // If there are errors, reduxForm will re-render our component and pass all error fields
    return errors;
};

const mapFormToProps = {
    // Key name has to be form, state available as state.form.formName
    form: "streamForm",
    // validation input function
    validate: validate,
};

// Also need to combine formReducer from 'redux-form', see reducers/index.js
export default reduxForm(mapFormToProps)(StreamForm);

// <StreamForm initialValue={{}} />, initialValues is a special prop which will set initial values for all the Fields in the form. It is an object with key as 'name' given to Fields
