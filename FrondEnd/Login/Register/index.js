import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

//Import Styles
import style from "./style.module.scss";

export default class Register extends PureComponent {
  render() {
    return (
      <>
        <div className={style["register__text"]}>Don't have an account?</div>
        <div className={style["register__button"]}>
          <Link className="btn btn-register" to="/signup">
            Register Now
          </Link>
        </div>
      </>
    );
  }
}
