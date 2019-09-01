import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FormGroup, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import gql from "graphql-tag";
import client from "../../../app/client";
import ModalDialog from "../Modal";
import classNames from "classnames";
import cookie from "react-cookies";

import TextField from "components/Form/Material/TextField";
import CheckBox from "components/Form/CheckBox";

//Import Styles
import style from "./style.module.scss";

//Import Form Validation
// import validate from "../validate";

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      initialMessage: "",
      disableBtn: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModal = e => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  async handleSubmit(data) {
    const expires = new Date();
    expires.setDate(Date.now() + 7 * 24 * 60 * 60 * 1000);

    let loginUser = gql`
      query login($email: String, $password: String) {
        loginUser(email: $email, password: $password) {
          token
          success
          roleId {
            name
          }
        }
      }
    `;

    const response = await client.query({
      query: loginUser,
      variables: { email: data.email, password: data.password },
      context: {
        headers: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMTBjM2I1ZTVmMGZmMDAyNDY2YmFmMiIsImlhdCI6MTU2NzE2MjQzOSwiZXhwIjoxNTY3NzY3MjM5fQ.Blx8dUYwh-O9052PlfsuVUvihfsUxnQM_aE97OwU9HI',
        },
      },
    });

    // if (response.data.loginUser.success === true) {
    //   toast.success("Login Successful!", { autoClose: 1400 });
    //   cookie.save("token", response.data.loginUser.token, {
    //     path: "/",
    //   });
    //   setTimeout(() => {
    //     this.props.history.push("/broker/dashboard");
    //   }, 800);
    // } else {
    //   toast.error("Incorrect Credentials!", { autoClose: 1400 });
    // }

    if (response.data.loginUser.success === true) {
      if (response.data.loginUser.roleId.name === "Broker") {
        toast.success("Login Successful!", { autoClose: 1400 });
        cookie.save("token", response.data.loginUser.token, {
          path: "/",
        });
        setTimeout(() => {
          this.props.history.push("/broker/dashboard");
        }, 800);
      }
    } else {
      toast.error("Incorrect Credentials!", { autoClose: 1400 });
    }
  }

  forgotPassword = async data => {
    // forgotPassword
    let resetRequest = gql`
      query forgotPassword($email: String) {
        forgotPassword(email: $email) {
          success
          message
        }
      }
    `;

    const response = await client.query({
      query: resetRequest,
      variables: data,
      context: {
        headers: {
          token: cookie.load("token"),
        },
      },
    });

    if (response.data.forgotPassword.success) {
      this.setState({
        initialMessage: "Email has been sent! Please check your inbox",
        disableBtn: true,
      });

      setTimeout(() => {
        this.setState({
          modalOpen: false,
        });
      }, 1200);
    } else {
      this.setState({
        initialMessage:
          "Sorry, we couldn't find any account associated with this email! Please try again!",
      });
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
          if (
            values.email &&
            !/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
              values.email
            )
          ) {
            errors.email = "Please enter a valid email";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, pristine, invalid, submitting }) => {
          return (
            <form className="material-forms" onSubmit={handleSubmit}>
              <FormGroup>
                <Label className="material-label">Email</Label>
                <Field
                  name="email"
                  component={TextField}
                  placeholder="Enter Email"
                  type="email"
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label className="material-label">Password</Label>
                <Field
                  name="password"
                  component={TextField}
                  placeholder="Enter Password"
                  type="password"
                  required
                />
              </FormGroup>
              <FormGroup className="login-checkbox">
                <Field
                  name="remember"
                  component={CheckBox}
                  label="Remember me"
                  type="checkbox"
                  className="colored-click"
                  required
                />
              </FormGroup>
              <FormGroup>
                <div className={style["login__form__footer"]}>
                  <div className={style["login__button"]}>
                    <Button
                      color="primary"
                      className="btn btn-primary"
                      disabled={invalid}
                    >
                      Login
                    </Button>
                  </div>
                  <div className={style["login__forgot__password"]}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={e => this.handleModal(e)}>Forgot Password?</a>
                  </div>
                </div>
              </FormGroup>
              <ModalDialog
                isOpen={this.state.modalOpen}
                toggle={this.handleModal}
                title="Forgot Password"
              >
                <Form
                  onSubmit={this.forgotPassword}
                  // validate={validate}
                  render={({ handleSubmit, pristine, invalid }) => {
                    return (
                      <form
                        className={classNames(
                          style["forgot-password__form"],
                          "material-forms"
                        )}
                        onSubmit={handleSubmit}
                      >
                        <div className={style["modal__body"]}>
                          <div className={style["forgot__form"]}>
                            <FormGroup style={{ flex: 1 }}>
                              <Label className="material-label">
                                Enter your email to retrive your password
                              </Label>
                              <Field
                                name="email"
                                component={TextField}
                                placeholder="Enter Email"
                                type="email"
                              />
                            </FormGroup>
                          </div>
                          {this.state.initialMessage !== "" && (
                            <div className={style["info__text"]}>
                              <img
                                className={style["info__icon"]}
                                alt="info icon"
                                src={require("assets/images/info-icon.svg")}
                              />
                              <p>{this.state.initialMessage}</p>
                            </div>
                          )}
                          <div className={style["modal__footer"]}>
                            <FormGroup>
                              <Button
                                color="primary"
                                outline
                                onClick={() =>
                                  this.setState({ modalOpen: false })
                                }
                                style={{ marginRight: 15 }}
                              >
                                Close
                              </Button>
                              <Button
                                color="primary"
                                type="submit"
                                disabled={this.state.disableBtn}
                              >
                                Submit
                              </Button>
                            </FormGroup>
                          </div>
                        </div>
                      </form>
                    );
                  }}
                />
              </ModalDialog>
            </form>
          );
        }}
      />
    );
  }
}

export default withRouter(LoginForm);
