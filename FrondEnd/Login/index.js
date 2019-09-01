import React, { Component } from "react";

//Import Form
import LoginForm from "./LoginForm";
import Register from "./Register";

//Import Styles
import style from "./style.module.scss";

export default class Login extends Component {
  render() {
    return (
      <div className={style["login__background"]}>
        <div className={style["login__card"]}>
          <div className={style["login__container"]}>
            <div className={style["login__branding"]}>
              <div className={style["logo__branding"]}>
                <img
                  className={style["logo"]}
                  alt="logo"
                  src={require("assets/images/midstreetImage/midstreetHeader.png")}
                />
              </div>
            </div>
            <div className={style["login__form"]}>
              <LoginForm
                {...this.props}
                onSubmit={this.props.loginUser}
                history={this.props.history}
              />
              {/* {this.props.successMessage} */}
            </div>
          </div>
          {/* <div className={style["register__container"]}>
            <Register />
          </div> */}
        </div>
      </div>
    );
  }
}
