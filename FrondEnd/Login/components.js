import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import { Col, Container, Row, FormGroup, Button, Label } from "reactstrap";
// import classNames from "classnames";

import TextField from "components/form/material/TextField";
import CheckBox from "components/form/CheckBox";
// import SelectBox from "components/form/Select";

//Import Styles
// import style from "./style.module.scss";

//Import Form Validation
// import validate from "./validate";

export default class ComponentForm extends PureComponent {
  handleForm = data => {
    console.log("Form Data: ", data);
  };

  render() {
    return (
      <Form
        onSubmit={this.handleForm}
        render={({ handleSubmit }) => {
          return (
            <form className="material-forms" onSubmit={handleSubmit}>
              <FormGroup>
                <Label className="material-label">Username/Email</Label>
                <Field
                  name="email"
                  component={TextField}
                  placeholder="Enter Username/Email"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label className="material-label">Password</Label>
                <Field
                  name="password"
                  component={TextField}
                  placeholder="Enter Password"
                  type="password"
                />
              </FormGroup>
              <FormGroup className="login-checkbox">
                <Field
                  name="remember"
                  component={CheckBox}
                  label="Remember me"
                  className="colored-click"
                />
              </FormGroup>
              <FormGroup>
                <Label className="material-label">Select</Label>
                <Field name="selectbox" component={TextField} select>
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value="one">One</MenuItem>
                  <MenuItem value="two">Two</MenuItem>
                </Field>
              </FormGroup>
              {/* <FormGroup>
                <Label className="material-label">Select</Label>
                <Field name="selectbox" component={SelectBox}>
                  <MenuItem value="one">One</MenuItem>
                  <MenuItem value="two">Two</MenuItem>
                </Field>
              </FormGroup> */}
              <FormGroup>
                <Button color="primary" type="submit" outline>
                  Submit
                </Button>
                <Button color="secondary" type="submit" outline>
                  Submit
                </Button>
                <Button color="success" type="submit" outline>
                  Submit
                </Button>
                <Button color="danger" type="submit" outline>
                  Submit
                </Button>
                <Button color="warning" type="submit" outline>
                  Submit
                </Button>
              </FormGroup>
              <FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className="rounded"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  type="submit"
                  className="rounded"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="success"
                  type="submit"
                  className="rounded"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="danger"
                  type="submit"
                  className="rounded"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="warning"
                  type="submit"
                  className="rounded"
                  outline
                >
                  Submit
                </Button>
              </FormGroup>
              <FormGroup>
                <Button color="primary" type="submit" size="sm" outline>
                  Submit
                </Button>
                <Button color="secondary" type="submit" size="sm" outline>
                  Submit
                </Button>
                <Button color="success" type="submit" size="sm" outline>
                  Submit
                </Button>
                <Button color="danger" type="submit" size="sm" outline>
                  Submit
                </Button>
                <Button color="warning" type="submit" size="sm" outline>
                  Submit
                </Button>
              </FormGroup>
              <FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className="rounded"
                  size="sm"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  type="submit"
                  className="rounded"
                  size="sm"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="success"
                  type="submit"
                  className="rounded"
                  size="sm"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="danger"
                  type="submit"
                  className="rounded"
                  size="sm"
                  outline
                >
                  Submit
                </Button>
                <Button
                  color="warning"
                  type="submit"
                  className="rounded"
                  size="sm"
                  outline
                >
                  Submit
                </Button>
              </FormGroup>
              <Container>
                <Row>
                  <Col md={2}>
                    <Button color="primary" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="secondary" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="success" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="danger" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="warning" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Button
                      color="primary"
                      type="submit"
                      className="rounded"
                      block
                      outline
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="secondary"
                      type="submit"
                      className="rounded"
                      block
                      outline
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="success"
                      type="submit"
                      className="rounded"
                      block
                      outline
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="danger"
                      type="submit"
                      className="rounded"
                      block
                      outline
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="warning"
                      type="submit"
                      className="rounded"
                      block
                      outline
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Button color="primary" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="secondary" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="success" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="danger" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="warning" type="submit" block outline>
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Button color="primary" type="submit" block>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="secondary" type="submit" block>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="success" type="submit" block>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="danger" type="submit" block>
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button color="warning" type="submit" block>
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Button
                      color="primary"
                      type="submit"
                      className="rounded"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="secondary"
                      type="submit"
                      className="rounded"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="success"
                      type="submit"
                      className="rounded"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="danger"
                      type="submit"
                      className="rounded"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      color="warning"
                      type="submit"
                      className="rounded"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          );
        }}
      />
    );
  }
}
