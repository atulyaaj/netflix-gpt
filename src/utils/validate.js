export const checkValidData = (name = "", email, password, isSignInForm) => {
  const errors = {};

  const isEmailValid = /^(?:\d{10}|[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // Validate name only for Sign Up
  if (!isSignInForm && name.trim() === "") {
    errors.name = "Please enter a name.";
  }
  if (!isEmailValid)
    errors.email = "Please enter a valid email or mobile number.";
  if (!isPasswordValid)
    errors.password =
      "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.";

  return errors;
};
