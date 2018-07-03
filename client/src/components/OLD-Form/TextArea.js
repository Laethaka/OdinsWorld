import React from "react";

export const TextArea = props => (
  <div className="col-md-10 border">
    <textarea className="form-control" id="sendMessageValue" rows="1" {...props}></textarea>
  </div>
);
