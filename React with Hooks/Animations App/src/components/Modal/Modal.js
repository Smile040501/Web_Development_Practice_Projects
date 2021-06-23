import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const animationTiming = {
    enter: 400,
    exit: 1000,
};

const Modal = (props) => {
    const modalRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={modalRef}
            in={props.show}
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: "",
                enterActive: "ModalOpen",
                exit: "",
                exitActive: "ModalClosed",
            }}
        >
            <div className="Modal" ref={modalRef}>
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>
                    Dismiss
                </button>
            </div>
        </CSSTransition>
    );
};

export default Modal;
