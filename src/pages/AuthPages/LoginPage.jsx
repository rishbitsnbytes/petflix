import "./auth.css";
import { loginService } from "services/";
import { useToast, useDocumentTitle } from "custom-hooks";
import { useAuth } from "contexts/";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const initialFormData = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { authDispatch, isAuth, authLoading } = useAuth();
  const { showToast } = useToast();

  const setDocumentTitle = useDocumentTitle();

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
    setDocumentTitle("Petflix | Login");
  }, []);

  const handleFormDataChange = (event) => {
    const { name, value, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const showPasswordIcon = showPassword ? (
    <i className="btn fa-regular fa-eye-slash" />
  ) : (
    <i className="btn fa-regular fa-eye" />
  );

  const handleFormSubmit = async (event) => {
    setIsLoggingIn(true);
    event.preventDefault();
    try {
      const { data } = await loginService(formData);

      const { encodedToken, foundUser } = data;
      authDispatch({
        action: {
          type: "SET_AUTH_LOADING",
          payload: { authLoading: true },
        },
      });

      authDispatch({
        action: {
          type: "INIT_AUTH",
          payload: { authUser: foundUser, authToken: encodedToken },
        },
      });
      if (rememberMe) {
        localStorage.setItem("petflix-token", encodedToken);
        localStorage.setItem("petflix-user", JSON.stringify(foundUser));
      }

      setFormData(initialFormData);
      showToast("Login successfull.", "success");
      authDispatch({
        action: {
          type: "SET_AUTH_LOADING",
          payload: { authLoading: false },
        },
      });
      navigate(location?.state?.from ?? -1);
    } catch (error) {
      setIsLoggingIn(false);
      if (error.message.includes("404"))
        showToast("Username not found!", "error");
      else showToast("Login Failed. Please try again later", "error");
    }
  };

  const { email, password, rememberMe } = formData;
  const handleChangePasswordVisibility = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleLoginWithTestCredentials = (event) => {
    setFormData({
      email: "testSingh@test.com",
      password: "testPassword",
      rememberMe: true,
    });
  };

  return (
    <section
      className="main auth-main flex-col flex-align-center flex-justify-center mx-auto py-2 px-3 w-full"
      style={{ minHeight: "100vh" }}
    >
      <div className="auth-wrapper">
        <section className="auth-container login-container mx-auto mb-1 px-1-5 py-2 rounded-md">
          <h3 className="text-center h2 py-1">Login</h3>
          <form
            className="auth-form flex-col flex-justify-center flex-align-start py-1 px-5 w-full gap-2"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full mx-auto">
              <label
                className="flex-col mx-auto gap-0-5"
                htmlFor="input-login-email"
              >
                Email
                <input
                  type="email"
                  name="email"
                  id="input-login-email"
                  placeholder="kindness@humanity.org"
                  value={email}
                  disabled={isLoggingIn}
                  onChange={handleFormDataChange}
                  required
                />
              </label>
              <span className="text-sm mt-0-5"></span>
            </div>
            <div className="w-full mx-auto">
              <label
                className="flex-col mx-auto gap-0-5"
                htmlFor="input-login-psd"
              >
                Password
                <span className="relative w-full h5 font-bold">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="input-login-psd"
                    disabled={isLoggingIn}
                    placeholder="********"
                    name="password"
                    value={password}
                    onChange={handleFormDataChange}
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    className={`btn btn-icon password-eye absolute`}
                    onClick={handleChangePasswordVisibility}
                    disabled={isLoggingIn}
                  >
                    <span>{showPasswordIcon}</span>
                  </button>
                </span>
              </label>
              <span className="text-sm mt-0-5"></span>
            </div>
            <div className="flex-row flex-align-center flex-justify-between flex wrap gap-1">
              <input
                type="checkbox"
                id="checkbox-remember"
                checked={rememberMe}
                disabled={isLoggingIn}
                name="rememberMe"
                onChange={handleFormDataChange}
              />
              <label
                htmlFor="checkbox-remember"
                className="flex-row input-checkbox-remember flex-align-center text-md"
              >
                Remember me
              </label>
            </div>
            <div className="flex-col flex-justify-center flex-align-center w-full gap-2 py-1">
              <button
                type="submit"
                className={`btn btn-primary rounded-md py-1 px-2 w-full font-bold ${
                  isLoggingIn ? "btn-disabled" : ""
                }`}
                disabled={isLoggingIn}
              >
                {" "}
                Login{" "}
              </button>
              <button
                type="submit"
                className={`btn btn-secondary rounded-md py-1 px-2 w-full font-bold ${
                  isLoggingIn ? "btn btn-disabled" : ""
                }`}
                disabled={isLoggingIn}
                onClick={handleLoginWithTestCredentials}
              >
                Login with Test Credentials
              </button>
              <Link
                to="/signup"
                className={`btn btn-link-animated-3 h5 font-sbold font-bold ${
                  isLoggingIn ? "btn btn-disabled" : ""
                }`}
              >
                Create a new account
                <span className="ml-0-5">
                  <i className="fa-solid fa-circle-arrow-right" />
                </span>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export { LoginPage };
