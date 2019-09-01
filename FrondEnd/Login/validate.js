const validate = values => {
  console.log("Values", values);

  let error = {};

  if (!values.email) {
    error.user_email = "Email field shouldn’t be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = "Invalid email address";
  }
  if (!values.user_password) {
    error.user_password = "Password field shouldn’t be empty";
  }

  return error;
};

export default validate;
