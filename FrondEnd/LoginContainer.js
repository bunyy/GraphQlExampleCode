import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Loader from "components/Loader/TailSpinner";
import Login from "views/auth/Login/";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastNamef
      email
      permissions {
        id
      }
    }
  }
`;
class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let registeredData =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.registeredData;
    console.log("registered data: ", registeredData);
    return (
      <Mutation mutation={LOGIN}>
        {(login, { data, error, loading }) => {
          if (loading) {
            return (
              <div
                style={{
                  height: 400,
                  width: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            );
          }

          if (error) {
            console.log("Error:", error);
          }
          return (
            <Login
              successMessage="Mobile verification success."
              registeredData={registeredData}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default LoginContainer;
