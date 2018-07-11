import React from "react";
import "./Modal.css";

const Modal = (props) => (

    <div class="modal fade game-modal info-background">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>{props.result}</p>
        </div>
        </div>
    </div>
)

export default Modal;
