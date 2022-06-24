import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { Alert } from "react-bootstrap";
import ButtonLoader from "@components/UI/ButtonLoader";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    loading: false,
    error: false,
    errorMsg: "",
    email: "ssoni@grepruby.io",
    password: "123456",
  });

  const { loading, email, password, error, errorMsg } = formData;

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setFormData((p) => ({ ...p, error: false, errorMsg: "" }));
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [error]);

  const inputHandler = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Enter All Fields First");
      return;
    }

    setFormData((p) => ({ ...p, loading: true }));
    const response = await signIn("credentials", {
      signinUrl: "/api/v1/auth/signIn",
      redirect: false,
      email,
      password,
    });

    if (response.status === 200) {
      setFormData((p) => ({ ...p, loading: false }));
      router.push("/");
      return;
    }

    if (response.error) {
      setFormData((p) => ({
        ...p,
        loading: false,
        error: true,
        errorMsg: response.error,
      }));
      // toast.error(response.error);
      return;
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={inputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                name="password"
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={inputHandler}
              />
            </div>

            <a href="#" className="float-right mb-4">
              Forgot Password?
            </a>
            {error && (
              <Alert variant="danger" transition dismissible>
                {errorMsg}
              </Alert>
            )}
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
              style={{ marginTop: 0 }}
            >
              {loading ? <ButtonLoader /> : "LOGIN"}
            </button>

            <Link href={"/register"}>
              <a href="" className="float-right mt-3">
                New User?
              </a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
