import React from "react";

export const FormBtn = props => (
  <div className="col-md-2 border">
    <button {...props} type="submit" className="btn btn-dark" id="sendMessageButton">{props.children}</button>
  </div>
);
