import React from "react";

import useHttpErrorHandler from "../../hooks/useHttpErrorHandler";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;
