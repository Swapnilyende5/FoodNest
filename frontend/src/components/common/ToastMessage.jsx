import React from "react";
import "./ToastMessage.scss";

const ToastMessage = ({ message }) => {
  return (
    <div id="toast" className="toast">
      {message}
    </div>
  );
};

export default ToastMessage;
