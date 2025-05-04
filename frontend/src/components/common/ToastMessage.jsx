import React from "react";
import "./ToastMessage.scss";

const ToastMessage = ({ message }) => {
  return (
    <div id="toast" className="text-capitalize toast">
      {message}
    </div>
  );
};

export default ToastMessage;
