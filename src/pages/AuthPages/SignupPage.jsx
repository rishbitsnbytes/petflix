import { Link, useLocation, useNavigate } from "react-router-dom";
import { React, useEffect, useReducer, useState } from "react";

import { signupService } from "services/";
import { useToast, useDocumentTitle } from "custom-hooks";
import { useAuth } from "contexts/";
import "./auth.css";
import { isFormDataValid } from "utils";

const SignupPage = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrorState = {
    firstNameError: null,
    lastNameError: null,
    passwordError: null,
    confirmPasswordError: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  const errorReducer = (state, { type, payload: { error, errorValue } }) => {
    switch (type) {
      case "RESET_ERROR_STATES":
        return { ...initialErrorState };
      case "SET_ERROR":
        return { ...state, [error]: errorValue };
    }
  };

  const [formDataError, setFormDataError] = useReducer(
    errorReducer,
    initialErrorState
  );

  const navigate = useNavigate();

  const { showToast } = useToast();
  const { authDispatch, isAuth } = useAuth();

  const setDocumentTitle = useDocumentTitle();
  useEffect(() => {
    if (isAuth) {
      navigate(location?.state?.from ?? "/", { replace: true });
    }
    setDocumentTitle("Petflix | Signup");
  }, []);

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    if (formDataError[name + "Error"]) {
      setFormDataError({
        type: "SET_ERROR",
        payload: { error: name + "Error", errorValue: null },
      });
    }
    if (error) {
      setError(null);
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const showPasswordIcon = showPassword ? (
    <i className="btn fa-regular fa-eye-slash" />
  ) : (
    <i className="btn fa-regular fa-eye" />
  );
  const showConfirmPasswordIcon = showConfirmPassword ? (
    <i className="btn fa-regular fa-eye-slash" />
  ) : (
    <i className="btn fa-regular fa-eye" />
  );

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !isFormDataValid(
        firstName,
        lastName,
        password,
        confirmPassword,
        setFormDataError,
        setError
      )
    ) {
      return;
    }
    setIsSigningUp(true);

    try {
      const { data } = await signupService(formData);
      const { encodedToken, createdUser } = data;
      authDispatch({
        action: {
          type: "INIT_AUTH",
          payload: { authUser: createdUser, authToken: encodedToken },
        },
      });

      setFormData(initialFormData);
      showToast("Sign up successful!", "success");

      navigate(location?.state?.from ?? "/", { replace: true });
    } catch (error) {
      setIsSigningUp(false);
      if (error.message.includes("422")) {
        showToast("Email already registered.", "error");
      } else showToast("Sign up failed. Please try again later.", "error");
    }
  };

  const handleChangePasswordVisibility = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleChangeConfirmPasswordVisibility = () =>
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );

  const { firstNameError, lastNameError, passwordError, confirmPasswordError } =
    formDataError;

  return (
    <section
      className="auth-main flex-col flex-align-center flex-justify-center mx-auto py-2 px-3 w-full"
      style={{ minHeight: "100vh" }}
    >
      <div className="auth-wrapper py-5">
        <article className="auth-container signup-container mx-auto mb-1 px-1-5 py-2 rounded-md">
          <h3 className="text-center h2 py-1">Sign Up</h3>
          <form
            className="auth-form flex-col flex-justify-center flex-align-start py-1 px-5 w-full gap-2"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full mx-auto">
              <label
                className="flex-col mx-auto gap-0-5"
                htmlFor="input-signup-fname"
              >
                First Name
                <input
                  type="text"
                  id="input-signup-fname"
                  placeholder="Enter your First Name"
                  name="firstName"
                  disabled={isSigningUp}
                  onChange={handleFormDataChange}
                  value={firstName}
                  required
                />
              </label>
              {firstNameError && (
                <span className="error-text my-0-25 text-sm">
                  {firstNameError}
                </span>
              )}
            </div>
            <div className="w-full mx-auto">
              <label
                className="flex-col mx-auto gap-0-5"
                htmlFor="input-signup-lname"
              >
                Last Name
                <input
                  type="text"
                  id="input-signup-lname"
                  placeholder="Enter your Last Name"
                  name="lastName"
                  disabled={isSigningUp}
                  onChange={handleFormDataChange}
                  value={lastName}
                  required
                />
              </label>
              {lastNameError && (
                <span className="error-text my-0-25 text-sm">
                  {lastNameError}
                </span>
              )}
            </div>
            <div className="w-full mx-auto">
              <label
                className="flex-col mx-auto gap-0-5"
                htmlFor="input-login-email"
              >
                Email
                <input
                  type="email"
                  id="input-login-email"
                  placeholder="kindness@humanity.org"
                  name="email"
                  disabled={isSigningUp}
                  onChange={handleFormDataChange}
                  value={email}
                  required
                />
              </label>
            </div>
            <div className="w-full mx-auto">
              <label className="flex-col mx-auto gap-0-5" htmlFor="input-psd">
                Password
                <span className="relative w-full h5 font-bold">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="input-psd"
                    placeholder="********"
                    autoComplete="off"
                    name="password"
                    onChange={handleFormDataChange}
                    value={password}
                    disabled={isSigningUp}
                    required
                  />
                  <button
                    type="button"
                    className={`btn btn-icon password-eye absolute`}
                    onClick={handleChangePasswordVisibility}
                    disabled={isSigningUp}
                  >
                    <span>{showPasswordIcon}</span>
                  </button>
                </span>
              </label>
              {passwordError && (
                <span className="error-text my-0-25 text-sm">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="w-full mx-auto">
              <label className="flex-col mx-auto gap-0-5" htmlFor="input-psd">
                Confirm Password
                <span className="relative w-full h5 font-bold">
                  <input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    id="input-confirm-psd"
                    placeholder="********"
                    autoComplete="off"
                    name="confirmPassword"
                    onChange={handleFormDataChange}
                    value={confirmPassword}
                    required
                    disabled={isSigningUp}
                  />
                  <button
                    type="button"
                    className={`btn btn-icon password-eye absolute`}
                    onClick={handleChangeConfirmPasswordVisibility}
                    disabled={isSigningUp}
                  >
                    <span>{showConfirmPasswordIcon}</span>
                  </button>
                </span>
              </label>
              {confirmPassword && (
                <span className="error-text my-0-25 text-sm">
                  {confirmPasswordError}
                </span>
              )}
            </div>
            {error ? <div className="my-1 error-color">{error}</div> : null}
            <div className="flex-row flex-align-center flex-justify-between flex wrap gap-1">
              <input
                type="checkbox"
                id="checkbox-remember"
                name="checkbox-remember"
                required
                disabled={isSigningUp}
              />
              <label
                htmlFor="checkbox-remember"
                className="flex-row input-checkbox-remember flex-align-center text-md"
              >
                I accept terms and conditions
              </label>
            </div>
            <div className="flex-col flex-justify-center flex-align-center w-full gap-2 py-1">
              <button
                type="submit"
                disabled={isSigningUp}
                className="btn btn-primary rounded-md py-1 px-2 w-full font-bold"
              >
                Sign Up
              </button>
              <Link
                to="/login"
                className={`btn btn-link-animated-3 h5 font-sbold font-bold ${
                  isSigningUp ? "btn-disabled" : ""
                }`}
              >
                Already have an account? Login
                <span className="ml-0-5">
                  <i className="fa-solid fa-circle-arrow-right" />
                </span>
              </Link>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
};

export { SignupPage };
