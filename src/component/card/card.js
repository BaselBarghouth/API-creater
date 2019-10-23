import React from "react";
import classes from "./Modal.module.css";
const modal = props => {
  return (
    <div
      className={classes.Modal}
      style={{
        transform: "translateY(0) translateX(-300px)",
        opacity: "1",
        width: "1000px"
      }}
    >
      {props.children}
    </div>
  );
};

export default modal;
